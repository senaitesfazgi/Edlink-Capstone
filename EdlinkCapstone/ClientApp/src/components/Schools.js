import React, { Component } from 'react';
// Don't forget to "npm install axios" and import it on any pages from which you are making HTTP requests.
import axios from 'axios';

// The name of the class is used in routing in App.js. The name of the file is not important in that sense.
export class Schools extends Component {
    static displayName = Schools.name;

    constructor(props) {
        // 1) When we build the component, we assign the state to be loading, and register an empty list in which to store our forecasts.
        super(props);
        this.state = { schools: [], loading: true };
    }

    componentDidMount() {
        // 2) When the component mounts, we make the async call to the server to retrieve the API results.
        this.populateSchoolsData();
    }

    static renderSchoolsTable(schools) {
        // 5) When the async call comes back, render will call this method rather than rendering "Loading...", which will create our table.



        return (
            <div className="App">
                <h1>Edmonton Public Schools</h1>
                

                {/* Fetch data from API */}
                <div>
                    <button className="fetch-button" onClick={Schools}>
                        Fetch Data
        </button>
                    <br />
                </div>

                {/* Display data from API */}
                <div className="schools">
                    {
                        schools.map((school, index) => {
                            return (
                                <div className="school" key={index}>
                                    <h3>School {index + 1}</h3>
                                    <h2>{school.school_name}</h2>

                                    <div className="details">
                                        <p>👨: {school.address}</p>
                                        <p>👨: {school.schoolwebsite}</p>
                                        <p>👨: {school.school_phone}</p>
                                        <p>👨: {school.school_email}</p>
                                    </div>
                                </div>
                            );
                        })}
                </div>

               
            </div>
        );




        //return (
        //    <div>
        //        {
        //            schools.map((school) =>
        //                <div>
        //                    {school.school_name}
        //                </div> 
        //            )  
        //        }
               
        //    </div>
        //);
        }
   
    render() {
        // 4) When we render, this ternary statement will with print loading, or render the forecasts table depending if the async call has come back yet.
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Schools.renderSchoolsTable(this.state.schools);
        

        // Either way we render the title, and a description.
        return (
            <div>
                <h1 id="tabelLabel" >Edmonton Public Schools</h1>
                <p>This component demonstrates fetching data from the server.</p>
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

































/*import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ScotchInfoBar from './ScotchInfoBar';
import './styles.css';

function Schools() {
    const [schools, setSchools] = useState(null);

    const fetchData = async () => {
        const response = await axios.get(
            /*'https://data.edmonton.ca/Schools/Edmonton-Public-Schools-2019-/nk6t-8jsz/data'
        );

        setSchools(response.data);
    };

    return (
        <div className="Schools">
            <h1>Game of Thrones Books</h1>
            <h2>Fetch a list from an API and display it</h2>

           /* <div>
                <button className="fetch-button" onClick={fetchData}>
                    Fetch Data
        </button>
                <br />
            </div>

          /*  <div className="schools">
                {schools &&
                    schools.map((school, index) => {
                        const cleanedDate = new Date(book.released).toDateString();
                        const authors = book.authors.join(', ');
                        const name = school.SchoolName
                        const website = school.SchoolWebsite

                        return (
                            <div className="school" key={index}>
                                <h3>School {index + 1}</h3>
                                <h2>{school.name}</h2>

                                <div className="details">
                                    <p>👨: {name}</p>
                                   
                                </div>
                            </div>
                        );
                    })}
            </div>

            <ScotchInfoBar seriesNumber="7" />
        </div>
    );
}
export default schools;  






/*import { CreateStudent } from './CreateStudent';

export class Schools extends Component {
    static displayName = Schools.name;

    render() {
        return (
            <div>
                <div className="title-background">
                    <h2 className="Title">SCHOOLS</h2>
                </div>
                <form>
                    <label className="searchBarTitle" htmlfor="firstName">SEARCH:</label>
                    <input className="searchBarInput" id="firstName" type="text" />
                </form>
                <div>
                    <h3>School</h3>
                    <h3>School</h3>
                    <h3>School</h3>
                    <h3>School</h3>
                    <h3>School</h3>
                </div>
            </div>
        );
    }
} */
