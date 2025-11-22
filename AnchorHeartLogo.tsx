interface AnchorHeartLogoProps {
  className?: string;
}

export default function AnchorHeartLogo({ className = "w-20 h-20" }: AnchorHeartLogoProps) {
  return (
    <svg viewBox="0 0 256 256" className={className} aria-label="AnchorHeart Services logo" role="img">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff6b6b"/>
          <stop offset="100%" stopColor="#c81e1e"/>
        </linearGradient>
      </defs>
      <path d="M30 140c0 30 30 60 98 60s98-30 98-60c0-16-16-8-30 5-18 16-34 31-68 31s-50-15-68-31c-14-13-30-21-30-5z" fill="#0f3e5d"/>
      <path d="M128 60c-18-24-58-20-70 10-10 25 6 43 22 56 12 10 26 20 48 36 22-16 36-26 48-36 16-13 32-31 22-56-12-30-52-34-70-10z" fill="url(#g)"/>
      <rect x="112" y="86" width="32" height="64" rx="6" fill="#fff"/>
      <rect x="96" y="102" width="64" height="32" rx="6" fill="#fff"/>
      <circle cx="128" cy="112" r="96" fill="none" stroke="#bcd2e8" strokeWidth="8"/>
    </svg>
  );
}
