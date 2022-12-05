import { BackTop } from 'antd';
import React from 'react';
import { BsFillKanbanFill } from 'react-icons/bs';


function AppFooter() {
  return (
    <div className="container-fluid"> 
      <div className="footer">
        <div className="logo">
          <BsFillKanbanFill/>
          <a href="/hero">INSIGHTLY</a>
        </div>
        <ul className="socials">
          <li><a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a></li>
          <li><a href="https://www.twitter.com/"><i className="fab fa-twitter"></i></a></li>
          <li><a href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a></li>
          <li><a href="https://www.google.com/"><i className="fab fa-google 2x"></i></a></li>
          <li><a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a></li>
        </ul>
        <div className="copyright">Copyright © 2021 INSIGHTLY</div>
        <BackTop>
          <div className="goTop"><i className="fas fa-arrow-circle-up"></i></div>
        </BackTop>
      </div>
    </div>
  );
}

export default AppFooter;