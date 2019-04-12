import React, { Component } from 'react';
import ApiHandler from './api/api-handler';
import Search from './components/Search';
import FeatureCharacter from './components/FeatureCharacter';
import Carousel from './components/Carousel';

class App extends Component {
  constructor(props){
    super(props);
    this.apiHandler = new ApiHandler();
    this.state = {
      featureCharacter: null,
      featureComics: null,
      searchResults: [],
      caroulselCharacters: [],
      offset: 0,
    }
    this.onCharacterClick = this.onCharacterClick.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.renderCarousel = this.renderCarousel.bind(this);
  }
  
  componentDidMount(){
    this.apiHandler.readRandomCharacter(id => this.renderFeatureCharacter(id));
    this.renderCarousel();
  }

  renderFeatureCharacter(id){
    this.apiHandler.readCharacter(id, character => 
      this.setState({featureCharacter: character})
    );
    this.renderFeatureComics(id);
  }

  renderFeatureComics(id){
    this.apiHandler.listComics(id, comics => 
      this.setState({featureComics: comics})
    );
  }

  renderCarousel(){
    if(this.state.caroulselCharacters.length === this.state.offset) {
      this.apiHandler.listCharacters(this.state.offset, characters => {
        this.setState({caroulselCharacters: this.state.caroulselCharacters.concat(characters)});
      });
      this.setState({offset: this.state.offset + this.apiHandler.getMaxResults()})
    }
  }

  onSearch(query){
    if(query.length % 3 === 0) {
      query === '' 
        ? this.setState({searchResults: []}) 
        : this.apiHandler.readCharacterByName(query, results => this.setState({searchResults: results}));
    }
  }

  onCharacterClick(id){
    this.setState({
      featureCharacter: null,
      featureComics: null,
      searchResults: [],
    });
    this.renderFeatureCharacter(id);
  }
  
  render() {
    return (
      <div className="App">
        <header className="header">
          <img src="http://vinylmationworld.com/VMworldmob/wordpress/wp-content/uploads/2013/07/Marvel-Logo.png" alt="Marvel logo" className="header-logo"></img>
          <Search 
            onCharacterClick={this.onCharacterClick} 
            onSearch={this.onSearch} 
            searchResults={this.state.searchResults}
          />
        </header>
        <main>
          <FeatureCharacter 
            character={this.state.featureCharacter} 
            comics={this.state.featureComics}
          />
          <h2>Big Carousel</h2>
          <Carousel 
            onInfiniteScroll={this.renderCarousel} 
            onCharacterClick={this.onCharacterClick} 
            characters={this.state.caroulselCharacters} 
            type="big"
          />
          <h2>Default Carousel</h2>
          <Carousel 
            onInfiniteScroll={this.renderCarousel} 
            onCharacterClick={this.onCharacterClick} 
            characters={this.state.caroulselCharacters} 
            type=""
          />
        </main>
        <footer>
          <p>"Data provided by Marvel. &copy; 2014 Marvel"</p>
        </footer>
      </div>
      );
    }
  }
  
  export default App;