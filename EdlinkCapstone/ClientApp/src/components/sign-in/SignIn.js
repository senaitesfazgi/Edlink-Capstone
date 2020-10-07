//CreateStudent is Registration

import React, { Component } from 'react';
// Don't forget to "npm install axios" and import it on any pages from which you are making HTTP requests.
import axios from 'axios';

// The name of the class is used in routing in App.js. The name of the file is not important in that sense.
export class SignIn extends Component {
    static displayName = SignIn.name;

    constructor(props) {
        // 1) When we build the component, we assign the state to be loading, and register an empty list in which to store our forecasts.
        super(props);
        this.state = { statusCode: 0, response: [], email: "", passWord: "", waiting: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
            case "email":
                this.setState({ email: event.target.value });
                break;
            case "passWord":
                this.setState({ passWord: event.target.value });
                break;
        }
    }


    // Either way we render the title, and a description.
    render() {
        return (
            <div>
                <h2>SignIn</h2>
                <p>{this.state.waiting ? "Request sent, awaiting response." : "Response received, status: " + this.state.statusCode}</p>
                <p>Response Data: {JSON.stringify(this.state.response)}</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlfor="email">Email:</label>
                    <input id="email" type="text" value={this.state.email} onChange={this.handleChange} />
                    <br />
                    <label htmlfor="passWord">PassWord:</label>
                    <input id="passWord" type="password" value={this.state.passWord} onChange={this.handleChange} />
                    <br />
                    <input type="submit" value="SignIn" />
                </form>
            </div>
        );
    }


    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ waiting: true });
        // Axios replaces fetch(), same concept. Send the response and "then" when it comes back, put it in the state.

        /*
        axios.post(`person/api/create?firstName=${this.state.firstName}&lastname=${this.state.lastName}&phone=${this.state.phone}`).then(res => {
            this.setState({ statusCode: res.status, response: res.data, loading: false });
        });
        */
        axios({
            method: 'post',
            url: 'https://localhost:44380/API/UserAPI/authUser',
            params: {
                email: this.state.email,
                passWord: this.state.passWord,
            }
        })
            .then((res) => {
                console.log("response from signin is", res);
                this.setState({ statusCode: res.status, response: res.data, waiting: false });
            })
            .catch((err) => {
                console.log("log error", err)
                this.setState({ statusCode: err.response.status, response: err.response.data, waiting: false });
            });
    }
}
