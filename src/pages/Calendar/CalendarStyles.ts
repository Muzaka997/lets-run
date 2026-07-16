import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const itemIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const CalWrap = styled.div`
  max-width: 980px;
  margin: 0 auto;
  animation: ${fadeIn} 0.35s ease-out;
`;

export const CalHeading = styled.h1`
  margin: 0 0 4px;
  font-size: 30px;
  font-weight: 800;
  background: var(--grad-calendar);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  width: fit-content;
`;

export const CalSubhead = styled.p`
  margin: 0 0 20px;
  color: var(--text-2);
  font-size: 14.5px;
`;

export const CalCard = styled.div`
  margin-bottom: 16px;
  padding: 16px 18px;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  background: var(--surface);
  color: var(--text);
  box-shadow: var(--shadow-md);
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  label {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text-2);
  }
`;

const control = `
  height: 42px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  font-size: 14px;
  outline: none;
  color: var(--text);
  background: var(--surface-muted);
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  &::placeholder { color: var(--text-3); }
  &:hover { border-color: var(--border-strong); }
  &:focus {
    background: var(--surface);
    border-color: var(--sky);
    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.16);
  }
`;

export const Input = styled.input`
  ${control}
  flex: 1;
  min-width: 150px;
`;

export const Select = styled.select`
  ${control}
`;

export const Button = styled.button`
  height: 42px;
  padding: 0 18px;
  border-radius: var(--r-md);
  border: 1px solid transparent;
  background: var(--grad-calendar);
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  transition:
    transform 0.14s ease,
    box-shadow 0.18s ease,
    filter 0.14s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 26px rgba(14, 165, 233, 0.3);
  }
  &:active {
    transform: translateY(0);
    filter: brightness(0.98);
  }
`;

export const DangerButton = styled.button`
  height: 36px;
  padding: 0 13px;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-2);
  font-weight: 600;
  font-size: 13px;
  flex: none;
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

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
`;

export const Item = styled.li<{ $i?: number }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 16px;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  background: var(--surface);
  color: var(--text);
  box-shadow: var(--shadow-sm);
  animation: ${itemIn} 0.35s ease both;
  animation-delay: ${({ $i = 0 }) => Math.min($i * 45, 350)}ms;
  transition:
    transform 0.14s ease,
    box-shadow 0.14s ease,
    border-color 0.14s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
    border-color: var(--border-strong);
  }
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: var(--text);
`;

export const Meta = styled.div`
  font-size: 13px;
  margin-top: 4px;
  color: var(--text-2);
`;

export const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const KindBadge = styled.span<{ $kind: "TODO" | "NOT_TODO" }>`
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: var(--r-pill);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${({ $kind }) =>
    $kind === "NOT_TODO" ? "var(--chip-warn-text)" : "var(--chip-info-text)"};
  background: ${({ $kind }) =>
    $kind === "NOT_TODO" ? "var(--chip-warn-bg)" : "var(--chip-info-bg)"};
`;

export const ErrorText = styled.div`
  color: var(--danger-600);
  font-size: 14px;
`;
