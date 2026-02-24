import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const HomeWrap = styled.div`
  max-width: 820px;
  margin: 2rem auto;
  padding: 0 16px;
  animation: ${fadeIn} 0.4s ease-out;
`;

export const HomeTitle = styled.h1`
  margin: 0;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #6366f1 0%, #22c55e 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const HomeLead = styled.p`
  color: #4b5563;
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.6;
  max-width: 640px;
`;

export const FeatureList = styled.ul`
  margin-top: 16px;
  color: #374151;
  padding-left: 0;
  list-style: none;
  display: grid;
  gap: 10px;
`;

export const FeatureItem = styled.li`
  position: relative;
  margin: 0;
  padding: 12px 14px 12px 44px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
    border-color: #d1d5db;
  }

  &::before {
    content: "✓";
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    font-size: 12px;
    font-weight: 700;
    color: #16a34a;
    background: #dcfce7;
    box-shadow: inset 0 0 0 1px rgba(22, 163, 74, 0.25);
  }
`;
