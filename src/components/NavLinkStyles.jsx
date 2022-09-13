import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  margin-right: 10px;

  &.active {
    color: orange;
  }
`;

export const Nav = styled.nav`
  padding-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px;
`;
