import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, shallow} from 'enzyme';
import ModalConfirm from "../src/components/common/ModalConfirm";

configure({adapter: new Adapter()});

configure({adapter: new Adapter()});
describe('Loading Render', () => {
    it('renders without crashing', () => {
        const tree = shallow(<ModalConfirm visible={true} onOk={() => {
            console.log('ok')
        }} onCancel={() => {
            console.log('cancel')
        }} actionName="xóa"/>);
        expect(tree).toMatchSnapshot();
    });
})
