import configureStore from 'redux-mock-store';

const middlewares = [];
const mockStore = configureStore(middlewares)

export function createMockStore() {
    const initialState = {};
    const store = mockStore(initialState);
    return store;
}
