import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const LinkBtn = styled(NavLink)`
  text-decoration: none;
  font-size: 14px;
`;

export const MovieDetails = styled.div`
  display: flex;
  margin-top: 20px;
  padding-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px;

  img {
    margin-right: 10px;
  }
`;

export const AdditionalInfo = styled.div`
  position: relative;

  p{
    &:before {
      content: ' ';
      position: absolute;
      left: 0px;
      right: 0px;
      top: 70px;
      height: 10px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px;
    }
  }
    
  }
`;
