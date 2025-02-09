import React from 'react';
import Content from '../Parts/Content';
import Header from '../Parts/Header';
import { dashPrefix } from '../../src/utils/data';

const Layout = ({ children, mainEl }) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Support', href: '/support' },
  ]

  return (
    <>
      <div className={`${dashPrefix}-bplContainer`}>
        <Header navigation={navigation} mainEl={mainEl} />
        <Content>{children}</Content>
      </div>
    </>
  )
}

export default Layout;