import React from 'react';
import _ from "lodash";
import {AutoComplete} from "antd";
import PropTypes from "prop-types";

const MAutoComplete = (props) => {
    return (
        <React.fragment>
            <AutoComplete
                filterOption={
                    (inputValue, option) =>
                        _.includes(option.value.toLowerCase(), inputValue.toLowerCase())
                }
                options={props.options}/>
        </React.fragment>
    );
};

MAutoComplete.propTypes = {
    options: PropTypes.array.isRequired
}
export default MAutoComplete;