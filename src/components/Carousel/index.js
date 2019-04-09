import React, { Component } from 'react';
import '../../icons/style.css';
import './style.css';


class Carousel extends Component {
    constructor(props){
        super(props);
    }
    
    getImageURL(character, type) {
        return (type && type === 'big') ?
        `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`
        :
        `${character.thumbnail.path}/landscape_medium.${character.thumbnail.extension}`;
    }
    
    
    render() {
        const { characters, type, onCharacterClick } = this.props;
        console.log('characters', characters);
        
        return (
            characters.length > 0 &&
            <div className="carousel">
            <span className="caroulsel-icon icon-chevron-left" onClick={this.onIconClick}/>
            <ul className="carousel-container">
                {
                    characters.map((character,idx) => 
                    <li key={idx} className="carousel-big-item" onClick={() => onCharacterClick(character.id)}><img className="carousel-img" src={this.getImageURL(character, type)}/></li>)
                }
            </ul>
            <span className="caroulsel-icon icon-chevron-right" onClick={this.onIconClick}/>
            </div>
            
            );
        }
    }
    
    export default Carousel;