import Proptypes from "prop-types";

const IF = (props) => {
  if (props.condt) return props.children;
  else return null;
};

IF.propTypes = {
  condt: Proptypes.bool,
};

export default IF;
