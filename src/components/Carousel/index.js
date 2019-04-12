import React, { Component } from 'react';
import '../../icons/style.css';
import './style.css';

class Carousel extends Component {
    constructor(props){
        super(props);
        this.scrollLeft = this.scrollLeft.bind(this);
        this.infiniteScroll = this.infiniteScroll.bind(this);
    }
    
    getImageURL(character, type) {
        return (type === 'big')
            ? `${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`
            : `${character.thumbnail.path}/landscape_large.${character.thumbnail.extension}`;
    }

    getClassName(type) {
        return (type === 'big') 
            ? 'carousel carousel-big-items' 
            : 'carousel carousel-default-items';
    }

    scrollLeft(event){
        event.target.classList.contains('icon-chevron-right') 
            ? event.target.previousElementSibling.scrollLeft += 400
            : event.target.nextElementSibling.scrollLeft -= 400;
    }

    infiniteScroll(event){
        const { onInfiniteScroll } = this.props
        const scrollWidth = event.target.scrollWidth;
        const offsetWidth = event.target.offsetWidth;
        const scrollLeft = event.target.scrollLeft;

        if((scrollWidth - offsetWidth) - 100 <= scrollLeft) {
            onInfiniteScroll();
        }

    }
    
    render() {
        const { characters, type, onCharacterClick } = this.props;
        
        return (
            characters.length > 0 &&
            <div className={this.getClassName(type)}>
                <span className="carousel-icon icon-chevron-left" onClick={this.scrollLeft}/>
                <div className="carousel-outer-container" onScroll={this.infiniteScroll}>
                    <ul className="carousel-inner-container">
                        {
                            characters.map((character,idx) => 
                            <li key={idx} className="carousel-item" onClick={() => onCharacterClick(character.id)}>
                                <img alt="Character" className="carousel-item-img" src={this.getImageURL(character, type)}/>
                                <p className="carousel-item-details">{character.name}</p>
                            </li>)
                        }
                    </ul>
                </div>
                <span className="carousel-icon icon-chevron-right" onClick={this.scrollLeft}/>
            </div>
            
            );
        }
    }
    
    export default Carousel;