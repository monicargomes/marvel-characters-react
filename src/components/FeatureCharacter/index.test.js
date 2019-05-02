import React from 'react';
import { mount} from 'enzyme';
import FeatureCharacter from './index';

jest.mock('../../api/api-handler');

describe('FeatureCharacter component', () =>{
    const id = '123456';
    const character = {
        name: 'Hulk',
        urls: [{
            url: '', 
            type: ''
        }], 
        thumbnail: {
            path: 'path', 
            extension: 'extension'
        },
        comics: {
            items: []
        }
    };

    let wrapper;
    let instance;

    function createComponent(){
        wrapper = mount(<FeatureCharacter featureCharacterId={null}/>);
        instance = wrapper.instance();

    }

    beforeEach(() => {
        createComponent();
    });

    it('Should render only with a character available', () => {
        expect(wrapper.find('.featured-character').length).toBe(0);
        expect(wrapper.find('.loader').length).toBe(1);

        wrapper.setState({character: character});
        expect(wrapper.find('.featured-character').length).toBe(1);
        expect(wrapper.find('.loader').length).toBe(0);
    });
    
    it('Should call renderFeatureCharacter when a new featureCharacterId is passed', () => { 
        instance.renderFeatureCharacter = jest.fn();
        
        expect(instance.props.featureCharacterId).toBe(null);
        expect(instance.renderFeatureCharacter).not.toHaveBeenCalled();
        
        wrapper.setProps({ featureCharacterId: id });
        
        expect(instance.props.featureCharacterId).toBe(id);
        expect(instance.renderFeatureCharacter).toHaveBeenCalled();
        expect(instance.renderFeatureCharacter).toHaveBeenCalledWith(id);
    })
    
    it('Should return right image URL', () => {
        expect(instance.getCharacterImageURL('path', 'extension')).toBe('path/standard_fantastic.extension');
    });

    it('Should call de API and renderFeatureComics when renderFeatureCharacter is called', () => {
        instance.renderFeatureComics = jest.fn();
        
        instance.renderFeatureCharacter(id);
        
        expect(instance.apiHandler.readCharacterById).toHaveBeenCalled();
        expect(instance.renderFeatureComics).toHaveBeenCalled();
        expect(instance.renderFeatureComics).toHaveBeenCalledWith(id);
    });

    it('Should call de API when renderFeatureComics is called', () => {
        instance.renderFeatureComics(id);
        
        expect(instance.apiHandler.listComics).toHaveBeenCalled();
    });
})