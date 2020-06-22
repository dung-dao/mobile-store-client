import React, {useState} from 'react';
import {Button, Card, Col, DatePicker, Form, Row, Select, Space, Statistic, Tooltip, Typography} from "antd";
import {Axis, Chart, Geom} from "bizcharts";
import RankList from "./Amin/RankList";

const data = [
    {genre: 'Sports', sold: 275, income: 2300},
    {genre: 'Strategy', sold: 115, income: 667},
    {genre: 'Action', sold: 120, income: 982},
    {genre: 'Shooter', sold: 350, income: 5271},
    {genre: 'Other', sold: 150, income: 3710}
];

const fakeData = [
    {month: 1, revenue: 100000000},
    {month: 2, revenue: 140000000},
    {month: 3, revenue: 180000000},
    {month: 4, revenue: 250000000},
    {month: 5, revenue: 200000000},
    {month: 6, revenue: 170000000},
    {month: 7, revenue: 180000000},
    {month: 8, revenue: 190000000},
    {month: 9, revenue: 185000000},
    {month: 10, revenue: 179000000},
    {month: 11, revenue: 250000000},
    {month: 12, revenue: 300000000},

];

const scale = {
    month: {
        alias: 'Tháng'
    },
    revenue: {
        alias: 'Doanh thu'
    }
};

const DashBoard = () => {
    const [_by, set_By] = useState('MONTH');

    function callback(key) {
        console.log(key);
    }

    const intervalOptions = [
        {label: 'Tháng', value: 'MONTH'},
        {label: 'Năm', value: 'YEAR'}
    ];

    return (
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <Card>
                    <Statistic
                        value={4027}
                        title="Số khách hàng"
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic
                        value={4300000000}
                        title="Doanh thu tuần này"
                        suffix="đ"
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic
                        value={4000000000}
                        title="Doanh thu tháng này"
                        suffix="đ"
                    />
                </Card>
            </Col>
            <Col span={24}>
                <Card style={{width: "100%", height: "100%"}}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Row justify="space-between">
                                <Typography.Title level={4}>Tình hình doanh thu</Typography.Title>
                                <Form onFinish={
                                    (values) => console.log(values)
                                }>
                                    <Space>
                                        <Form.Item name="by" label="Thống kê theo">
                                            <Select
                                                defaultValue="MONTH"
                                                options={intervalOptions}
                                                onChange={(value) => {
                                                    set_By(value);
                                                }}
                                            />
                                        </Form.Item>
                                        <Form.Item name="range" label="Thời gian">
                                            <DatePicker.RangePicker picker={_by.toLowerCase()}/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">Xem</Button>
                                        </Form.Item>
                                    </Space>
                                </Form>
                            </Row>
                        </Col>
                        <Col span={16}>
                            <Chart
                                style={{color: '#faad14'}}
                                autoFit={true}
                                scale={scale}
                                width={600}
                                height={400}
                                data={fakeData.map(e => {
                                    const res = e;
                                    e.month = `${e.month}`;
                                    return res;
                                })}>
                                <Axis name="month" position="bottom" title/>
                                <Axis name="revenue" position="left" title/>
                                <Tooltip/>
                                <Geom type="interval" position="month*revenue"/>
                            </Chart>
                        </Col>
                        <Col span={8}>
                            <RankList/>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default DashBoard;
