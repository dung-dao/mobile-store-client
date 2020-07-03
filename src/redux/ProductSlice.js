import {createSlice} from "@reduxjs/toolkit";
import {
    createBaseSliceConfig,
    createThunkBase,
    deleteThunkBase,
    getByIdThunkBase,
    searchThunkBase,
    updateThunkBase
} from "./ReduxSliceBase";

const resourceName = 'products';

//Action creator
export const searchProduct = searchThunkBase(resourceName);
export const getProductById = getByIdThunkBase(resourceName);
export const createProduct = createThunkBase(resourceName);
export const updateProduct = updateThunkBase(resourceName);
export const deleteProduct = deleteThunkBase(resourceName);

export const productSlice = createSlice(createBaseSliceConfig(resourceName, searchProduct, getProductById, createProduct, updateProduct, deleteProduct));


//Export
// export const {clearInputs, selectProduct, addProduct} = productSlice.actions;
export const productSelector = (state) => state[resourceName];
const productRoot = productSlice.reducer;
export default productRoot;
