import React, { Component } from 'react';
import ApiHandler from '../../api/api-handler';
import '../../icons/style.css';
import './style.css';

class Carousel extends Component {
    constructor(props){
        super(props);
        this.apiHandler = new ApiHandler();
        this.state = {
            characters: [],
            offset: 0,
        }
        this.scrollLeft = this.scrollLeft.bind(this);
        this.infiniteScroll = this.infiniteScroll.bind(this);
    }

    componentDidMount(){
        this.renderCarousel();
    }

    renderCarousel(){
        const { nameStartsWith } = this.props;

        if(this.state.characters.length === this.state.offset) {
            this.apiHandler.listCharacters(nameStartsWith, this.state.offset, characters => {
                this.setState({characters: this.state.characters.concat(characters)});
            });
            this.setState({offset: this.state.offset + this.apiHandler.getMaxResults()})
        }
    }
    
    getImageURL(character, size) {
        return (size === 'big')
            ? `${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`
            : `${character.thumbnail.path}/landscape_large.${character.thumbnail.extension}`;
    }

    getClassName(size) {
        return (size === 'big') 
            ? 'carousel carousel-big-items' 
            : 'carousel carousel-default-items';
    }

    scrollLeft(event){
        event.target.classList.contains('icon-chevron-right') 
            ? event.target.previousElementSibling.scrollLeft += 400
            : event.target.nextElementSibling.scrollLeft -= 400;
    }

    infiniteScroll(event){
        const scrollWidth = event.target.scrollWidth;
        const offsetWidth = event.target.offsetWidth;
        const scrollLeft = event.target.scrollLeft;

        if((scrollWidth - offsetWidth) - 100 <= scrollLeft) {
            this.renderCarousel();
        }

    }
    
    render() {
        const { size, title, onCharacterClick } = this.props;
        const { characters } = this.state;
        
        return (
            characters.length > 0 &&
            <div>
                <h2>{title && title}</h2>
                <div className={this.getClassName(size)}>
                    <span className="carousel-icon icon-chevron-left" onClick={this.scrollLeft}/>
                    <div className="carousel-outer-container" onScroll={this.infiniteScroll}>
                        <ul className="carousel-inner-container">
                            {
                                characters.map((character,idx) => 
                                <li key={idx} className="carousel-item" onClick={() => onCharacterClick(character.id)}>
                                    <img alt="Character" className="carousel-item-img" src={this.getImageURL(character, size)}/>
                                    <p className="carousel-item-details">{character.name}</p>
                                </li>)
                            }
                        </ul>
                    </div>
                    <span className="carousel-icon icon-chevron-right" onClick={this.scrollLeft}/>
                </div>
            </div>
        );
    }
}

export default Carousel;