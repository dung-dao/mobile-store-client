import {createSlice} from "@reduxjs/toolkit";
import {getByIdERBase, getByIdThunkBase, initialStateBase, searchERBase, searchThunkBase} from "./ReduxSliceBase";

const resourceName = 'orders';

//Action creator

export const searchOrder = searchThunkBase(resourceName, 'orders/v2');

export const getOrderById = getByIdThunkBase(resourceName);

export const orderSlice = createSlice({
    name: resourceName,
    initialState: {...initialStateBase()},
    reducers: {},
    extraReducers: {
        ...searchERBase(searchOrder),
        ...getByIdERBase(getOrderById),
    }
});

//Export
// export const {filterOrder, selectOrder} = orderSlice.actions;
export const orderSelector = (state) => state[resourceName];
const orderRoot = orderSlice.reducer;
export default orderRoot;
