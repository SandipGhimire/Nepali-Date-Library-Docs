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
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0 text-[#F28D1A]", className)}
      aria-label="Packagist"
    >
      <path d="M12 .002a2.38 2.38 0 0 0-.616.082L2.738 2.68a2.39 2.39 0 0 0-1.734 2.3v13.987a2.39 2.39 0 0 0 1.734 2.3l8.646 2.597c.4.12.828.12 1.232 0l8.646-2.597a2.39 2.39 0 0 0 1.734-2.3V4.98a2.39 2.39 0 0 0-1.734-2.3L12.616.084A2.38 2.38 0 0 0 12 .002zm-.004 2.213l7.986 2.4-3.992 1.2-7.987-2.4 3.993-1.2zm-5.32 2.6l7.986 2.4-3.993 1.2-7.986-2.4 3.993-1.2zm10.64 2.198l2.663.8v9.986a.39.39 0 0 1-.284.376l-7.05 2.118v-9.986a.39.39 0 0 1 .284-.376l4.387-1.318zm-7.988 2.4l3.993 1.2v9.987a.39.39 0 0 1-.284.375L3.987 18.88a.39.39 0 0 1-.284-.376V8.518a.39.39 0 0 1 .284-.376l3.993-1.2v2.4a.39.39 0 0 0 .348.388l1.002.102a.39.39 0 0 0 .428-.388v-2.03z" />
    </svg>
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

