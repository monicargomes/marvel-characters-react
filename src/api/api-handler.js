import md5 from 'md5';
import ApiKey from './apikey.enum';

const MAX_RESULTS = 20;
const API_BASE_URL = 'https://gateway.marvel.com/v1/public/';

class ApiHandler {
    getMaxResults(){
        return MAX_RESULTS;
    }

    readCharacterById(id, callback) {
        fetch(this.getReadCharacterByIdURL(id))
        .then(response => response.json())
        .then(response => callback(response.data.results[0]))
        .catch(error => this.processRequestError(error));
    }
    
    getReadCharacterByIdURL(id) {
        return `${API_BASE_URL}characters/${id}?${this.getHash()}`;
    }
    
    listCharacters(name, offset, callback) {
        fetch(this.getListCharactersURL(name, offset))
        .then(response => response.json())
        .then(response => callback(response.data.results))
        .catch(error => this.processRequestError(error));
    }
    
    getListCharactersURL(name, offset) {
        return name 
            ? `${API_BASE_URL}characters?nameStartsWith=${name}&limit=${MAX_RESULTS}&offset=${offset}&${this.getHash()}`
            : `${API_BASE_URL}characters?limit=${MAX_RESULTS}&offset=${offset}&${this.getHash()}`;
    }
    
    readRandomCharacter(callback) {
        const offset = Math.floor(Math.random() * 1000);
        this.listCharacters(null, offset, (characters) => {
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