import { useMemo } from "react";

interface ConfidenceRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ConfidenceRing({ value, size = 64, strokeWidth = 5, label }: ConfidenceRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const color = useMemo(() => {
    if (value >= 95) return "hsl(var(--success))";
    if (value >= 90) return "hsl(var(--primary))";
    if (value >= 85) return "hsl(var(--info))";
    return "hsl(var(--warning))";
  }, [value]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xs font-semibold text-foreground">{value}%</span>
        {label && <span className="text-[9px] text-muted-foreground">{label}</span>}
      </div>
    </div>
  );
}
