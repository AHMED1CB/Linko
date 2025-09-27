import { Box,  BottomNavigation, BottomNavigationAction  } from "@mui/material";

import { Home, Person, Settings} from "@mui/icons-material"

import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default () => {

    const [nav , setNav] = useState(0);
    const go = useNavigate()

  return (
    <Box className="main-container">
        
        <Box className="contents">
            <Outlet/>
        </Box>
      
      <BottomNavigation className="navigation-bar"
        value={nav}
        onChange={(e, newValue) => {setNav(newValue) }}
        sx={{
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <BottomNavigationAction label="Home"  icon={<Home/>} onClick={() => go('/')}/>
        <BottomNavigationAction label="Profile" icon={<Person/>} onClick={() => go('/user/ahmed1cb')} />
        <BottomNavigationAction label="Settings" icon={<Settings />}  onClick={() => go('/settings')} />
      </BottomNavigation>
    </Box>
  );
};
