import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Schools.css';

export class Schools extends Component {
    static displayName = Schools.name;

    constructor(props) {
        //creating school properties and search properties
        super(props);
        // access query parameter
        const default_search_term = new URLSearchParams(props.location.search).get('search');
        this.state = { schools: [], search: default_search_term || "" };
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

        function Item(props) {
            return <li>{props.message}</li>;
        }

        return (
            <div>
                <div>
                    <div className="title-background">
                        <h2 className="title">SCHOOLS</h2>
                    </div>
                    <p className="search-ed-pub">Search For Edmonton Public Schools:</p>
                    <form>
                        <input className="searchBarInputSchools" placeholder="SEARCH:" id="firstName" type="text" value={this.state.search}
                            onChange={this.updateSearch.bind(this)} />
                    </form>
                </div>
                <div className="schools">
                    {
                        //Filtered schools are displayed here
                        filteredSchools.map((school) => {
                            return (
                                <div className="school">
                                    <h5 className="schoolName">{school.school_name}</h5>
                                    <div className="details">
                                        <p>{school.address}</p>
                                        <p className="weblink">
                                            {
                                                Object.keys(school).map((prop) => {
                                                    if (prop == 'school_website') {
                                                        return (
                                                            <a href={school[prop].url} target="_blank">{school[prop].url}</a>
                                                        )
                                                    }
                                                })}
                                        </p>
                                        <p>{school.school_phone}</p>
                                        <p>Email: {school.school_email}</p>
                                        <Link to="/create-student">Register at {school.school_name} </Link>
                                    </div>
                                </div>
                            );
                        })
                    }
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






























