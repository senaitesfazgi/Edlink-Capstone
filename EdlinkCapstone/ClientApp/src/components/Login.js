import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passWord: ''
        }
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({ waiting: true })

        axios({
            method: 'post',
            url: 'https://localhost:44380/API/UserAPI/authUser',
            params: {
                email: this.state.email,
                passWord: this.state.passWord
            }
        })
            //Return the response status to users
            .then((response) => {
                this.setState({ statusCode: response.status, response: response.data, waiting: false });
                console.log(response);
                if (response.status == 200) {
                    console.log("Login successfull");
                    var loginscreen = [];
                    var loginmessage = [];
                    loginscreen.push(<Login parentContext={this} />)
                    this.props.toggleUserLoggedIn();
                    this.props.parentContext.setState(
                        {
                            loginscreen: loginscreen,
                            loginmessage: loginmessage,
                            buttonLabel: "Register",
                            isLogin: true,
                            userIsLoggedIn: true
                        })

                }
                else if (response.status == 204) {
                    console.log("Email password do not match");
                    alert("Email password do not match")
                }
                else {
                    console.log("Email does not exists");
                    alert("Email does not exist");
                }
            })
            .catch((error) => {
                this.setState({ statusCode: error.status, response: error.data, waiting: false });
                console.log(error);
            });
    }
    //set up lay out for users to login and handle the event when user send data for login
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <div className="title-background">
                            <h2 className="title">LOGIN / REGISTER</h2>
                        </div>
                        <div className="backGroundLogin">
                            <p className="loginRegisterAccessPar">Login/Register to gain access to Registration Page.</p>
                            <div className="loginIndent">
                                <TextField
                                    hintText="Enter your Username"
                                    floatingLabelText="Email"
                                    onChange={(event, newValue) => this.setState({ email: newValue })}
                                />
                                <br />
                                <TextField
                                    type="password"
                                    hintText="Enter your Password"
                                    floatingLabelText="Password"
                                    onChange={(event, newValue) => this.setState({ passWord: newValue })}
                                />
                                <div className="loginButton">
                                    <RaisedButton label="Login" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Login;