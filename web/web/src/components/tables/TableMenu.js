import { Button } from 'm-web-components';
import React from 'react';
import styled, { css } from 'styled-components';

const ButtonMenu = styled(Button)`
  border-radius: 0;
  flex-grow: 1;
  margin: 0;
  border: none;
  color: ${({ theme }) => theme.headers};
  transition: 0.3s;
  padding: 7px 15px;
  background-color: ${({ theme }) => theme.primaryWrapper};;
  box-shadow: none;
  font-size: 16px;
  font-weight: 600;

  :hover {
    box-shadow: none;
    transform: none;
  }

  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.headerDarker};
      background-color: ${({ theme }) => theme.secondaryWrapper};
      border: 1px solid ${({ theme }) => theme.border};
      border-bottom: none;

      //trick - button above table border
      transform: translateY(1px);
      padding-bottom: 8px;

      :hover {
        transform: translateY(1px);
        padding-bottom: 8px;
      }
    `}
`;

export const Menu = styled.nav`
  display: flex;
  height: 50px;

  ${({ staticPos }) =>
    staticPos
      ? css`
          margin: 40px 50% 0 20px;
        `
      : css`
          position: absolute;
          bottom: 0;
          left: 20px;
        `}

  ${({ mobile }) =>
    mobile &&
    css`
      margin: 40px 10px 0 10px;
    `}
`;

const TableMenu = ({ buttons, onClick, currentType, staticPos, mobile }) => {
  const renderButtons = buttons.map(button => (
    <ButtonMenu
      key={button.type}
      active={currentType === button.type}
      onClick={() => onClick(button.type)}
    >
      {button.label}
    </ButtonMenu>
  ));

  return (
    <Menu staticPos={staticPos} mobile={mobile}>
      {renderButtons}
    </Menu>
  );
};

export default TableMenu;
