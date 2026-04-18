type LogoProps = {
  size?: number;
  showTagline?: boolean;
  className?: string;
};

export function Logo({ size = 34, showTagline = true, className }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        className="shrink-0 text-gold"
      >
        <path
          d="M33 4 L34 7 L37 8 L34 9 L33 12 L32 9 L29 8 L32 7 Z"
          fill="currentColor"
        />
        <circle
          cx="20"
          cy="22"
          r="14"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          d="M14 19c1.5-3 4.5-3 6-3s4.5 0 6 3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="flex flex-col gap-0.5">
        <div
          className="font-serif font-medium uppercase leading-none text-gold whitespace-nowrap"
          style={{
            fontSize: size * 0.72,
            letterSpacing: size * 0.06,
          }}
        >
          VreahVibes
        </div>
        {showTagline && (
          <div
            className="uppercase leading-none text-gold-soft whitespace-nowrap"
            style={{
              fontSize: size * 0.22,
              letterSpacing: size * 0.05,
            }}
          >
            премиум-сервис записи
          </div>
        )}
      </div>
    </div>
  );
}
