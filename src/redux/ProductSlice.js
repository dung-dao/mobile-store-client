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

const resourceName = 'products';

//Action creator
export const searchProduct = searchThunkBase(resourceName);
export const getProductById = getByIdThunkBase(resourceName);
export const createProduct = createThunkBase(resourceName);
export const updateProduct = updateThunkBase(resourceName);
export const deleteProduct = deleteThunkBase(resourceName);

export const productSlice = createSlice({
    name: resourceName,
    initialState: {...initialStateBase()},
    reducers: {},
    extraReducers: {
        ...searchERBase(searchProduct),
        ...getByIdERBase(getProductById),
        ...createERBase(createProduct),
        ...updateERBase(updateProduct),
        ...deleteERBase(deleteProduct)
    }
});

//Export
// export const {} = productSlice.actions;
export const productSelector = (state) => state[resourceName];
const productRoot = productSlice.reducer;
export default productRoot;
