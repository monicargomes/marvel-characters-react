import React, { Component } from 'react';
import ApiHandler from '../../api/api-handler';
import classNames from 'classnames';
import Loader from '../Loader';
import './style.css';
import '../../icons/style.css';

class Search extends Component {
    constructor(props) {
        super (props);
        this.apiHandler = new ApiHandler();
        this.state = {
            isMobile: false,
            searchActive: false,
            searchResults: [],
            dropdownActive: false,
            showLoader: false,
        }
        this.searchCharacter = this.searchCharacter.bind(this);
        this.onIconClick = this.onIconClick.bind(this);
        this.renderCharacter = this.renderCharacter.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
    }
    
    handleResize(){
        this.setState({isMobile: this.isMobile()});
    }

    isMobile(){
        return window.innerWidth < 768 ? true : false;
    }

    onIconClick() {
        this.setState({searchActive: !this.state.searchActive});
    }

    searchCharacter(event) {
        const query = event.target.value;

        this.setState({dropdownActive: true});

        if(this.state.searchResults.length === 0) this.setState({showLoader: true}); 

        if(query.length % 3 === 0) {
            query === '' 
                ? this.setState({searchResults: [], showLoader: false, dropdownActive: false}) 
                : this.apiHandler.listCharacters(query, null, results => this.setState({searchResults: results, showLoader: false}));
        }
    }
    
    renderCharacter(id){
        const { onCharacterClick } = this.props;

        this.setState({
            searchResults: [], 
            searchActive: false,
            dropdownActive: false,
        });
        onCharacterClick(id);
    }

    render() {
        const { searchResults, searchActive, isMobile, dropdownActive, showLoader } = this.state;

        return (
            <div className={classNames('search', { active: searchActive, mobile: isMobile })}>
                <div className="search-wrapper">
                    <span className="icon-search" onClick={this.onIconClick}/>
                    <input 
                        type="text" 
                        placeholder="Search for character" 
                        onChange={this.searchCharacter} 
                        className={classNames('search-input', { hidden: !searchActive })}
                    />
                </div>
                {
                    dropdownActive &&
                    <ul className='search-dropdown'>
                    {showLoader && <Loader/>}
                    {
                        searchResults.length > 0 && searchResults.map((character,idx) => 
                        <li key={idx} ref={character.id} onClick={() => this.renderCharacter(character.id)}>
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