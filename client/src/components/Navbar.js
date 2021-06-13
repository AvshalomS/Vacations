import React from 'react';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';

// redux import
import { connect } from 'react-redux';

// Components imports
import Wellcome from './pages/Wellcome';
import Login from './user/Login';
import Logout from './user/Logout';
import Register from './user/Register';
import Vacations from './pages/Vacations';
import AddVavation from './pages/AddVavation';
import EditVacation from './pages/EditVacation';
import DeleteVacation from './pages/DeleteVacation';
import Reports from './pages/Reports';
import NotFound404 from './pages/NotFound404';


class Navbar extends React.Component {
  state = {}
  render() {

    const { isLogin, role, firstName, lastName } = this.props.userInfo

    return (
      <React.Fragment>
        <Router>

          <nav className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top">
            {/* <!-- Brand/logo --> */}
            <Link to={isLogin ? "/vacations" : "/"} className="navbar-brand">Vacations</Link>

            <form className="ml-auto">
              <span className="navbar-brand" id="helloUser">{`Hello ${firstName} ${lastName} - ${role}`}</span>
              {role === 'Admin' ? (<Link to="/reports" className="btn btn-outline-light my-2 my-sm-0 mb-2 mr-2">Reports</Link>) : null}
              {role === 'Admin' ? (<Link to="/vacations/add" className="btn btn-outline-light my-2 my-sm-0 mb-2 mr-2">Add vacation</Link>) : null}

              {isLogin ? (<Link to="/logout" className="btn btn-outline-light my-2 my-sm-0 mb-2 mr-2">Logout</Link>) : (<Link to="/login" className="btn btn-outline-light my-2 my-sm-0 mb-2 mr-2">Login</Link>)}
              {!isLogin ? (<Link to="/register" className="btn btn-outline-light my-2 my-sm-0 mb-2 mr-2">Register</Link>) : null}

            </form>
          </nav>

          <Switch>
            <Route exact path="/" component={Wellcome} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/vacations/add" component={AddVavation} />
            <Route path="/vacations/del/:id" component={DeleteVacation} />
            <Route path="/vacations/:id/edit" component={EditVacation} />
            <Route path="/vacations" component={Vacations} />
            <Route path="/reports" component={Reports} />
            <Route path="*" component={NotFound404} />
          </Switch>

        </Router>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  }
};

export default connect(mapStateToProps)(Navbar);
