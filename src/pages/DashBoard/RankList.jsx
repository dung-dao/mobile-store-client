import React from 'react';
import {Avatar, Card, Col, Divider, List, Row} from "antd";

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

const RankList = () => {
    return (
        <React.Fragment>
            <Row>
                <Col span={24}>
                    Sản phẩm doanh thu cao nhất
                    <Divider/>
                </Col>
                <Col span={24}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default RankList;