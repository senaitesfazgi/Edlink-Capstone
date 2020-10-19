import React, { Component } from 'react';
import './Programs.css';
import programs from './Programs.json'

export class Programs extends Component {
    static displayName = Programs.name;

    constructor(props) {
        //creating program properties and search properties
        super(props);
        this.state = { search: "" };
    }
    // this method is called to set the state property search based on the input value
    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }

    render() {
        // programs are filtered based upon the search state. 
        let filteredPrograms = programs.programs.filter(
            (program) => {
                return program.programName.toLowerCase().indexOf(this.state.search) !== -1;
            });

        return (
            <div>
                <div>
                    <div className="title-background">
                        <h2 className="title">PROGRAMS</h2>
                    </div>
                    <p className="search-ed-pub">Search For Programs In Each School:</p>
                    <form>
                        <input className="searchBarInputPrograms" placeholder="SEARCH:" id="firstName" type="text" value={this.state.search}
                            onChange={this.updateSearch.bind(this)} />
                    </form>
                </div>
                <div className="programs">
                    {
                        //Filtered programs are displayed here
                        filteredPrograms.map((program) => {
                            return (
                                <div className="program">
                                    <h5 className="programName">{program.programName}</h5>
                                    <div className="details">
                                        <p>{program.address}</p>
                                        <p>{program.schoolwebsite}</p>
                                        <p>{program.school_phone}</p>
                                        <p>{program.school_email}</p>
                                    </div>
                                    <div>
                                        <a href={program.link} target="_blank"><img src={require('../assets/images/' + program.programImage)} alt='' /></a>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}
































