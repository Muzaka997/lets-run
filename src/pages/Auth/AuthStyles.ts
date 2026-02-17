import styled from "styled-components";

export const AuthWrap = styled.div`
  max-width: 560px;
  margin: 3rem auto;
  padding: 0 16px;
`;

export const AuthCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
`;

export const Heading = styled.h1`
  margin: 0 0 12px;
  font-size: 22px;
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 1 220px;
  min-width: 200px;
`;

export const Label = styled.label`
  font-size: 12px;
  color: #6b7280;
`;

export const Input = styled.input`
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

export const Select = styled.select`
  height: 40px;
  padding: 0 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  outline: none;
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const Button = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #111827;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.02s ease,
    box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const Note = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: #6b7280;
`;
