import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.png";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import authService from '../api/services/authservice';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { Button } from '@mui/joy';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

const Dashboardnavbar = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);

  async function handlelogout() {
    await signOut();
    let data = await authService.logout();
    console.log(data);
    navigate("/");
  }

  useEffect(() => {
    switch (location.pathname) {
      case '/home':
        setSelectedTab(0);
        break;
      case '/diary':
        setSelectedTab(1);
        break;
      case '/dietplan':
        setSelectedTab(2);
        break;
      default:
        setSelectedTab(0);
    }
  }, [location.pathname]);

  return (
    <div className='navbar navcolor' style={{ display: "inline-flex", alignItems: 'center', width: '100%' }}>
      <img onClick={()=>{navigate("/home")}}
        width={250}
        style={{ paddingInlineStart: "200px" }}
        alt="Logo"
        src={logo}
      />
      <Tabs
        aria-label="tabs"
        value={selectedTab}
        onChange={(event, newValue) => setSelectedTab(newValue)}
        sx={{ bgcolor: 'transparent', paddingInlineStart: "380px",  }}
      >
        <TabList
          disableUnderline
          sx={{
            p: 0.2,
            gap: 2,
            borderRadius: 'xl',
            bgcolor: 'background.level2',
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: 'sm',
              bgcolor: 'background.surface',
            },
          }}
        >
          <Tab disableIndicator component={Link} to="/home" label="Home" value={0}>Home</Tab>
          <Tab disableIndicator component={Link} to="/diary" label="Diary" value={1}>Diary</Tab>
          <Tab disableIndicator component={Link} to="/dietplan" label="Diet Plan" value={2}>Diet Plan</Tab>
        </TabList>
      </Tabs>
      <Dropdown
      >
      <MenuButton  sx={{backgroundColor:"white",
        marginInlineStart:"600px"
      }}>Menu...</MenuButton>
      <Menu>
        <MenuItem onClick={()=>{navigate("/profile")}}>Profile</MenuItem>
        <MenuItem disabled>My account</MenuItem>
        <MenuItem onClick={handlelogout}>Logout</MenuItem>
      </Menu>
    </Dropdown  >

      {/* <Button color="warning"   style={{ marginLeft: 'auto', padding: '10px 20px',}}>
        Logout
      </Button> */}
    </div>
  );
};

export default Dashboardnavbar;
