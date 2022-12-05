import React from 'react';

import { Row, Col } from 'antd';

const items = [
  {
    key: '1',
    icon: <i className="fas fa-chart-pie"></i>,
    title: 'High Performance',
    content: 'Work in process is transperent,so we avoid obstacles easily and ensures smooth workflow.',
  },
  {
    key: '2',
    icon: <i className="fas fa-desktop"></i>,
    title: 'Transperent Workflow',
    content: 'In one view, easily see how much work has been completed last week and by whom.',
  },
  {
    key: '3',
    icon: <i className="fas fa-database"></i>,
    title: 'Simplified Management',
    content: 'Plan projects better by assigning tasks to people based on their expertise.',
  },
]

function AppAbout() {
  return (
    <div id="about" className="block aboutBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>About Us</h2>
          <p>The INSIGHTLY software you love</p>
        </div>
        <div className="contentHolder">
          <p>A warm welcome to INSIGHTLY.Our company ethos is to provide an outstanding service to you, the customer, alongside top quality service and the latest innovative ideas.
             With INSIGHTLY you visualize the project plan in dedicated Management Boards and break down the work across one or more Team Boards. 
             This creates a work hierarchy that spans multiple levels in the organization and creates unmatched transparency across the whole value stream.
              As teams, complete work on their team boards, the progress, and potential risks are visualized on your management boards automatically.

<div>Thank you for taking the time to visit our website.
</div>

<div>Team INSIGHTLY.</div></p>
        </div>
        <Row gutter={[16, 16]}>   
          {items.map(item => {
            return (
              <Col md={{ span: 8 }} key={item.key}>
                <div className="content">
                  <div className="icon">
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default AppAbout;