import React, { Component } from 'react';
import FeatureComics from '../FeatureComics'
import './style.css';

const EMPTY_DESCRIPTION = 'Sorry, there is no description for this character.';

class FeatureCharacter extends Component {
    getCharacterImageURL(character) {
        return character.thumbnail.path + "/standard_fantastic." + character.thumbnail.extension;
    }
    
    render() {
        const { character, comics } = this.props;

        return (
            character &&
            <div className="featured-character">
                <div className="featured-character__header">
                    <img alt="Featured Character" className="feature-character__img" src={this.getCharacterImageURL(character)}/>
                    <div>
                        <h1>{character.name}</h1>
                        <ul className="featured-character__links">
                        {character.urls.map((link, idx) => <li className="feature-character__link" key={idx}><a href={link.url}>{link.type}</a></li>)}
                        </ul>
                    </div>
                </div>
                <h2>Description</h2>
                <p className="feature-character__description">{character.description ? character.description : EMPTY_DESCRIPTION}</p>
                <h2>Comics</h2>
                <FeatureComics comics={comics}/>
            </div>
        );
    }
}
    
export default FeatureCharacter;