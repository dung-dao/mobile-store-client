import {createSlice} from '@reduxjs/toolkit'

const ModalType = {
    confirm: {
        title: 'Xác nhận',
        bodyPrefix: 'Bạn có chắc chắn muốn'
    },
};

const popup = createSlice({
    name: 'popup',
    initialState: {
        visible: false,
        title: ModalType.confirm.title,
        body: `${ModalType.confirm.bodyPrefix} làm gì đó`,
        onOk: async () => {
        },
        onCancel: () => {
        }
    },
    reducers: {
        showModal: (state, action) => {
            const {onOk, actionName} = action.payload;
            if (onOk) state.onOk = onOk;
            state.body = `${ModalType.confirm.bodyPrefix} ${actionName}?`;
            state.visible = true;
        },
        hideModal: (state, action) => {
            state.visible = false;
        }
    },
    // "builder callback API", recommended for TypeScript users
    extraReducers: {}
});

export const popupSelector = (state) => state.popup;
export const popupRoot = popup.reducer;
export const {showModal, hideModal} = popup.actions;
