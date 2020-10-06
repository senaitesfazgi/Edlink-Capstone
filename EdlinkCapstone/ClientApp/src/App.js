import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Programs } from './components/Programs';
import { Counter } from './components/Counter';
import { Schools } from './components/Schools';
import './custom.css'
import { CreateStudent } from './components/CreateStudent';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/programs' component={Programs} />
        <Route path='/schools' component={Schools} />
        <Route path='/create-student' component={CreateStudent} />
      </Layout>
    );
  }
}
