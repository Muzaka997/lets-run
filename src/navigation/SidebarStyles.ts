import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
`;

export const Shell = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.aside`
  width: 248px;
  padding: 22px 16px;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-right: 1px solid var(--border);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  box-sizing: border-box;
  box-shadow: 6px 0 32px rgba(15, 23, 42, 0.05);
  animation: ${fadeIn} 0.35s ease-out;
`;

export const Main = styled.main`
  flex: 1;
  min-width: 0;
  padding: 32px 28px 56px;
  margin-left: 248px; /* offset for fixed sidebar */
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  font-weight: 800;
  font-size: 19px;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 4px 6px 22px;
`;

export const BrandMark = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 17px;
  background: var(--grad-brand);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.35);
`;

export const VNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NavSectionLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
  padding: 0 12px;
  margin: 16px 0 6px;
`;

export const VLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 11px;
  color: var(--text-2);
  font-size: 14.5px;
  font-weight: 500;
  text-decoration: none;
  padding: 9px 12px;
  border-radius: var(--r-sm);
  transition:
    background 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;

  svg {
    width: 18px;
    height: 18px;
    flex: none;
    opacity: 0.75;
  }

  &:hover {
    background: var(--surface-hover);
    color: var(--text);
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--primary-ring);
  }
  &.active {
    color: var(--primary-600);
    background: var(--primary-soft);
    font-weight: 600;
    box-shadow: inset 0 0 0 1px rgba(99, 102, 241, 0.14);
  }
  &.active svg {
    opacity: 1;
    color: var(--primary);
  }
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--border);
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: var(--r-pill);
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  background: var(--grad-brand);
`;

export const UserMeta = styled.div`
  min-width: 0;
  line-height: 1.3;
`;

export const UserLabel = styled.div`
  font-size: 11px;
  color: var(--text-3);
`;

export const UserEmail = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FooterActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

export const LogoutButton = styled.button`
  flex: 1;
  height: 38px;
  border-radius: var(--r-sm);
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text-2);
  font-weight: 600;
  font-size: 13.5px;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: var(--danger-soft);
    color: var(--danger-600);
    border-color: var(--danger-soft-border);
  }
`;

export const ThemeToggle = styled.button`
  width: 38px;
  height: 38px;
  flex: none;
  display: grid;
  place-items: center;
  border-radius: var(--r-sm);
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text-2);
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    transform 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: var(--surface-hover);
    color: var(--text);
    border-color: var(--text-3);
  }
  &:active svg {
    transform: rotate(-30deg) scale(0.92);
  }
`;
