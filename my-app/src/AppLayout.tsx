import { Stack } from '@mantine/core';
import { Outlet } from "react-router-dom";
import Header from './components/Header';

function AppLayout() {
    return (
      <Stack>
          <Header />
          <Outlet />
      </Stack>
    );
  }
  
  export default AppLayout;
  