import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App component', () =>{
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    
    it('Should render', () => {
        expect(wrapper.find('.App').length).toBe(1);
    });
    
    it('Should change featureCharacterId state when onCharacterClick is called', () => {
        expect(wrapper.state('featureCharacterId')).toBe(null);
        instance.onCharacterClick('123456');
        expect(wrapper.state('featureCharacterId')).toBe('123456');
    });

})
