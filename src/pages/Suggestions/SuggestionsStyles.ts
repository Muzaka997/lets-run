import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const itemIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const SuggestionsWrap = styled.div`
  max-width: 960px;
  margin: 0 auto;
  animation: ${fadeIn} 0.35s ease-out;
`;

export const SuggestionsHeading = styled.h1`
  margin: 0 0 4px;
  font-size: 30px;
  font-weight: 800;
  background: var(--grad-brand);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  width: fit-content;
`;

export const SuggestionsSubhead = styled.p`
  margin: 0 0 22px;
  color: var(--text-2);
  font-size: 14.5px;
`;

export const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

export const SuggestionsItem = styled.li<{ $i?: number }>`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-sm);
  animation: ${itemIn} 0.35s ease both;
  animation-delay: ${({ $i = 0 }) => Math.min($i * 45, 350)}ms;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--border-strong);
  }
`;

export const SuggestionsDetails = styled.div`
  flex: 1;
`;

export const SuggestionsTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: var(--text);
`;

export const SuggestionsMeta = styled.div`
  font-size: 12.5px;
  color: var(--text-2);
  margin-top: 5px;
`;

export const TagRow = styled.div`
  margin-top: 12px;
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

export const SuggestionsButton = styled.button`
  height: 42px;
  padding: 0 14px;
  border-radius: var(--r-md);
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--primary-600);
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    transform 0.14s ease;

  &:hover {
    transform: translateY(-1px);
    background: var(--grad-brand);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 10px 22px rgba(99, 102, 241, 0.28);
  }
  &:active {
    transform: translateY(0);
  }
`;
