import React, { Component } from 'react';
import ImageLoader from '../ImageLoader';
import Loader from '../Loader';
import ApiHandler from '../../api/api-handler';
import './style.css';

const EMPTY_DESCRIPTION = 'Sorry, there is no description for this character.';
const EMPTY_COMICS = 'Sorry, there is no comic books for this character.';
const LOADING_COMICS = 'Searching for comics...';

class FeatureCharacter extends Component {
    constructor(props){
        super(props);
        this.apiHandler = new ApiHandler();
        this.state = {
            character: null,
            comics: null,
        }
    }

    componentDidUpdate(prevProps) {
        const { featureCharacterId } = this.props;
        if (featureCharacterId !== prevProps.featureCharacterId) {
            this.setState({
                character: null,
                comics: null,
            });
            this.renderFeatureCharacter(featureCharacterId);
        }
      }

    getCharacterImageURL(path, extension) {
        return `${path}/standard_fantastic.${extension}`;
    }

    renderFeatureCharacter(id){
        this.apiHandler.readCharacterById(id, character => 
          this.setState({character: character})
        );
        this.renderFeatureComics(id);
    }
    
    renderFeatureComics(id){
        this.apiHandler.listComics(id, comics => 
          this.setState({comics: comics})
        );
    }
    
    render() {
        const { character, comics } = this.state;

        return (
            character ?
            <div className="featured-character">
                <div className="featured-character__header">
                    <img 
                        alt="Featured Character" 
                        className="feature-character__img" 
                        src={this.getCharacterImageURL(character.thumbnail.path, character.thumbnail.extension)}
                    />
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
                {
                    character.comics.items.length > 0 ?
                    comics ?
                    <ul className="feature-comics">
                        {comics.map((comic, idx) => <li key={idx} className="feature-comics__container"><ImageLoader src={comic} alt="Comics"/></li>)}
                    </ul>
                    : <p>{LOADING_COMICS}</p>
                    : <p>{EMPTY_COMICS}</p>
                }
            </div>
            : <Loader/>
        );
    }
}
    
export default FeatureCharacter;