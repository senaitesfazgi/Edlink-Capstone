import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login'
import axios from 'axios';
import Uploadscreen from './Uploadscreen';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusCode: 0,
            response:[],
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
                    Register.push(<Login />);
                   /* this.props.parentContext.setState({
                       //loginscreen: loginscreen,
                        //loginmessage: loginmessage,
                        //buttonLabel: "Register",
                        //isLogin: true
                    });*/
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
                    <div>fa
                        <AppBar
                            title="Register"
                        />
                        <p>{this.state.waiting ? "Request sent, awaiting response." : "Response received, status: " + this.state.statusCode}</p>
                        <p>Response Data: {JSON.stringify(this.state.response)}</p>
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
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
} const style = {
    margin: 15,
}; export default Register;