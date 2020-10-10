import React, { Component } from 'react';
import axios from 'axios';


export class Schools extends Component {
    static displayName = Schools.name;

    constructor(props) {
 
        super(props);
        this.state = { schools: [], search:"" };
    }
    componentDidMount() {

        this.populateSchoolsData();
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }
   
    render() {
         let filteredSchools = this.state.schools.filter(
            (school) => {
                return school.school_name.toLowerCase().indexOf(this.state.search) !== -1;
            });

        return (
             <div>
            <div>
                <div className="title-background">
                    <h2 className="Title">Schools</h2>
                </div>
                <form>
                        <label className="searchBarTitle" htmlfor="firstName">SEARCH:</label>
                        <input className="searchBarInput" id="firstName" type="text" value={this.state.search}
                            onChange={this.updateSearch.bind(this)} />
                </form>
                </div>
                <div className="App">
                    <h1>Edmonton Public Schools</h1>

                    
                    <div className="schools">
                        {

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
    async populateSchoolsData() {
        axios.get('https://data.edmonton.ca/resource/nk6t-8jsz.json').then(res => {
            this.setState({ schools: res.data, search: this.updateSearch.bind(this) });
        });   
    }
}































