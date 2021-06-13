import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { CardDeck, Card, Col, Button } from 'react-bootstrap';

// redux and path imports
import { path } from '../../services/pathService';
import { connect } from 'react-redux';
import {
    getAllVacationsAction,
    updateFollowAction,
    addVacationAction,
    deleteVacationAction,
    updateVacationAction
} from '../../redux/actions';

// socket.io import
import { socket } from '../../services/socketService';

class Vacations extends React.Component {

    constructor(props) {
        super(props);
        this.state = { title: 'Vacations' }
        this.followAction = this.followAction.bind(this);
    }


    componentDidMount() {

        const { userId } = this.props.userInfo
        const {
            getAllVacations,
            reduxAddVacation,
            reduxDeleteVacation,
            reduxUpdateVacation } = this.props

        getAllVacations(userId)
        // socket.io       
        socket.on('followAction', async (response) => {
            const { vacations, userInfo, followActionUpdateRedux } = this.props
            const payload = { vac: vacations, res: response, userInfo: userInfo }
            await followActionUpdateRedux(payload)
            this.setState({ title: 'Vacations' })
        })
        socket.on('addVacationAction', async (response) => {
            await reduxAddVacation(response)
        })
        socket.on('deleteVacationAction', async (response) => {
            await reduxDeleteVacation(response)
        })
        socket.on('editVacationAction', async (response) => {
            await reduxUpdateVacation(response)
        })
    }

    followAction(id) {

        const token = sessionStorage.getItem("token")
        const followAction = {
            vacationId: id,
            userId: this.props.userInfo.userId,
            token
        }
        // socket.io 
        socket.emit('followAction', followAction)
    }
    componentWillUnmount() {
        socket.off()
    }

    render() {

        const { isLogin, role } = this.props.userInfo
        const { vacations } = this.props
        const { title } = this.state
        let toView = ''
        !vacations ? toView = '' : toView = vacations.map(vacation => {
            return <Col md={4} key={vacation.id}>

                <Card className="myCardCss">
                    <Card.Header>
                        {role === "Admin" ?
                            <div>
                                <Link to={`/vacations/del/` + vacation.id} className="btn btn-outline-danger float-right far fa-trash-alt"> Delete</Link>
                                <Link to={`/vacations/` + vacation.id + `/edit`} className="btn btn-outline-info mb-2 mr-2 float-right fas fa-edit"> Edit</Link>
                            </div> :
                            <div>
                                <label className="float-left"> ({vacation.followed ? 'Followed' : 'UnFollowed'}) </label>
                                <Button variant="outline-primary" className={vacation.followed ? "float-right btn-circle active" : "float-right btn-circle"} onClick={this.followAction.bind(null, vacation.id)}>F</Button>
                            </div>}

                    </Card.Header>

                    <h4 className="text-center"> {vacation.place} - {vacation.price}$</h4>
                    <p className="text-center">
                        <small>From: {vacation.dateFrom.slice(0, 10)} <br />To: {vacation.dateTo.slice(0, 10)} </small>
                    </p>
                    <Card.Img variant="top" src={path + vacation.img} className="rounded-circle img-thumbnail card-img-top" />

                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text className="text-center">{vacation.description}</Card.Text>
                    </Card.Body>

                    <Card.Footer>
                        <small className="text-muted float-left">Total followers: </small>
                        <Button variant="outline-primary" className="float-right btn-circle btn-xl ">{vacation.followersCount}</Button>
                    </Card.Footer>
                </Card>
            </Col>
        })


        return (
            <React.Fragment>

                {!isLogin ? <Redirect to="/login" /> : null}

                <div className="customLoginCss">
                    <h1>{title}</h1>
                    <CardDeck>{toView}</CardDeck>
                </div>
            </React.Fragment>
        )
    }
}
const mapDispachToProps = dispach => {
    return {
        getAllVacations: userId => {
            dispach(getAllVacationsAction(userId))
        },
        followActionUpdateRedux: response => {
            dispach(updateFollowAction(response))
        },
        reduxAddVacation: response => {
            dispach(addVacationAction(response))
        },
        reduxDeleteVacation: response => {
            dispach(deleteVacationAction(response))
        },
        reduxUpdateVacation: response => {
            dispach(updateVacationAction(response))
        }
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
        vacations: state.vacations,
    }
};

export default connect(mapStateToProps, mapDispachToProps)(Vacations);