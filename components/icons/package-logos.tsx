import { cn } from "@/lib/cn";

export function NpmLogo({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
      aria-label="npm"
    >
      <rect width="32" height="32" rx="3.5" fill="#CB3837" />
      <path d="M6 6h20v20h-5V11h-5v15H6V6z" fill="#FFFFFF" />
      <rect x="16" y="16" width="5" height="5" fill="#CB3837" />
    </svg>
  );
}

export function PypiLogo({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("shrink-0", className)}
      aria-label="PyPI"
    >
      {/* Isometric box geometry */}
      <path d="M12 1.5L2.8 6.7v10.6L12 22.5l9.2-5.2V6.7L12 1.5z" fill="#1E415E" />
      {/* Top face: Python Blue */}
      <path d="M12 1.5L2.8 6.7 12 11.9l9.2-5.2L12 1.5z" fill="#3775A9" />
      {/* Left face: Python Yellow */}
      <path d="M2.8 6.7v10.6L12 22.5V11.9L2.8 6.7z" fill="#FFD43B" />
      {/* Right face: Deep Python Blue */}
      <path d="M21.2 6.7v10.6L12 22.5V11.9l9.2-5.2z" fill="#295C85" />
      {/* Inner facet lines */}
      <path
        d="M12 1.5v21M2.8 6.7L12 11.9l9.2-5.2"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="0.8"
      />
      {/* Python snake dots */}
      <circle cx="12" cy="6.7" r="1.2" fill="#FFE873" />
      <circle cx="7.4" cy="14.6" r="1.2" fill="#306998" />
    </svg>
  );
}

export function PackagistLogo({ className = "size-4" }: { className?: string }) {
  return (
    <img
      src="/images/packagist-logo.png"
      alt="Packagist"
      className={cn("inline-block shrink-0 object-contain aspect-square select-none", className)}
      loading="eager"
      decoding="async"
    />
  );
}


export function DistributorLogo({
  distributor,
  className,
}: {
  distributor: "npm" | "PyPI" | "Packagist" | string;
  className?: string;
}) {
  const norm = distributor.toLowerCase();
  if (norm.includes("npm")) {
    return <NpmLogo className={className} />;
  }
  if (norm.includes("pypi") || norm.includes("python")) {
    return <PypiLogo className={className} />;
  }
  if (norm.includes("packagist") || norm.includes("php")) {
    return <PackagistLogo className={className} />;
  }
  return null;
}

