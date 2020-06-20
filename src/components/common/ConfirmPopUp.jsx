import React from 'react';
import {Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {hideModal, popupSelector} from "../../redux/PopUpSlice";

//Need state save on parent component

const ConfirmPopUp = () => {
    const popup = useSelector(popupSelector);
    const dispatch = useDispatch();

    return (
        <div>
            <Modal
                title={popup.title}
                visible={popup.visible}
                onOk={async () => {
                    await popup.onOk();
                    dispatch(hideModal());
                }}
                onCancel={() => dispatch(hideModal())}
                okText="Đồng ý"
                cancelText="Hủy"
            >
                {popup.body}
            </Modal>
        </div>
    );
};

// ConfirmPopUp.propTypes = {
//     title: PropTypes.string.isRequired,
//     visible: PropTypes.bool.isRequired,
//     onOk: PropTypes.func.isRequired,
//     onCancel: PropTypes.func.isRequired
// };

export default ConfirmPopUp;
