import React, { Component } from 'react';
import classNames from 'classnames';
import './style.css';
import '../../icons/style.css';

class Search extends Component {
    constructor(props) {
        super (props);
        this.state = {
            searchHidden: true,
        }
        this.searchCharacter = this.searchCharacter.bind(this);
        this.onIconClick = this.onIconClick.bind(this);
    }
    
    onIconClick() {
        this.setState({ searchHidden: !this.state.searchHidden })
    }

    searchCharacter(event) {
        const query = event.target.value;
        const { onSearch } = this.props;
        onSearch(query);
    }
    
    
    render() {
        const { searchHidden } = this.state;
        const { searchResults, onCharacterClick } = this.props

        return (
            <div className="search">
                <div className="search-wrapper">
                    <span className="icon-search" onClick={this.onIconClick}/>
                    <input 
                        type="text" 
                        placeholder="Search for character" 
                        onChange={this.searchCharacter} 
                        className={classNames('search-input', { hidden: searchHidden })}
                    />
                </div>
                {
                    searchResults.length > 0 &&
                    <ul className={classNames('search-dropdown',{ hidden: searchHidden })}>
                    {
                        searchResults.map((character,idx) => 
                        <li key={idx} onClick={() => onCharacterClick(character.id)}>
                            {character.name}
                        </li>
                    )}
                    </ul>
                }
            </div>
            
        );
    }
}
    
export default Search;