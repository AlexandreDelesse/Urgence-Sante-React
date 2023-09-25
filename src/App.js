import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNavbar from "./routing/MainNavbar";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./routing/AppRoutes";
import UserContext from "./contexts/User.context";
import { QueryClient, QueryClientProvider } from "react-query";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  const [user, setUser] = useState(null);
  const [hasLogged, setHasLogged] = useState(false);
  const queryClient = new QueryClient();
  //TODO: ADD NOTIFICATION SYSTEM

  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ hasLogged, setHasLogged }}>
          <MainNavbar />
          <AppRoutes />
        </UserContext.Provider>
      </QueryClientProvider>
    </HashRouter>
  );
}

export default App;
