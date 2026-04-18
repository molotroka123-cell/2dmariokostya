type IconProps = { size?: number; className?: string };

export function ChevronRight({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size * 0.57}
      height={size}
      viewBox="0 0 8 14"
      className={className}
      fill="none"
    >
      <path
        d="M1 1l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronLeft({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size * 0.57}
      height={size}
      viewBox="0 0 8 14"
      className={className}
      fill="none"
    >
      <path
        d="M7 1L1 7l6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} fill="none">
      <path
        d="M3 8l3.5 3.5L13 5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Clock({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7v5l3.5 2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Phone({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M6.5 3h2l1.5 4-2 1.5c1 2.5 3 4.5 5.5 5.5L15 12l4 1.5v2c0 .8-.7 1.5-1.5 1.5C10 17 7 14 7 6.5 7 5.7 6.7 5 6.5 3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Calendar({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function CalendarCheck({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3 9h18M8 3v4M16 3v4M8.5 14l2.5 2.5L15.5 12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function User({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Shield({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 3 5 6v6c0 4.5 3 8 7 9.5 4-1.5 7-5 7-9.5V6l-7-3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} fill="none">
      <path
        d="M20 4 L22 16 L34 18 L22 20 L20 32 L18 20 L6 18 L18 16 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Diamond({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 32" className={className} fill="none">
      <path
        d="M8 4h20l6 8L18 30 2 12l6-8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M2 12h32M14 4l-6 8 10 18M22 4l6 8-10 18"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export function Heart({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 30" className={className} fill="none">
      <path
        d="M16 27C8 22 3 17 3 11.5 3 7 6.5 4 10 4c2.4 0 4.5 1.3 6 3.5C17.5 5.3 19.6 4 22 4c3.5 0 7 3 7 7.5 0 5.5-5 10.5-13 15.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Scissors({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7" cy="25" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M10 10l18 18M10 22L28 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
