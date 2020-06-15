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
import _ from 'lodash';

const resourceName = 'customers';

//Action creator
export const searchCustomer = searchThunkBase(resourceName);
export const getCustomerById = getByIdThunkBase(resourceName);
export const createCustomer = createThunkBase(resourceName);
export const updateCustomer = updateThunkBase(resourceName);
export const deleteCustomer = deleteThunkBase(resourceName);

export const customerSlice = createSlice({
    name: resourceName,
    initialState: {...initialStateBase(), filteredItems: []},
    reducers: {
        filterCustomer: (state, action) => {
            const filterString = action.payload;
            if (filterString === '' || !filterString.length)
                state.filteredItems = state.items;
            else {
                state.filteredItems = _.slice(state.items.filter(item => {
                    return _.includes(`${item.name} - ${item.phone}`, filterString);
                }), 0, 10);
            }
            // console.log(filterString);
        },
        selectCustomer: ((state, action) => {
            console.log(action.payload);
            console.log(action.payload.split(' - '));
            try {
                const phone = action.payload.split(' - ')[1];
                state.detailItem = state.items.find(item => item.phone == phone);
            } catch (e) {
                console.log(e);
            }
        }),
        clearCustomerDetail: (state, action) => {
            state.filteredItems = [];
        }
    },
    extraReducers: {
        ...searchERBase(searchCustomer),
        ...getByIdERBase(getCustomerById),
        ...createERBase(createCustomer),
        ...updateERBase(updateCustomer),
        ...deleteERBase(deleteCustomer),
    }
});

//Export
export const {filterCustomer, selectCustomer} = customerSlice.actions;
export const customerSelector = (state) => state[resourceName];
const customerRoot = customerSlice.reducer;
export default customerRoot;
