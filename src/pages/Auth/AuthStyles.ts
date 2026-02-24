import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const AuthWrap = styled.div`
  max-width: 560px;
  margin: 3rem auto;
  padding: 0 16px;
  animation: ${fadeIn} 0.35s ease-out;
`;

export const AuthCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 22px;
  background: #fff;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.06);
`;

export const Heading = styled.h1`
  margin: 0 0 12px;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2px;
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
  letter-spacing: 0.01em;
`;

export const Input = styled.input`
  height: 40px;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
  &:hover {
    background: #fafafa;
  }
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;

export const Select = styled.select`
  height: 40px;
  padding: 0 10px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  background: #fff;
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
  &:hover {
    background: #fafafa;
  }
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

export const Note = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: #6b7280;
`;
