import React from 'react';
import { shallow } from 'enzyme';
import Carousel from './index';

jest.mock('../../api/api-handler');

describe('Carousel component', () =>{
    const onCharacterClick = jest.fn();
    const characters = [
        {
            id: '123456', 
            name: 'Hulk', 
            thumbnail: {
                path: 'path', 
                extension: 'extension'
            }
        }
    ];

    let wrapper;
    let instance;

    function createComponent(){
        wrapper = shallow(<Carousel onCharacterClick={onCharacterClick}/>);
        instance = wrapper.instance();
    }

    beforeEach(() => {
        createComponent();
    });

    it('Should render', () => {
        wrapper.setState({characters: characters});
        expect(wrapper.find('.carousel').length).toBe(1);
    });
    
    it('Should call de API only when the offset matches de characters length', () => {
        expect(instance.apiHandler.listCharacters).toHaveBeenCalledTimes(1);
        expect(instance.apiHandler.getMaxResults).toHaveBeenCalledTimes(1);
        
        wrapper.setState({characters: [], offset: 20});
        instance.renderCarousel();
        expect(instance.apiHandler.listCharacters).not.toHaveBeenCalledTimes(2);
        expect(instance.apiHandler.getMaxResults).not.toHaveBeenCalledTimes(2);
        
        wrapper.setState({characters: new Array(20), offset: 20});
        instance.renderCarousel(); 
        expect(instance.apiHandler.listCharacters).toHaveBeenCalledTimes(2);
        expect(instance.apiHandler.getMaxResults).toHaveBeenCalledTimes(2);
    });
    
    it('Should call onCharacterClick when the carousel item is clicked', () => {
        wrapper.setState({characters: characters});
        expect(wrapper.find('.carousel__item').length).toBe(1);
        
        wrapper.find('.carousel__item').simulate('click');
        expect(instance.props.onCharacterClick).toHaveBeenCalled();
        expect(instance.props.onCharacterClick).toHaveBeenCalledWith(characters[0].id);

    });

    it('Should return right image URL', () => {
        expect(instance.getImageURL('path', 'extension', 'big')).toBe('path/portrait_fantastic.extension');
        expect(instance.getImageURL('path', 'extension', null)).toBe('path/landscape_large.extension');
    });

    it('Should return right class names', () => {
        expect(instance.getClassName('big')).toBe('carousel carousel__items--big');
        expect(instance.getClassName(null)).toBe('carousel carousel__items--default');
    });
})