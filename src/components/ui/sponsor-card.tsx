import * as React from "react";

// Define the props for the SponsorCard component
interface SponsorCardProps extends React.HTMLAttributes<HTMLDivElement> {
    level: String;
    partnership: string;
    name: string;
    imgURL: string | undefined;
    loadCallback?: (count: number) => void;
}

const SponsorCard = React.forwardRef<HTMLDivElement, SponsorCardProps>(
    ({ className, level, partnership, name, imgURL, loadCallback, ...props }, ref) => {
        const themeColor =
            level === "Gold"
                ? "45 100% 35%" // Gold
                : level === "Silver"
                    ? "0 0% 40%" // Dark Silver/Grey for contrast
                    : "30 60% 50%"; // Bronze

        return (
            <div
                ref={ref}
                style={{
                    "--theme-color": themeColor,
                } as React.CSSProperties}
                className={`group w-full h-full flex items-center justify-center ${className || ""}`}
                {...props}
            >
                <div
                    className="relative block w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-white
                                         border border-[hsl(var(--theme-color)/0.3)]
                                         transition-all duration-500 ease-in-out 
                                         group-hover:scale-105 group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]
                                         group-hover:border-[hsl(var(--theme-color)/0.6)]"
                >
                    {/* Image Section - Constrained to top area via padding */}
                    <div className="absolute inset-0 pb-[40%] p-8 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:scale-110">
                        {imgURL ? (
                            <img
                                src={imgURL}
                                alt={name}
                                className="w-full h-full object-contain"
                                onLoad={() => loadCallback?.(1)}
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* Static Gradient Layer - Does NOT move */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-[50%] z-10"
                        style={{
                            background: `linear-gradient(to top, hsl(var(--theme-color) / 1) 0%, hsl(var(--theme-color) / 0.9) 60%, transparent 100%)`,
                        }}
                    />

                    {/* Content Section - Animates independently */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-[45%] z-20 flex flex-col justify-end p-6 text-white transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-1"
                    >
                        <h3 className="text-xl font-bold tracking-tight drop-shadow-md line-clamp-2 leading-tight">{name}</h3>
                        <p className="text-sm text-white/90 mt-1 font-medium drop-shadow-sm">{partnership}</p>
                        <div className="mt-3">
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm">
                                {level} Partner
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);
SponsorCard.displayName = "SponsorCard";

export { SponsorCard };
