import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import Footer from './Footer';

export class Layout extends Component {
  static displayName = Layout.name;
 //Set the page for user to access NavMenu along with the children properties.
  render () {
    return (
      <div>
         <NavMenu toggleUserLoggedIn={this.props.toggleUserLoggedIn} userIsLoggedIn={this.props.userIsLoggedIn}/>
        <Container>
           {this.props.children} 
        </Container>
         <Footer/>
      </div>
    );
  }
}
