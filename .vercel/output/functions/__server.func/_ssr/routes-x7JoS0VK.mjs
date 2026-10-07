import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as CircleCheck, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as useAxle, o as t, r as Button } from "./router-T8NQQqNK.mjs";
import { t as FIRMWARES } from "./catalog-DdXED0tl.mjs";
import { t as FirmwareCard } from "./firmware-card-BknkIGQS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-x7JoS0VK.js
var import_jsx_runtime = require_jsx_runtime();
var screens = [
	{
		title: "Garage",
		lines: [
			"ST5 Max",
			"NV5M-7K2Q-8814",
			"87% · 0.0.0.9"
		]
	},
	{
		title: "Firmware",
		lines: [
			"Custom 50 km/h",
			"Test 30 km/h",
			"Factory Restore"
		]
	},
	{
		title: "History",
		lines: ["ST5 Custom · ok", "Test image · ok"]
	},
	{
		title: "Settings",
		lines: ["Start 22 km/h", "Developer off"]
	}
];
function PhoneStrip() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-3 overflow-x-auto pb-2",
		children: screens.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-[9.5rem] shrink-0 rounded-[1.4rem] border border-line bg-raised p-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[1.05rem] bg-bg px-3 pb-4 pt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-4 h-1.5 w-10 rounded-full bg-line" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-[0.22em] text-accent",
						children: "CHIEF"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm font-medium",
						children: s.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: s.lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-md bg-surface px-2 py-1.5 text-[10px] text-muted",
							children: l
						}, l))
					})
				]
			})
		}, s.title))
	});
}
function Home() {
	const lang = useAxle((s) => s.lang);
	const copy = t(lang);
	const faq = [
		[copy.faq.q1, copy.faq.a1],
		[copy.faq.q2, copy.faq.a2],
		[copy.faq.q3, copy.faq.a3],
		[copy.faq.q4, copy.faq.a4],
		[copy.faq.q5, copy.faq.a5],
		[copy.faq.q6, copy.faq.a6],
		[copy.faq.q7, copy.faq.a7],
		[copy.faq.q8, copy.faq.a8],
		[copy.faq.q9, copy.faq.a9],
		[copy.faq.q10, copy.faq.a10],
		[copy.faq.q11, copy.faq.a11],
		[copy.faq.q12, copy.faq.a12],
		[copy.faq.q13, copy.faq.a13],
		[copy.faq.q14, copy.faq.a14],
		[copy.faq.q15, copy.faq.a15]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "space-y-24 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid items-center gap-8 pt-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.28em] text-subtle",
							children: copy.hero.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display mt-5 max-w-xl text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl",
							children: [
								copy.hero.title1,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-accent",
									children: copy.hero.title2
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-lg text-base leading-relaxed text-muted",
							children: copy.hero.lead
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								className: "w-full sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#firmware",
									children: [copy.hero.explore, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "cta-arrow size-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "raised",
								size: "lg",
								className: "w-full sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#how",
									children: copy.nav.how
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-8 grid gap-2 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-accent" }),
										" ",
										copy.hero.checks
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-accent" }),
										" ",
										copy.hero.open
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-accent" }),
										" ",
										copy.hero.models
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/product/st5max-hero.jpg",
						alt: "NAVEE ST5 Max",
						className: "product-photo mx-auto max-h-[28rem] w-auto object-contain"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "firmware",
				className: "scroll-mt-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight sm:text-4xl",
						children: copy.firmware.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: copy.firmware.sub
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
						children: FIRMWARES.map((fw) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FirmwareCard, {
							fw,
							lang
						}, fw.slug))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "compare",
				className: "scroll-mt-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight sm:text-4xl",
					children: copy.compare.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[20rem] border-collapse text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-4 font-medium text-subtle",
									children: " "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 pr-4 font-medium",
									children: copy.compare.stock
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 font-medium text-accent",
									children: copy.compare.custom
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "text-muted",
							children: [
								[
									copy.compare.speed,
									copy.compare.speedS,
									copy.compare.speedC
								],
								[
									copy.compare.cfg,
									copy.compare.cfgS,
									copy.compare.cfgC
								],
								[
									copy.compare.restore,
									copy.compare.restoreS,
									copy.compare.restoreC
								],
								[
									copy.compare.app,
									copy.compare.appS,
									copy.compare.appC
								],
								[
									copy.compare.updates,
									copy.compare.updatesS,
									copy.compare.updatesC
								]
							].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line/70",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4 text-fg",
										children: row[0]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4",
										children: row[1]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3",
										children: row[2]
									})
								]
							}, row[0]))
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "how",
				className: "scroll-mt-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight sm:text-4xl",
						children: copy.how.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: copy.how.sub
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-8 grid gap-4 sm:grid-cols-2",
						children: [
							[
								"01",
								copy.how.s1t,
								copy.how.s1
							],
							[
								"02",
								copy.how.s2t,
								copy.how.s2
							],
							[
								"03",
								copy.how.s3t,
								copy.how.s3
							],
							[
								"04",
								copy.how.s4t,
								copy.how.s4
							]
						].map(([n, title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[var(--radius-md)] border border-line bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-accent",
									children: n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-medium",
									children: title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted",
									children: body
								})
							]
						}, n))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: copy.models.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: copy.models.sub
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 grid gap-2 text-sm sm:grid-cols-2",
					children: [
						"NAVEE ST5 Max",
						"NAVEE ST3",
						copy.fw.st5custom.title,
						copy.fw.st5test.title,
						copy.fw.stock.title,
						copy.fw.dash.title
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-accent" }),
							" ",
							item
						]
					}, item))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: copy.made.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-muted",
					children: copy.made.lead
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 md:grid-cols-3",
					children: [
						[copy.made.simpleT, copy.made.simple],
						[copy.made.checkedT, copy.made.checked],
						[copy.made.provenT, copy.made.proven]
					].map(([title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[var(--radius-md)] border border-line bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: body
						})]
					}, title))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl tracking-tight",
				children: copy.faq.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 divide-y divide-line border-y border-line",
				children: faq.map(([q, a]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "group py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
						className: "flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-medium",
						children: [
							q,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle group-open:hidden",
								children: "+"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-subtle group-open:inline",
								children: "–"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-3xl text-sm leading-relaxed text-muted",
						children: a
					})]
				}, q))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid items-center gap-10 lg:grid-cols-[1fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl tracking-tight",
						children: copy.apk.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: copy.apk.lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: copy.apk.note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-xs uppercase tracking-[0.18em] text-subtle",
						children: copy.apk.perms
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid gap-2 text-sm text-muted",
						children: [
							copy.apk.p1,
							copy.apk.p2,
							copy.apk.p3,
							copy.apk.p4
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-4 shrink-0 text-accent" }), p]
						}, p))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-sm text-muted",
						children: copy.apk.web
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/garage",
								children: copy.apk.download
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "raised",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/firmware",
								children: copy.firmware.title
							})
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneStrip, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-md)] border border-line bg-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium",
					children: copy.roads.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: copy.roads.body
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
