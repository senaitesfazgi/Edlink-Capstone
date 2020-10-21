import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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
            //Response status will take place when user register and send the data to database.
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

    //set up the layout/form and handle the event for user to access the properties for registration
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <div className="title-background">
                            <h2 className="title">REGISTER / LOGIN</h2>
                        </div>
                        <div className="backgroundRegister">
                            <p className="loginRegisterAccessPar">Login/Register to gain access to Registration Page.</p>
                            <div className="registerIndent">
                                <TextField
                                    hintText="Enter your First Name"
                                    floatingLabelText="First Name"
                                    onChange={(event, newValue) => this.setState({ firstName: newValue })}
                                />
                                <br />
                                <TextField
                                    hintText="Enter your Last Name"
                                    floatingLabelText="Last Name"
                                    onChange={(event, newValue) => this.setState({ lastName: newValue })}
                                />
                                <br />
                                <TextField
                                    hintText="Enter your Email"
                                    type="email"
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
                                <div className="registerButton">
                                    <RaisedButton className="buttonRegister" label="Register" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
} const style = {
    margin: 15,
}; export default Register;