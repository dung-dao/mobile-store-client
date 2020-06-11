import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {
    createERBase,
    createThunkBase, deleteERBase,
    deleteThunkBase, getByIdERBase,
    getByIdThunkBase,
    initialStateBase, searchERBase,
    searchThunkBase, updateERBase,
    updateThunkBase
} from "./baseReducers";

const resourceName = 'customers';

//Action creator
export const searchCustomer = searchThunkBase(resourceName);
export const getCustomerById = getByIdThunkBase(resourceName);
export const createCustomer = createThunkBase(resourceName);
export const updateCustomer = updateThunkBase(resourceName);
export const deleteCustomer = deleteThunkBase(resourceName);

export const customerSlice = createSlice({
    name: resourceName,
    initialState: initialStateBase(),
    reducers: {},
    extraReducers: {
        ...searchERBase(searchCustomer),
        ...getByIdERBase(searchCustomer),
        ...createERBase(searchCustomer),
        ...updateERBase(searchCustomer),
        ...deleteERBase(searchCustomer)
    }
});

//Export
// export const {} = customerSlice.actions;
export const customerSelector = (state) => state[resourceName];
const customerRoot = customerSlice.reducer;
export default customerRoot;
