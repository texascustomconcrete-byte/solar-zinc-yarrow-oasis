import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as starters, i as standingReply, n as desks, r as fit, t as dayItems } from "./nexus-BG9Y6TB1.mjs";
import { a as PenLine, c as Flag, d as Archive, i as Scale, l as Cpu, o as Landmark, r as SunMedium, s as HardHat, t as Volume2, u as Compass } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-asScqWhr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askNexus = createServerFn({ method: "POST" }).validator((input) => {
	const desk = desks.some((d) => d.id === input?.desk) ? input.desk : "nexus";
	const messages = (input?.messages ?? []).slice(-8).map((m) => ({
		role: m.role === "assistant" ? "assistant" : "user",
		content: String(m.content ?? "").slice(0, 4e3)
	})).filter((m) => m.content.trim().length > 0);
	if (!messages.length || messages[messages.length - 1].role !== "user") throw new Error("A question is required.");
	return {
		desk,
		messages
	};
}).handler(createSsrRpc("3a71be6706195e95aac70b2054a68e1636722be7c85041b3296a987a9707b6c1"));
var icons = {
	nexus: Compass,
	secretary: PenLine,
	accountant: Landmark,
	attorney: Scale,
	engineer: HardHat,
	strategist: Flag,
	archivist: Archive
};
var DAY_KEY = "nexus-day-v1";
function Desk() {
	const [tab, setTab] = (0, import_react.useState)("desk");
	const [desk, setDesk] = (0, import_react.useState)("nexus");
	const [turns, setTurns] = (0, import_react.useState)([]);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [checks, setChecks] = (0, import_react.useState)({});
	const [note, setNote] = (0, import_react.useState)("");
	const scroller = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(DAY_KEY);
			if (!raw) return;
			const saved = JSON.parse(raw);
			setChecks(saved.checks ?? {});
			setNote(saved.note ?? "");
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		localStorage.setItem(DAY_KEY, JSON.stringify({
			checks,
			note
		}));
	}, [checks, note]);
	(0, import_react.useEffect)(() => {
		scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
	}, [turns, busy]);
	async function send(text) {
		const content = text.trim();
		if (!content || busy) return;
		const next = [...turns, {
			role: "user",
			content
		}];
		setTurns(next);
		setDraft("");
		setBusy(true);
		setError("");
		try {
			const result = await askNexus({ data: {
				desk,
				messages: next
			} });
			if (!result.ok) {
				if (result.error === "credits") {
					setTurns([...next, {
						role: "assistant",
						content: standingReply(content)
					}]);
					return;
				}
				setError(result.error);
				return;
			}
			setTurns([...next, {
				role: "assistant",
				content: result.text
			}]);
		} catch {
			setError("The desk did not answer. Ask once more.");
		} finally {
			setBusy(false);
		}
	}
	function readLast() {
		const last = [...turns].reverse().find((t) => t.role === "assistant");
		if (!last || typeof window === "undefined" || !window.speechSynthesis) return;
		const utterance = new SpeechSynthesisUtterance(last.content);
		const voice = window.speechSynthesis.getVoices().find((v) => /en-GB/i.test(v.lang));
		if (voice) utterance.voice = voice;
		utterance.rate = .96;
		window.speechSynthesis.cancel();
		window.speechSynthesis.speak(utterance);
	}
	const active = desks.find((d) => d.id === desk) ?? desks[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-line bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-2xl leading-none tracking-tight",
						children: "Nexus Desk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-mute",
						children: "SoulTy · one brain on the Yoga"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden max-w-xs text-right text-sm text-mute sm:block",
						children: "Preview mind uses the same rules the laptop should. It does not invent traction."
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl lg:grid-cols-[240px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden border-r border-line lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-col gap-1 p-3",
						children: desks.map((item) => {
							const Icon = icons[item.id];
							const on = item.id === desk && tab === "desk";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setDesk(item.id);
									setTab("desk");
								},
								className: `flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-left ${on ? "bg-moss text-moss-soft" : "hover:bg-card"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									size: 18,
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-medium",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `block text-xs ${on ? "text-moss-soft" : "text-mute"}`,
									children: item.line
								})] })]
							}, item.id);
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "min-h-[70vh] pb-24 lg:pb-6",
					children: [
						tab === "desk" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex min-h-[70vh] flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3 border-b border-line px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-serif text-xl",
										children: active.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-mute",
										children: active.hint
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: readLast,
										className: "inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-card px-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
											size: 16,
											"aria-hidden": true
										}), "Read"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									ref: scroller,
									className: "flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4",
									children: [
										turns.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-line bg-card p-5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-serif text-2xl leading-tight",
													children: "One model. Six desks. No invented numbers."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-3 max-w-prose text-sm text-mute",
													children: "The Yoga already runs Ollama. It does not need another stack. This desk is the shape that fits: Qwen 2.5 7B if you have about 16 GB, the 3B if you do not, and the council as modes of that single model."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-4 flex flex-col gap-2",
													children: starters.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => void send(prompt),
														className: "min-h-11 rounded-lg border border-line bg-paper px-3 text-left text-sm hover:border-copper",
														children: prompt
													}, prompt))
												})
											]
										}),
										turns.map((turn, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
											className: `max-w-[42rem] rounded-xl px-4 py-3 text-sm ${turn.role === "user" ? "ml-auto bg-ink text-paper" : "bg-card border border-line"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "whitespace-pre-wrap",
												children: turn.content
											})
										}, `${turn.role}-${index}`)),
										busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-mute",
											children: "Thinking…"
										}),
										error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "rounded-lg bg-copper-soft px-3 py-2 text-sm text-ink",
											children: error
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "sticky bottom-16 flex gap-2 border-t border-line bg-paper px-4 py-3 lg:bottom-0",
									onSubmit: (event) => {
										event.preventDefault();
										send(draft);
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "sr-only",
											htmlFor: "ask",
											children: "Ask the desk"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "ask",
											value: draft,
											onChange: (event) => setDraft(event.target.value),
											placeholder: `Ask ${active.name}`,
											className: "min-h-11 flex-1 rounded-lg border border-line bg-card px-3 text-sm outline-none focus:border-copper"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: busy || !draft.trim(),
											className: "min-h-11 rounded-lg bg-copper px-4 text-sm font-medium text-paper disabled:opacity-50",
											children: "Send"
										})
									]
								})
							]
						}),
						tab === "fit" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex flex-col gap-4 px-4 py-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-wide text-copper uppercase",
									children: "Yoga fit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-1 font-serif text-3xl leading-tight",
									children: "What belongs on this laptop"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "rounded-xl border border-line bg-card p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 text-moss",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, {
													size: 18,
													"aria-hidden": true
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "font-medium",
													children: "Run this"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 font-serif text-2xl",
												children: fit.model
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm text-mute",
												children: ["Fallback ", fit.fallback]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 text-sm",
												children: fit.why
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "rounded-xl border border-line bg-moss p-4 text-moss-soft",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-medium",
											children: "Keep"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "mt-2 flex flex-col gap-2 text-sm",
											children: fit.keep.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-xl border border-line bg-card p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-medium",
										children: "Already on the drive"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-3 divide-y divide-line",
										children: fit.folders.map((folder) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex flex-col gap-0.5 py-2 sm:flex-row sm:justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: folder.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-mute",
												children: folder.note
											})]
										}, folder.name))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-xl bg-copper-soft p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-medium",
										children: "Leave alone for now"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-2 flex flex-col gap-2 text-sm",
										children: fit.drop.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
									})]
								})
							]
						}),
						tab === "day" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex flex-col gap-4 px-4 py-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-copper",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunMedium, {
										size: 18,
										"aria-hidden": true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium tracking-wide uppercase",
										children: "Secretary"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-serif text-3xl leading-tight",
									children: "Today, on one page"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "flex flex-col gap-2",
									children: dayItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex min-h-11 items-center gap-3 rounded-xl border border-line bg-card px-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: Boolean(checks[item.id]),
											onChange: () => setChecks((current) => ({
												...current,
												[item.id]: !current[item.id]
											})),
											className: "size-4 accent-moss"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm",
											children: item.label
										})]
									}) }, item.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex flex-col gap-2 text-sm",
									htmlFor: "note",
									children: ["The one output", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "note",
										value: note,
										onChange: (event) => setNote(event.target.value),
										rows: 4,
										className: "rounded-xl border border-line bg-card p-3 outline-none focus:border-copper",
										placeholder: "What will actually be finished."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-mute",
									children: "Saved on this device only."
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 flex border-t border-line bg-card lg:hidden",
				children: [
					["desk", "Desk"],
					["fit", "Yoga"],
					["day", "Day"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(id),
					className: `min-h-14 flex-1 text-sm ${tab === id ? "text-copper font-medium" : "text-mute"}`,
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto hidden max-w-6xl gap-2 px-4 pb-6 lg:flex",
				children: [
					["desk", "Desk"],
					["fit", "Yoga fit"],
					["day", "Today"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(id),
					className: `min-h-11 rounded-lg px-4 text-sm ${tab === id ? "bg-ink text-paper" : "border border-line bg-card"}`,
					children: label
				}, id))
			})
		]
	});
}
var SplitComponent = Desk;
//#endregion
export { SplitComponent as component };
