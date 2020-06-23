import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Form, Row, Select, Space, Statistic, Tooltip, Typography,} from "antd";
import {Axis, Chart, Geom} from "bizcharts";
import {getOverall} from "./analytics.service";
import RankList from "./Amin/RankList";

const data = [
    {genre: "Sports", sold: 275, income: 2300},
    {genre: "Strategy", sold: 115, income: 667},
    {genre: "Action", sold: 120, income: 982},
    {genre: "Shooter", sold: 350, income: 5271},
    {genre: "Other", sold: 150, income: 3710},
];

const fakeData = [
    {month: 1, revenue: 100000000},
    {month: 2, revenue: 160000000},
    {month: 3, revenue: 140000000},
    {month: 4, revenue: 170000000},
    {month: 5, revenue: 120000000},
    {month: 6, revenue: 150000000},
    {month: 7, revenue: 180000000},
    {month: 8, revenue: 260000000},
    {month: 9, revenue: 180000000},
    {month: 10, revenue: 179000000},
    {month: 11, revenue: 250000000},
    {month: 12, revenue: 300000000},
];

const scale = {
    month: {
        alias: "Thời gian",
    },
    revenue: {
        alias: "Doanh thu",
    },
    year: {
        alias: 'năm'
    }
};

const DashBoard = () => {
    const [_by, set_By] = useState("MONTH");
    const [data, setData] = useState(null);
    useEffect(() => {
        if (!data)
            fetchData();
    });

    let revenues = data ? data.revenues : [];
    let topProducts = data ? data.topProducts : [];
    if (revenues.length > 0) {
        revenues = revenues.map(item => ({
            month: item.MONTH,
            revenue: parseInt(item.revenue),
            year: item.YEAR
        }));
    }
    if (topProducts.length > 0) {
        topProducts = topProducts.map(item => {
            return {title: item.name};
        })
    }

    const handleChangeInterval = (values) => {
        // console.log(values);

        const {range, by} = values;
        const [_begin, _end] = range;
        let begin = _begin.startOf(_by.toLowerCase());
        let end = _end.endOf(_by.toLowerCase());
        console.log(begin, end);
        // console.log("res", begin._d, end._d, by);
        fetchData(begin._d, end._d, by);
    }

    const fetchData = (begin, end, by) => {
        // console.log(params);
        getOverall(begin, end, by).then(res => {
            const [curMonthRevenue] = res.curMonthRevenue;
            setData({...res, curMonthRevenue: curMonthRevenue.revenue});
        });
    }

    const intervalOptions = [
        {label: "Tháng", value: "MONTH"},
        {label: "Năm", value: "YEAR"},
    ];

    return (
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <Card>
                    <Statistic value={data ? data.numberOfCustomer : ''} title="Số khách hàng"/>
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic value={data ? data.numberOfUser : ''} title="Số nhân viên"/>
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic
                        value={data ? data.curMonthRevenue : ''}
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
                                <Typography.Title level={4}>
                                    Tình hình doanh thu
                                </Typography.Title>
                                <Form
                                    onFinish={handleChangeInterval}
                                    initialValues={{
                                        by: "MONTH"
                                    }}
                                >
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
                                            <Button type="primary" htmlType="submit">
                                                Xem
                                            </Button>
                                        </Form.Item>
                                    </Space>
                                </Form>
                            </Row>
                        </Col>
                        <Col xs={24} md={16}>
                            <Chart
                                style={{color: "#1890ff"}}
                                autoFit={true}
                                scale={scale}
                                // width={1000}
                                forceFit={true}
                                height={320}
                                data={revenues.map((e) => {
                                    const res = e;
                                    e.month = `${e.month ? e.month + '/' : ''}${e.year}`;
                                    // const value = e.revenue;
                                    // e.revenue = formatToCurrency(value)
                                    // console.log(formatToCurrency())
                                    return res;
                                })}
                            >
                                <Axis name={_by.toLowerCase()} position="bottom" title/>
                                <Axis name="revenue" position="left" title/>
                                <Tooltip/>
                                <Geom type="interval" position="month*revenue"/>
                            </Chart>
                        </Col>
                        <Col xs={24} md={8}>
                            <RankList data={topProducts}/>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default DashBoard;
