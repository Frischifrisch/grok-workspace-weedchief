import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAxle, o as t } from "./router-T8NQQqNK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-DkmwZfXD.js
var import_jsx_runtime = require_jsx_runtime();
function HistoryPage() {
	const lang = useAxle((s) => s.lang);
	const history = useAxle((s) => s.history);
	const copy = t(lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl tracking-tight",
			children: copy.history.title
		}), history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-muted",
			children: copy.history.empty
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 divide-y divide-line border-y border-line",
			children: history.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center justify-between gap-3 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/flash/$slug",
					params: { slug: h.slug },
					className: "font-medium hover:text-accent",
					children: h.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-mono text-xs text-subtle",
					children: [
						h.serial,
						" · ",
						h.checksum
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: h.result === "ok" ? "text-accent" : "text-danger",
						children: h.result === "ok" ? copy.history.ok : copy.history.fail
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: new Date(h.at).toLocaleString()
					})]
				})]
			}, h.id))
		})]
	});
}
//#endregion
export { HistoryPage as component };
