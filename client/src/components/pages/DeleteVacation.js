import React from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

// redux and axios imports
import { connect } from 'react-redux';
import { deleteVacationService } from '../../services/axiosService';
import { deleteVacationAction } from '../../redux/actions';
import { path } from '../../services/pathService';

// socket.io import
import { socket } from '../../services/socketService';

class DeleteVacation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.deleteVacation = this.deleteVacation.bind(this);
        this.unDeleteVacation = this.unDeleteVacation.bind(this);
    }
    componentDidMount() {

        const { id } = this.props.match.params
        const { vacations } = this.props

        // Location of vacation in array
        const vcationPalce = vacations.findIndex(vacation => vacation.id === parseInt(id));
        // console.log('vacation place: ' + vcationPalce);

        this.setState({
            id: id,
            place: vacations[vcationPalce].place,
            description: vacations[vcationPalce].description,
            dateFrom: vacations[vcationPalce].dateFrom.slice(0, 10),
            dateTo: vacations[vcationPalce].dateTo.slice(0, 10),
            price: vacations[vcationPalce].price,
            img: vacations[vcationPalce].img,
            followersCount: vacations[vcationPalce].followersCount
        })

    }
    unDeleteVacation() {
        this.props.history.push("/vacations");
    }
    async deleteVacation() {
        try {

            // token for socket.io
            const token = sessionStorage.getItem("token")
            const { id } = this.state
            const { vacations, reduxDeleteVacation } = this.props
            const payload = { vac: vacations, id: id, token }
            const response = await deleteVacationService(id)
            await reduxDeleteVacation(payload)
            // socket.io
            if (response.status === 'ok') socket.emit('deleteVacationAction', payload)
            this.props.history.push("/vacations")

        } catch (error) {
            console.log(error);
            alert('Delete vacation error !')
        }
    }
    componentWillUnmount() {
        socket.off()
    }


    render() {

        const { role } = this.props.userInfo
        const { place, description, dateFrom, dateTo, price, img, followersCount } = this.state

        return (
            <React.Fragment>

                {role !== 'Admin' ? <Redirect to="/login" /> : null}

                <div className="customLoginCss">
                    <div className="container">
                        <h2 className="text-center">Are you sure you want to delete vacation ?</h2>
                        <Card className="myCardCss">
                            <Card.Header>
                                <div>
                                    <button className="btn btn-outline-danger float-left" onClick={this.deleteVacation}>Delete</button>
                                    <button className="btn btn-outline-success float-right" onClick={this.unDeleteVacation}>UnDelete</button>
                                </div>
                            </Card.Header>

                            <h4 className="text-center"> {place} - {price}$</h4>
                            <p className="text-center">
                                <small>From: {dateFrom} <br />To: {dateTo} </small>
                            </p>
                            <Card.Img variant="top" src={path + img} className="img-thumbnail card-img-top" />

                            <Card.Body>
                                <Card.Title></Card.Title>
                                <Card.Text className="text-center">{description}</Card.Text>
                            </Card.Body>

                            <Card.Footer>
                                <small className="text-muted float-left">Total followers: </small>
                                <Button variant="outline-primary" className="float-right btn-circle btn-xl ">{followersCount}</Button>
                            </Card.Footer>
                        </Card>
                        <h2 className="text-center">Are you sure you want to delete vacation ?</h2>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

const mapDispachToProps = dispach => {
    return {
        reduxDeleteVacation: response => {
            dispach(deleteVacationAction(response))
        }
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
        vacations: state.vacations,
    }
};

export default connect(mapStateToProps, mapDispachToProps)(DeleteVacation);