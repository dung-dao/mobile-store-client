import React from 'react';
import {Modal} from "antd";
import PropTypes from "prop-types";

const ModalConfirm = (props) => {
    return (
        <Modal
            title="Xác nhận"
            visible={props.visible}
            onOk={props.onOk}
            onCancel={props.onCancel}
            okText="Đồng ý"
            cancelText="Hủy"
        >
            {`Bạn có chắc chắn muốn ${props.actionName}?`}
        </Modal>
    );
};

ModalConfirm.propTypes = {
    visible: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    actionName: PropTypes.string.isRequired
}

export default ModalConfirm;
