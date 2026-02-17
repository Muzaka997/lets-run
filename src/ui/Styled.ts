import styled from "styled-components";

export const AppWrap = styled.div`
  max-width: 820px;
  margin: 2rem auto;
`;

export const Card = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
`;

export const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
`;

export const TextInput = styled.input`
  flex: 1;
  padding: 8px;
`;

export const SmallText = styled.div`
  font-size: 14px;
  color: #555;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 16px;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

export const TitleText = styled.span<{ $completed: boolean }>`
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  flex: 1;
`;

export const AddForm = styled.form`
  display: flex;
  gap: 8px;
`;
