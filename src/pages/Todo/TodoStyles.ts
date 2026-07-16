import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const itemIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const TodoWrap = styled.div`
  max-width: 880px;
  margin: 0 auto;
  animation: ${fadeIn} 0.35s ease-out;
`;

/* Top account strip */
export const TodoCard = styled.div`
  display: flex;
  margin-bottom: 22px;
`;

export const TodoRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

export const TodoSmall = styled.div`
  font-size: 13.5px;
  color: var(--text-2);
`;

export const TodoHeading = styled.h1`
  margin: 0 0 4px;
  font-size: 30px;
  font-weight: 800;
  background: var(--grad-todo);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  width: fit-content;
`;

export const TodoSubhead = styled.p`
  margin: 0 0 20px;
  color: var(--text-2);
  font-size: 14.5px;
`;

/* Add-task form as an elevated toolbar card */
export const TodoForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-md);

  @media (min-width: 640px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

export const TodoInput = styled.input`
  height: 44px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  font-size: 14px;
  outline: none;
  background: var(--surface-muted);
  color: var(--text);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;

  &::placeholder {
    color: var(--text-3);
  }
  &:hover {
    border-color: var(--border-strong);
  }
  &:focus {
    background: var(--surface);
    border-color: var(--primary);
    box-shadow: 0 0 0 4px var(--primary-ring);
  }

  /* Title field spans the full width on top row */
  &:first-child {
    grid-column: 1 / -1;
    @media (min-width: 640px) {
      grid-column: auto;
    }
  }
`;

export const TodoButton = styled.button`
  height: 44px;
  padding: 0 18px;
  border-radius: var(--r-md);
  border: 1px solid transparent;
  background: var(--grad-todo);
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  grid-column: 1 / -1;
  transition:
    transform 0.14s ease,
    box-shadow 0.18s ease,
    filter 0.14s ease;

  @media (min-width: 640px) {
    grid-column: auto;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 26px rgba(99, 102, 241, 0.32);
  }
  &:active {
    transform: translateY(0);
    filter: brightness(0.98);
  }
`;

export const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 22px 0 0;
  display: grid;
  gap: 10px;
`;

export const TodoItem = styled.li<{ $i?: number }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
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

export const TodoTitle = styled.span<{ $completed: boolean }>`
  position: relative;
  align-self: flex-start;
  font-weight: 600;
  font-size: 15px;
  color: ${({ $completed }) => ($completed ? "var(--text-3)" : "var(--text)")};
  transition: color 0.25s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    height: 2px;
    width: 100%;
    background: currentColor;
    transform: scaleX(${({ $completed }) => ($completed ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.28s ease;
  }
`;

export const TodoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

export const TodoMeta = styled.div`
  font-size: 12.5px;
  color: var(--text-2);
`;

export const TagRow = styled.div`
  margin-top: 2px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const TagChip = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: var(--r-pill);
  background: var(--primary-soft);
  color: var(--primary-600);
`;

export const TodoDangerButton = styled.button`
  height: 34px;
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
