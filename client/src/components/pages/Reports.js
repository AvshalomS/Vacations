import React from 'react';
import { Redirect } from 'react-router-dom'

// redux imports
import { connect } from 'react-redux';

// axios and chartjs imports
import { getChartDataService } from '../../services/axiosService';
import { Bar } from 'react-chartjs-2';

// socket.io import
import { socket } from '../../services/socketService';

class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [],
            }
        }
    }


    componentDidMount() {

        this.getChartData()

        // socket.io
        socket.on('followAction', (response) => {
            // console.log(response);
            const { role } = this.props.userInfo
            if (role === 'Admin') this.getChartData()
        })
    }
    async getChartData() {

        try {
            const data = await getChartDataService()
            const { followedVavations } = data

            if (followedVavations) {

                const xAxes = followedVavations.map(vacation => { return vacation.ID });
                const yAxes = followedVavations.map(vacation => { return vacation.followersCount });
                const chartData = {
                    // labels: X axis labels
                    labels: xAxes,
                    datasets: [
                        {
                            label: "Number of followers",
                            backgroundColor: "rgba(0,255,0,0.75)",
                            // data: Y axis values
                            data: yAxes,
                        }
                    ],
                }
                this.setState({ chartData: chartData });
            }
        } catch (error) {
            console.log(error);
        }
    }
    componentWillUnmount() {
        socket.off()
    }


    render() {

        const { isLogin } = this.props.userInfo

        return (

            <React.Fragment>

                {!isLogin ? <Redirect to="/login" /> : null}

                <div className="customLoginCss">
                    <div className="container" style={{ position: "relative", width: 800, height: 500, backgroundColor: "rgb(255, 255, 255)" }}>
                        <br />
                        <h2>Followd vacations Reports</h2>
                        <Bar
                            options={{
                                responsive: true,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            min: 0,
                                            stepSize: 1
                                        }
                                    }]
                                },
                            }}
                            data={this.state.chartData}
                        />
                    </div>
                </div>
            </React.Fragment >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    }
};
export default connect(mapStateToProps, null)(Reports)