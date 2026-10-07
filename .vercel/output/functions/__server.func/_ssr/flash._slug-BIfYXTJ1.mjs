import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as useAxle, i as cn, n as Route, o as t, r as Button } from "./router-T8NQQqNK.mjs";
import { i as firmwareBySlug, n as MODEL_LABEL, r as PHOTO } from "./catalog-DdXED0tl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flash._slug-BIfYXTJ1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	"fetching",
	"checking",
	"erasing",
	"writing",
	"verifying"
];
function nested(obj, path) {
	return path.split(".").reduce((acc, key) => {
		if (acc && typeof acc === "object") return acc[key];
	}, obj);
}
function FlashPage() {
	const { slug } = Route.useParams();
	const fw = firmwareBySlug(slug);
	const lang = useAxle((s) => s.lang);
	const scooters = useAxle((s) => s.scooters);
	const activeId = useAxle((s) => s.activeId);
	const recordFlash = useAxle((s) => s.recordFlash);
	const pushLog = useAxle((s) => s.pushLog);
	const copy = t(lang);
	const nav = useNavigate();
	const scooter = scooters.find((s) => s.id === activeId && s.connected);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [step, setStep] = (0, import_react.useState)(0);
	const [err, setErr] = (0, import_react.useState)("");
	if (!fw) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Unknown image."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/firmware",
			className: "mt-4 inline-block text-accent",
			children: copy.nav.firmware
		})]
	});
	const image = fw;
	const title = nested(copy, image.titleKey);
	const desc = nested(copy, image.descKey);
	function canInstall() {
		if (!scooter) return copy.flash.needConnect;
		if (scooter.model !== image.model) return copy.flash.mismatch;
		if (scooter.battery < 50) return copy.flash.batteryLow;
		return null;
	}
	function run() {
		const block = canInstall();
		if (block) {
			setErr(block);
			return;
		}
		setErr("");
		setPhase("run");
		setStep(0);
		let i = 0;
		const tick = () => {
			pushLog(`${STEPS[i]} ${image.checksum}`);
			if (i >= STEPS.length - 1) {
				recordFlash({
					at: Date.now(),
					slug: image.slug,
					title,
					serial: scooter.serial,
					result: "ok",
					checksum: image.checksum
				});
				setPhase("done");
				return;
			}
			i += 1;
			setStep(i);
			window.setTimeout(tick, 900);
		};
		window.setTimeout(tick, 700);
	}
	const blocked = canInstall();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid gap-10 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.22em] text-accent",
				children: image.kind === "dashboard" ? copy.label.dashboard : copy.label.controller
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-3 text-4xl tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-subtle",
				children: [
					MODEL_LABEL[image.model],
					" · ",
					nested(copy, image.familyKey)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-xl text-sm leading-relaxed text-muted",
				children: desc
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 text-sm",
				children: [
					image.speedValue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs uppercase tracking-[0.16em] text-subtle",
						children: nested(copy, image.speedKey)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-2xl text-accent",
						children: image.speedValue
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs uppercase tracking-[0.16em] text-subtle",
						children: copy.flash.version
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-mono text-fg",
						children: image.version
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs uppercase tracking-[0.16em] text-subtle",
						children: copy.flash.family
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-mono text-fg",
						children: image.controllerFamily
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs uppercase tracking-[0.16em] text-subtle",
						children: copy.flash.sum
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-mono text-fg",
						children: image.checksum
					})] }),
					image.zeroStart !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs uppercase tracking-[0.16em] text-subtle",
						children: copy.flash.zs
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: image.zeroStart ? copy.flash.on : copy.flash.off
					})] }) : null,
					image.policeMode !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs uppercase tracking-[0.16em] text-subtle",
						children: copy.flash.pm
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: image.policeMode ? copy.flash.on : copy.flash.off
					})] }) : null
				]
			}),
			phase === "idle" || phase === "fail" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					onClick: run,
					children: [copy.flash.install, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "cta-arrow size-4" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "raised",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/garage",
						children: copy.nav.garage
					})
				})]
			}) : null,
			err || blocked && phase === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-danger",
				children: err || blocked
			}) : null,
			phase === "run" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-[var(--radius-md)] border border-line bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: copy.flash.keep
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 space-y-3",
					children: STEPS.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", i < step ? "bg-accent" : i === step ? "bg-accent animate-pulse" : "bg-line") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: i <= step ? "text-fg" : "text-subtle",
							children: copy.flash[id]
						})]
					}, id))
				})]
			}) : null,
			phase === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-[var(--radius-md)] border border-accent/40 bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-accent",
						children: copy.flash.done
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: copy.support.afterBody
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-5",
						onClick: () => nav({ to: "/garage" }),
						children: copy.flash.close
					})
				]
			}) : null
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-[var(--radius-lg)] border border-line bg-surface p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: PHOTO[image.photo],
				alt: "",
				className: "product-photo mx-auto max-h-72 w-auto object-contain"
			})
		})]
	});
}
//#endregion
export { FlashPage as component };
