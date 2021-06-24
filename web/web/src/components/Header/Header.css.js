import styled from 'styled-components';
import { device } from 'styles/devices';

export const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  list-style: none;
`;

export const Items = styled.div`
  display: flex;

`;
export const NavList = styled.li`
  display: grid;
  
  a {
    display: flex;
    font-weight: 600;
    font-size: 15px;
    color: ${({ theme }) => theme.navNotActive};
    padding: 15px;

    &.active {
      border-radius: 6px;
      border-bottom: 3px solid ${({ theme }) => theme.navActive};
      color: ${({ theme }) => theme.navActive};
    }
  }
  
  @media ${device.mobileM} {
    a {
      font-size: 15px;
      padding:10px;
    }
  }
`;

export const NavPart = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Logout = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  a {
    font-weight: 600;
    font-size: 15px;
    color: ${({ theme }) => theme.navNotActive};
    padding: 5px;
  }
`;