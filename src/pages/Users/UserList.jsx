import React from "react";
import DataTable from "../../components/common/DataTable";
import {useDispatch, useSelector} from "react-redux";
import {sort} from "../../utils/sort";
import PropTypes from "prop-types";
import LoadingPage from "../../components/common/LoadingPage";
import {allUsersSelector, deleteUser, searchUser} from "../../redux/AllUsersSlice";

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
                title="Danh sách tài khoản"
                columns={[
                    {
                        title: "ID",
                        key: "id",
                        dataIndex: "id",
                        sorter: sort('id')
                    },
                    {
                        title: "Họ tên",
                        key: "fullname",
                        dataIndex: "fullname",
                        sorter: sort('fullname')
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
                searchColumns={[
                    {
                        title: "ID",
                        key: "id",
                        dataIndex: "id",
                        sorter: sort('id')
                    },
                    {
                        title: "Họ tên",
                        key: "fullname",
                        dataIndex: "fullname",
                        sorter: sort('fullname')
                    },
                    {
                        title: "Tên đăng nhập",
                        key: "name",
                        dataIndex: "name",
                        sorter: sort('name')
                    }
                ]}
                dataSource={selector['items']}
                resourceName={resourceName}
                deleteAC={deleteUser}
                searchAC={searchUser}
                defaultSearchField="name"
                onSearch={(values) => dispatch(searchUser(values))}
                onReload={() => dispatch(searchUser())}
            />
        </React.Fragment>
    );
};

UserList.propTypes = {
    isToSelect: PropTypes.bool.isRequired
};

export default UserList;
