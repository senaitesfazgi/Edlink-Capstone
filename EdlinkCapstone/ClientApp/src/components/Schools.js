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
        
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Schools.renderSchoolsTable(this.state.schools);
        
        return (
        <div>
            <div>
                <div className="title-background">
                    <h2 className="Title">Schools</h2>
                </div>
                <form>
                    <label className="searchBarTitle" htmlfor="firstName">SEARCH:</label>
                    <input className="searchBarInput" id="firstName" type="text" />
                </form>
            </div>

            <div>
                
                {contents}
                </div>
        </div>
        );
    }

    async populateSchoolsData() {
        
        axios.get('https://data.edmonton.ca/resource/nk6t-8jsz.json').then(res => {
            this.setState({ schools: res.data, loading: false });


        });

        
    }



}































