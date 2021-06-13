import React from 'react'
import { Redirect } from 'react-router-dom'

// redux imports
import { connect } from 'react-redux';
import { userLoginAction } from '../../redux/actions';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
        }
        this.userLogin = this.userLogin.bind(this);
        this.handleInputs = this.handleInputs.bind(this);
    }

    handleInputs(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    userLogin = () => {
        const { userName, password } = this.state
        const user = { userName, password }
        const { userLoginUpdateReduxAndSaveToken } = this.props
        userLoginUpdateReduxAndSaveToken(user)
    }

    render() {

        const { isLogin } = this.props.userInfo
        if (!isLogin) { sessionStorage.removeItem("token") }

        return (
            <React.Fragment>

                {isLogin ? <Redirect to="/vacations" /> : null}

                <div className="wellcomeBackGround text-white">

                    <div className="container">

                        <div className="row">
                            <div className="col-sm-4" ></div>
                            <div className="col-sm-4" >
                                <form>
                                    <br />
                                    <h1 id="loginTitle">Login</h1><br />

                                    <div className="form-group">
                                        <input type="text" className="form-control" id="userName" placeholder="User name" name="userName" onChange={this.handleInputs} />
                                        <label htmlFor="userName"><small id="userNameLabel" className="requerd"></small></label>
                                    </div>

                                    <div className="form-group">
                                        <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={this.handleInputs} />
                                        <label htmlFor="password"><small id="passwordLabel" className="requerd"></small>
                                            <small id="passwordMessage" className="form-text requerd"> <span id="passwordMsg"></span></small></label>
                                    </div>

                                    {/* User Login button */}
                                    <div className="form-row" >
                                        <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.userLogin} id="loginButtonAction">Login</button>
                                    </div>

                                </form>
                            </div>
                            <div className="col-sm-4" ></div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapDispachToProps = dispach => {
    return {
        userLoginUpdateReduxAndSaveToken: user => {
            dispach(userLoginAction(user))
        }
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    }
};
export default connect(mapStateToProps, mapDispachToProps)(Login);
