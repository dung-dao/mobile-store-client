import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, shallow} from 'enzyme';
import {Provider} from "react-redux";
import {createMockStore} from "../src/utils/reduxMock";
import AppHeader from "../src/layouts/AppHeader";

describe('Datatable test', () => {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });
    it('renders without crashing', () => {
        const tree = shallow(<Provider store={createMockStore()}>
            <AppHeader/>
        </Provider>)
        expect(tree).toMatchSnapshot();
    });
})
