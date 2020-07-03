import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, shallow} from 'enzyme';
import UserInput from "../src/components/FormInputs/UserInput";

configure({adapter: new Adapter()});

configure({adapter: new Adapter()});
describe('User input', () => {
    it('Match snapshoot create', () => {
        const tree = shallow(<UserInput span={4} action="CREATE" readOnly={false}/>);
        expect(tree).toMatchSnapshot();
    });
    it('Match snapshoot view', () => {
        const tree = shallow(<UserInput span={4} action="VIEW" readOnly={true}/>);
        expect(tree).toMatchSnapshot();
    });
})
