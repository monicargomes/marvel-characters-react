import React, { Component } from 'react';
import './style.css';

class Loader extends Component {
    render() {
        const { className } = this.props;
        
        return (
            <div className={`loader ${className}`}>
                <span className="loader__spinner icon-circle-o-notch"></span>
            </div>
        );
    }
}
        
export default Loader;