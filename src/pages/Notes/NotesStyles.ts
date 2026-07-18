import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const itemIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const NotesWrap = styled.div`
  max-width: 960px;
  margin: 0 auto;
  animation: ${fadeIn} 0.35s ease-out;
`;

export const NotesHeading = styled.h1`
  margin: 0 0 4px;
  font-size: 30px;
  font-weight: 800;
  background: var(--grad-notes);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  width: fit-content;
`;

export const NotesSubhead = styled.p`
  margin: 0 0 20px;
  color: var(--text-2);
  font-size: 14.5px;
`;

/* Composer for creating a new note */
export const Composer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-md);
`;

const field = `
  width: 100%;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  font-size: 14px;
  font-family: inherit;
  outline: none;
  background: var(--surface-muted);
  color: var(--text);
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  &::placeholder { color: var(--text-3); }
  &:hover { border-color: var(--border-strong); }
  &:focus {
    background: var(--surface);
    border-color: var(--amber);
    box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.16);
  }
`;

export const TitleInput = styled.input`
  ${field}
  height: 44px;
  padding: 0 14px;
  font-weight: 600;
`;

export const BodyInput = styled.textarea`
  ${field}
  min-height: 84px;
  padding: 12px 14px;
  resize: vertical;
  line-height: 1.5;
`;

export const ComposerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.45); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
`;

/* Left side of the composer row: mic controls + live preview */
export const RecorderBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  flex: 1;
  min-width: 0;
`;

export const RecordButton = styled.button<{ $recording?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 16px;
  border-radius: var(--r-md);
  font-weight: 600;
  font-size: 13.5px;
  border: 1px solid
    ${({ $recording }) => ($recording ? "var(--danger)" : "var(--border-strong)")};
  background: ${({ $recording }) =>
    $recording ? "var(--danger)" : "var(--surface)"};
  color: ${({ $recording }) => ($recording ? "#fff" : "var(--text-2)")};
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    transform 0.14s ease;
  ${({ $recording }) =>
    $recording
      ? css`
          animation: ${pulse} 1.6s infinite;
        `
      : ""}

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    transform: translateY(-1px);
    ${({ $recording }) =>
      $recording ? "" : "color: var(--text); border-color: var(--text-3);"}
  }
`;

export const RecTime = styled.span`
  font-variant-numeric: tabular-nums;
  font-weight: 700;
`;

export const RecPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 180px;

  audio {
    height: 38px;
    flex: 1;
    min-width: 0;
  }
`;

export const DiscardButton = styled.button`
  width: 34px;
  height: 34px;
  flex: none;
  display: grid;
  place-items: center;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-3);
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;

  svg {
    width: 16px;
    height: 16px;
  }
  &:hover {
    background: var(--danger-soft);
    color: var(--danger-600);
    border-color: var(--danger-soft-border);
  }
`;

export const RecError = styled.div`
  width: 100%;
  font-size: 12.5px;
  color: var(--danger-600);
`;

/* Audio player shown inside a saved note card */
export const NoteAudio = styled.audio`
  width: 100%;
  height: 38px;
  margin-top: 12px;
`;

export const AddButton = styled.button`
  height: 42px;
  padding: 0 20px;
  border-radius: var(--r-md);
  border: 1px solid transparent;
  background: var(--grad-notes);
  color: #7c2d12;
  font-weight: 700;
  font-size: 14px;
  transition:
    transform 0.14s ease,
    box-shadow 0.18s ease,
    filter 0.14s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 26px rgba(245, 158, 11, 0.32);
  }
  &:active {
    transform: translateY(0);
    filter: brightness(0.98);
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

/* Masonry-ish responsive grid of note cards */
export const NotesGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 22px 0 0;
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  align-items: start;
`;

export const NoteCard = styled.li<{ $i?: number; $pinned?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 16px 14px;
  background: var(--surface);
  border: 1px solid
    ${({ $pinned }) => ($pinned ? "rgba(245, 158, 11, 0.5)" : "var(--border)")};
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-sm);
  animation: ${itemIn} 0.35s ease both;
  animation-delay: ${({ $i = 0 }) => Math.min($i * 45, 350)}ms;
  transition:
    transform 0.14s ease,
    box-shadow 0.14s ease,
    border-color 0.14s ease;

  /* Warm accent bar along the top edge */
  &::before {
    content: "";
    position: absolute;
    inset: 0 0 auto 0;
    height: 4px;
    border-radius: var(--r-lg) var(--r-lg) 0 0;
    background: var(--grad-notes);
    opacity: ${({ $pinned }) => ($pinned ? 1 : 0)};
    transition: opacity 0.15s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--border-strong);
  }
  &:hover::before {
    opacity: 1;
  }
`;

export const NoteTitle = styled.h3`
  margin: 0;
  font-size: 15.5px;
  font-weight: 700;
  color: var(--text);
  word-break: break-word;
`;

export const NoteBody = styled.p`
  margin: 8px 0 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--text-2);
  white-space: pre-wrap;
  word-break: break-word;
`;

export const NoteFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 14px;
`;

export const NoteDate = styled.span`
  font-size: 11.5px;
  color: var(--text-3);
`;

export const NoteActions = styled.div`
  display: flex;
  gap: 4px;
`;

export const IconButton = styled.button<{ $active?: boolean; $danger?: boolean }>`
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: var(--r-sm);
  border: 1px solid transparent;
  background: transparent;
  color: ${({ $active }) => ($active ? "var(--amber)" : "var(--text-3)")};
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: ${({ $danger }) =>
      $danger ? "var(--danger-soft)" : "var(--surface-hover)"};
    color: ${({ $danger }) => ($danger ? "var(--danger-600)" : "var(--text)")};
  }
`;

/* Inline editor (shown when a card is being edited) */
export const EditTitle = styled.input`
  ${field}
  height: 40px;
  padding: 0 12px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const EditBody = styled.textarea`
  ${field}
  min-height: 88px;
  padding: 10px 12px;
  resize: vertical;
  line-height: 1.5;
`;

export const EditActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

export const SaveButton = styled.button`
  height: 34px;
  padding: 0 14px;
  border-radius: var(--r-sm);
  border: 1px solid transparent;
  background: var(--grad-notes);
  color: #7c2d12;
  font-weight: 700;
  font-size: 13px;
  &:hover {
    filter: brightness(1.02);
  }
`;

export const CancelButton = styled.button`
  height: 34px;
  padding: 0 14px;
  border-radius: var(--r-sm);
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text-2);
  font-weight: 600;
  font-size: 13px;
  &:hover {
    background: var(--surface-hover);
    color: var(--text);
  }
`;
