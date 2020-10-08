import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import { Home } from './Home';
import { Programs } from './Programs';
import { Schools } from './Schools';
import '../custom.css'
import { CreateStudent } from './CreateStudent';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import Loginscreen from './Loginscreen';
import Uploadscreen from './Uploadscreen';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPage: [],
            uploadscreen: []
        }
    }
    componentWillMount() {
        var loginPage = [];
        loginPage.push(<Loginscreen parentContext={this} />);
        this.setState({
            loginPage: loginPage
        })
    }
    render() {
        return (
            
            <Layout>
                <div className="App">
                    <Route path='/loginPage' component={Loginscreen} />
                    <Route exact path='/' component={Home} />
                    <Route path='/programs' component={Programs} />
                    <Route path='/schools' component={Schools} />
                    <Route path='/create-student' component={CreateStudent} />
                </div>
            </Layout>
            
        );
    }
} const style = {
    margin: 15,
}; export default App;