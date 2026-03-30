import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import AuthProvider, {useAuth} from "../src/context/AuthContext";
import ThemeProvider from "../src/context/ThemeContext";
import { ContactProvider } from "./context/contactContext";
import { ActivityProvider } from "./context/ActivityContext";

const Root = () => {
  return(
  <ThemeProvider>
    <AuthProvider>
      <ActivityProvider>
        <AuthConsumerWrapper>
          <App />
        </AuthConsumerWrapper>
      </ActivityProvider>
    </AuthProvider>
  </ThemeProvider>
) 
}

const AuthConsumerWrapper = ({ children }) => {
  const { user } = useAuth()
  return (
    <ContactProvider key={user?._id || "default"} admin={user?.isAdmin}>
      {children}
    </ContactProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />)