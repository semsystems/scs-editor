import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { decorators } from "react-treebeard";
import React from "react";

export const Div = styled('div', {
  shouldForwardProp: prop => ['className', 'children'].indexOf(prop) !== -1
})(({style}) => style);

// Example: Customising The Header Decorator To Include Icons
export const Header = ({style, node}) => {
  const iconType = node.children ? 'folder' : 'file-code-o';
  const iconClass = `fa fa-${iconType}`;
  const iconStyle = {marginRight: '8px', marginLeft: '5px',};

  return (
    <Div style={style.base}>
      <Div style={style.title}>
        <i className={iconClass} style={iconStyle}/>
        {node.name}
      </Div>
    </Div>
  );
};

Header.propTypes = {
  node: PropTypes.object,
  style: PropTypes.object,
};

decorators.Header = Header;
