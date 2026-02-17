import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Shell = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.aside`
  width: 220px;
  padding: 16px;
  border-right: 1px solid #e5e7eb;
  background: #fafafa;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  box-sizing: border-box;
`;

export const Main = styled.main`
  flex: 1;
  padding: 16px;
  margin-left: 220px; /* offset for fixed sidebar */
`;

export const Brand = styled.div`
  font-weight: 800;
  font-size: 18px;
  margin-bottom: 16px;
`;

export const VNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const VLink = styled(NavLink)`
  color: #374151;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 8px;
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

export const SidebarFooter = styled.div`
  margin-top: auto;
  font-size: 12px;
  color: #6b7280;
`;
