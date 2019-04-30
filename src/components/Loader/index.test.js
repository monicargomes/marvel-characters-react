import React from 'react';
import { shallow } from 'enzyme';
import Loader from './index';

describe('Loader component', () =>{
    const wrapper = shallow(<Loader />);
    
    it('Should render', () => {
        expect(wrapper.find('.loader').length).toBe(1);
    });
})
