import React from 'react';
import renderer from 'react-test-renderer';
import IF from "../src/components/common/IF";


describe('IF children', () => {
    it('should be null when condition is false', function () {
        const emptyTree = renderer.create(<IF condt={false}>a</IF>).toJSON();
        expect(emptyTree).toBe(null);
    });

    it('Should match snapshot', () => {
        const tree = renderer.create(<IF condt={true}>a</IF>).toJSON();
        expect(tree).toMatchSnapshot()
    });
})


