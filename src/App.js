import React, { useEffect, useState, memo } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PageNavbar from "./components/PageNavbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Access from "./pages/Access";
import { connect } from "./config/mqttService";

export const Context = React.createContext("");
function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [client, setClient] = useState(null);
  const [brokerMessage, setBrokerMessage] = useState(null);

  const TOPIC = "orinlakantobad";

  console.log("App @UserProfile:", userProfile);
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      setUserProfile(profile);
    }
  }, []);

  useEffect(() => {
    // Connect to MQTT broker on component mount
    try {
      const mqttClient = connect();
      setClient(mqttClient);
      // console.log("CLIENT: ", client);
    } catch (error) {
      console.log("#$#$#$#$MQTT Client-eroor: ", error.message);
    }

    // Cleanup function on component unmount
    return () => {
      if (client?.isConnected()) {
        // Unsubscribe from the topic
        client?.unsubscribe(TOPIC);
        // Disconnect from the MQTT broker
        client?.disconnect();
      }
    };
  }, []);

  // useEffect(() => {
  //   if (client) {
  //     client.onMessageArrived = (message) => {
  //       console.log(
  //         `Received message on topic ${message.destinationName}: ${message.payloadString}`
  //       );
  //       setBrokerMessage(message.payloadString);
  //     };
  //   }
  // }, [client]);

  return (
    <BrowserRouter>
      <Context.Provider value={{profile:[userProfile, setUserProfile], mqttclient:client}}>
        <PageNavbar setProfile={setUserProfile} />
        <Route
          path="/"
          exact
          component={() => (
            <Home
            /* profile={userProfile}
                isLoaded={isLoaded}
                setPageLoad={setIsLoaded} */
            />
          )}
        />
        <Route
          path="/profile"
          component={() => (
            <Profile
              username={userProfile?.username}
              setName={setUserProfile}
              profile={userProfile}
              // brokerdata={brokerMessage}
            />
          )}
        />
        <Route
          path="/login"
          component={() => (
            <Login /*setName={setUserProfile}*/ /*login={true}*/ />
          )}
        />
        <Route path="/register" component={Register} />
        <Route
          path="/access-gate"
          component={() => <Access brokerdata={brokerMessage} />}
        />
      </Context.Provider>
    </BrowserRouter>
  );
}

export default memo(App);
