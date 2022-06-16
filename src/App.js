import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNavbar from "./routing/MainNavbar";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./routing/AppRoutes";
import UserContext from "./contexts/User.context";

//TODO: Create Vehicules Components
//      --> Edit page
//      --> Delete Vehicule
//TODO: Create Home Page
//TODO: Test Navigation and Login
//TODO: Create AsyncWrapper Component ( later )
//TODO: Create Data access Hooks ( later )

function App() {
  const [user, setUser] = useState(null);

  return (
    <HashRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <MainNavbar />
        <AppRoutes />
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
