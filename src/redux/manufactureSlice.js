import {createSlice} from "@reduxjs/toolkit";
import {initialStateBase, searchERBase, searchThunkBase} from "./ReduxSliceBase";

const resourceName = 'manufacture';

//Action creator
export const searchManufacture = searchThunkBase(resourceName);

export const manufactureSlice = createSlice({
    name: resourceName,
    initialState: {...initialStateBase()},
    reducers: {},
    extraReducers: {
        ...searchERBase(searchManufacture),
    }
});


//Export
// export const {clearInputs, selectCategory, addCategory} = categorySlice.actions;
export const manufactureSelector = (state) => state[resourceName];
const manufactureRoot = manufactureSlice.reducer;
export default manufactureRoot;
