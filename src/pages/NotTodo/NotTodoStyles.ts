import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const NotTodoWrap = styled.div`
  max-width: 820px;
  margin: 2rem auto;
  padding: 0 16px;
  animation: ${fadeIn} 0.35s ease-out;
`;

export const NotTodoCard = styled.div`
  margin-bottom: 16px;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.06);
`;

export const NotTodoRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const NotTodoSmall = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

export const NotTodoHeading = styled.h1`
  margin: 8px 0 12px;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #22c55e 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const NotTodoForm = styled.form`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const NotTodoInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;

export const NotTodoButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid #6366f1;
  background: #6366f1;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(99, 102, 241, 0.25);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
  }
`;

export const NotTodoDangerButton = styled.button`
  height: 32px;
  padding: 0 10px;
  border-radius: 8px;
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

export const NotTodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 16px;
`;

export const NotTodoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  border-bottom: 1px solid #eef2f7;
  transition: background 0.15s ease;
  &:hover {
    background: #fafafa;
    color: black;
  }
`;

export const NotTodoTitle = styled.span<{ $completed: boolean }>`
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  flex: 1;
`;

export const NotTodoDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const NotTodoMeta = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-top: 2px;
`;

export const TagRow = styled.div`
  margin-top: 4px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const TagChip = styled.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 999px;
  background: #eef2f7;
  color: #334155;
`;
