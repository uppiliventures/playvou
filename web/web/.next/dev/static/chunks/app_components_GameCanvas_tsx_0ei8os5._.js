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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$useWalletModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@solana/wallet-adapter-react-ui/lib/esm/useWalletModal.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Telemetry sampling rate for mousemove events. 30Hz keeps a 6-minute
// session's array in the low thousands of points while retaining high signal.
const TELEMETRY_SAMPLE_INTERVAL_MS = 33;
function GameCanvas() {
    _s();
    const { publicKey, disconnect, connected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"])();
    const { setVisible } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$useWalletModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletModal"])();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Player Registration
    const [playerName, setPlayerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [playerEmail, setPlayerEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("IDLE");
    const [stage, setStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(360);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Clean Rolling Leaderboard State
    const [leaderboard, setLeaderboard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const telemetryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const lastMoveSampleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // 3-Form Boss State
    const bossRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
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
        }, {
            "GameCanvas.useRef[bossRef]": (_, i)=>({
                    x: 200 - i * 25,
                    y: 80,
                    alive: true
                })
        }["GameCanvas.useRef[bossRef]"]),
        centipedeYOffset: 0,
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
            audioRef.current.play().catch(()=>{
            // Autoplay can be blocked by browser until user interaction — non-fatal.
            });
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
    // Toggle Wallet Connect / Disconnect cleanly
    const handleWalletClick = ()=>{
        if (connected) {
            disconnect();
        } else {
            setVisible(true);
        }
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
        lastMoveSampleRef.current = 0;
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
    // State-guarded finishSession to prevent duplicate leaderboard additions
    const finishSession = ()=>{
        setGameState((currentGameState)=>{
            if (currentGameState === "ENDED") return "ENDED";
            stopSoundtrack();
            const currentWallet = publicKey ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}` : "Not Connected";
            setScore((currentScore)=>{
                const newEntry = {
                    name: playerName || "Anonymous",
                    email: playerEmail || "none@sol.io",
                    score: currentScore,
                    logs: telemetryRef.current.length,
                    wallet: currentWallet
                };
                setLeaderboard((prev)=>[
                        ...prev,
                        newEntry
                    ].sort((a, b)=>b.score - a.score));
                return currentScore;
            });
            return "ENDED";
        });
    };
    // Timer & Stage Transitions Effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameCanvas.useEffect": ()=>{
            if (gameState !== "PLAYING") return;
            const timer = setInterval({
                "GameCanvas.useEffect.timer": ()=>{
                    setTimeLeft({
                        "GameCanvas.useEffect.timer": (prev)=>{
                            if (prev <= 1) {
                                clearInterval(timer);
                                finishSession();
                                return 0;
                            }
                            const nextTime = prev - 1;
                            const elapsedSeconds = 360 - nextTime;
                            const calculatedStage = Math.min(Math.floor(elapsedSeconds / 60) + 1, 6);
                            setStage({
                                "GameCanvas.useEffect.timer": (prevStage)=>{
                                    if (calculatedStage !== prevStage) {
                                        playStageTrack(calculatedStage);
                                        return calculatedStage;
                                    }
                                    return prevStage;
                                }
                            }["GameCanvas.useEffect.timer"]);
                            return nextTime;
                        }
                    }["GameCanvas.useEffect.timer"]);
                }
            }["GameCanvas.useEffect.timer"], 1000);
            return ({
                "GameCanvas.useEffect": ()=>clearInterval(timer)
            })["GameCanvas.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["GameCanvas.useEffect"], [
        gameState
    ]);
    // Main Canvas Render Engine
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameCanvas.useEffect": ()=>{
            if (gameState !== "PLAYING") return;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            let animationFrameId;
            let waveOffset = 0;
            let cloakTimer = 0;
            let wasCloaked = false;
            const invaderW = 33;
            const invaderH = 24;
            let dx = stage === 2 ? 4.0 : 2.2;
            let invaders = [];
            const initInvaders = {
                "GameCanvas.useEffect.initInvaders": ()=>{
                    invaders = [];
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
            // Throttled mousemove telemetry sampling (~30Hz)
            const handleMouseMove = {
                "GameCanvas.useEffect.handleMouseMove": (e)=>{
                    const now = performance.now();
                    if (now - lastMoveSampleRef.current < TELEMETRY_SAMPLE_INTERVAL_MS) return;
                    lastMoveSampleRef.current = now;
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
            // Unthrottled mouse clicks
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
    // Phase 2a: Real API Submission to /api/verify-telemetry
    const handleSubmitTelemetry = async ()=>{
        if (!publicKey) return alert("Please connect your wallet first!");
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/verify-telemetry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    playerName,
                    playerEmail,
                    wallet: publicKey.toBase58(),
                    score,
                    telemetry: telemetryRef.current
                })
            });
            const data = await response.json();
            if (!response.ok) {
                alert(`Verification Error: ${data.error || "Failed to submit telemetry"}`);
                return;
            }
            if (data.verified) {
                alert(`✅ HUMAN VERIFIED!\n` + `Score: ${data.score}\n` + `Human Likelihood: ${data.humanScore}%\n` + `Telemetry Samples: ${data.telemetryPointCount}\n\n` + `Payout Status: ${data.payout.status}`);
            } else {
                alert(`❌ BOT DETECTED / UNVERIFIED\n` + `Human Likelihood: ${data.humanScore}%\n` + `Check breakdown in console.`);
                console.log("Failed Checks:", data.checks);
            }
        } catch (err) {
            alert("Network error submitting telemetry.");
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
                lineNumber: 610,
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
                                                lineNumber: 617,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 617,
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
                                                lineNumber: 618,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 618,
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
                                                lineNumber: 619,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 619,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 616,
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
                                        lineNumber: 623,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleWalletClick,
                                        className: `px-3 py-1.5 text-xs font-bold rounded font-mono cursor-pointer transition-all ${connected ? "bg-rose-900/60 hover:bg-rose-800 text-rose-300 border border-rose-700" : "bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-md"}`,
                                        children: connected && publicKey ? `DISCONNECT (${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)})` : "CONNECT WALLET"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 629,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 622,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/GameCanvas.tsx",
                        lineNumber: 615,
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
                                                lineNumber: 649,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] font-mono text-slate-400",
                                                children: "AI-POWERED TELEMETRY VERIFICATION"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 652,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 648,
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
                                                lineNumber: 659,
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
                                                lineNumber: 667,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 658,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm rounded transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer",
                                            children: "START 6-MIN PLAYTEST"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/GameCanvas.tsx",
                                            lineNumber: 678,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 677,
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
                                                lineNumber: 687,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-mono text-slate-400",
                                                children: "Photosensitive content (pulsing & cloaking)."
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 690,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 686,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 647,
                                columnNumber: 13
                            }, this),
                            gameState === "PLAYING" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                ref: canvasRef,
                                width: 600,
                                height: 400,
                                className: "w-full h-full block bg-black cursor-crosshair"
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 698,
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
                                        lineNumber: 708,
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
                                                lineNumber: 710,
                                                columnNumber: 25
                                            }, this),
                                            " | SCORE: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-cyan-400",
                                                children: score
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 710,
                                                columnNumber: 98
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 709,
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
                                                lineNumber: 713,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 712,
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
                                                lineNumber: 716,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleSubmitTelemetry,
                                                disabled: isSubmitting,
                                                className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-black font-bold font-mono text-sm rounded shadow-md cursor-pointer",
                                                children: isSubmitting ? "VERIFYING..." : "VERIFY & CLAIM PAYOUT"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 722,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 715,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 707,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/GameCanvas.tsx",
                        lineNumber: 645,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/GameCanvas.tsx",
                lineNumber: 613,
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
                                lineNumber: 738,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase",
                                children: "PLAYTEST"
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 741,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/GameCanvas.tsx",
                        lineNumber: 737,
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
                                    lineNumber: 750,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[10px] text-slate-600",
                                    children: "BE THE FIRST ON THE BOARD!"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/GameCanvas.tsx",
                                    lineNumber: 751,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/GameCanvas.tsx",
                            lineNumber: 749,
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
                                                lineNumber: 769,
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
                                                        lineNumber: 773,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-slate-500 truncate",
                                                        children: entry.wallet
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                                        lineNumber: 774,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/GameCanvas.tsx",
                                                lineNumber: 772,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 768,
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
                                                lineNumber: 779,
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
                                                lineNumber: 780,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/GameCanvas.tsx",
                                        lineNumber: 778,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 764,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/components/GameCanvas.tsx",
                        lineNumber: 747,
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
                                lineNumber: 790,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] text-slate-500",
                                children: "Playtest telemetry verified live on Solana."
                            }, void 0, false, {
                                fileName: "[project]/app/components/GameCanvas.tsx",
                                lineNumber: 793,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/GameCanvas.tsx",
                        lineNumber: 789,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/GameCanvas.tsx",
                lineNumber: 736,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/GameCanvas.tsx",
        lineNumber: 609,
        columnNumber: 5
    }, this);
}
_s(GameCanvas, "r19cBUnqD9rIpNxr2tHZOi4Fjb4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$useWalletModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletModal"]
    ];
});
_c = GameCanvas;
var _c;
__turbopack_context__.k.register(_c, "GameCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_GameCanvas_tsx_0ei8os5._.js.map