import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAxle, o as t, r as Button } from "./router-T8NQQqNK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CMp65-oR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const lang = useAxle((s) => s.lang);
	const signIn = useAxle((s) => s.signIn);
	const copy = t(lang);
	const nav = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("in");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-md pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: copy.login.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: copy.login.lead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: copy.login.note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-4",
				onSubmit: (e) => {
					e.preventDefault();
					if (!email.includes("@")) return;
					signIn(email.trim());
					nav({ to: "/garage" });
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: [copy.login.email, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						required: true,
						value: email,
						onChange: (e) => setEmail(e.target.value),
						className: "mt-2 h-12 w-full rounded-[var(--radius-sm)] border border-line bg-raised px-4 outline-none focus:border-accent"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					size: "lg",
					children: mode === "in" ? copy.login.go : copy.login.register
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 text-sm text-accent",
				onClick: () => setMode(mode === "in" ? "up" : "in"),
				children: mode === "in" ? copy.login.register : copy.login.go
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-center text-xs uppercase tracking-[0.18em] text-subtle",
				children: copy.login.or
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "raised",
					onClick: () => {
						signIn("google@chief.local");
						nav({ to: "/garage" });
					},
					children: copy.login.google
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "raised",
					onClick: () => {
						signIn("x@chief.local");
						nav({ to: "/garage" });
					},
					children: copy.login.x
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs text-subtle",
				children: copy.login.guest
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-6 inline-block text-sm text-accent",
				children: copy.login.back
			})
		]
	});
}
//#endregion
export { LoginPage as component };
