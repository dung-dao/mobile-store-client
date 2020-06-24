import LoadingPage from "../../src/components/common/LoadingPage";
import React from 'react';
import {shallow} from 'enzyme';

describe('Loading Render', () => {
    it('renders without crashing', () => {
        shallow(<LoadingPage/>);
    });
})
