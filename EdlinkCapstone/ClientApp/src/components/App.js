import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import { Home } from './Home';
import { Programs } from './Programs';
import { Schools } from './Schools';
import { Students } from './Students';
import '../custom.css'
import { CreateStudent } from './CreateStudent';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import Loginscreen from './Loginscreen';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPage: [],
            userIsLoggedIn: false,
        }
    }

    // change the user for logged in state
    toggleUserLoggedIn = () => {
        this.setState({
            userIsLoggedIn: !this.state.userIsLoggedIn
        });
    }
    //This method will let user to be in set state for login page
    componentWillMount() {
        var loginPage = [];
        loginPage.push(<Loginscreen parentContext={this} />);
        this.setState({
            loginPage: loginPage
        })
    }
    render() {
        return (
            //User will be in the state to login using their respective properties.
            <Layout toggleUserLoggedIn={this.toggleUserLoggedIn} userIsLoggedIn={this.state.userIsLoggedIn} >
                <div className="App">
                    <Route path='/loginPage'
                        render={props => (
                            <Loginscreen {...props} toggleUserLoggedIn={this.toggleUserLoggedIn} userIsLoggedIn={this.state.userIsLoggedIn} />
                            )} />
                    <Route exact
                        path='/'
                        render={props => (
                            <Home {...props} toggleUserLoggedIn={this.toggleUserLoggedIn} userIsLoggedIn={this.state.userIsLoggedIn} />)}
                    />
                    <Route exact
                        path='/programs'
                        render={props => (
                            <Programs {...props} toggleUserLoggedIn={this.toggleUserLoggedIn} userIsLoggedIn={this.state.userIsLoggedIn} />)}
                    />
                    <Route exact
                        path='/schools'
                        render={props => (
                            <Schools {...props} toggleUserLoggedIn={this.toggleUserLoggedIn} userIsLoggedIn={this.state.userIsLoggedIn} />                        )}
                    />
                    <Route exact
                        path='/students'
                        render={props => (
                            <Students {...props} toggleUserLoggedIn={this.toggleUserLoggedIn} userIsLoggedIn={this.state.userIsLoggedIn} />)}
                    />
                    <Route exact
                        path='/create-student'
                        render={props => (
                            <CreateStudent {...props} toggleUserLoggedIn={this.toggleUserLoggedIn} userIsLoggedIn={this.state.userIsLoggedIn} />)}
                    />
                </div>
            </Layout>
        );
    }
} const style = {
    margin: 15,
}; export default App;