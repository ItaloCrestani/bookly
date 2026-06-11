type ProgressCircleProps = {
  value: number;
  max: number;
}

export function ProgressCircle({ value, max }: ProgressCircleProps) {
  const percentage = (value / max) * 100;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-36 h-36">
      <svg
        className="w-full h-full -rotate-90"
        viewBox="0 0 140 140"
      >
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="var(--bg-4)"
          strokeWidth="10"
          fill="none"
        />

        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="var(--color)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">
          {Math.round(percentage)}%
        </span>

        <span className="text-[12px] text-(--text-3)">
          concluído
        </span>
      </div>
    </div>
  );
}