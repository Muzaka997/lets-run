import type { ReactNode } from "react";
import styled, { keyframes } from "styled-components";

const rise = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 52px 24px;
  border: 1px dashed var(--border-strong);
  border-radius: var(--r-lg);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  animation: ${rise} 0.4s ease-out;
`;

const IconBadge = styled.div<{ $grad?: string }>`
  position: relative;
  width: 68px;
  height: 68px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  font-size: 30px;
  color: #fff;
  background: ${({ $grad }) => $grad ?? "var(--grad-brand)"};
  box-shadow: 0 14px 30px rgba(99, 102, 241, 0.32);
  animation: ${float} 4s ease-in-out infinite;

  /* Soft glow halo */
  &::before {
    content: "";
    position: absolute;
    inset: -14px;
    border-radius: 28px;
    background: inherit;
    opacity: 0.18;
    filter: blur(14px);
    z-index: -1;
  }
`;

const Title = styled.h3`
  margin: 20px 0 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
`;

const Desc = styled.p`
  margin: 8px 0 0;
  max-width: 380px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-2);
`;

const Actions = styled.div`
  margin-top: 20px;
`;

export default function EmptyState({
  icon,
  title,
  description,
  accent,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  accent?: string;
  children?: ReactNode;
}) {
  return (
    <Wrap>
      <IconBadge $grad={accent}>{icon}</IconBadge>
      <Title>{title}</Title>
      <Desc>{description}</Desc>
      {children ? <Actions>{children}</Actions> : null}
    </Wrap>
  );
}
