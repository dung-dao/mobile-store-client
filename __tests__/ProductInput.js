import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, shallow} from 'enzyme';
import ProductInputs from "../src/components/FormInputs/ProductInputs";

configure({adapter: new Adapter()});

configure({adapter: new Adapter()});
describe('User input', () => {
    it('Match snapshoot create', () => {
        const tree = shallow(<ProductInputs span={4} action="CREATE"/>);
        expect(tree).toMatchSnapshot();
    });
    it('Match snapshoot view', () => {
        const tree = shallow(<ProductInputs span={4} action="VIEW"/>);
        expect(tree).toMatchSnapshot();
    });
})
