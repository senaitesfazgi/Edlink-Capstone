import React, { Component } from 'react';

export class Programs extends Component {
    static displayName = Programs.name;

    render() {
        return (
            <div>
                <h2>PROGRAMS</h2>
                <form>
                    <label htmlfor="firstName">Search:</label>
                    <input id="firstName" type="text" />
                </form>
            </div>
        );
    }
}
