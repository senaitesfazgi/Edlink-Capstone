import React, { Component } from 'react';

export class Programs extends Component {
    static displayName = Programs.name;

    render() {
        return (
            <div>
                <div className="title-background">
                    <h2>PROGRAMS</h2>
                </div>
                <form>
                    <label htmlfor="firstName">Search:</label>
                    <input id="firstName" type="text" />
                </form>
            </div>
        );
    }
}
