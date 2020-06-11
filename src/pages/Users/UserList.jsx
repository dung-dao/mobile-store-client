import React, {useEffect, useState} from "react";
import DataTable from "../../components/common/DataTable";
import {useDispatch, useSelector} from "react-redux";
import {sort} from "../../utils/sort";
import PropTypes, {bool} from "prop-types";
import LoadingPage from "../../components/common/LoadingPage";
import {allUsersSelector, deleteUser, searchUser} from "../../redux/allUsersSlice";

const resourceName = 'users';

const UserList = (props) => {
    //Data Hook
    const dispatch = useDispatch();
    const selector = useSelector(allUsersSelector);

    if (selector.isFetching)
        return <LoadingPage/>

    return (
        <React.Fragment>
            <DataTable
                title="Danh sách người dùng"
                columns={[
                    {
                        title: "ID",
                        key: "id",
                        dataIndex: "id",
                        sorter: sort('id')
                    },
                    {
                        title: "Tên đăng nhập",
                        key: "name",
                        dataIndex: "name",
                        sorter: sort('name')
                    },
                    {
                        title: "Vai trò",
                        key: "role",
                        dataIndex: "role",
                        sorter: sort('role')
                    }
                ]}
                dataSource={selector['items']}
                resourceName={resourceName}
                deleteAC={deleteUser}
                searchAC={searchUser}
            />
        </React.Fragment>
    );
};

UserList.propTypes = {
    isToSelect: PropTypes.bool.isRequired
};

export default UserList;
