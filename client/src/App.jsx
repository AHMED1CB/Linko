import { ThemeProvider } from "@mui/material/styles";
import themes from "./app/Theme";
import "./assets/css/main.css";
import { CssBaseline } from "@mui/material";
import { ThemeContext } from "./app/Contexts/ThemeContext";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Register from "./Components/Register";
import AppLayout from "./Components/Layouts/AppLayout";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import SettingsPage from "./Components/Settings";
import ChatLayout from "./Components/Layouts/ChatLayout";
import UserPage from "./Components/User";
import NotFound from "./Components/NotFound";
import ChatUser from "./Components/ChatUser";

function App() {
  const currentThemeName = localStorage.theme || "light";

  const [themeName, setThemeName] = useState(currentThemeName);

  const setCurrentTheme = (name) => {
    localStorage.theme = name;
    setThemeName(name);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: themeName, setTheme: setCurrentTheme }}
    >
      <ThemeProvider theme={themes[themeName]}>
        <CssBaseline />
        <Routes>
          <Route path="/auth" element={<AppLayout />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="/" element={<ChatLayout />}>
            <Route index element={<HomePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="user/:username" element={<UserPage />} />

            <Route path="/user/:username/chat" element={<ChatUser />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
