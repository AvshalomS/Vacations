import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Col, Button, Container } from 'react-bootstrap';

// redux and axios imports
import { connect } from 'react-redux';
import { editVacationService } from '../../services/axiosService';
import { updateVacationAction } from '../../redux/actions';

// socket.io import
import { socket } from '../../services/socketService';

class EditVacation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
        }
        this.handleInputs = this.handleInputs.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.editVacation = this.editVacation.bind(this);
    }
    componentDidMount() {

        const id = this.props.match.params.id;
        const { vacations } = this.props

        // Location of vacation in array
        const vcationPalce = vacations.findIndex(vacation => vacation.id === parseInt(id));
        // console.log('vacation place: ' + vcationPalce);

        const vacation = vacations[vcationPalce]
        const { place, description, dateFrom, dateTo, price } = vacation

        this.setState({ id: id });
        this.setState({ oldImg: vacations[vcationPalce].img })

        document.getElementById('place').value = place;
        document.getElementById('description').value = description;
        document.getElementById('dateFrom').value = dateFrom.slice(0, 10);
        document.getElementById('dateTo').value = dateTo.slice(0, 10);
        document.getElementById('price').value = price;

        this.setState({
            place: vacations[vcationPalce].place,
            description: vacations[vcationPalce].description,
            dateFrom: vacations[vcationPalce].dateFrom,
            dateTo: vacations[vcationPalce].dateTo,
            price: vacations[vcationPalce].price,
        })

    }
    handleInputs(e) { this.setState({ [e.target.name]: e.target.value }) }
    handleFileInput(e) { this.setState({ selectedFile: e.target.files[0], loaded: 0, }) }

    async editVacation() {

        const { selectedFile, place, id, description, dateFrom, dateTo, price } = this.state

        const data = new FormData();
        data.append('file', selectedFile);
        data.set('place', place);
        data.set('id', id);
        data.set('description', description);
        data.set('dateFrom', dateFrom.slice(0, 10));
        data.set('dateTo', dateTo.slice(0, 10));
        data.set('price', price);

        try {

            // token for socket.io
            const token = sessionStorage.getItem("token")
            const { vacations, reduxUpdateVacation } = this.props
            const response = await editVacationService(data)
            const payload = { vac: vacations, res: response, token }
            await reduxUpdateVacation(payload)
            // socket.io
            if (response.status === 'ok') socket.emit('editVacationAction', payload)
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
                        <h1 className="text-center">Edit Vacation</h1>

                        <Form className="myCardCss" style={{ padding: "15px" }}>

                            <Form.Group>
                                <Form.Label>Place</Form.Label>
                                <Form.Control placeholder="" id="place" name="place" onChange={this.handleInputs} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="5" id="description" name="description" onChange={this.handleInputs} />
                            </Form.Group>

                            <Form.Row>

                                <Form.Group as={Col}>
                                    <Form.Label>From</Form.Label>
                                    <Form.Control type="date" placeholder="" id="dateFrom" name="dateFrom" onChange={this.handleInputs} />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>To</Form.Label>
                                    <Form.Control type="date" placeholder="" id="dateTo" name="dateTo" onChange={this.handleInputs} />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Price ($)</Form.Label>
                                    <Form.Control type="text" placeholder="$" id="price" name="price" onChange={this.handleInputs} />
                                </Form.Group>

                            </Form.Row>


                            <Form.Group>
                                <Form.Label>Image File (Blank Field - Delete Image)</Form.Label>
                                <Form.Control type="file" onChange={this.handleFileInput} />
                            </Form.Group>

                            <Button variant="outline-primary" size="sm" block onClick={this.editVacation}>Edit</Button>

                        </Form>

                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispachToProps = dispach => {
    return {
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

export default connect(mapStateToProps, mapDispachToProps)(EditVacation);
