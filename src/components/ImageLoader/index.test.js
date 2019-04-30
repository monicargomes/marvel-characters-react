import React from 'react';
import { shallow } from 'enzyme';
import ImageLoader from './index';

describe('ImageLoader component', () =>{
    const wrapper = shallow(<ImageLoader />);
    
    it('Should render', () => {
        expect(wrapper.find('.image-loader').length).toBe(1);
    });

    it('Should set ImageLoaded state to true when a image is loaded', () => {
        expect(wrapper.state('imageLoaded')).toBe(false);
        wrapper.find('.image-loader__img').simulate('load');
        expect(wrapper.state('imageLoaded')).toBe(true);
    });
})