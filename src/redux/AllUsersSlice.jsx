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
import {createSlice} from "@reduxjs/toolkit";

const resourceName = 'users';

export const searchUser = searchThunkBase(resourceName);
export const getUserById = getByIdThunkBase(resourceName);
export const createUser = createThunkBase(resourceName, '/register');
export const updateUser = updateThunkBase(resourceName);
export const deleteUser = deleteThunkBase(resourceName);

export const allUsersSlice = createSlice({
    name: resourceName,
    initialState: {...initialStateBase()},
    reducers: {},
    extraReducers: {
        ...searchERBase(searchUser),
        ...getByIdERBase(getUserById),
        ...createERBase(createUser),
        ...updateERBase(updateUser),
        ...deleteERBase(deleteUser)
    }
});

//Export
// export const {} = customerSlice.actions;
export const allUsersSelector = (state) => state[resourceName];
const allUsersRoot = allUsersSlice.reducer;
export default allUsersRoot;
