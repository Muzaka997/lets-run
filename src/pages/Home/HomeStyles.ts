import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const HomeWrap = styled.div`
  max-width: 960px;
  margin: 0 auto;
  animation: ${fadeIn} 0.4s ease-out;
`;

/* Hero banner */
export const Hero = styled.div`
  position: relative;
  overflow: hidden;
  padding: 34px 32px;
  border-radius: var(--r-xl);
  color: #fff;
  background: var(--grad-brand);
  box-shadow: 0 20px 44px rgba(99, 102, 241, 0.32);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(420px 220px at 100% 0%, rgba(255, 255, 255, 0.25), transparent 60%),
      radial-gradient(360px 220px at 0% 100%, rgba(255, 255, 255, 0.12), transparent 55%);
    pointer-events: none;
  }
`;

export const Eyebrow = styled.div`
  position: relative;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  opacity: 0.9;
`;

export const HomeTitle = styled.h1`
  position: relative;
  margin: 8px 0 0;
  font-size: 34px;
  font-weight: 800;
`;

export const HomeLead = styled.p`
  position: relative;
  margin: 12px 0 0;
  font-size: 15.5px;
  line-height: 1.6;
  max-width: 620px;
  opacity: 0.95;
`;

export const HeroActions = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 22px;
`;

export const HeroButton = styled(Link)<{ $ghost?: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  border-radius: var(--r-md);
  font-weight: 700;
  font-size: 14.5px;
  transition:
    transform 0.14s ease,
    box-shadow 0.18s ease,
    background 0.15s ease;

  ${({ $ghost }) =>
    $ghost
      ? `
    color: #fff;
    background: rgba(255, 255, 255, 0.16);
    border: 1px solid rgba(255, 255, 255, 0.4);
    &:hover { color: #fff; background: rgba(255, 255, 255, 0.26); transform: translateY(-1px); }
  `
      : `
    color: #4f46e5;
    background: #fff;
    &:hover { color: #4f46e5; transform: translateY(-1px); box-shadow: 0 12px 26px rgba(2, 6, 23, 0.22); }
  `}
`;

export const SectionTitle = styled.h2`
  margin: 34px 0 14px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
`;

/* Quick-link cards */
export const FeatureList = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`;

export const FeatureItem = styled(Link)`
  display: block;
  padding: 20px;
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  color: var(--text);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--border-strong);
    color: var(--text);
  }
`;

export const FeatureIcon = styled.div<{ $grad?: string }>`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 20px;
  margin-bottom: 14px;
  color: #fff;
  background: ${({ $grad }) => $grad ?? "var(--grad-brand)"};
`;

export const FeatureName = styled.div`
  font-weight: 700;
  font-size: 15.5px;
`;

export const FeatureDesc = styled.div`
  margin-top: 5px;
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--text-2);
`;
