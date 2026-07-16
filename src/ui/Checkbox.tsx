import styled from "styled-components";

const Label = styled.label`
  position: relative;
  display: inline-grid;
  place-items: center;
  flex: none;
  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    cursor: pointer;
  }
`;

const Box = styled.span<{ $checked: boolean; $accent: string }>`
  width: 22px;
  height: 22px;
  border-radius: 7px;
  display: grid;
  place-items: center;
  border: 2px solid
    ${({ $checked }) => ($checked ? "transparent" : "var(--border-strong)")};
  background: ${({ $checked, $accent }) => ($checked ? $accent : "transparent")};
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.12s ease;

  svg {
    width: 13px;
    height: 13px;
    fill: none;
    stroke: #fff;
    stroke-width: 3.2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 20;
    stroke-dashoffset: ${({ $checked }) => ($checked ? 0 : 20)};
    transition: stroke-dashoffset 0.28s ease 0.04s;
  }

  ${Label}:hover & {
    border-color: ${({ $checked }) =>
      $checked ? "transparent" : "var(--text-3)"};
  }
  ${Label}:active & {
    transform: scale(0.88);
  }
`;

export default function Checkbox({
  checked,
  onChange,
  accent = "var(--grad-todo)",
}: {
  checked: boolean;
  onChange: () => void;
  accent?: string;
}) {
  return (
    <Label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <Box $checked={checked} $accent={accent}>
        <svg viewBox="0 0 24 24">
          <path d="M4 12.5 9.5 18 20 6.5" />
        </svg>
      </Box>
    </Label>
  );
}
