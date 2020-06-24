import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, shallow} from 'enzyme';
import DataTable from "../src/components/common/DataTable";
import {Provider} from "react-redux";
import {createMockStore} from "../src/utils/reduxMock";

describe('Datatable test', () => {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });
    it('renders without crashing', () => {
        const tree = shallow(<Provider store={createMockStore()}>
            <DataTable resourceName="/products" title="test" searchAC={() => {
            }}/>
        </Provider>);
    });
})
