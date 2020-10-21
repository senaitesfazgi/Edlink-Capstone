import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import './Students.css';

export class Students extends Component {
    static displayName = Students.name;

    constructor(props) {
        //creating school properties and search properties
        super(props);
        // access query parameter
        const default_search_term = new URLSearchParams(props.location.search).get('search');
        this.state = { students: [], search: default_search_term || "", id: '' };
    }
    componentDidMount() {
        // calling the populate schoool data method to fetch data from the API
        this.populateStudentsData();
    }
    // this method is called to set the state property search based on the input value
    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }
    onDeleteStudent(id) {
        console.log("Delete me", id);
        axios({
            method: 'delete',
            url: 'https://localhost:44380/API/StudentAPI/Delete',
            params: {
                id: id,
            }
        })
            .then((res) => {
                console.log("deleted", res);
            })
            .catch((err) => {
                console.log(err);
            });
        const { students } = this.state;
        this.setState({
            students: students.filter(student => student.id !== id),
            id: id
        });
    }

    render() {
        const { students } = this.state;

        if (!this.props.userIsLoggedIn) {
            return <Redirect to={{
                pathname: "/loginpage",
            }}
            />
        }
        else {
            // schools are filtered based upon the search state. 
            let filteredStudents = this.state.students.filter(
                (student) => {
                    return student.address.toLowerCase().indexOf(this.state.search) !== -1;
                });

            function Item(props) {
                return <li>{props.message}</li>;
            }
            return (
                <div>
                    <div>
                        <div className="title-background">
                            <h2 className="title">STUDENTS</h2>
                        </div>
                        <p className="search-ed-pub">Search For Registered Students:</p>
                        <form>
                            <input className="searchBarInputSchools" placeholder="SEARCH:" id="firstName" type="text" value={this.state.search}
                                onChange={this.updateSearch.bind(this)} />
                        </form>
                    </div>
                    <div className="studentsTable">
                        <table className="table table-striped" aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Date of Birth</th>
                                    <th>School ID</th>
                                    <th>DELETE Record</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Note that we have "forecast.date" twice. That is because the "key=" attribute is for identifying a row if a "edit" or "delete", etc. button is present. It is not for displaying data. If you want to display that data point, you will need it inside of a <td> as well.*/}
                                {filteredStudents.map(student =>
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.address}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phoneNumber}</td>
                                        <td>{student.dateOfBirth}</td>
                                        <td>{student.schoolID}</td>
                                        <td> <button className="deleteButton" type="button" onClick={() => this.onDeleteStudent(student.id)}>DELETE</button> </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
    //data is fetched from the API
    async populateStudentsData() {
        axios.get('https://localhost:44380/API/StudentAPI/ShowStudents').then(res => {
            this.setState({ students: res.data });
        });
    }
}






























