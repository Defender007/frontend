import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PageNavbar from "./components/PageNavbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

export const Context = React.createContext("");
function App() {
  // const [username, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);

  console.log("App:", userProfile);
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      setUserProfile(profile);
    }
  }, []);
  return (
    <>
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
            component={() => <Login setName={setUserProfile} login={true} />}
          />
          <Route path="/register" component={Register} />
        </Context.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
