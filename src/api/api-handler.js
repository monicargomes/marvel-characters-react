import md5 from 'md5';
import ApiKey from './apikey.enum';

const MAX_RESULTS = 20;
const API_BASE_URL = 'https://gateway.marvel.com/v1/public/';
const TOP_CHARACTERS_IDS = ['1009220', '1009351', '1009368', '1009189', '1009664', '1009610', '1009718', '1009262', '1009215'];

class ApiHandler {
    getMaxResults(){
        return MAX_RESULTS;
    }
    readCharacter(id, callback) {
        fetch(this.getReadCharactersURL(id))
        .then(response => response.json())
        .then(response => callback(response.data.results[0]))
        .catch(error => this.processRequestError(error));
    }
    
    getReadCharactersURL(id) {
        return `${API_BASE_URL}characters/${id}?${this.getHash()}`;
    }
    
    readCharacterByName(name, callback) {
        fetch(this.getReadCharacterByNameURL(name))
        .then(response => response.json())
        .then(response => callback(response.data.results))
        .catch(error => this.processRequestError(error));
    }
    
    getReadCharacterByNameURL(name) {
        return `${API_BASE_URL}characters?nameStartsWith=${name}&limit=${MAX_RESULTS}&${this.getHash()}`;
    }
    
    listCharacters(offset, callback) {
        fetch(this.getListCharactersURL(offset))
        .then(response => response.json())
        .then(response => callback(response.data.results))
        .catch(error => this.processRequestError(error));
    }
    
    getListCharactersURL(offset) {
        return `${API_BASE_URL}characters?limit=${MAX_RESULTS}&offset=${offset}&${this.getHash()}`;
    }
    
    listTopCharacters(callback) {
        const characters = [];
        TOP_CHARACTERS_IDS.forEach(id => {
            this.readCharacter(id, character => {
                characters.push(character);
                // We call the callback only when all top chars finished reading
                if (characters.length === TOP_CHARACTERS_IDS.length) {
                    callback(characters);
                }
            })
        })
    }
    
    readRandomCharacter(callback) {
        const offset = Math.floor(Math.random() * 1000);
        this.listCharacters(offset, (characters) => {
            const index = Math.floor(Math.random() * characters.length);
            callback(characters[index].id);
        })
    }

    listComics(id, callback) {
        fetch(this.readComicURL(id))
            .then(response => response.json())
            .then(response => {
                const comics = response.data.results.map(item => item.thumbnail.path + '.' + item.thumbnail.extension);
                callback(comics);
            })
            .catch(error => this.processRequestError(error));
        
    }
    
    readComicURL(id) {
        return `${API_BASE_URL}characters/${id}/comics?${this.getHash()}`
    }
    
    processRequestError(error) {
        console.log(error);
    }

    getHash() {
        const timestamp = new Date().getTime();
        const md5Hash = md5(timestamp + ApiKey.PRIVATE + ApiKey.PUBLIC);
        return `ts=${timestamp}&apikey=${ApiKey.PUBLIC}&hash=${md5Hash}`;
    }
    
}

export default ApiHandler;