import { ImageIcon, Video } from "lucide-react";

interface MediaPlaceholderProps {
  /** Visible label describing which real asset replaces this block. */
  label: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/5]". */
  aspect?: string;
  variant?: "image" | "video";
  className?: string;
  caption?: string;
}

/**
 * Branded placeholder for real Pat & Chris / Haroldo assets.
 * Intentionally not a stock or AI-generated photo.
 */
const MediaPlaceholder = ({
  label,
  aspect = "aspect-[4/5]",
  variant = "image",
  className = "",
  caption,
}: MediaPlaceholderProps) => {
  const Icon = variant === "video" ? Video : ImageIcon;

  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden rounded-2xl border border-accent/30 bg-card ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-background/60">
          <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
        </span>
        <span className="max-w-[22rem] text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {label}
        </span>
        {caption && (
          <span className="max-w-[24rem] text-sm text-muted-foreground">{caption}</span>
        )}
      </div>
      <div className="pointer-events-none absolute inset-3 rounded-xl border border-dashed border-accent/20" />
    </div>
  );
};

export default MediaPlaceholder;
