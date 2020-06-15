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

const resourceName = 'products';

//Action creator
export const searchProduct = searchThunkBase(resourceName);
export const getProductById = getByIdThunkBase(resourceName);
export const createProduct = createThunkBase(resourceName);
export const updateProduct = updateThunkBase(resourceName);
export const deleteProduct = deleteThunkBase(resourceName);

export const productSlice = createSlice({
    name: resourceName,
    initialState: {...initialStateBase(), orderProductList: []},
    reducers: {
        clearInputs: (state, action) => {
            state.filteredItems = [];
            state.orderProductList = [];
        },
        addProduct: (state, action) => {
            if (!action.payload)
                return;
            const detail = {...action.payload};
            console.log(detail);
            state.orderProductList = [...state.orderProductList, {
                ...detail.product,
                quantity: detail.quantity,
                totalUnit: detail.product.amount * detail.quantity
            }];
            //     state => {
            // if (state.detailItem)
            //     state.orderProductList.push(state.detailItem);
            // state.detailItem = null;
        }
    },
    extraReducers: {
        ...searchERBase(searchProduct),
        ...getByIdERBase(getProductById),
        ...createERBase(createProduct),
        ...updateERBase(updateProduct),
        ...deleteERBase(deleteProduct)
    }
});

//Export
export const {clearInputs, selectProduct, filterProduct, addProduct} = productSlice.actions;
export const productSelector = (state) => state[resourceName];
const productRoot = productSlice.reducer;
export default productRoot;
