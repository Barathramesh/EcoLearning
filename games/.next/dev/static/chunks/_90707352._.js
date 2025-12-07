(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/class-games/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClassGamesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const classGames = [
    {
        id: "class-1",
        class: "Class 1",
        title: "Eco Foundations",
        description: "Learn waste sorting, nature sounds, and basic recycling concepts",
        icon: "🌱",
        color: "from-green-400 to-emerald-500",
        difficulty: "Beginner",
        games: [
            {
                id: "sorting",
                name: "Clean Earth Sorting",
                icon: "🗑️"
            },
            {
                id: "sounds",
                name: "Nature Sounds Match",
                icon: "🔊"
            },
            {
                id: "colors",
                name: "Eco Color Match",
                icon: "🎨"
            },
            {
                id: "counting",
                name: "Count the Trees",
                icon: "🌳"
            },
            {
                id: "recycling",
                name: "Recycle Bin Hero",
                icon: "♻️"
            }
        ],
        unlocked: true
    },
    {
        id: "class-2",
        class: "Class 2",
        title: "Animal Kingdom",
        description: "Discover animal habitats, food chains, and wildlife conservation",
        icon: "🦁",
        color: "from-amber-400 to-orange-500",
        difficulty: "Beginner",
        games: [
            {
                id: "homes",
                name: "Animal Home Finder",
                icon: "🏠"
            },
            {
                id: "food",
                name: "What Do Animals Eat?",
                icon: "🍎"
            },
            {
                id: "babies",
                name: "Match Baby Animals",
                icon: "🐣"
            },
            {
                id: "tracks",
                name: "Animal Tracks",
                icon: "🐾"
            },
            {
                id: "sounds",
                name: "Animal Sound Safari",
                icon: "🔈"
            }
        ],
        unlocked: true
    },
    {
        id: "class-3",
        class: "Class 3",
        title: "Water World",
        description: "Explore water conservation, ocean life, and the water cycle",
        icon: "💧",
        color: "from-blue-400 to-cyan-500",
        difficulty: "Beginner",
        games: [
            {
                id: "maze",
                name: "Water Saver Maze",
                icon: "🌊"
            },
            {
                id: "cycle",
                name: "Water Cycle Journey",
                icon: "☁️"
            },
            {
                id: "ocean",
                name: "Ocean Creature Match",
                icon: "🐠"
            },
            {
                id: "save",
                name: "Fix the Leaks",
                icon: "🔧"
            },
            {
                id: "clean",
                name: "Clean Water Quest",
                icon: "🚰"
            }
        ],
        unlocked: true
    },
    {
        id: "class-4",
        class: "Class 4",
        title: "Plant Power",
        description: "Grow plants, learn photosynthesis, and understand plant needs",
        icon: "🌱",
        color: "from-lime-400 to-green-500",
        difficulty: "Intermediate",
        games: [
            {
                id: "grow",
                name: "Plant Growth Builder",
                icon: "🌻"
            },
            {
                id: "parts",
                name: "Plant Parts Puzzle",
                icon: "🧩"
            },
            {
                id: "photo",
                name: "Photosynthesis Race",
                icon: "☀️"
            },
            {
                id: "garden",
                name: "Garden Planner",
                icon: "🏡"
            },
            {
                id: "seasons",
                name: "Seasonal Plants",
                icon: "🍂"
            }
        ],
        unlocked: true
    },
    {
        id: "class-5",
        class: "Class 5",
        title: "Ecosystem Balance",
        description: "Balance ecosystems, food webs, and understand biodiversity",
        icon: "⚖️",
        color: "from-teal-400 to-emerald-500",
        difficulty: "Intermediate",
        games: [
            {
                id: "balance",
                name: "Ecosystem Balancer",
                icon: "⚖️"
            },
            {
                id: "foodchain",
                name: "Food Chain Builder",
                icon: "🔗"
            },
            {
                id: "habitat",
                name: "Habitat Designer",
                icon: "🌿"
            },
            {
                id: "biodiversity",
                name: "Species Counter",
                icon: "🦋"
            },
            {
                id: "predator",
                name: "Predator vs Prey",
                icon: "🐺"
            }
        ],
        unlocked: true
    },
    {
        id: "class-6",
        class: "Class 6",
        title: "Pollution Patrol",
        description: "Fight pollution, clean the environment, and learn prevention",
        icon: "🎮",
        color: "from-purple-400 to-indigo-500",
        difficulty: "Intermediate",
        games: [
            {
                id: "catcher",
                name: "Pollution Catcher",
                icon: "🎯"
            },
            {
                id: "air",
                name: "Air Quality Monitor",
                icon: "💨"
            },
            {
                id: "plastic",
                name: "Plastic Cleanup",
                icon: "🥤"
            },
            {
                id: "factory",
                name: "Clean Factory",
                icon: "🏭"
            },
            {
                id: "river",
                name: "River Rescue",
                icon: "🏞️"
            }
        ],
        unlocked: true
    },
    {
        id: "class-7",
        class: "Class 7",
        title: "Renewable Energy",
        description: "Build solar, wind, and hydro power systems for clean energy",
        icon: "⚡",
        color: "from-yellow-400 to-amber-500",
        difficulty: "Advanced",
        games: [
            {
                id: "builder",
                name: "Energy Builder",
                icon: "🔋"
            },
            {
                id: "solar",
                name: "Solar Panel Puzzle",
                icon: "☀️"
            },
            {
                id: "wind",
                name: "Wind Farm Manager",
                icon: "🌬️"
            },
            {
                id: "hydro",
                name: "Hydro Power Plant",
                icon: "💧"
            },
            {
                id: "grid",
                name: "Power Grid Challenge",
                icon: "⚡"
            }
        ],
        unlocked: true
    },
    {
        id: "class-8",
        class: "Class 8",
        title: "Climate Patterns",
        description: "Study weather, climate zones, and atmospheric science",
        icon: "🌡️",
        color: "from-rose-400 to-pink-500",
        difficulty: "Advanced",
        games: [
            {
                id: "puzzle",
                name: "Climate Puzzle",
                icon: "🧩"
            },
            {
                id: "weather",
                name: "Weather Predictor",
                icon: "🌤️"
            },
            {
                id: "zones",
                name: "Climate Zones Map",
                icon: "🗺️"
            },
            {
                id: "greenhouse",
                name: "Greenhouse Effect",
                icon: "🏠"
            },
            {
                id: "seasons",
                name: "Season Simulator",
                icon: "🍁"
            }
        ],
        unlocked: true
    },
    {
        id: "class-9",
        class: "Class 9",
        title: "Food Web Science",
        description: "Connect species, build food webs, and study ecosystems",
        icon: "🕸️",
        color: "from-orange-400 to-red-500",
        difficulty: "Advanced",
        games: [
            {
                id: "constructor",
                name: "Food Web Constructor",
                icon: "🕸️"
            },
            {
                id: "energy",
                name: "Energy Flow",
                icon: "⚡"
            },
            {
                id: "trophic",
                name: "Trophic Levels",
                icon: "📊"
            },
            {
                id: "decomposer",
                name: "Decomposer Role",
                icon: "🍄"
            },
            {
                id: "pyramid",
                name: "Ecosystem Pyramid",
                icon: "🔺"
            }
        ],
        unlocked: true
    },
    {
        id: "class-10",
        class: "Class 10",
        title: "Carbon Management",
        description: "Control emissions, manage carbon footprint, and go green",
        icon: "🏭",
        color: "from-slate-500 to-gray-600",
        difficulty: "Expert",
        games: [
            {
                id: "footprint",
                name: "Carbon Footprint",
                icon: "👣"
            },
            {
                id: "transport",
                name: "Green Transport",
                icon: "🚲"
            },
            {
                id: "city",
                name: "Eco City Planner",
                icon: "🏙️"
            },
            {
                id: "offset",
                name: "Carbon Offset",
                icon: "🌲"
            },
            {
                id: "tracker",
                name: "Emission Tracker",
                icon: "📈"
            }
        ],
        unlocked: true
    },
    {
        id: "class-11",
        class: "Class 11",
        title: "Ecosystem Restoration",
        description: "Restore habitats, protect species, and rebuild ecosystems",
        icon: "🌿",
        color: "from-emerald-500 to-green-600",
        difficulty: "Expert",
        games: [
            {
                id: "restore",
                name: "Habitat Restoration",
                icon: "🌳"
            },
            {
                id: "wetland",
                name: "Wetland Builder",
                icon: "🦆"
            },
            {
                id: "coral",
                name: "Coral Reef Rescue",
                icon: "🪸"
            },
            {
                id: "forest",
                name: "Reforestation",
                icon: "🌲"
            },
            {
                id: "wildlife",
                name: "Wildlife Corridor",
                icon: "🦌"
            }
        ],
        unlocked: true
    },
    {
        id: "class-12",
        class: "Class 12",
        title: "Climate Crisis",
        description: "Master global climate strategy and save the planet",
        icon: "🌍",
        color: "from-blue-600 to-indigo-700",
        difficulty: "Master",
        games: [
            {
                id: "strategy",
                name: "Climate Strategy",
                icon: "🎯"
            },
            {
                id: "policy",
                name: "Policy Maker",
                icon: "📜"
            },
            {
                id: "disaster",
                name: "Disaster Response",
                icon: "🌪️"
            },
            {
                id: "global",
                name: "Global Summit",
                icon: "🌐"
            },
            {
                id: "future",
                name: "Future Earth",
                icon: "🚀"
            }
        ],
        unlocked: true
    }
];
function ClassGamesPage() {
    _s();
    const [hoveredClass, setHoveredClass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "px-4 py-6 md:px-8 border-b border-green-700 bg-black/30 backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "lg",
                                className: "rounded-xl text-lg gap-2 text-white hover:bg-white/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/class-games/page.jsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this),
                                    "Back Home"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/class-games/page.jsx",
                                lineNumber: 223,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/class-games/page.jsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl md:text-6xl font-bold text-white mb-4",
                                    children: "Environmental Science Quest"
                                }, void 0, false, {
                                    fileName: "[project]/app/class-games/page.jsx",
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg md:text-xl text-green-200 max-w-3xl mx-auto",
                                    children: "12 Classes with 5 Games Each - 60 Interactive Environmental Challenges"
                                }, void 0, false, {
                                    fileName: "[project]/app/class-games/page.jsx",
                                    lineNumber: 230,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center gap-6 mt-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/10 rounded-xl px-4 py-2 text-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl font-bold text-green-400",
                                                    children: "12"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/class-games/page.jsx",
                                                    lineNumber: 235,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 text-sm",
                                                    children: "Classes"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/class-games/page.jsx",
                                                    lineNumber: 236,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/class-games/page.jsx",
                                            lineNumber: 234,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/10 rounded-xl px-4 py-2 text-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl font-bold text-blue-400",
                                                    children: "60"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/class-games/page.jsx",
                                                    lineNumber: 239,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 text-sm",
                                                    children: "Games"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/class-games/page.jsx",
                                                    lineNumber: 240,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/class-games/page.jsx",
                                            lineNumber: 238,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/10 rounded-xl px-4 py-2 text-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl font-bold text-amber-400",
                                                    children: "100%"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/class-games/page.jsx",
                                                    lineNumber: 243,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 text-sm",
                                                    children: "Interactive"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/class-games/page.jsx",
                                                    lineNumber: 244,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/class-games/page.jsx",
                                            lineNumber: 242,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/class-games/page.jsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/class-games/page.jsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/class-games/page.jsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/class-games/page.jsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "px-4 py-8 md:px-8 max-w-7xl mx-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: classGames.map((classData, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `relative bg-gradient-to-br ${classData.color} rounded-3xl p-6 shadow-2xl transition-all duration-300 border-2 border-white/20 hover:border-white/50 overflow-hidden`,
                            onMouseEnter: ()=>setHoveredClass(classData.id),
                            onMouseLeave: ()=>setHoveredClass(null),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
                                }, void 0, false, {
                                    fileName: "[project]/app/class-games/page.jsx",
                                    lineNumber: 260,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12"
                                }, void 0, false, {
                                    fileName: "[project]/app/class-games/page.jsx",
                                    lineNumber: 261,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full",
                                                    children: classData.class
                                                }, void 0, false, {
                                                    fileName: "[project]/app/class-games/page.jsx",
                                                    lineNumber: 265,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-4xl",
                                                    children: classData.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/app/class-games/page.jsx",
                                                    lineNumber: 268,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/class-games/page.jsx",
                                            lineNumber: 264,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-white mb-2",
                                            children: classData.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/class-games/page.jsx",
                                            lineNumber: 271,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/80 text-sm mb-4",
                                            children: classData.description
                                        }, void 0, false, {
                                            fileName: "[project]/app/class-games/page.jsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 mb-4",
                                            children: classData.games.map((game)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/class-games/${classData.id}/${game.id}`,
                                                    className: "flex items-center gap-2 bg-black/20 hover:bg-black/30 rounded-lg px-3 py-2 text-white text-sm transition-all",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg",
                                                            children: game.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/class-games/page.jsx",
                                                            lineNumber: 281,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: game.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/class-games/page.jsx",
                                                            lineNumber: 282,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, game.id, true, {
                                                    fileName: "[project]/app/class-games/page.jsx",
                                                    lineNumber: 276,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/class-games/page.jsx",
                                            lineNumber: 274,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        ...Array(index < 3 ? 1 : index < 6 ? 2 : index < 9 ? 3 : 4)
                                                    ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                            className: "w-4 h-4 text-yellow-300 fill-yellow-300"
                                                        }, i, false, {
                                                            fileName: "[project]/app/class-games/page.jsx",
                                                            lineNumber: 290,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/class-games/page.jsx",
                                                    lineNumber: 288,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white/70 text-xs",
                                                    children: classData.difficulty
                                                }, void 0, false, {
                                                    fileName: "[project]/app/class-games/page.jsx",
                                                    lineNumber: 293,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/class-games/page.jsx",
                                            lineNumber: 287,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/class-games/page.jsx",
                                    lineNumber: 263,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, classData.id, true, {
                            fileName: "[project]/app/class-games/page.jsx",
                            lineNumber: 254,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/class-games/page.jsx",
                    lineNumber: 252,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/class-games/page.jsx",
                lineNumber: 251,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/class-games/page.jsx",
        lineNumber: 219,
        columnNumber: 5
    }, this);
}
_s(ClassGamesPage, "bNPY+1f6lNYM4rnyZ6sFm3pF/kg=");
_c = ClassGamesPage;
var _c;
__turbopack_context__.k.register(_c, "ClassGamesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_90707352._.js.map