import React, { Component } from 'react';
import ApiHandler from './api/api-handler';
import Search from './components/Search';
import FeatureCharacter from './components/FeatureCharacter';
import Carousel from './components/Carousel';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.apiHandler = new ApiHandler();
    this.state = {
      featureCharacterId: null,
    }
    this.onCharacterClick = this.onCharacterClick.bind(this);
  }
  
  componentDidMount(){
    this.apiHandler.readRandomCharacter(featureCharacterId => 
      this.setState({featureCharacterId: featureCharacterId})
    );
  }

  onCharacterClick(id){
    this.setState({
      featureCharacterId: id,
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="header">
          <a href='#' className="header-logo"></a>
          <Search onCharacterClick={this.onCharacterClick}/>
        </header>
        <main>
          <FeatureCharacter featureCharacterId={this.state.featureCharacterId}/>
          <Carousel onCharacterClick={this.onCharacterClick} size="big" title="Characters - A"/>
          <Carousel onCharacterClick={this.onCharacterClick} nameStartsWith="b" title="Characters - B"/>
          <Carousel onCharacterClick={this.onCharacterClick} nameStartsWith="c" title="Characters - C"/>
          <Carousel onCharacterClick={this.onCharacterClick} nameStartsWith="d" title="Characters - D"/>
          <Carousel onCharacterClick={this.onCharacterClick} nameStartsWith="e" title="Characters - E"/>
        </main>
        <footer>
          <p>"Data provided by Marvel. &copy; 2014 Marvel"</p>
        </footer>
      </div>
      );
    }
  }
  
export default App;