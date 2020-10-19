import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { Home } from './Home';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusCode: 0,
            response: [],
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
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <p>{this.state.waiting ? "Request sent, awaiting response." : "Response received, status: " + this.state.statusCode}</p>
                        <p>Response Data: {JSON.stringify(this.state.response)}</p>
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
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
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