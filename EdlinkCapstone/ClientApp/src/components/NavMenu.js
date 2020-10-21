import React, { Component } from 'react';
import { Container, Navbar, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
    }

    renderButton() {
        if (this.props.userIsLoggedIn) {
            // return sign out button
            return <button className="logout" onClick={ () => this.props.toggleUserLoggedIn()}> Log Out </button>
        }
        else {
            return <NavLink tag={Link} className="login" to="/loginPage">Login/Register</NavLink>
        }
    }

    //set up the lay out for user to access different components and their properties.
    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm" light>
                    <Container className="navbar-nav">
                        <Link to="/">
                            <img className="logo" alt="EdLink" title="HOME" src={require('../assets/images/EdLinkLogo.png')} />
                        </Link>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/schools">SCHOOLS</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/programs">PROGRAMS</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/create-student">REGISTRATION</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/students">STUDENTS</NavLink>
                        </NavItem>
                        <NavItem>
                            {this.renderButton()}
                            </NavItem>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
