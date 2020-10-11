import React, { Component } from 'react';

export class Programs extends Component {
    static displayName = Programs.name;

    render() {
        return (
            <div>
                <div className="title-background">
                    <h2 className="title">PROGRAMS</h2>
                </div>
                <form>
                    <input className="searchBarInput" placeholder="SEARCH:" id="firstName" type="text" />
                </form>
            </div>
        );
    }
}
