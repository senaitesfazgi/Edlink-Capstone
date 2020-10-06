import React, { Component } from 'react' //react
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import { Link } from 'react-router-dom';

/*
    Footer Component : Footer for all page

*/
const Footer = () => {
    return (
        <MDBFooter color="blue" className="font-small pt-4 mt-4">
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <Link to="/"> EDLINK </Link>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}
export default Footer;
