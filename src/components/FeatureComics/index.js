import React, { Component } from 'react';
import './style.css';

class FeatureComics extends Component {
    render() {
        const { comics } = this.props;
        
        return (
            comics &&
            <ul className="feature-comics">
                {comics.map((comic, idx) => 
                <li key={idx}><img alt="Comics" className="feature-comics__img" src={comic}/></li>)}
            </ul>
        );
    }
}
    
export default FeatureComics;