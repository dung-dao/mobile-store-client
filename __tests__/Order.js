import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, shallow} from 'enzyme';
import {Provider} from "react-redux";
import {createMockStore} from "../src/utils/reduxMock";
import OrderList from "../src/pages/Orders/orders/OrderList";
import OrderDetail from "../src/pages/Orders/orders/OrderDetail";

describe('Customer page', () => {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });
    it('Customer list match snapshoot', () => {
        const tree = shallow(<Provider store={createMockStore()}>
            <OrderList isToSelect={true}/>
        </Provider>);
        expect(tree).toMatchSnapshot()
    });
    it('Customer detail match snapshoot', () => {
        const tree = shallow(<Provider store={createMockStore()}>
            <OrderDetail/>
        </Provider>);
        expect(tree).toMatchSnapshot()
    });
})
