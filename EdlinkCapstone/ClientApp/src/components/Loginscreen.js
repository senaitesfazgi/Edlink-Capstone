import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';
import { Redirect } from "react-router-dom";
import './Loginscreen.css';

class Loginscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passWord: '',
            loginscreen: [],
            loginmessage: '',
            buttonLabel: 'Register',
            isLogin: true,
            userIsLoggedIn: false
        }
    }

    //handle event when user click on login button and display apppropriate message according to users input. 
    handleClick(event) {
        console.log("event", event);
        var loginmessage;
        if (this.state.isLogin) {
            var loginscreen = [];
            loginscreen.push(<Register parentContext={this} />);
            loginmessage = "Already registered? Go to Login!";
            this.setState({
                loginscreen: loginscreen,
                loginmessage: loginmessage,
                buttonLabel: "Login",
                isLogin: false
            })
        }
        else {
            var loginscreen = [];
            loginscreen.push(<Login parentContext={this} toggleUserLoggedIn={this.props.toggleUserLoggedIn} />);
            loginmessage = "Not Registered yet? Go to register!";
            this.setState({
                loginscreen: loginscreen,
                loginmessage: loginmessage,
                buttonLabel: "Register",
                isLogin: true
            })
        }
    }
    //Allow user to push to login using related properties.
    componentWillMount() {
        var loginscreen = [];
        loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext} toggleUserLoggedIn={this.props.toggleUserLoggedIn} />);
        var loginmessage = "Not registered yet? Register Now!";
        this.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage
        })
    }

    //Return the state of user when logged in.
    render() {
        if (this.state.userIsLoggedIn) {
            return <Redirect to={{
                pathname: "/",
                state: { userIsLoggedIn: true }
            }}
            />
        } else {
            return (
                <div>
                    {this.state.loginscreen}
                    <div className="loginbackground">
                        <div className="loginmessage">
                            {this.state.loginmessage}
                        </div>
                        <MuiThemeProvider>
                            <div className="loginRegisterButton">
                                <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                            </div>
                        </MuiThemeProvider>
                    </div>
                </div>
            );
        }
    }
} const style = {
    margin: 15,
}; export default Loginscreen;