﻿import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Uploadscreen from './Uploadscreen';
import axios from 'axios';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passWord: ''
        }
    }

    handleClick(event) {
        var apiBaseUrl = "https://localhost:44380/API/UserAPI/authUser";
        var self = this;
        var payload = JSON.stringify({
            "email": this.state.email,
            "passWord": this.state.passWord
        });
        axios.post("https://localhost:44380/API/UserAPI/authUser", payload, { headers: { "Content-Type": "application/json" } })
            .then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    console.log("Login successfull");
                    var uploadscreen = [];
                    uploadscreen.push(<Uploadscreen appContext={self.props.appContext} />)
                    self.props.appContext.setState({ loginPage: [], uploadscreen: uploadscreen })
                }
                else if (response.data.code == 204) {
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
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