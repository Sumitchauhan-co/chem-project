'use client';

import { useEffect, useRef, useState } from 'react';
import elements from '@/lib/elements.json';
import Loader from '@/components/Loader';
import Image from 'next/image';

type ElementType = {
    number: number;
    atomic_mass: number;
    name: string;
    symbol: string;
    xpos: number;
    ypos: number;
    category: string;
    summary?: string;
    phase?: string;
    shells?: number[];
    image?: {
        title: string;
        url: string;
        attribution: string;
    };
    electron_configuration_semantic: string;
};

const getColorClass = (category: string) => {
    const map: Record<string, string> = {
        'diatomic nonmetal': 'bg-blue-100 border-blue-300 dark:bg-blue-900/30',
        'noble gas': 'bg-purple-100 border-purple-300 dark:bg-purple-900/30',
        'alkali metal': 'bg-red-100 border-red-300 dark:bg-red-900/30',
        'alkaline earth metal':
            'bg-orange-100 border-orange-300 dark:bg-orange-900/30',
        metalloid: 'bg-yellow-100 border-yellow-300 dark:bg-yellow-900/30',
        'polyatomic nonmetal':
            'bg-green-100 border-green-300 dark:bg-green-900/30',
        'post-transition metal':
            'bg-teal-100 border-teal-300 dark:bg-teal-900/30',
        'transition metal': 'bg-pink-100 border-pink-300 dark:bg-pink-900/30',
        lanthanide: 'bg-indigo-100 border-indigo-300 dark:bg-indigo-900/30',
        actinide: 'bg-rose-100 border-rose-300 dark:bg-rose-900/30',
    };
    return map[category] || 'bg-gray-100 border-gray-300 dark:bg-gray-800';
};

const getPosition = (el: ElementType) => {
    if (el.number === 71) return { xpos: 3, ypos: 6 };
    if (el.number === 103) return { xpos: 3, ypos: 7 };
    if (el.number >= 57 && el.number <= 71)
        return { xpos: el.number - 57 + 3, ypos: 9 };
    if (el.number >= 89 && el.number <= 103)
        return { xpos: el.number - 89 + 3, ypos: 10 };
    return { xpos: el.xpos, ypos: el.ypos };
};

const Page = () => {
    const [tableData, setTableData] = useState<ElementType[]>([]);
    const [loading, setLoading] = useState(true);
    const [hoveredElement, setHoveredElement] = useState<ElementType | null>(
        null,
    );
    const [selectedElement, setSelectedElement] = useState<ElementType | null>(
        null,
    );

    const detailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        //     const fetchData = async () => {
        //         try {
        //             const res = await fetch('/api/elements');

        //             if (!res.ok) throw new Error('Failed to fetch');

        //             const result = await res.json();
        //             setTableData(result.data);
        //         } catch (err) {
        //             console.error('Error fetching elements:', err);
        //         } finally {
        //             setLoading(false);
        //         }
        //     };

        //     fetchData();

        const fetchData = () => {
            const data = elements.data as ElementType[];
            setTableData(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleElementClick = (el: ElementType) => {
        setSelectedElement(el);

        setTimeout(() => {
            detailRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }, 100);
    };

    if (loading) return <Loader />;

    return (
        <>
            {!loading && (
                <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 flex gap-5 flex-col relative">
                    <div className="hidden sm:block absolute left-5 top-5">
                        <Image
                            fetchPriority="high"
                            className="invert"
                            src="/logo.png"
                            width={50}
                            height={50}
                            alt="hero"
                        />
                    </div>
                    <div className="absolute top-0 -z-1">
                        {/* <Image
                        className='blur-sm'
                            src="/hero2.jpg"
                            width={1200}
                            height={300}
                            alt="hero"
                        /> */}
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            poster="/hero2.png"
                            className="w-full h-full blur-xs"
                        >
                            <source
                                src="/hero.mp4"
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <h1 className="text-2xl sm:text-4xl text-center sm:mb-0 mb-10 my-10 font-bold">
                        <span className="p-2 border-b-2 leading-relaxed">
                            Periodic Table of the Elements
                        </span>
                    </h1>

                    <div className="overflow-x-auto pb-8 scrollbar-hide">
                        <div className="grid grid-cols-18 gap-1 min-w-[1000px] overflow-hidden">
                            <div className="hidden sm:flex col-start-3 col-end-13 row-start-1 row-end-4 p-4 pointer-events-none overflow-hidden">
                                <div
                                    className={`transition-all duration-300 transform ${hoveredElement ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                >
                                    {hoveredElement && (
                                        <div className="border rounded-lg p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg shadow-2xl border-gray-200 dark:border-zinc-700">
                                            <div className="flex items-center gap-4 mb-2">
                                                <span className="text-4xl font-bold">
                                                    {hoveredElement.symbol}
                                                </span>
                                                <div>
                                                    <h2 className="text-xl font-bold">
                                                        {hoveredElement.name}
                                                    </h2>
                                                    <p className="text-xs uppercase opacity-60 font-semibold">
                                                        {
                                                            hoveredElement.category
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-xs line-clamp-3 mb-2">
                                                {hoveredElement.summary}
                                            </p>
                                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                                                <p>
                                                    Mass:{' '}
                                                    {hoveredElement.atomic_mass}
                                                </p>
                                                <p>
                                                    Phase:{' '}
                                                    {hoveredElement.phase}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {tableData.map((el) => {
                                const pos = getPosition(el);
                                if (el.number === 119) return;
                                return (
                                    <div
                                        key={el.number}
                                        onClick={() => handleElementClick(el)}
                                        onMouseEnter={() =>
                                            setHoveredElement(el)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredElement(null)
                                        }
                                        style={{
                                            gridColumn: pos.xpos,
                                            gridRow: pos.ypos,
                                        }}
                                        className={`
                                        ${el.number > 56 && el.number < 71 ? 'mt-10' : ''}
                                            aspect-square border flex flex-col items-center justify-center 
                                            relative p-1 rounded transition-all duration-200
                                            hover:scale-110 hover:z-20 hover:shadow-lg cursor-help
                                            ${getColorClass(el.category)}
                                        `}
                                    >
                                        <span className="absolute top-0.5 left-1 text-[8px] sm:text-[10px] opacity-70">
                                            {el.number}
                                        </span>
                                        <span className="font-bold text-sm sm:text-base md:text-lg">
                                            {el.symbol}
                                        </span>
                                        <span className="hidden sm:block text-[8px] truncate w-full text-center px-1">
                                            {el.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <p className="text-center text-gray-500 text-xs mt-4 block md:hidden">
                        ← Swipe to explore →
                    </p>

                    <div
                        ref={detailRef}
                        className={`mt-20 p-6 border rounded-2xl transition-all duration-700 min-h-[400px] bg-zinc-50 dark:bg-zinc-900/50 $${
                            selectedElement
                                ? 'opacity-100 translate-y-0 bg-zinc-50 dark:bg-zinc-900/50'
                                : 'opacity-100 translate-y-0 bg-zinc-100/50 dark:bg-zinc-800/20 border-dashed'
                        }`}
                    >
                        {selectedElement ? (
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                {/* Image Container */}
                                <div className="flex justify-center">
                                    {selectedElement.image?.url ? (
                                        <img
                                            src={selectedElement.image.url}
                                            alt={selectedElement.name}
                                            className="rounded-xl shadow-2xl placeholder:blur max-h-80 object-cover border-4 border-white dark:border-zinc-800"
                                        />
                                    ) : (
                                        <div className="w-64 h-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-4xl font-bold opacity-30">
                                            {selectedElement.symbol}
                                        </div>
                                    )}
                                </div>

                                {/* Content Container */}
                                <div>
                                    <div className="flex lg:flex-row flex-col items-baseline gap-4 mb-4">
                                        <h2 className="text-5xl font-black">
                                            {selectedElement.name}
                                        </h2>
                                        <span className="text-2xl font-mono opacity-50">
                                            Atomic No. {selectedElement.number}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-white dark:bg-zinc-800 border mb-6 capitalize">
                                            {selectedElement.category}
                                        </div>
                                        <div className="text-lg font-mono opacity-50">
                                            {
                                                selectedElement.electron_configuration_semantic
                                            }
                                        </div>
                                    </div>
                                    <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 mb-6">
                                        {selectedElement.summary}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border">
                                            <p className="text-xs uppercase text-zinc-400 mb-1">
                                                Atomic Mass
                                            </p>
                                            <p className="font-bold">
                                                {selectedElement.atomic_mass} u
                                            </p>
                                        </div>
                                        <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border">
                                            <p className="text-xs uppercase text-zinc-400 mb-1">
                                                Standard Phase
                                            </p>
                                            <p className="font-bold capitalize">
                                                {selectedElement.phase || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full w-full min-h-[350px] flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 italic gap-4">
                                <svg
                                    className="w-12 h-12 opacity-20"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
                                    />
                                </svg>
                                <p className="text-xl">
                                    Select an element from the table to view
                                    detailed properties
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
