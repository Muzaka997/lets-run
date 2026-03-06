import styled, { keyframes } from "styled-components";

// Entrance animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Page wrapper with subtle gradient background
export const AuthWrap = styled.div`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 32px 16px;
  background:
    radial-gradient(
      1200px 600px at 10% 0%,
      rgba(99, 102, 241, 0.08),
      transparent 50%
    ),
    radial-gradient(
      1000px 600px at 90% 100%,
      rgba(6, 182, 212, 0.08),
      transparent 50%
    ),
    #0b1020;
`;

// Card container with glassy look
export const AuthCard = styled.div`
  width: 100%;
  max-width: 720px;
  border-radius: 16px;
  padding: 28px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.04)
  );
  backdrop-filter: blur(10px);
  box-shadow:
    0 10px 30px rgba(2, 6, 23, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  color: #e5e7eb;
  animation: ${fadeIn} 0.4s ease-out;

  @media (min-width: 720px) {
    padding: 34px;
  }
`;

export const Heading = styled.h1`
  margin: 0 0 18px;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(90deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

// Responsive two-column grid for fields
export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px 12px;
  margin-top: 8px;

  @media (min-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

export const Label = styled.label`
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #9ca3af;
`;

const interactiveCommon = `
  height: 44px;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  color: #e5e7eb;
  background: rgba(2, 6, 23, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow:
    0 1px 1px rgba(2, 6, 23, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, transform 0.05s ease;
  &::placeholder { color: #94a3b8; }
  &:hover {
    background: rgba(2, 6, 23, 0.6);
    border-color: rgba(148, 163, 184, 0.35);
  }
  &:focus {
    border-color: #60a5fa;
    box-shadow:
      0 0 0 4px rgba(96, 165, 250, 0.18),
      0 1px 1px rgba(2, 6, 23, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
`;

export const Input = styled.input`
  ${interactiveCommon}
  padding: 0 14px;
`;

export const Select = styled.select`
  ${interactiveCommon}
  padding: 0 12px;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
`;

export const Button = styled.button`
  position: relative;
  height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  border: 1px solid transparent;
  color: #0b1020;
  background: linear-gradient(180deg, #60a5fa, #3b82f6);
  box-shadow:
    0 8px 18px rgba(59, 130, 246, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition:
    transform 0.12s ease,
    box-shadow 0.2s ease,
    filter 0.12s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow:
      0 12px 26px rgba(59, 130, 246, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 6px 14px rgba(59, 130, 246, 0.35);
    filter: brightness(0.98);
  }

  // First button (Sign up) as outline/ghost variant for visual contrast
  &:first-child {
    background: transparent;
    color: #e5e7eb;
    border-color: rgba(148, 163, 184, 0.35);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
  &:first-child:hover {
    background: rgba(148, 163, 184, 0.08);
    border-color: rgba(148, 163, 184, 0.5);
    box-shadow:
      0 6px 16px rgba(2, 6, 23, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
`;

export const Note = styled.div`
  margin-top: 12px;
  font-size: 13px;
  color: #9ca3af;
`;
