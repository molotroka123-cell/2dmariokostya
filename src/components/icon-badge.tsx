import type { ReactNode } from "react";

type IconBadgeProps = {
  children: ReactNode;
  size?: number;
  className?: string;
};

export function IconBadge({ children, size = 48, className }: IconBadgeProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl bg-beige text-gold ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}
