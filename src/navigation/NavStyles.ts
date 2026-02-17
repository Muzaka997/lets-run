import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Nav = styled.nav`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const NavA = styled(NavLink)`
  color: #374151;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  &:hover {
    background: #f3f4f6;
  }
  &.active {
    color: #111827;
    background: #e5e7eb;
    font-weight: 600;
  }
`;
