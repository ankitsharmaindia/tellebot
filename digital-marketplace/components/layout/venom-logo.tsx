import { cn } from "@/lib/utils";

// Minimal VENOM STORE spider emblem
export function VenomLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      aria-hidden="true">
      <ellipse
        cx="12"
        cy="12"
        rx="2.6"
        ry="3.6"
        fill="currentColor"
        stroke="none"
      />
      {/* left legs */}
      <path d="M9.6 10.2 6 7.2 4.4 8.6" />
      <path d="M9.4 12 5.2 11 3.6 12.8" />
      <path d="M9.6 13.8 6 16.2 4.8 18.2" />
      {/* right legs */}
      <path d="M14.4 10.2 18 7.2 19.6 8.6" />
      <path d="M14.6 12 18.8 11 20.4 12.8" />
      <path d="M14.4 13.8 18 16.2 19.2 18.2" />
    </svg>
  );
}
