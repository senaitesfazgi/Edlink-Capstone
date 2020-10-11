import React, { Component } from 'react';
import axios from 'axios';
import './Schools.css';

export class Schools extends Component {
    static displayName = Schools.name;

    constructor(props) {
        //creating school properties and search properties
        super(props);
        this.state = { schools: [], search: "" };
    }
    componentDidMount() {
        // calling the populate schoool data method to fetch data from the API
        this.populateSchoolsData();
    }
    // this method is called to set the state property search based on the input value
    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }

    render() {
        // schools are filtered based upon the search state. 
        let filteredSchools = this.state.schools.filter(
            (school) => {
                return school.school_name.toLowerCase().indexOf(this.state.search) !== -1;
            });

        return (
            <div>
                <div>
                    <div className="title-background">
                        <h2 className="title">SCHOOLS</h2>
                    </div>
                    <p>Search For Edmonton Public Schools</p>
                    <form>
                        <input className="searchBarInput" placeholder="SEARCH:" id="firstName" type="text" value={this.state.search}
                            onChange={this.updateSearch.bind(this)} />
                    </form>
                </div>
                <div className="App">
                    <div className="schools">
                        {
                            //Filtered schools are displayed here
                            filteredSchools.map((school) => {
                                return (
                                    <div className="school">

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
            </div>
        );
    }
    //data is fetched from the API
    async populateSchoolsData() {
        axios.get('https://data.edmonton.ca/resource/nk6t-8jsz.json').then(res => {
            this.setState({ schools: res.data });
        });
    }
}































