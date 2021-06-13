import React from 'react';

// redux imports
import { connect } from 'react-redux';
import Actions from '../../redux/actions.config';

class Logout extends React.Component {

    state = {}

    componentDidMount() {
        sessionStorage.removeItem("token");
        const userInfo = {
            firstName: "",
            lastName: "",
            isLogin: false,
            role: 'Guest',
        }
        // Redux Update
        const { userLogoutAction } = this.props
        userLogoutAction(userInfo)
    }

    render() {
        return (
            <React.Fragment>
                <div className="wellcomeBackGround text-white">
                    <h1>See you later !!!</h1>
                    <h3>Don't forget us</h3>
                </div>
            </React.Fragment>
        )
    }
}
const mapDispachToProps = (dispach) => {
    return {
        userLogoutAction: (userInfo) => {
            dispach({ type: Actions.USER_LOGOUT, payload: userInfo })
        }
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    }
};
export default connect(mapStateToProps, mapDispachToProps)(Logout);
