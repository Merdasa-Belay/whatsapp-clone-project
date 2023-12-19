import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      <Router>
        {!user ? (
          // If no user, render the Login component
          <Login />
        ) : (
          // If user is logged in, render the Sidebar and Chat components within the Router
          <div className="app__body">
            <Sidebar />
            <Routes>
              {/* Route to display individual rooms */}
              <Route path="/rooms/:roomId" element={<Chat />} />
              {/* Default landing page when user is authenticated */}
              <Route
                path="/"
                element={<Navigate to="/rooms/defaultRoomID" />}
              />
            </Routes>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
