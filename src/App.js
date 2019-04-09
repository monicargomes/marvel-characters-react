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
    }
    this.onCharacterClick = this.onCharacterClick.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  
  componentDidMount(){
    this.renderFeatureCharacter('1009351');
    this.renderCarousel(5);
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

  renderCarousel(offset){
    this.apiHandler.listCharacters(offset, characters => {
      console.log (characters);
      this.setState({caroulselCharacters: this.state.caroulselCharacters.concat(characters)})
    });
  }

  onSearch(query){
    if(query.length % 3 === 0){
      if(query === '') {
        this.setState({searchResults: []});
      }
      this.apiHandler.readCharacterByName(query, results => this.setState({searchResults: results}));

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
          <Search onCharacterClick={this.onCharacterClick} onSearch={this.onSearch} searchResults={this.state.searchResults}/>
        </header>
        <main>
          <FeatureCharacter character={this.state.featureCharacter} comics={this.state.featureComics}/>
          <Carousel onCharacterClick={this.onCharacterClick} characters={this.state.caroulselCharacters} type="big"/>
        </main>
        <footer>
        <p>"Data provided by Marvel. &copy; 2014 Marvel"</p>
        </footer>
      </div>
      );
    }
  }
  
  export default App;