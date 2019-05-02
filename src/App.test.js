import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

jest.mock('./api/api-handler');

describe('App component', () =>{
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    
    it('Should render with a random character', () => {
        expect(wrapper.find('.App').length).toBe(1);
        expect(instance.apiHandler.readRandomCharacter).toHaveBeenCalledTimes(1);
    });
    
    it('Should change featureCharacterId state and call window.scrollTo when onCharacterClick is called', () => {
        const id = '123456'
        global.scrollTo = jest.fn();

        expect(wrapper.state('featureCharacterId')).toBe(null);
        
        instance.onCharacterClick(id);
        
        expect(wrapper.state('featureCharacterId')).toBe(id);
        expect(global.scrollTo).toHaveBeenCalled();
    });

})
