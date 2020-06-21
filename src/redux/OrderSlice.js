import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getByIdERBase, getByIdThunkBase, initialStateBase, searchERBase} from "./ReduxSliceBase";
import http from "../services/http";
import {generateKey} from "../utils/ObjectUtils";

const resourceName = 'orders';

//Action creator
export const searchOrder = createAsyncThunk(
    `${resourceName}/search`,
    async (item) => {
        const items = await http.get("/" + resourceName, {
            params: {...item, orderTypeId: 2},
        });
        return generateKey(items.data);
    }
);

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
