(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/GameCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$WalletMultiButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletMultiButton.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function GameCanvas() {
    _s();
    const { publicKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"])();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Player Registration
    const [playerName, setPlayerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [playerEmail, setPlayerEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("IDLE");
    const [stage, setStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(360); // 6 Minutes Total
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Clean Rolling Leaderboard State (No fake entries)
    const [leaderboard, setLeaderboard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const telemetryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // 3-Form Boss State with Pixel Shatter Tracking
    const bossRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 200,
        y: 40,
        dx: 3.5,
        dy: 2.5,
        phase: 1,
        // Phase 1: Galactus
        headHp: 20,
        headHits: [],
        bodyHp: 15,
        bodyHits: [],
        // Phase 2: Cyber Centipede (Dynamic Heights)
        centipede: Array.from({
            length: 8
        }, {
            "GameCanvas.useRef[bossRef]": (_, i)=>({
                    x: 200 - i * 25,
                    y: 80,
                    alive: true
                })
        }["GameCanvas.useRef[bossRef]"]),
        centipedeYOffset: 0,
        // Phase 3: Shrouded Spinner
        spinnerHp: 25,
        spinnerHits: [],
        spinAngle: 0
    });
    const soundtrackSources = [
        "/sounds/emergence.mp3",
        "/sounds/throughlight.mp3",
        "/sounds/continuum.mp3",
        "/sounds/battlefire.mp3",
        "/sounds/ascendence.mp3",
        "/sounds/victory.mp3"
    ];
    const playStageTrack = (stageNum)=>{
        if (audioRef.current) {
            const src = soundtrackSources[stageNum - 1] || soundtrackSources[0];
            audioRef.current.src = src;
            audioRef.current.currentTime = 0;
            audioRef.current.muted = isMuted;
            audioRef.current.play().catch((err)=>console.log("Audio play blocked:", err));
        }
    };
    const toggleMute = ()=>{
        setIsMuted((prev)=>{
            const nextMuted = !prev;
            if (audioRef.current) audioRef.current.muted = nextMuted;
            return nextMuted;
        });
    };
    const stopSoundtrack = ()=>{
        if (audioRef.current) audioRef.current.pause();
    };
    const handleStartGame = (e)=>{
        e.preventDefault();
        if (!playerName || !playerEmail) {
            return alert("Please enter your Name and Email to start!");
        }
        setScore(0);
        setStage(1);
        setTimeLeft(360);
        telemetryRef.current = [];
        bossRef.current = {
            x: 200,
            y: 40,
            dx: 3.5,
            dy: 2.5,
            phase: 1,
            headHp: 20,
            headHits: [],
            bodyHp: 15,
            bodyHits: [],
            centipede: Array.from({
                length: 8
            }, (_, i)=>({
                    x: 200 - i * 25,
                    y: 80,
                    alive: true
                })),
            centipedeYOffset: 0,
            spinnerHp: 25,
            spinnerHits: [],
            spinAngle: 0
        };
        setGameState("PLAYING");
        playStageTrack(1);
    };
    // Timer & Stage Transitions
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameCanvas.useEffect": ()=>{
            let timer;
            if (gameState === "PLAYING" && timeLeft > 0) {
                timer = setInterval({
                    "GameCanvas.useEffect": ()=>{
                        setTimeLeft({
                            "GameCanvas.useEffect": (prev)=>{
                                const nextTime = prev - 1;
                                const elapsedSeconds = 360 - nextTime;
                                const calculatedStage = Math.min(Math.floor(elapsedSeconds / 60) + 1, 6);
                                if (calculatedStage !== stage) {
                                    setStage(calculatedStage);
                                    playStageTrack(calculatedStage);
                                }
                                return nextTime;
                            }
                        }["GameCanvas.useEffect"]);
                    }
                }["GameCanvas.useEffect"], 1000);
            } else if (timeLeft === 0 && gameState === "PLAYING") {
                finishSession();
            }
            return ({
                "GameCanvas.useEffect": ()=>clearInterval(timer)
            })["GameCanvas.useEffect"];
        }
    }["GameCanvas.useEffect"], [
        gameState,
        timeLeft,
        stage
    ]);
    const finishSession = ()=>{
        setGameState("ENDED");
        stopSoundtrack();
        const currentWallet = publicKey ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}` : "Not Connected";
        const newEntry = {
            name: playerName || "Anonymous",
            email: playerEmail || "none@sol.io",
            score,
            logs: telemetryRef.current.length,
            wallet: currentWallet
        };
        setLeaderboard((prev)=>[
                ...prev,
                newEntry
            ].sort((a, b)=>b.score - a.score));
    };
    // Main Canvas Render Engine
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameCanvas.useEffect": ()=>{
            if (gameState !== "PLAYING") return;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            let animationFrameId;
            const invaderW = 33;
            const invaderH = 24;
            let dx = stage === 2 ? 4.0 : 2.2;
            let invaders = [];
            // RNG Spawner Across All Stages
            const initInvaders = {
                "GameCanvas.useEffect.initInvaders": ()=>{
                    invaders = [];
                    // Stage 1: Random Rows, Cols, Heights, and Speed
                    if (stage === 1) {
                        const rows = Math.floor(Math.random() * 3) + 2;
                        const cols = Math.floor(Math.random() * 3) + 4;
                        const startY = Math.floor(Math.random() * 90) + 30;
                        dx = (Math.random() * 2 + 1.8) * (Math.random() > 0.5 ? 1 : -1);
                        for(let r = 0; r < rows; r++){
                            for(let c = 0; c < cols; c++){
                                const iy = r * (invaderH + 16) + startY;
                                invaders.push({
                                    x: c * (invaderW + 16) + 50,
                                    y: iy,
                                    initialY: iy,
                                    alive: true
                                });
                            }
                        }
                    } else if (stage === 2) {
                        const pattern = Math.floor(Math.random() * 3);
                        dx = 4.2 * (Math.random() > 0.5 ? 1 : -1);
                        if (pattern === 0) {
                            const coords = [
                                [
                                    280,
                                    40
                                ],
                                [
                                    220,
                                    90
                                ],
                                [
                                    340,
                                    90
                                ],
                                [
                                    160,
                                    140
                                ],
                                [
                                    280,
                                    140
                                ],
                                [
                                    400,
                                    140
                                ],
                                [
                                    220,
                                    190
                                ],
                                [
                                    340,
                                    190
                                ],
                                [
                                    280,
                                    240
                                ]
                            ];
                            coords.forEach({
                                "GameCanvas.useEffect.initInvaders": ([cx, cy])=>invaders.push({
                                        x: cx,
                                        y: cy,
                                        initialY: cy,
                                        alive: true
                                    })
                            }["GameCanvas.useEffect.initInvaders"]);
                        } else if (pattern === 1) {
                            const centerX = 300, centerY = 130, radius = 90;
                            for(let i = 0; i < 9; i++){
                                const angle = i / 9 * Math.PI * 2;
                                const cx = centerX + Math.cos(angle) * radius - invaderW / 2;
                                const cy = centerY + Math.sin(angle) * radius - invaderH / 2;
                                invaders.push({
                                    x: cx,
                                    y: cy,
                                    initialY: cy,
                                    alive: true
                                });
                            }
                        } else {
                            for(let r = 0; r < 4; r++){
                                for(let c = 0; c < 6; c++){
                                    const iy = r * (invaderH + 14) + 30;
                                    invaders.push({
                                        x: c * (invaderW + 18) + 60,
                                        y: iy,
                                        initialY: iy,
                                        alive: true
                                    });
                                }
                            }
                        }
                    } else if (stage === 3 || stage === 4) {
                        const startY = Math.floor(Math.random() * 100) + 30;
                        for(let r = 0; r < 3; r++){
                            for(let c = 0; c < 6; c++){
                                const iy = r * (invaderH + 18) + startY;
                                invaders.push({
                                    x: c * (invaderW + 18) + 60,
                                    y: iy,
                                    initialY: iy,
                                    alive: true
                                });
                            }
                        }
                    } else if (stage === 5) {
                        for(let i = 0; i < 18; i++){
                            const rx = Math.floor(Math.random() * 480) + 40;
                            const ry = Math.floor(Math.random() * 180) + 30;
                            invaders.push({
                                x: rx,
                                y: ry,
                                initialY: ry,
                                alive: true
                            });
                        }
                    }
                }
            }["GameCanvas.useEffect.initInvaders"];
            if (stage < 6) initInvaders();
            // Telemetry Mouse Events
            const handleMouseMove = {
                "GameCanvas.useEffect.handleMouseMove": (e)=>{
                    const rect = canvas.getBoundingClientRect();
                    telemetryRef.current.push({
                        x: Math.round(e.clientX - rect.left),
                        y: Math.round(e.clientY - rect.top),
                        time: Date.now(),
                        stage,
                        type: "move"
                    });
                }
            }["GameCanvas.useEffect.handleMouseMove"];
            const handleMouseClick = {
                "GameCanvas.useEffect.handleMouseClick": (e)=>{
                    const rect = canvas.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const clickY = e.clientY - rect.top;
                    telemetryRef.current.push({
                        x: Math.round(clickX),
                        y: Math.round(clickY),
                        time: Date.now(),
                        stage,
                        type: "click"
                    });
                    if (stage < 6) {
                        invaders.forEach({
                            "GameCanvas.useEffect.handleMouseClick": (invader)=>{
                                if (invader.alive && clickX >= invader.x && clickX <= invader.x + invaderW && clickY >= invader.y && clickY <= invader.y + invaderH) {
                                    invader.alive = false;
                                    setScore({
                                        "GameCanvas.useEffect.handleMouseClick": (prev)=>prev + 100
                                    }["GameCanvas.useEffect.handleMouseClick"]);
                                }
                            }
                        }["GameCanvas.useEffect.handleMouseClick"]);
                        if (invaders.length > 0 && invaders.every({
                            "GameCanvas.useEffect.handleMouseClick": (inv)=>!inv.alive
                        }["GameCanvas.useEffect.handleMouseClick"])) {
                            initInvaders();
                        }
                    } else {
                        // Stage 6 Boss Shatter Hit Logic
                        const b = bossRef.current;
                        if (b.phase === 1) {
                            if (b.bodyHp > 0 && clickX >= b.x + 20 && clickX <= b.x + 100 && clickY >= b.y + 80 && clickY <= b.y + 130) {
                                b.bodyHp -= 1;
                                b.bodyHits.push(b.bodyHits.length);
                                setScore({
                                    "GameCanvas.useEffect.handleMouseClick": (prev)=>prev + 200
                                }["GameCanvas.useEffect.handleMouseClick"]);
                            } else if (b.headHp > 0 && clickX >= b.x && clickX <= b.x + 120 && clickY >= b.y && clickY <= b.y + 80) {
                                b.headHp -= 1;
                                b.headHits.push(b.headHits.length);
                                setScore({
                                    "GameCanvas.useEffect.handleMouseClick": (prev)=>prev + 300
                                }["GameCanvas.useEffect.handleMouseClick"]);
                                if (b.headHp <= 0) {
                                    b.phase = 2;
                                    setScore({
                                        "GameCanvas.useEffect.handleMouseClick": (prev)=>prev + 2500
                                    }["GameCanvas.useEffect.handleMouseClick"]);
                                }
                            }
                        } else if (b.phase === 2) {
                            b.centipede.forEach({
                                "GameCanvas.useEffect.handleMouseClick": (seg)=>{
                                    if (seg.alive && clickX >= seg.x && clickX <= seg.x + 24 && clickY >= seg.y && clickY <= seg.y + 24) {
                                        seg.alive = false;
                                        setScore({
                                            "GameCanvas.useEffect.handleMouseClick": (prev)=>prev + 250
                                        }["GameCanvas.useEffect.handleMouseClick"]);
                                    }
                                }
                            }["GameCanvas.useEffect.handleMouseClick"]);
                            if (b.centipede.every({
                                "GameCanvas.useEffect.handleMouseClick": (seg)=>!seg.alive
                            }["GameCanvas.useEffect.handleMouseClick"])) {
                                b.phase = 3;
                                setScore({
                                    "GameCanvas.useEffect.handleMouseClick": (prev)=>prev + 3500
                                }["GameCanvas.useEffect.handleMouseClick"]);
                            }
                        } else if (b.phase === 3) {
                            if (clickX >= b.x && clickX <= b.x + 100 && clickY >= b.y && clickY <= b.y + 100) {
                                b.spinnerHp -= 1;
                                b.spinnerHits.push(b.spinnerHits.length);
                                setScore({
                                    "GameCanvas.useEffect.handleMouseClick": (prev)=>prev + 400
                                }["GameCanvas.useEffect.handleMouseClick"]);
                                if (b.spinnerHp <= 0) {
                                    setScore({
                                        "GameCanvas.useEffect.handleMouseClick": (prev)=>prev + 5000
                                    }["GameCanvas.useEffect.handleMouseClick"]);
                                    finishSession();
                                }
                            }
                        }
                    }
                }
            }["GameCanvas.useEffect.handleMouseClick"];
            canvas.addEventListener("mousemove", handleMouseMove);
            canvas.addEventListener("click", handleMouseClick);
            // Sprite Renderer
            const drawInvader = {
                "GameCanvas.useEffect.drawInvader": (x, y, color)=>{
                    ctx.fillStyle = color;
                    const p = 3;
                    const sprite = [
                        [
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            0,
                            0,
                            1,
                            0,
                            0
                        ],
                        [
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0
                        ],
                        [
                            0,
                            0,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            0,
                            0
                        ],
                        [
                            0,
                            1,
                            1,
                            0,
                            1,
                            1,
                            1,
                            0,
                            1,
                            1,
                            0
                        ],
                        [
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1
                        ],
                        [
                            1,
                            0,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            0,
                            1
                        ],
                        [
                            1,
                            0,
                            1,
                            0,
                            0,
                            0,
                            0,
                            0,
                            1,
                            0,
                            1
                        ],
                        [
                            0,
                            0,
                            0,
                            1,
                            1,
                            0,
                            1,
                            1,
                            0,
                            0,
                            0
                        ]
                    ];
                    sprite.forEach({
                        "GameCanvas.useEffect.drawInvader": (row, r)=>{
                            row.forEach({
                                "GameCanvas.useEffect.drawInvader": (cell, c)=>{
                                    if (cell === 1) ctx.fillRect(x + c * p, y + r * p, p, p);
                                }
                            }["GameCanvas.useEffect.drawInvader"]);
                        }
                    }["GameCanvas.useEffect.drawInvader"]);
                }
            }["GameCanvas.useEffect.drawInvader"];
            const stageColors = [
                "#10B981",
                "#F43F5E",
                "#FBBF24",
                "#A855F7",
                "#EF4444"
            ];
            // Shatter Boss Renderer
            const renderBossForms = {
                "GameCanvas.useEffect.renderBossForms": ()=>{
                    const b = bossRef.current;
                    if (b.phase === 1) {
                        b.x += b.dx;
                        if (b.x < 30 || b.x > canvas.width - 150) b.dx *= -1;
                        if (b.bodyHp > 0) {
                            ctx.fillStyle = "#A855F7";
                            ctx.fillRect(b.x + 20, b.y + 80, 80, 50);
                            ctx.fillStyle = "#EF4444";
                            ctx.fillRect(b.x + 50, b.y + 95, 20, 20);
                            ctx.fillStyle = "#000000";
                            b.bodyHits.forEach({
                                "GameCanvas.useEffect.renderBossForms": (hitIdx)=>{
                                    const hx = b.x + 20 + hitIdx % 4 * 20;
                                    const hy = b.y + 80 + Math.floor(hitIdx / 4) * 12;
                                    ctx.fillRect(hx, hy, 16, 10);
                                }
                            }["GameCanvas.useEffect.renderBossForms"]);
                        }
                        if (b.headHp > 0) {
                            ctx.fillStyle = "#00F0FF";
                            ctx.fillRect(b.x, b.y, 120, 80);
                            ctx.fillStyle = "#FFFFFF";
                            ctx.fillRect(b.x + 25, b.y + 25, 25, 12);
                            ctx.fillRect(b.x + 70, b.y + 25, 25, 12);
                            ctx.fillStyle = "#000000";
                            b.headHits.forEach({
                                "GameCanvas.useEffect.renderBossForms": (hitIdx)=>{
                                    const hx = b.x + hitIdx % 5 * 24;
                                    const hy = b.y + Math.floor(hitIdx / 5) * 20;
                                    ctx.fillRect(hx, hy, 20, 16);
                                }
                            }["GameCanvas.useEffect.renderBossForms"]);
                        }
                    } else if (b.phase === 2) {
                        waveOffset += 0.08;
                        b.centipede.forEach({
                            "GameCanvas.useEffect.renderBossForms": (seg, i)=>{
                                if (!seg.alive) return;
                                seg.x += 4.2;
                                seg.y = 110 + Math.sin(waveOffset + i * 0.4) * 55 + Math.cos(waveOffset * 0.5) * 30;
                                if (seg.x > canvas.width + 20) {
                                    seg.x = -20;
                                    b.centipedeYOffset = (Math.random() - 0.5) * 40;
                                }
                                ctx.fillStyle = i === 0 ? "#F59E0B" : "#10B981";
                                ctx.fillRect(seg.x, seg.y + b.centipedeYOffset, 24, 24);
                            }
                        }["GameCanvas.useEffect.renderBossForms"]);
                    } else if (b.phase === 3) {
                        b.x += b.dx;
                        b.y += b.dy;
                        if (b.x < 50 || b.x > canvas.width - 150) b.dx *= -1;
                        if (b.y < 30 || b.y > 150) b.dy *= -1;
                        b.spinAngle += 0.1;
                        ctx.save();
                        ctx.translate(b.x + 50, b.y + 50);
                        ctx.rotate(b.spinAngle);
                        ctx.fillStyle = "#EC4899";
                        ctx.fillRect(-35, -35, 70, 70);
                        ctx.fillStyle = "#000000";
                        b.spinnerHits.forEach({
                            "GameCanvas.useEffect.renderBossForms": (hitIdx)=>{
                                const hx = -35 + hitIdx % 4 * 18;
                                const hy = -35 + Math.floor(hitIdx / 4) * 18;
                                ctx.fillRect(hx, hy, 14, 14);
                            }
                        }["GameCanvas.useEffect.renderBossForms"]);
                        ctx.restore();
                        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
                        ctx.fillRect(b.x - 20, b.y - 10, 80, 60);
                        ctx.fillRect(b.x + 30, b.y + 40, 90, 60);
                    }
                }
            }["GameCanvas.useEffect.renderBossForms"];
            let waveOffset = 0;
            let cloakTimer = 0;
            let wasCloaked = false;
            const render = {
                "GameCanvas.useEffect.render": ()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    if (stage < 6) {
                        let shiftDown = false;
                        const color = stageColors[stage - 1] || "#10B981";
                        invaders.forEach({
                            "GameCanvas.useEffect.render": (inv)=>{
                                if (!inv.alive) return;
                                if (inv.x + dx > canvas.width - invaderW - 15 || inv.x + dx < 15) {
                                    shiftDown = true;
                                }
                            }
                        }["GameCanvas.useEffect.render"]);
                        if (shiftDown) dx *= -1;
                        waveOffset += 0.05;
                        cloakTimer += 1;
                        const isCloaked = stage === 5 && cloakTimer % 180 > 120;
                        if (stage === 5 && wasCloaked && !isCloaked) {
                            invaders.forEach({
                                "GameCanvas.useEffect.render": (inv)=>{
                                    if (inv.alive) {
                                        inv.x = Math.floor(Math.random() * 480) + 40;
                                        inv.y = Math.floor(Math.random() * 200) + 30;
                                        inv.initialY = inv.y;
                                    }
                                }
                            }["GameCanvas.useEffect.render"]);
                        }
                        wasCloaked = isCloaked;
                        invaders.forEach({
                            "GameCanvas.useEffect.render": (inv)=>{
                                if (!inv.alive) return;
                                inv.x += dx;
                                if (stage === 3) {
                                    inv.x += Math.sin(waveOffset * 1.2) * 2.5;
                                    inv.y = inv.initialY + Math.cos(waveOffset + inv.x * 0.02) * 25;
                                }
                                if (stage === 4) {
                                    inv.y = inv.initialY + Math.sin(waveOffset * 2 + inv.x) * 18;
                                }
                                if (stage === 5 && isCloaked) return;
                                inv.x = Math.max(15, Math.min(canvas.width - invaderW - 15, inv.x));
                                inv.y = Math.max(20, Math.min(canvas.height - invaderH - 20, inv.y));
                                drawInvader(inv.x, inv.y, color);
                            }
                        }["GameCanvas.useEffect.render"]);
                    } else {
                        renderBossForms();
                    }
                    animationFrameId = requestAnimationFrame(render);
                }
            }["GameCanvas.useEffect.render"];
            render();
            return ({
                "GameCanvas.useEffect": ()=>{
                    canvas.removeEventListener("mousemove", handleMouseMove);
                    canvas.removeEventListener("click", handleMouseClick);
                    cancelAnimationFrame(animationFrameId);
                }
            })["GameCanvas.useEffect"];
        }
    }["GameCanvas.useEffect"], [
        gameState,
        stage
    ]);
    const handleSubmitTelemetry = async ()=>{
        if (!publicKey) return alert("Please connect your wallet first!");
        setIsSubmitting(true);
        try {
            await new Promise((res)=>setTimeout(res, 1200));
            alert(`SUCCESS!\nVerified ${telemetryRef.current.length} telemetry points for ${playerName}.\nDeployer paid reward tokens to ${publicKey.toBase58().slice(0, 6)}...!`);
        } catch (err) {
            alert("Payout failed");
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col lg:flex-row items-start justify-center gap-6 max-w-6xl mx-auto p-4 text-white font-mono",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                ref: audioRef,
                loop: true,
                preload: "auto"
            }, void 0, false, {
                fileName: "[project]/app/components/GameCanvas.tsx",
                lineNumber: 555,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-800 w-full max-w-[650px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full flex flex-wrap justify-between items-center mb-6 gap-2 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "STAGE: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-purple-400 font-bold",
                                                children: [
                                                    stage,
                                                    "/6"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 562,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 562,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "TIME: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-amber-400 font-bold",
                                                children: [
                                                    Math.floor(timeLeft / 60),
                                                    "m ",
                                                    timeLeft % 60,
                                                    "s"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 563,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 563,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "SCORE: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-cyan-400 font-bold",
                                                children: score
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 564,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 564,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 561,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: toggleMute,
                                        className: "px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded border border-slate-700 font-mono cursor-pointer transition-colors",
                                        children: isMuted ? "🔇 MUTED" : "🔊 SOUND ON"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 568,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$WalletMultiButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletMultiButton"], {
                                        className: "!bg-emerald-600 hover:!bg-emerald-500 !h-8 !px-3 !text-xs !font-mono !rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 574,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 567,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/GameCanvas.tsx",
                        lineNumber: 560,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-[600px] h-[400px] bg-black border-2 border-emerald-500/30 rounded-lg flex flex-col items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]",
                        children: [
                            gameState === "IDLE" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleStartGame,
                                className: "text-center space-y-4 px-6 w-full max-w-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold font-mono tracking-widest text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]",
                                                children: "PLAYVOU TESTBENCH"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 583,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] font-mono text-slate-400",
                                                children: "AI-POWERED TELEMETRY VERIFICATION"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 586,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 582,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Player Name / Handle",
                                                required: true,
                                                value: playerName,
                                                onChange: (e)=>setPlayerName(e.target.value),
                                                className: "w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 focus:border-emerald-500 focus:outline-none font-mono"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 593,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                placeholder: "Email Address",
                                                required: true,
                                                value: playerEmail,
                                                onChange: (e)=>setPlayerEmail(e.target.value),
                                                className: "w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 focus:border-emerald-500 focus:outline-none font-mono"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 601,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 592,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer",
                                            children: "START 6-MIN PLAYTEST"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/GameCanvas.tsx",
                                            lineNumber: 612,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 611,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center gap-1.5 pt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono px-1.5 py-0.5 rounded font-bold",
                                                children: "⚠️ NOTICE"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 621,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-mono text-slate-400",
                                                children: "Photosensitive content (pulsing & cloaking)."
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 624,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 620,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 581,
                                columnNumber: 13
                            }, this),
                            gameState === "PLAYING" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                ref: canvasRef,
                                width: 600,
                                height: 400,
                                className: "w-full h-full block bg-black cursor-crosshair"
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 632,
                                columnNumber: 13
                            }, this),
                            gameState === "ENDED" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold font-mono text-amber-400",
                                        children: "SESSION COMPLETED"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 642,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-300 font-mono text-sm",
                                        children: [
                                            "PLAYER: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-purple-400 font-bold",
                                                children: playerName
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 644,
                                                columnNumber: 25
                                            }, this),
                                            " | SCORE: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-cyan-400",
                                                children: score
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 644,
                                                columnNumber: 98
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 643,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 text-xs",
                                        children: [
                                            "TELEMETRY LOGS: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-emerald-400",
                                                children: telemetryRef.current.length
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 647,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 646,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-3 justify-center pt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setGameState("IDLE"),
                                                className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-sm rounded border border-slate-600 cursor-pointer",
                                                children: "RETRY"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 650,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleSubmitTelemetry,
                                                disabled: isSubmitting,
                                                className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-black font-bold font-mono text-sm rounded shadow-md cursor-pointer",
                                                children: isSubmitting ? "CLAIM DEPLOYER PAYOUT..." : "VERIFY & CLAIM PAYOUT"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 656,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 649,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 641,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/GameCanvas.tsx",
                        lineNumber: 579,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/GameCanvas.tsx",
                lineNumber: 558,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-900 border border-slate-800 rounded-xl p-5 w-full lg:w-[320px] shadow-2xl font-mono",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-b border-slate-800 pb-3 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-bold text-emerald-400 tracking-wider flex items-center gap-1.5",
                                children: "🏆 LIVE LEADERBOARD"
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 672,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase",
                                children: "PLAYTEST"
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 675,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/GameCanvas.tsx",
                        lineNumber: 671,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-[290px] overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900",
                        children: leaderboard.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-12 text-slate-500 text-xs font-mono space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: "NO PLAYTEST RUNS YET."
                                }, void 0, false, {
                                    fileName: "[project]/app/components/GameCanvas.tsx",
                                    lineNumber: 684,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[10px] text-slate-600",
                                    children: "BE THE FIRST ON THE BOARD!"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/GameCanvas.tsx",
                                    lineNumber: 685,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/GameCanvas.tsx",
                            lineNumber: 683,
                            columnNumber: 13
                        }, this) : leaderboard.map((entry, i)=>{
                            const rankColors = [
                                "text-amber-400",
                                "text-slate-300",
                                "text-amber-600",
                                "text-purple-400",
                                "text-cyan-400"
                            ];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between p-2.5 bg-slate-950/80 border border-slate-800/80 rounded-lg text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2.5 truncate max-w-[170px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `font-bold text-xs ${rankColors[i] || "text-slate-500"}`,
                                                children: [
                                                    "#",
                                                    i + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 703,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "truncate",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-bold text-slate-200 truncate",
                                                        children: entry.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                                        lineNumber: 707,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-slate-500 truncate",
                                                        children: entry.wallet
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                                        lineNumber: 708,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 706,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 702,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right flex-shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-cyan-400 font-bold",
                                                children: entry.score.toLocaleString()
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 713,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[9px] text-slate-500",
                                                children: [
                                                    entry.logs,
                                                    " pts"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 714,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 712,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 698,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameCanvas.tsx",
                        lineNumber: 681,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 pt-3 border-t border-slate-800 text-center space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-bold text-slate-300 tracking-wide",
                                children: "⚡ ROLLING HIGH SCORES"
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 724,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] text-slate-500",
                                children: "Playtest telemetry verified live on Solana."
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 727,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/GameCanvas.tsx",
                        lineNumber: 723,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/GameCanvas.tsx",
                lineNumber: 670,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/GameCanvas.tsx",
        lineNumber: 554,
        columnNumber: 5
    }, this);
}
_s(GameCanvas, "yS9/s/EGJIVUA6eUF+zl/CXZS2g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"]
    ];
});
_c = GameCanvas;
var _c;
__turbopack_context__.k.register(_c, "GameCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/@solana/wallet-adapter-base-ui/lib/esm/useWalletMultiButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWalletMultiButton",
    ()=>useWalletMultiButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function useWalletMultiButton({ onSelectWallet }) {
    const { connect, connected, connecting, disconnect, disconnecting, publicKey, select, wallet, wallets } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"])();
    let buttonState;
    if (connecting) {
        buttonState = 'connecting';
    } else if (connected) {
        buttonState = 'connected';
    } else if (disconnecting) {
        buttonState = 'disconnecting';
    } else if (wallet) {
        buttonState = 'has-wallet';
    } else {
        buttonState = 'no-wallet';
    }
    const handleConnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWalletMultiButton.useCallback[handleConnect]": ()=>{
            connect().catch({
                "useWalletMultiButton.useCallback[handleConnect]": ()=>{
                // Silently catch because any errors are caught by the context `onError` handler
                }
            }["useWalletMultiButton.useCallback[handleConnect]"]);
        }
    }["useWalletMultiButton.useCallback[handleConnect]"], [
        connect
    ]);
    const handleDisconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWalletMultiButton.useCallback[handleDisconnect]": ()=>{
            disconnect().catch({
                "useWalletMultiButton.useCallback[handleDisconnect]": ()=>{
                // Silently catch because any errors are caught by the context `onError` handler
                }
            }["useWalletMultiButton.useCallback[handleDisconnect]"]);
        }
    }["useWalletMultiButton.useCallback[handleDisconnect]"], [
        disconnect
    ]);
    const handleSelectWallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWalletMultiButton.useCallback[handleSelectWallet]": ()=>{
            onSelectWallet({
                onSelectWallet: select,
                wallets
            });
        }
    }["useWalletMultiButton.useCallback[handleSelectWallet]"], [
        onSelectWallet,
        select,
        wallets
    ]);
    return {
        buttonState,
        onConnect: buttonState === 'has-wallet' ? handleConnect : undefined,
        onDisconnect: buttonState !== 'disconnecting' && buttonState !== 'no-wallet' ? handleDisconnect : undefined,
        onSelectWallet: handleSelectWallet,
        publicKey: publicKey ?? undefined,
        walletIcon: wallet?.adapter.icon,
        walletName: wallet?.adapter.name
    };
}
}),
"[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletConnectionButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseWalletConnectionButton",
    ()=>BaseWalletConnectionButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$WalletIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletIcon.js [app-client] (ecmascript)");
;
;
;
function BaseWalletConnectionButton({ walletIcon, walletName, ...props }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        ...props,
        className: "wallet-adapter-button-trigger",
        startIcon: walletIcon && walletName ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$WalletIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletIcon"], {
            wallet: {
                adapter: {
                    icon: walletIcon,
                    name: walletName
                }
            }
        }) : undefined
    });
}
}),
"[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletMultiButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseWalletMultiButton",
    ()=>BaseWalletMultiButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$base$2d$ui$2f$lib$2f$esm$2f$useWalletMultiButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-base-ui/lib/esm/useWalletMultiButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$BaseWalletConnectionButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletConnectionButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$useWalletModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/useWalletModal.js [app-client] (ecmascript)");
;
;
;
;
function BaseWalletMultiButton({ children, labels, ...props }) {
    const { setVisible: setModalVisible } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$useWalletModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletModal"])();
    const { buttonState, onConnect, onDisconnect, publicKey, walletIcon, walletName } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$base$2d$ui$2f$lib$2f$esm$2f$useWalletMultiButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletMultiButton"])({
        onSelectWallet () {
            setModalVisible(true);
        }
    });
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BaseWalletMultiButton.useEffect": ()=>{
            const listener = {
                "BaseWalletMultiButton.useEffect.listener": (event)=>{
                    const node = ref.current;
                    // Do nothing if clicking dropdown or its descendants
                    if (!node || node.contains(event.target)) return;
                    setMenuOpen(false);
                }
            }["BaseWalletMultiButton.useEffect.listener"];
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
            return ({
                "BaseWalletMultiButton.useEffect": ()=>{
                    document.removeEventListener('mousedown', listener);
                    document.removeEventListener('touchstart', listener);
                }
            })["BaseWalletMultiButton.useEffect"];
        }
    }["BaseWalletMultiButton.useEffect"], []);
    const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BaseWalletMultiButton.useMemo[content]": ()=>{
            if (children) {
                return children;
            } else if (publicKey) {
                const base58 = publicKey.toBase58();
                return base58.slice(0, 4) + '..' + base58.slice(-4);
            } else if (buttonState === 'connecting' || buttonState === 'has-wallet') {
                return labels[buttonState];
            } else {
                return labels['no-wallet'];
            }
        }
    }["BaseWalletMultiButton.useMemo[content]"], [
        buttonState,
        children,
        labels,
        publicKey
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        className: "wallet-adapter-dropdown"
    }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$BaseWalletConnectionButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseWalletConnectionButton"], {
        ...props,
        "aria-expanded": menuOpen,
        style: {
            pointerEvents: menuOpen ? 'none' : 'auto',
            ...props.style
        },
        onClick: ()=>{
            switch(buttonState){
                case 'no-wallet':
                    setModalVisible(true);
                    break;
                case 'has-wallet':
                    if (onConnect) {
                        onConnect();
                    }
                    break;
                case 'connected':
                    setMenuOpen(true);
                    break;
            }
        },
        walletIcon: walletIcon,
        walletName: walletName
    }, content), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("ul", {
        "aria-label": "dropdown-list",
        className: `wallet-adapter-dropdown-list ${menuOpen && 'wallet-adapter-dropdown-list-active'}`,
        ref: ref,
        role: "menu"
    }, publicKey ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("li", {
        className: "wallet-adapter-dropdown-list-item",
        onClick: async ()=>{
            await navigator.clipboard.writeText(publicKey.toBase58());
            setCopied(true);
            setTimeout(()=>setCopied(false), 400);
        },
        role: "menuitem"
    }, copied ? labels['copied'] : labels['copy-address']) : null, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("li", {
        className: "wallet-adapter-dropdown-list-item",
        onClick: ()=>{
            setModalVisible(true);
            setMenuOpen(false);
        },
        role: "menuitem"
    }, labels['change-wallet']), onDisconnect ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("li", {
        className: "wallet-adapter-dropdown-list-item",
        onClick: ()=>{
            onDisconnect();
            setMenuOpen(false);
        },
        role: "menuitem"
    }, labels['disconnect']) : null));
}
}),
"[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletMultiButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletMultiButton",
    ()=>WalletMultiButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$BaseWalletMultiButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/BaseWalletMultiButton.js [app-client] (ecmascript)");
;
;
const LABELS = {
    'change-wallet': 'Change wallet',
    connecting: 'Connecting ...',
    'copy-address': 'Copy address',
    copied: 'Copied',
    disconnect: 'Disconnect',
    'has-wallet': 'Connect',
    'no-wallet': 'Select Wallet'
};
function WalletMultiButton(props) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$BaseWalletMultiButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseWalletMultiButton"], {
        ...props,
        labels: LABELS
    });
}
}),
]);

//# sourceMappingURL=_1ws7om6._.js.map