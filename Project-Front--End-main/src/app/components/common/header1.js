import React, { useState } from 'react';
import { Anchor, Drawer, Button } from 'antd';
import { BsFillKanbanFill } from 'react-icons/bs';
const { Link } = Anchor;


function AppHeader1() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <BsFillKanbanFill/>
          <a href="/">INSIGHTLY</a>
        </div>
        <div className="mobileHidden">
          <Anchor targetOffset="65">
            <Link href="/" title="Home" />
            <Link href="/signUp" title="Sign Up" />
            <Link href="/Login" title="Sign in" /> 
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="65">
              <Link href="/" title="Home" />
              <Link href="/signUp" title="Sign Up" />
              <Link href="/Login" title="Sign in" /> 
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default AppHeader1;