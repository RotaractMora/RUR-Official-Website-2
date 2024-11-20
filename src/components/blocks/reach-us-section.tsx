import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConfig"; // Import your Firestore instance
import { useId } from "react";

export default function ReachUsSection() {
    const [grid, setGrid] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "info-reach"));
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setGrid(data);
            } catch (error) {
                console.error("Error fetching Firestore data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="py-20 lg:py-40 px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {grid.map((person, index) => (
                    <div
                        key={`${person.name}-${index}`}
                        className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out dark:border-neutral-800 border-neutral-200 border"
                    >
                        <Grid size={20} />
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-2xl font-semibold dark:text-white text-gray-900">
                                {person.name}
                            </h3>
                            <p className="text-sm font-medium text-gray-500">{person.post}</p>
                        </div>
                        <div className="flex flex-col space-y-4 pt-6">
                            <div className="flex items-center space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.816 18 2 12.184 2 5V3z" />
                                </svg>
                                <p className="text-gray-700 dark:text-gray-300 text-md">
                                    {person.contact}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <p className="text-gray-700 dark:text-gray-300 text-md">
                                    {person.email}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export const Grid = ({
                         pattern,
                         size,
                     }: {
    pattern?: number[][];
    size?: number;
}) => {
    const p = pattern ?? [
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    ];
    return (
        <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r opacity-100">
                <GridPattern
                    width={size ?? 20}
                    height={size ?? 20}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full mix-blend-overlay"
                />
            </div>
        </div>
    );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
    const patternId = useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    key={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill={`url(#${patternId})`}
            />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y]: any, index: number) => (
                        <rect
                            strokeWidth="0"
                            key={`${x}-${y}-${index}`}
                            width={width + 1}
                            height={height + 1}
                            x={x * width}
                            y={y * height}
                        />
                    ))}
                </svg>
            )}
        </svg>
    );
}
