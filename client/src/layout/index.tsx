import React, {ReactNode} from 'react';
import {BottomFooter, TopNavbar} from '../components';
import {Helmet} from "react-helmet";
import {Box, Text} from '@mantine/core';

interface IProps {
  children: ReactNode
}

const Layout = ({children}: IProps) => {
  return (
    <>
      <Helmet>
        <meta name="description" content="AI image generator powered by OpenAi"/>
      </Helmet>
      <TopNavbar/>
      <Box>
        {children}
      </Box>
      <BottomFooter/>
    </>
  );
};

export default Layout;
