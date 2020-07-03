import {createSlice} from "@reduxjs/toolkit";
import {
    createBaseSliceConfig,
    createThunkBase,
    deleteThunkBase,
    getByIdThunkBase,
    searchThunkBase,
    updateThunkBase
} from "./ReduxSliceBase";

const resourceName = 'categories';

//Action creator
export const searchCategory = searchThunkBase(resourceName);
export const getCategoryById = getByIdThunkBase(resourceName);
export const createCategory = createThunkBase(resourceName);
export const updateCategory = updateThunkBase(resourceName);
export const deleteCategory = deleteThunkBase(resourceName);

export const categorySlice = createSlice(createBaseSliceConfig(resourceName, searchCategory, getCategoryById, createCategory, updateCategory, deleteCategory));


//Export
// export const {clearInputs, selectCategory, addCategory} = categorySlice.actions;
export const categorySelector = (state) => state[resourceName];
const categoryRoot = categorySlice.reducer;
export default categoryRoot;
