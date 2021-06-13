import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Col, Button, Container } from 'react-bootstrap';

// redux and axios imports
import { connect } from 'react-redux';
import { addVacationService } from '../../services/axiosService';
import { addVacationAction } from '../../redux/actions';

// socket.io import
import { socket } from '../../services/socketService';

class AddVacation extends Component {
    constructor() {
        super();
        this.state = {
            place: "",
            description: "",
            dateFrom: "",
            dateTo: "",
            price: "",
            selectedFile: null,
        }
        this.handleInputs = this.handleInputs.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.addVacation = this.addVacation.bind(this);
    }

    componentDidMount() {
        this.setState({ dateFrom: new Date().toISOString().slice(0, 10) });
        this.setState({ dateTo: new Date().toISOString().slice(0, 10) });
    }
    handleInputs(e) { this.setState({ [e.target.name]: e.target.value }) }
    handleFileInput(e) { this.setState({ selectedFile: e.target.files[0], loaded: 0, }) }

    async addVacation() {

        const { selectedFile, place, description, dateFrom, dateTo, price } = this.state

        const data = new FormData();
        data.append('file', selectedFile);
        data.set('place', place);
        data.set('description', description);
        data.set('dateFrom', dateFrom);
        data.set('dateTo', dateTo);
        data.set('price', price);

        try {
            // token for socket.io
            const token = sessionStorage.getItem("token")
            const { vacations, reduxAddVacation } = this.props
            const response = await addVacationService(data)
            const payload = { vac: vacations, res: response, token }
            await reduxAddVacation(payload)
            // socket.io
            if (response.status === 'ok') socket.emit('addVacationAction', payload)
            this.props.history.push("/vacations")
        } catch (error) {
            console.log(error);
            alert('Add new vacation error !')
        }
    }
    componentWillUnmount() {
        socket.off()
    }


    render() {

        const { role } = this.props.userInfo

        return (
            <React.Fragment>

                {role !== 'Admin' ? <Redirect to="/login" /> : null}

                <div className="customLoginCss">

                    <Container>
                        <h1 className="text-center">Add Vacation</h1>

                        <Form className="myCardCss" style={{ padding: "15px" }}>

                            <Form.Group controlId="formPlace">
                                <Form.Label>Place</Form.Label>
                                <Form.Control placeholder="" name="place" onChange={this.handleInputs} />
                            </Form.Group>

                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="5" name="description" onChange={this.handleInputs} />
                            </Form.Group>

                            <Form.Row>

                                <Form.Group as={Col} controlId="formStartDate">
                                    <Form.Label>From</Form.Label>
                                    <Form.Control type="date" value={new Date().toISOString().slice(0, 10)} name="dateFrom" onChange={this.handleInputs} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formEndDate">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control type="date" value={new Date().toISOString().slice(0, 10)} name="dateTo" onChange={this.handleInputs} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" placeholder="$" name="price" onChange={this.handleInputs} />
                                </Form.Group>

                            </Form.Row>


                            <Form.Group controlId="formImg">
                                <Form.Label>Image File</Form.Label>
                                <Form.Control type="file" onChange={this.handleFileInput} />
                            </Form.Group>

                            <Button variant="outline-primary" size="sm" block onClick={this.addVacation}>Add Vacation</Button>

                        </Form>

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}
const mapDispachToProps = dispach => {
    return {
        reduxAddVacation: response => {
            dispach(addVacationAction(response))
        }
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
        vacations: state.vacations,
    }
};

export default connect(mapStateToProps, mapDispachToProps)(AddVacation);