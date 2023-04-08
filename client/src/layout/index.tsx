import React, {ReactNode} from 'react';
import { TopNavbar } from '../components';

interface IProps {
  children: ReactNode
}

const Layout = ({children}: IProps) => {
  return (
    <>
      <TopNavbar/>
      {children}
    </>
  );
};

export default Layout;
