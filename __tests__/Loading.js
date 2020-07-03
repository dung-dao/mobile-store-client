import LoadingPage from "../src/components/common/LoadingPage";
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, shallow} from 'enzyme';

configure({adapter: new Adapter()});

configure({adapter: new Adapter()});
describe('Loading Snapshoot', () => {
    it('renders without crashing', () => {
        const tree = shallow(<LoadingPage/>);
        expect(tree).toMatchSnapshot();
    });
})
