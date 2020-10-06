import React, { Component } from 'react' //react
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer-copyright text-center py-3">
            &copy; {new Date().getFullYear()} Copyright: <Link to="/"> EDLINK </Link>
        </div>
    );
}
export default Footer;
