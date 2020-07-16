import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Form, Row, Select, Space, Statistic, Tooltip, Typography,} from "antd";
import {Axis, Chart, Geom} from "bizcharts";
import {getOverall} from "./analytics.service";
import RankList from "./Amin/RankList";
import LoadingPage from "../../components/common/LoadingPage";

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
    let topProducts = data?.topProducts;
    if (revenues?.length > 0) {
        revenues = revenues.map(item => ({
            month: item.MONTH,
            revenue: parseInt(item.revenue),
            year: item.YEAR
        }));
    }
    if (topProducts?.length > 0) {
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
            const [curMonthRevenue = 0] = res?.curMonthRevenue ? res?.curMonthRevenue : [0];
            setData({...res, curMonthRevenue: curMonthRevenue?.revenue});
        });
    }

    const intervalOptions = [
        {label: "Tháng", value: "MONTH"},
        {label: "Năm", value: "YEAR"},
    ];

    if (!data)
        return <LoadingPage/>;

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
                                data={revenues ? revenues.map((e) => {
                                    const res = e;
                                    e.month = `${e.month ? e.month + '/' : ''}${e.year}`;
                                    // const value = e.revenue;
                                    // e.revenue = formatToCurrency(value)
                                    // console.log(formatToCurrency())
                                    return res;
                                }) : []}
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
