import {createSlice} from "@reduxjs/toolkit";
import {
    createERBase,
    createThunkBase,
    deleteERBase,
    deleteThunkBase,
    getByIdERBase,
    getByIdThunkBase,
    initialStateBase,
    searchERBase,
    searchThunkBase,
    updateERBase,
    updateThunkBase
} from "./ReduxSliceBase";

const resourceName = 'orders';

//Action creator
export const searchOrder = searchThunkBase(resourceName);
export const getOrderById = getByIdThunkBase(resourceName);
export const createOrder = createThunkBase(resourceName);
export const updateOrder = updateThunkBase(resourceName);
export const deleteOrder = deleteThunkBase(resourceName);

export const orderSlice = createSlice({
    name: resourceName,
    initialState: {...initialStateBase()},
    reducers: {},
    extraReducers: {
        ...searchERBase(searchOrder),
        ...getByIdERBase(getOrderById),
        ...createERBase(createOrder),
        ...updateERBase(updateOrder),
        ...deleteERBase(deleteOrder),
    }
});

//Export
// export const {filterOrder, selectOrder} = orderSlice.actions;
export const orderSelector = (state) => state[resourceName];
const orderRoot = orderSlice.reducer;
export default orderRoot;
