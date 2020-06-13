import React from 'react';
import {Card, Col, Row, Statistic, Tooltip, DatePicker, Typography, Tabs, Divider} from "antd";
import {Axis, Chart, Geom, Legend} from "bizcharts";
import RankList from "./RankList";
import PieChart from "./PieChart";

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

const Dashboard = () => {
    function callback(key) {
        console.log(key);
    }

    return (
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <Card>
                    <Statistic
                        value={40000000}
                        title="Doanh thu hôm nay"
                        suffix="VNĐ"
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic
                        value={4300000000}
                        title="Doanh thu tháng này"
                        suffix="VNĐ"
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic
                        value={4000000000}
                        title="Doanh thu tháng trước"
                        suffix="VNĐ"
                    />
                </Card>
            </Col>
            <Col span={24}>
                <Card style={{width: "100%", height: "100%"}}>
                    <Row gutter={32}>
                        <Col span={24}>
                            <Row justify="space-between">
                                <Typography.Title level={4}>Tình hình doanh thu</Typography.Title>
                                <DatePicker.RangePicker/>
                            </Row>
                            <Divider/>
                        </Col>
                        <Col span={16}>
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <Tabs.TabPane tab="Thống kê doanh thu" key="chart">
                                    <Chart scale={scale} width={600} height={400} data={fakeData.map(e => {
                                        const res = e;
                                        e.month = `${e.month}`;
                                        return res;
                                    })}>
                                        <Axis name="month" position="bottom" title/>
                                        <Axis name="revenue" position="left" title/>
                                        {/*<Legend position="top" dy={-20}/>*/}
                                        <Tooltip/>
                                        <Geom type="interval" position="month*revenue"/>
                                    </Chart>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Cơ cấu doanh thu" key="3">
                                    <PieChart/>
                                </Tabs.TabPane>
                            </Tabs>
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

export default Dashboard;