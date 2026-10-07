import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as ArrowRight } from "../_libs/lucide-react.mjs";
import { i as cn, o as t, r as Button } from "./router-T8NQQqNK.mjs";
import { n as MODEL_LABEL, r as PHOTO } from "./catalog-DdXED0tl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firmware-card-BknkIGQS.js
var import_jsx_runtime = require_jsx_runtime();
function nested(obj, path) {
	return path.split(".").reduce((acc, key) => {
		if (acc && typeof acc === "object") return acc[key];
	}, obj);
}
function FirmwareCard({ fw, lang, featured }) {
	const copy = t(lang);
	const title = nested(copy, fw.titleKey);
	const desc = nested(copy, fw.descKey);
	const family = nested(copy, fw.familyKey);
	const speedLabel = nested(copy, fw.speedKey);
	const kind = fw.kind === "dashboard" ? copy.label.dashboard : copy.label.controller;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6 card-lift",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-5 flex h-40 items-end justify-center sm:h-48",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: PHOTO[fw.photo],
					alt: MODEL_LABEL[fw.model],
					className: "product-photo max-h-full w-auto object-contain"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.18em] text-accent",
				children: kind
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-subtle",
				children: [
					MODEL_LABEL[fw.model],
					" · ",
					family
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display mt-3 text-2xl tracking-tight",
				children: title
			}),
			fw.speedValue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm",
				children: fw.speedKey === "label.maxSpeed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-[0.16em] text-subtle",
					children: speedLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display ml-2 text-xl text-accent",
					children: fw.speedValue
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted",
					children: [
						speedLabel,
						" ",
						fw.speedValue
					]
				})
			}) : null,
			fw.badges.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: fw.badges.map((b) => {
					const label = nested(copy, b);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", b === "badge.testing" ? "border-accent/40 text-accent" : "border-line text-muted"),
						children: label
					}, b);
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 flex-1 text-sm leading-relaxed text-muted",
				children: desc
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: featured || fw.accentCta ? "accent" : "raised",
				className: "mt-6 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/flash/$slug",
					params: { slug: fw.slug },
					children: [copy.flash.details, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "cta-arrow size-4" })]
				})
			})
		]
	});
}
//#endregion
export { FirmwareCard as t };
