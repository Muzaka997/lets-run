import styled from "styled-components";

export const NotTodoWrap = styled.div`
  max-width: 820px;
  margin: 2rem auto;
  padding: 0 16px;
`;

export const NotTodoCard = styled.div`
  margin-bottom: 16px;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
  font-size: 24px;
`;

export const NotTodoForm = styled.form`
  display: flex;
  gap: 10px;
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

export const NotTodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 16px;
`;

export const NotTodoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

export const NotTodoTitle = styled.span<{ $completed: boolean }>`
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  flex: 1;
`;
