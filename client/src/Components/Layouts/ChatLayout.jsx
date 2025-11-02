import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";

import { Home, Person} from "@mui/icons-material";

import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "../../app/Contexts/AuthContext";

export default () => {
  const go = useNavigate();
  const { pathname: location } = useLocation();
  const locations = ["/", "/profile"];
  let currentLocation = locations.indexOf(location);

  if (currentLocation == -1) {
    locations.forEach((loc, i) => {
      if (location.includes(loc) && location.startsWith(loc)) {
        currentLocation = i;
      }
    });
  }

  const [nav, setNav] = useState(currentLocation);
  return (
    <AuthProvider>
      <Box className="main-container">
        <Box className="contents">
          <Outlet />
        </Box>

        <BottomNavigation
          className="navigation-bar"
          value={nav}
          onChange={(e, newValue) => {
            setNav(newValue);
          }}
          sx={{
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<Home />}
            onClick={() => go("/")}
          />
          <BottomNavigationAction
            label="Profile"
            icon={<Person />}
            onClick={() => go("/profile")}
          />
        </BottomNavigation>
      </Box>
    </AuthProvider>
  );
};
