import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { Home } from './Home';
import './Login.css';
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
                    loginscreen.push(<Home parentContext={this} />)
                    this.props.parentContext.setState(
                        {
                            loginscreen: loginscreen,
                            loginmessage: loginmessage,
                            buttonLabel: "Register",
                            isLogin: true
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
                        <div className="title-background">
                            <h2 className="title">LOGIN</h2>
                        </div>
                        <div className="backGroundLogin">
                            <div className="responseData">
                                <p>{this.state.waiting ? "Request sent, awaiting response." : "Response received, status: " + this.state.statusCode}</p>
                                <p>Response Data: {JSON.stringify(this.state.response)}</p>
                            </div>
                            <input className="username"
                                placeholder="Enter your Username or Email:"
                                onChange={(event, newValue) => this.setState({ email: newValue })}
                            />
                            <input className="password"
                                type="password"
                                placeholder="Enter your Password:"
                                onChange={(event, newValue) => this.setState({ passWord: newValue })}
                            />
                            <br />
                            <RaisedButton className="buttonLogin" label="Login" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
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