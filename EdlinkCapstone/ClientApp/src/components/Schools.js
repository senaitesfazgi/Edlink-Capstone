import React, { Component } from 'react';
import { CreateStudent } from './CreateStudent';

export class Schools extends Component {
    static displayName = Schools.name;

    render() {
        return (
            <div>
                <h1>EdLink</h1>
                <form>
                    <label htmlfor="firstName">Search:</label>
                    <input id="firstName" type="text"/>
                </form>
                <div>
                    <img src="" />
                    <img src="" />
                    <img src="" />
                    <img src="" />
                    <img src="" />
                    <img src="" />
                    <img src="" />
                    <img src="" />
                </div>
                <h2>Welcome</h2>
                <p>Take virtual tours</p>
            </div>
        );
    }
}
