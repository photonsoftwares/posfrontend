import React from 'react'
import Chart from "react-apexcharts";
import { Card, CardBody, Col, Row } from 'reactstrap';

const DashChart = () => {

    // const options = {
    //     chart: {
    //         id: "basic-bar",
    //         toolbar: {
    //             show: false,
    //         }
    //     },
    //     colors: ['var(--primary1)'],

    //     xaxis: {
    //         categories: ["Jan-23", "Feb-23", "Mar-23", "Apr-23", "May-23", "Jun-23"]
    //     }
    // }

    // const series = [
    //     {
    //         name: "Trends",
    //         data: [30, 40, 45, 50, 49, 60]
    //     }
    // ]



    const series = [{
        name: 'Sales',
        type: 'column',
        data: [440, 505, 414, 671, 227, 413]
    }, {
        name: '% Total',
        type: 'line',
        data: [23, 28, 22, 37, 10, 20]
    }]

    const options = {
        chart: {
            background: '#fff',
            height: 350,
            type: 'line',
            toolbar: {
                show: false,
            }
        },
        stroke: {
            width: [0, 4]
        },
        colors: ['var(--primary1)', "var(--primary3)"],
        title: {
            text: 'Traffic Sources'
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
        },
        labels: ["Jan-23", "Feb-23", "Mar-23", "Apr-23", "May-23", "Jun-23"],
        xaxis: {
            type: 'datetime'
        },
        yaxis: [{
            title: {
                text: 'Sales',
            },

        }, {
            opposite: true,
            title: {
                text: '% Total'
            }
        }]
    }

    return (<>
        <Row>
            <Col md={12}>

                <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: "column" }}>
                    <div className='my-4' >
                        <div className='h5' style={{ fontWeight: "bold" }}>
                            Last 6 Month Trends
                        </div>
                    </div >


                    <Card style={{ border: "none", borderRadius: "12px", width: "100%", maxWidth: "540px" }}>
                        <CardBody style={{ width: "100%" }}>

                            <div style={{ overflowX: "auto", width: "100%", height: "340px" }}>
                                <Chart
                                    options={options}
                                    series={series}
                                    type="line"
                                    width="500"
                                />
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    </>)
}

export default DashChart