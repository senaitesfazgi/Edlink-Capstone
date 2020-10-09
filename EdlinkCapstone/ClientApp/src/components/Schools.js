import React, { Component } from 'react';
import axios from 'axios';


export class Schools extends Component {
    static displayName = Schools.name;

    constructor(props) {
 
        super(props);
        this.state = { schools: [], loading: true };
    }

    componentDidMount() {
 
        this.populateSchoolsData();
    }

    static renderSchoolsTable(schools) {
 
        return (
            <div className="App">
                <h1>Edmonton Public Schools</h1>
                
                <div>
                   
                </div>

                {/* Display data from API */}
                <div className="schools">
                    {
                        schools.map((school, index) => {
                            return (
                                <div className="school" key={index}>
                                    
                                    <h2>{school.school_name}</h2>

                                    <div className="details">
                                        <p>{school.address}</p>
                                        <p>{school.schoolwebsite}</p>
                                        <p>{school.school_phone}</p>
                                        <p>{school.school_email}</p>
                                    </div>
                                </div>
                            );
                        })}
                </div>

               
            </div>
        );

        }
   
    render() {
        // 4) When we render, this ternary statement will with print loading, or render the forecasts table depending if the async call has come back yet.
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Schools.renderSchoolsTable(this.state.schools);
        
        return (
            <div>
                
                {contents}
            </div>
        );
    }

    async populateSchoolsData() {
        // 3) Make the async call to the API.
        // When an async call is made, it "awaits" a response. This means that rather than the server hanging and keeping the "thread" (process) open, it shelves the thread to be picked up when the response comes back.
        // This frees up server resources to do other things in the event the request takes a few seconds (or more, if your internet is straight out of 1995).

        // Axios replaces fetch(), same concept. Send the response and "then" when it comes back, put it in the state.
        axios.get('https://data.edmonton.ca/resource/nk6t-8jsz.json').then(res => {
            this.setState({ schools: res.data, loading: false });


        });

        
    }



}
































