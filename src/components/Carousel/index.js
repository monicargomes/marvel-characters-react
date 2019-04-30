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
    
    getImageURL(path, extension, size) {
        return (size === 'big')
            ? `${path}/portrait_fantastic.${extension}`
            : `${path}/landscape_large.${extension}`;
    }

    getClassName(size) {
        return (size === 'big') 
            ? 'carousel carousel__items--big' 
            : 'carousel carousel__items--default';
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
                <h2>{title}</h2>
                <div className={this.getClassName(size)}>
                    <span className="carousel__icon icon-chevron-left" onClick={this.scrollLeft}/>
                    <div className="carousel__container--outer" onScroll={this.infiniteScroll}>
                        <ul className="carousel__container--inner">
                            {
                                characters.map((character,idx) => 
                                <li key={idx} className="carousel__item" onClick={() => onCharacterClick(character.id)}>
                                    <img 
                                        alt="Character" 
                                        className="carousel__item--img" 
                                        src={this.getImageURL(character.thumbnail.path, character.thumbnail.extension, size)}
                                    />
                                    <p className="carousel__item--details">{character.name}</p>
                                </li>)
                            }
                        </ul>
                    </div>
                    <span className="carousel__icon icon-chevron-right" onClick={this.scrollLeft}/>
                </div>
            </div>
        );
    }
}

export default Carousel;