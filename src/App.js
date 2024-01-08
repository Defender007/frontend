import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PageNavbar from "./components/PageNavbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { connect } from "./config/mqttService";

export const Context = React.createContext("");
function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [client, setCient] = useState(null);
  const [message, setMessage] = useState(null);

  const TOPIC = "orinlakantobad";

  console.log("App UserProfile:", userProfile);
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      setUserProfile(profile);
    }
  }, []);

  useEffect(() => {
    // Connect to MQTT broker on component mount
    try {
      const client = connect();
      setCient(client);
      console.log("CLIENT: ", client);
    } catch (error) {
      console.log(error);
    }

    // Cleanup function on component unmount
    return () => {
        if (client?.isConnected()) {
          // Unsubscribe from the topic
          client?.unsubscribe(TOPIC);
          // Disconnect from the MQTT broker
          client?.disconnect();
      };
    };
  }, [client]);

  useEffect(() => {
    if (client) {
      // Handle incoming messages
      client.onMessageArrived = (message) => {
        console.log(`Received message on topic ${message.destinationName}: ${message.payloadString}`);
        // Do something with the received message
        setMessage(message.payloadString);
      };
    }
  }, [client]);

  return (
    <BrowserRouter>
      <Context.Provider value={[userProfile, setUserProfile]}>
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
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
