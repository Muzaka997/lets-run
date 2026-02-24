import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const SuggestionsWrap = styled.div`
  max-width: 820px;
  margin: 2rem auto;
  padding: 0 16px;
  animation: ${fadeIn} 0.35s ease-out;
`;

export const SuggestionsHeading = styled.h2`
  margin: 8px 0 12px;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 12px;
`;

export const SuggestionsItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  border-bottom: 1px solid #eef2f7;
  transition: background 0.15s ease;
  &:hover {
    background: #fafafa;
  }
`;

export const SuggestionsDetails = styled.div`
  flex: 1;
`;

export const SuggestionsTitle = styled.div`
  font-weight: 700;
`;

export const SuggestionsMeta = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-top: 2px;
`;

export const TagRow = styled.div`
  margin-top: 4px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const TagChip = styled.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 999px;
  background: #eef2f7;
  color: #334155;
`;

export const SuggestionsButton = styled.button`
  height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid #6366f1;
  background: #6366f1;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
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
