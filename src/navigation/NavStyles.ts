import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 12px;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const NavA = styled(NavLink)`
  color: #374151;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 10px;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;
  &:hover {
    background: #f3f4f6;
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
  &.active {
    color: #111827;
    background: #eef2ff;
    border: 1px solid #dbeafe;
    font-weight: 600;
    box-shadow: 0 2px 10px rgba(99, 102, 241, 0.08);
  }
`;
