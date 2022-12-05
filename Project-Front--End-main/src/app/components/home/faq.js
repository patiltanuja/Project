import React from 'react';

import { Collapse, Button } from 'antd';

const { Panel } = Collapse;

function AppFaq() {
  return(
    <div id="faq" className="block faqBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Frequently Asked Questions</h2>
          <p>Is bright, easy to use, and categorized effectively for quick use.</p>
        </div>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="How to manage my account?" key="1">
            <p>After logging in to Kanban Tool you will be able to grant yourself access as an account owner. Do this from the People tab - click edit next to your name. Then, simply check all access levels: Project 
manager, account administrator, and account owner
</p>
          </Panel>
          <Panel header="How can I change my password?" key="2">
            <p>Click I forgot my username or password and then enter the owner's email address. A link to 
reset the password will be sent to his/her email.
</p>
          </Panel>
          <Panel header="Can I manage multiple task?" key="3">
            <p>In order to manage multiple projects successfully, you need to have a clear structure to align planning with execution. Sure, you can use a Gantt Chart to illustrate sequencing and track dependencies, but again, 
this requires pre-planning and works in a less volatile environment.
</p>
          </Panel>
          
        </Collapse>
        <div className="quickSupport">
          <h3>Want quick support?</h3>
          <p> Submit a support request and we'll get back to you ASAP!</p>
          <Button type="primary" size="large"><i className="fas fa-envelope"></i>Email your question<a  href="https://login.yahoo.com/?.src=ym&.partner=none&.lang=en-IN&.intl=in&.done=https%3A%2F%2Fmail.yahoo.com%2Fd%3F.intl%3Din%26.lang%3Den-IN%26.partner%3Dnone%26.src%3Dfp"></a></Button>
        </div>
      </div>
    </div>  
  );
}

export default AppFaq;