//CreateStudent is Registration Page

import React, { Component } from 'react';
// Don't forget to "npm install axios" and import it on any pages from which you are making HTTP requests.
import axios from 'axios';
import { Redirect } from "react-router-dom";
import './CreateStudent.css';

// The name of the class is used in routing in App.js. The name of the file is not important in that sense.
export class CreateStudent extends Component {
    static displayName = CreateStudent.name;

    constructor(props) {
        // 1) When we build the component, we assign the state to be loading, and register an empty list in which to store our forecasts.
        super(props);
        this.state = {
            statusCode: 0, response: [], firstName: "", lastName: "", address: "", email: "", phoneNumber: "", dateOfBirth: "", schoolID: "", errors: {}, fields: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //first name 
        if (!this.state["firstName"]) {
            formIsValid = false;
            errors["firstName"] = "First Name Cannot be empty";
        }
        //last name
        if (!this.state["lastName"]) {
            formIsValid = false;
            errors["lastName"] = "Last name Cannot be empty";
        }


        //last name
        if (!this.state["address"]) {
            formIsValid = false;
            errors["address"] = "Address Cannot be empty";
        }


        //Email
        if (!this.state["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof this.state["email"] !== "undefined") {
            let lastAtPos = this.state["email"].lastIndexOf('@');
            let lastDotPos = this.state["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state["email"].indexOf('@@') == -1 && lastDotPos > 2 && (this.state["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        //last name
        if (!this.state["phoneNumber"]) {
            formIsValid = false;
            errors["phoneNumber"] = "PhoneNumber Cannot be empty";
        }


        //last name
        if (!this.state["dateOfBirth"]) {
            formIsValid = false;
            errors["dateOfBirth"] = "DateOfBirth Cannot be empty";
        }


        //last name
        if (!this.state["schoolID"]) {
            formIsValid = false;
            errors["schoolID"] = "SchoolID Cannot be empty";
        }


        this.setState({ errors: errors });
        return formIsValid;
    }

    //Set state to handle event for all input fields
    handleChange(event) {
        switch (event.target.id) {
            case "firstName":
                this.setState({ firstName: event.target.value });
                break;
            case "lastName":
                this.setState({ lastName: event.target.value });
                break;
            case "address":
                this.setState({ address: event.target.value });
                break;
            case "email":
                this.setState({ email: event.target.value });
                break;
            case "phoneNumber":
                this.setState({ phoneNumber: event.target.value });
                break;
            case "dateOfBirth":
                this.setState({ dateOfBirth: event.target.value });
                break;
            case "schoolID":
                this.setState({ schoolID: event.target.value });
                break;
        }

    }

    // Either way we render the title, and a description.
    render() {
        if (this.props.userIsLoggedIn) {

            return (
                <div className="backGroundRegistration">
                    <div className="title-background">
                        <h2 className="title">REGISTRATION</h2>
                    </div>
                    <form className="studentDetails" onSubmit={this.handleSubmit} autocomplete="off">
                        <div className="columnCS1">
                            <label className="textLabel" htmlfor="firstName">FIRST NAME:</label>
                            <input className="textInput" ref="firstName" id="firstName" type="text" value={this.state.firstName} onChange={this.handleChange} />
                            <span className="error errorMessage">{this.state.errors["firstName"]}</span>
                            <br />
                            <label className="textLabel" htmlfor="lastName">LAST NAME:</label>
                            <input className="textInput" id="lastName" type="text" value={this.state.lastName} onChange={this.handleChange} />
                            <span className="error errorMessage">{this.state.errors["lastName"]}</span>
                            <br />
                            <label className="textLabel" htmlfor="address">ADDRESS:</label>
                            <input className="textInput" id="address" type="text" value={this.state.address} onChange={this.handleChange} />
                            <span className="error errorMessage">{this.state.errors["address"]}</span>
                            <br />
                            <label className="textLabel" htmlfor="email">EMAIL:</label>
                            <input className="textInput" id="email" type="text" value={this.state.email} onChange={this.handleChange} />
                            <span className="error errorMessage">{this.state.errors["email"]}</span>

                        </div>
                        <div className="columnCS2">
                            <label className="textLabel" htmlfor="phoneNumber">PHONE NUMBER:</label>
                            <input className="textInput" id="phoneNumber" type="text" value={this.state.phoneNumber} onChange={this.handleChange} />
                            <span className="error errorMessage">{this.state.errors["phoneNumber"]}</span>
                            <br />
                            <label className="textLabel" htmlfor="dateOfBirth">DATE OF BIRTH:</label>
                            <input className="textInput" id="dateOfBirth" type="date" value={this.state.dateOfBirth} onChange={this.handleChange} />
                            <span className="error errorMessage">{this.state.errors["dateOfBirth"]}</span>
                            <br />
                            <label className="textLabel" htmlfor="schoolID">SCHOOL ID:</label>
                            <input className="textInput" id="schoolID" type="text" value={this.state.schoolID} onChange={this.handleChange} />
                            <span className="error errorMessage">{this.state.errors["schoolID"]}</span>
                        </div>
                        <input className="submitButton" type="submit" value="REGISTER" />
                    </form>
                </div>
            );

        } else {
            //User will be redirected to login page
            return <Redirect to={{
                pathname: "/loginpage",
            }}
            />
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ waiting: true });

        if (this.handleValidation()) {
            // Axios replaces fetch(), same concept. Send the response and "then" when it comes back, put it in the state.
            axios({
                method: 'post',
                url: 'https://localhost:44380/API/StudentAPI/AddStudent',
                params: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                    dateOfBirth: this.state.dateOfBirth,
                    schoolID: this.state.schoolID
                }
            })
                //return the response status and data after user send data to database
                .then((res) => {
                    this.setState({ statusCode: res.status, response: res.data, waiting: false });
                })
                .catch((err) => {
                    this.setState({ statusCode: err.response.status, response: err.response.data, waiting: false });
                });
        }

    }
}
