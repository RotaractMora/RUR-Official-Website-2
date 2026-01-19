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
                ? "0 0% 75%" // Silver
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
                    className="relative block w-[300px] h-[400px] rounded-2xl overflow-hidden shadow-lg 
                                         transition-all duration-500 ease-in-out 
                                         group-hover:scale-105 group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center 
                                             transition-transform duration-500 ease-in-out group-hover:scale-110"
                        style={{ backgroundImage: imgURL ? `url(${imgURL})` : undefined }}
                    >
                        {imgURL && (
                            <img
                                src={imgURL}
                                alt={name}
                                className="w-full h-full object-cover opacity-0"
                                onLoad={() => loadCallback?.(1)}
                            />
                        )}
                    </div>
                    <div
                        className="absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                        style={{
                             background: `linear-gradient(to top, hsl(var(--theme-color) / 0.9), hsl(var(--theme-color) / 0.6) 30%, transparent 60%)`,
                        }}
                    />
                    {/* Content */}
                    <div className="relative flex flex-col justify-end h-full p-6 text-white">
                        <h3 className="text-3xl font-bold tracking-tight">{name}</h3>
                        <p className="text-sm text-white/80 mt-1 font-medium">{partnership}</p>
                        <div className="mt-2">
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[hsl(var(--theme-color)/0.3)] backdrop-blur-md border border-[hsl(var(--theme-color)/0.4)]">
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
