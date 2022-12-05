import React from 'react';
import { Button } from 'antd';
import { Carousel } from 'antd';

const items = [
  {
    key: '1',
    title: 'Productive Work and Inspiring Management',
    content: 'INSIGHTLY is a modern work management platform that brings together the best tools for high-level planning, project and product management, task organization and productivity growth based on transparency, agility, and motivation.',
  },
  {
    key: '2',
    title: 'Connect Goals, Strategy and Execution',
    content: 'INSIGHTLY allows you to put together your business goals and strategic planning, organize and manage project execution, track progress towards KPIs, results and achievements. All within one',
  },
  {
    key: '3',
    title: 'Visualize Your Work',
    content: 'INSIGHTLY gives managers and team members a quick, at-a-glance view into whats going on. At any time, see your overall workload, know what to work on next, understand current priorities, and be able to easily reorganize work when the business goals change.',
  },
]

function AppHero() {
  return (
   
    <div id="hero" className="heroBlock">

      <Carousel>
        {items.map(item => {
          return (
            <div key={item.key} className="container-fluid">
              <div className="content">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <div className="btnHolder">
                  <Button type="primary" size="large">Know More</Button>
                  <Button size="large"><a href="../signUp">Sign up</a></Button>
                </div>
              </div>
            </div>  
          );
        })}
      </Carousel>
    </div>
  );
}

export default AppHero;