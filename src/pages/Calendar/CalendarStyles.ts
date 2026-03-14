import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const CalWrap = styled.div`
  max-width: 980px;
  margin: 2rem auto;
  padding: 0 16px;
  animation: ${fadeIn} 0.35s ease-out;
`;

export const CalHeading = styled.h1`
  margin: 8px 0 12px;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #0ea5e9 0%, #22c55e 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const CalCard = styled.div`
  margin-bottom: 16px;
  padding: 12px 16px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 14px;
  background: rgba(2, 6, 23, 0.7);
  color: #e5e7eb;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.25);
  backdrop-filter: blur(6px);
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  height: 40px;
  padding: 0 12px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  color: #e5e7eb;
  background: rgba(2, 6, 23, 0.55);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
  &::placeholder {
    color: #94a3b8;
  }
  &:hover {
    background: rgba(2, 6, 23, 0.6);
    border-color: rgba(148, 163, 184, 0.45);
  }
  &:focus {
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
  }
`;

export const Select = styled.select`
  height: 40px;
  padding: 0 12px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  color: #e5e7eb;
  background: rgba(2, 6, 23, 0.55);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
  &:hover {
    background: rgba(2, 6, 23, 0.6);
    border-color: rgba(148, 163, 184, 0.45);
  }
  &:focus {
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
  }
`;

export const Button = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid #22c55e;
  background: #22c55e;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(34, 197, 94, 0.25);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);
  }
`;

export const DangerButton = styled.button`
  height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid #ef4444;
  background: #ef4444;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
  &:hover {
    opacity: 0.95;
    transform: translateY(-1px);
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 12px;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 12px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 12px;
  background: rgba(2, 6, 23, 0.6);
  color: #e5e7eb;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.25);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.35);
    background: rgba(2, 6, 23, 0.75);
    border-color: rgba(148, 163, 184, 0.4);
  }
`;

export const Title = styled.div`
  font-weight: 700;
  color: #e5e7eb;
`;

export const Meta = styled.div`
  font-size: 13px;
  margin-top: 4px;
  color: #94a3b8;
`;

export const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const KindBadge = styled.span<{ $kind: "TODO" | "NOT_TODO" }>`
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: ${({ $kind }) => ($kind === "NOT_TODO" ? "#9a3412" : "#1e40af")};
  background: ${({ $kind }) => ($kind === "NOT_TODO" ? "#ffedd5" : "#dbeafe")};
  border: 1px solid
    ${({ $kind }) => ($kind === "NOT_TODO" ? "#fdba74" : "#bfdbfe")};
`;

export const ErrorText = styled.div`
  color: #b91c1c;
  font-size: 14px;
`;
