import React from 'react';
import styled from 'styled-components';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Wrapper = styled.span`
  width: 20px;
  position: relative;

  svg {
    position: absolute;
    left: 0;
    top: -4px;
  }

  svg:nth-child(2) {
    top: 1px;
  }
`;

const SortIcon = () => {
  return (
    <Wrapper>
      <ArrowDropUpIcon />
      <ArrowDropDownIcon />
    </Wrapper>
  );
};

export default SortIcon;
