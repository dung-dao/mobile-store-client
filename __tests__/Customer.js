import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, shallow} from 'enzyme';
import {Provider} from "react-redux";
import {createMockStore} from "../src/utils/reduxMock";
import CustomerList from "../src/pages/Customers/CustomerList";
import CustomerDetail from "../src/pages/Customers/CustomerDetail";

describe('Customer page', () => {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });
    it('Customer list match snapshoot', () => {
        const tree = shallow(<Provider store={createMockStore()}>
            <CustomerList isToSelect={true}/>
        </Provider>);
        expect(tree).toMatchSnapshot()
    });
    it('Customer detail match snapshoot', () => {
        const tree = shallow(<Provider store={createMockStore()}>
            <CustomerDetail/>
        </Provider>);
        expect(tree).toMatchSnapshot()
    });
})
