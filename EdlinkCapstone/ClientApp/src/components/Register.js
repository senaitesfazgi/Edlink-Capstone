import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login'
import axios from 'axios';
import './Register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusCode: 0,
            response: [],
            firstName: '',
            lastName: '',
            email: '',
            passWord: ''
        }
    }
    handleClick(event) {
        this.setState({ waiting: true })

        axios({
            method: 'post',
            url: 'https://localhost:44380/API/UserAPI/registeruser',
            params: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                passWord: this.state.passWord
            }
        })
            .then((response) => {
                this.setState({ statusCode: response.status, response: response.data, waiting: false });
                console.log(response);
                if (response.status == 201) {
                    console.log("registration successfull");
                    var loginscreen = [];
                    var loginmessage = [];
                    loginscreen.push(<Login />);
                    this.props.parentContext.setState({
                        loginscreen: loginscreen,
                        loginmessage: loginmessage,
                        buttonLabel: "Register",
                        isLogin: true
                    });
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
                            <h2 className="title">REGISTER</h2>
                        </div>
                        <div className="backgroundRegister">
                            <div className="responseStatus">
                                <p>{this.state.waiting ? "Request sent, awaiting response." : "Response received, status: " + this.state.statusCode}</p>
                            </div>
                            <div className="responseData">
                                <p>{JSON.stringify(this.state.response)}</p>
                            </div>
                            <input className="firstName"
                                placeholder="Enter your First Name:"
                                onChange={(event, newValue) => this.setState({ firstName: newValue })}
                            />
                            <br />
                            <input className="lastName"
                                placeholder="Enter your Last Name:"
                                onChange={(event, newValue) => this.setState({ lastName: newValue })}
                            />
                            <br />
                            <input className="email"
                                placeholder="Enter your Email:"
                                type="email"
                                onChange={(event, newValue) => this.setState({ email: newValue })}
                            />
                            <br />
                            <input className="password"
                                type="password"
                                placeholder="Enter your Password:"floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({ passWord: newValue })}
                            />
                            <br />
                            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
} const style = {
    margin: 15,
}; export default Register;