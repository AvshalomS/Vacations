import React from 'react'

// redux and axios imports
import { connect } from 'react-redux'
import { registerService } from '../../services/axiosService';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            ConfirmPassword: '',
            passwordOK: false,
        }
        this.handleInputs = this.handleInputs.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    handleInputs(e) {
        this.setState({ [e.target.name]: e.target.value });
        // console.log(this.state);

        // Chack Requerd Filds
        if (e.target.value !== '') {
            document.getElementById(`${e.target.name + "Label"}`).innerText = "";
        } else {
            document.getElementById(`${e.target.name + "Label"}`).innerText = " (required)";
        }
        // Check that the password contains characters and numbers
        if (e.target.name === "password") {

            let isChar = false;
            let isNumber = false;
            let toChack = e.target.value;

            for (let i = 0; i < toChack.length; i++) {
                const element = toChack[i];
                if (!isNaN(element)) {
                    isNumber = true;
                } else if (element !== " ") {
                    isChar = true;
                }
            }
            // console.log("isNumber: " + isNumber);
            // console.log("isChar: " + isChar);

            if (isNumber && isChar) {
                document.getElementById(`passwordMsg`).innerText = " OK!";
                this.setState({ passwordOK: true });
            } else if (isNumber && !isChar) {
                document.getElementById(`passwordMsg`).innerText = "must contain characters!";
                this.setState({ passwordOK: false });
            } else if (!isNumber && isChar) {
                document.getElementById(`passwordMsg`).innerText = " must contain numbers!"
                this.setState({ passwordOK: false });
            } else {
                document.getElementById(`passwordMsg`).innerText = "must contain characters and numbers!";
                this.setState({ passwordOK: false });
            }
            document.getElementById(`ConfirmPasswordLabel`).innerText = ""
        }
    }

    async addUser() {
        let isPasswordOk;
        let isRequiredOk;
        const { firstName, lastName, userName, password, ConfirmPassword } = this.state

        // Chack Required Filds
        if (firstName !== '' && lastName !== '' && userName !== '' && password !== '' && ConfirmPassword !== '') {
            isRequiredOk = true;
        } else {
            isRequiredOk = false;
        }
        // Chack Password
        (password === ConfirmPassword && ConfirmPassword) ? isPasswordOk = true : isPasswordOk = false;
        // console.log("Password ok? " + isPasswordOk);
        // console.log("Required ok? " + isRequiredOk);
        if (!isPasswordOk) {
            if (password !== ConfirmPassword) {
                document.getElementById(`ConfirmPasswordLabel`).innerText = "Confirm password problem"
            }
            if (password === ConfirmPassword) {
                document.getElementById(`passwordMsg`).innerText = "problem"
            }
        }
        // Register
        if (isPasswordOk && isRequiredOk) {
            const user = { firstName, lastName, userName, password }
            try {
                const data = await registerService(user);
                const { message } = data
                switch (message) {
                    case 'user already exist':
                        alert('User name already exist!')
                        document.getElementById(`userNameLabel`).innerText = 'User name Exists'
                        break;
                    case 'user saved!':
                        alert('User saved successfully!!! please login.')
                        this.props.history.push("/login")
                        break;
                    case 'error!':
                        alert('Register error!')
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.log(error)
                alert('Register error!')
            }
        }
    }

    render() {

        const { isLogin } = this.props.userInfo
        if (!isLogin) { sessionStorage.removeItem("token") }

        return (
            <React.Fragment>

                <div className="wellcomeBackGround text-white">

                    <div className="container">

                        <form >

                            <h1 id="registerTitle">Register</h1><br />

                            <div className="form-group" id="firstNameInput">
                                <input type="text" className="form-control" id="firstName" placeholder="First name" name="firstName" onChange={this.handleInputs} required />
                                <label htmlFor="firstName"> <small id="firstNameLabel" className="bg-info text-white "> (Required)</small></label>
                            </div>
                            <div className="form-group" id="lastNameInput">
                                <input type="text" className="form-control" id="lastName" placeholder="Last name" name="lastName" onChange={this.handleInputs} required />
                                <label htmlFor="lastName"><small id="lastNameLabel" className="bg-info text-white "> (Required)</small></label>
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control" id="userName" placeholder="User name" name="userName" onChange={this.handleInputs} required />
                                <label htmlFor="userName"><small id="userNameLabel" className="bg-info text-white "> (Required)</small></label>
                            </div>

                            <div className="form-row">
                                <div className="col">
                                    <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={this.handleInputs} required />
                                    <label htmlFor="password"><small id="passwordLabel" className="bg-info text-white "> (Required)</small>
                                        <small id="passwordMessage" className="form-text bg-warning requerd "> Password <span id="passwordMsg">must contain characters and numbers! </span></small></label>
                                </div>

                                <div className="col" id="ConfirmPasswordInput">
                                    <input type="password" className="form-control" id="ConfirmPassword" placeholder="Confirm password" name="ConfirmPassword" onChange={this.handleInputs} required />
                                    <label htmlFor="ConfirmPassword"><small id="ConfirmPasswordLabel" className="bg-info text-white"> (Required)</small></label>
                                </div>
                            </div>

                            {/* User Register button */}
                            <div className="form-row" >
                                <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.addUser} id="RegisterButtonAction">Register</button>
                            </div>

                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    }
};
export default connect(mapStateToProps, null)(Register);