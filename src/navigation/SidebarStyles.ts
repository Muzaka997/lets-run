import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Shell = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.aside`
  width: 220px;
  padding: 16px;
  border-right: 1px solid #e5e7eb;
  background: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  box-sizing: border-box;
  box-shadow: 2px 0 24px rgba(15, 23, 42, 0.06);
  animation: ${fadeIn} 0.35s ease-out;
`;

export const Main = styled.main`
  flex: 1;
  padding: 24px;
  margin-left: 220px; /* offset for fixed sidebar */
`;

export const Brand = styled.div`
  font-weight: 800;
  font-size: 20px;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const VNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const VLink = styled(NavLink)`
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

export const SidebarFooter = styled.div`
  margin-top: auto;
  font-size: 12px;
  color: #6b7280;
`;
