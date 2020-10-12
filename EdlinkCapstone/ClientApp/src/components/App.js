import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import { Home } from './Home';
import { Programs } from './Programs';
import { Schools } from './Schools';
import '../custom.css'
import { CreateStudent } from './CreateStudent';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import Loginscreen from './Loginscreen';
import Uploadscreen from './Uploadscreen';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPage: [],
            uploadscreen: [],
            loggedInStatus: "LogIn/Register",
            user: {}
        }
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin() {
        this.setState({
            loggedInStatus:"LOGGED_In"
        })
    }
    componentWillMount() {
        var loginPage = [];
        loginPage.push(<Loginscreen parentContext={this} />);
        this.setState({
            loginPage: loginPage
        })
    }
    render() {
        return ( 
            <Layout>
                <div className="App">
                    <Route path='/loginPage' component={Loginscreen} />
                    <Route exact
                        path='/'
                        render={props => (
                            <Home {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
                        )}
                    />
                    <Route path='/programs' component={Programs} />
                    <Route path='/schools' component={Schools} />
                    <Route path='/create-student' component={CreateStudent} />
                </div>
            </Layout>
        );
    }
} const style = {
    margin: 15,
}; export default App;