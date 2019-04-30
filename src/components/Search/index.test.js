import React from 'react';
import { shallow } from 'enzyme';
import Search from './index';
import { wrap } from 'module';

jest.mock('../../api/api-handler');

describe('Search component', () =>{
    const onCharacterClick = jest.fn();

    let wrapper;
    let instance;

    function createComponent(){
        wrapper = shallow(<Search onCharacterClick={onCharacterClick}/>);
        instance = wrapper.instance();
    }

    beforeEach(() => {
        createComponent();
    });

    it('Should render', () => {
        expect(wrapper.find('.search').length).toBe(1);
    });
    
    it('Should change searchActive state when onIconClick is called', () => {
        expect(wrapper.state('searchActive')).toBe(false);
        
        instance.onIconClick();
        expect(wrapper.state('searchActive')).toBe(true);
    });

    it('Should change dropdownActive and showLoader states and call de API when searchCharacter is called', () => {
        const event = {target:{value: 'Hello!'}};
        
        expect(wrapper.state('dropdownActive')).toBe(false);
        expect(wrapper.state('showLoader')).toBe(false);
        expect(wrapper.state('searchResults')).toEqual([]);
        
        instance.searchCharacter(event);
        
        expect(wrapper.state('dropdownActive')).toBe(true);
        expect(wrapper.state('showLoader')).toBe(true);
        expect(instance.apiHandler.listCharacters).toHaveBeenCalled();
    });
    
    it('Should change searchActive, dropdownActive and searchResults states and call onCharacterClick when renderCharacter is called', () => {
        const id = '123456';

        wrapper.setState({searchActive: true, dropdownActive: true, searchResults: new Array(20)});
        
        expect(wrapper.state('searchActive')).toBe(true);
        expect(wrapper.state('dropdownActive')).toBe(true);
        expect(wrapper.state('searchResults').length).toBe(20);

        instance.renderCharacter(id);
        
        expect(wrapper.state('searchActive')).toBe(false);
        expect(wrapper.state('dropdownActive')).toBe(false);
        expect(wrapper.state('searchResults').length).toBe(0);
        expect(instance.props.onCharacterClick).toHaveBeenCalled();
        expect(instance.props.onCharacterClick).toHaveBeenCalledWith(id);
    });
})