

import { Card, Menu } from 'antd';
import React from 'react';

function LinkViewCard() {
    const onClick = (e) => {
        console.log('click ', e);
      };

    return (
        <>
            <Card style={{ marginBottom: "24px" }} >
                <Menu mode="vertical">
                    <Menu.Item key="one" >
                        Learning
                    </Menu.Item>
                    <Menu.Item key="two" >
                        Groups
                    </Menu.Item>
                    <Menu.Item key="three" >
                        Events
                    </Menu.Item>
                    <Menu.Item key="four" >
                        Placements
                    </Menu.Item>
                </Menu>
               
  
            </Card>
        </>
    );
};

export default LinkViewCard;