import React from 'react';
import {Badge, Col, Divider, List, Row} from "antd";
import './RankList.css';

const data = [
    {
        title: 'Iphone X1',
    },
    {
        title: 'Google Quantum A',
    },
    {
        title: 'IBM L1 Mark II',
    },
    {
        title: 'Tesla Phantom X',
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
                                    avatar={(data.indexOf(item) < 3 ?
                                        <Badge className="site-badge-count-4" count={data.indexOf(item) + 1}/>
                                        :
                                        null)}
                                    title={<a href="https://ant.design">{item.title}</a>}
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
