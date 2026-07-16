import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Full-screen wrapper with a soft, colorful mesh backdrop
export const AuthWrap = styled.div`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 32px 16px;
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 460px;
  border-radius: var(--r-xl);
  padding: 34px 30px;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-lg);
  animation: ${fadeIn} 0.4s ease-out;

  @media (min-width: 560px) {
    padding: 40px 38px;
  }
`;

export const BrandMark = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 26px;
  margin: 0 auto 18px;
  background: var(--grad-brand);
  box-shadow: 0 10px 24px rgba(99, 102, 241, 0.4);
`;

export const Heading = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 27px;
  font-weight: 800;
  color: var(--text);
`;

export const Subtitle = styled.p`
  margin: 8px 0 24px;
  text-align: center;
  font-size: 14.5px;
  color: var(--text-2);
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;

  @media (min-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text-2);
`;

const control = `
  height: 46px;
  border-radius: var(--r-md);
  font-size: 14.5px;
  outline: none;
  color: var(--text);
  background: var(--surface-muted);
  border: 1px solid var(--border);
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  &::placeholder { color: var(--text-3); }
  &:hover { border-color: var(--border-strong); }
  &:focus {
    background: var(--surface);
    border-color: var(--primary);
    box-shadow: 0 0 0 4px var(--primary-ring);
  }
`;

export const Input = styled.input`
  ${control}
  padding: 0 14px;
`;

export const Select = styled.select`
  ${control}
  padding: 0 12px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 26px;
`;

export const Button = styled.button<{ $primary?: boolean }>`
  flex: 1;
  height: 46px;
  border-radius: var(--r-md);
  font-weight: 700;
  font-size: 14.5px;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition:
    transform 0.12s ease,
    box-shadow 0.2s ease,
    background 0.15s ease,
    border-color 0.15s ease;

  ${({ $primary }) =>
    $primary
      ? `
    color: #fff;
    border: 1px solid transparent;
    background: var(--grad-brand);
    box-shadow: 0 10px 22px rgba(99, 102, 241, 0.35);
    &:hover { transform: translateY(-1px); box-shadow: 0 14px 30px rgba(99, 102, 241, 0.45); }
    &:active { transform: translateY(0); }
  `
      : `
    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--border-strong);
    &:hover { transform: translateY(-1px); background: var(--surface-muted); border-color: var(--text-3); }
    &:active { transform: translateY(0); }
  `}
`;

export const Note = styled.div<{ $error?: boolean }>`
  margin-top: 18px;
  text-align: center;
  font-size: 13px;
  color: ${({ $error }) => ($error ? "var(--danger-600)" : "var(--text-3)")};
`;
