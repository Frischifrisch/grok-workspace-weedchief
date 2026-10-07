import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Moon, i as Sun, o as Menu, r as TriangleAlert, s as Globe, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-T8NQQqNK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var en = {
	brand: "CHIEF",
	tag: "Custom firmware for NAVEE.",
	nav: {
		home: "Home",
		firmware: "Firmware",
		how: "How It Works",
		support: "Support",
		garage: "Garage",
		legal: "Legal",
		terms: "Terms",
		privacy: "Privacy",
		history: "History",
		settings: "Settings",
		signIn: "Sign in"
	},
	hero: {
		kicker: "NAVEE ST5 Max · ST3",
		title1: "Your scooter.",
		title2: "Your firmware.",
		lead: "Custom firmware for NAVEE ST5 Max and ST3. Custom Firmware, Factory Restore, and a 30 km/h test image — installed through CHIEF.",
		explore: "Explore Firmware",
		checks: "Compatibility checks",
		open: "Every image available",
		models: "NAVEE ST5 Max and ST3"
	},
	firmware: {
		title: "Firmware",
		sub: "Choose firmware for a supported NAVEE scooter. All images are available.",
		import: "Import firmware",
		importHint: "Add a local .bin image for testing. Compatibility checks still run."
	},
	compare: {
		title: "Stock vs CHIEF Custom",
		stock: "Stock",
		custom: "CHIEF Custom",
		speed: "Maximum speed",
		speedS: "Factory limit",
		speedC: "Custom limit on the selected image",
		cfg: "Custom configuration",
		cfgS: "No",
		cfgC: "Yes",
		restore: "Factory restore",
		restoreS: "Original image",
		restoreC: "Available for ST5 Max.",
		app: "CHIEF app",
		appS: "Official NAVEE app",
		appC: "CHIEF Android app and web installer",
		updates: "Firmware updates",
		updatesS: "Factory",
		updatesC: "CHIEF catalog"
	},
	how: {
		title: "How It Works",
		sub: "A checked install procedure — not a second flash screen.",
		s1t: "Choose firmware",
		s1: "Pick Custom Firmware, Test Firmware, Factory Restore, or dashboard firmware.",
		s2t: "Check compatibility",
		s2: "CHIEF checks model, controller and image before anything is written.",
		s3t: "Connect the scooter",
		s3: "Turn it on, close official NAVEE, and connect in CHIEF.",
		s4t: "Follow CHIEF",
		s4: "Keep the scooter standing, battery above 50%, then follow the existing install screen."
	},
	models: {
		title: "Supported models",
		sub: "Published firmware for NAVEE ST5 Max and ST3"
	},
	made: {
		title: "Made for your scooter",
		lead: "Firmware prepared for NAVEE ST5 Max and ST3, where listed.",
		simpleT: "Simple",
		simple: "Follow the steps in CHIEF. No separate flashing tool.",
		checkedT: "Checked install",
		checked: "Compatibility and firmware checks run before the write starts.",
		provenT: "Proven procedure",
		proven: "Uses the existing scooter update path. Keep the phone close and the screen on."
	},
	faq: {
		title: "FAQ",
		q1: "Which models are supported?",
		a1: "NAVEE ST5 Max and NAVEE ST3. Other models are not supported yet.",
		q2: "Which controller firmware versions are supported?",
		a2: "ST5 Max motor firmware is the 0.0.0.9 / 7801 family used in Factory Restore. ST3 uses 0.0.1.1 / 3701. Dashboard firmware is 0.0.2.0. CHIEF still checks the connected scooter before a write.",
		q3: "How do I see the firmware version?",
		a3: "Connect the scooter in Garage. CHIEF reads what the controller reports over Bluetooth.",
		q4: "How do I see the controller model?",
		a4: "Connect in Garage. Serial, model and related fields come from the scooter when the link is up.",
		q5: "Does CHIEF work on iPhone / iOS?",
		a5: "iPhone can flash through Bluefy. The Android CHIEF app is the more reliable installer. The iOS APK is not available.",
		q6: "What if the install does not finish?",
		a6: "Keep the scooter powered, stay close, and retry from the same screen. If the controller stays in update mode, reconnect and try again. Factory Restore is available if you need to go back.",
		q7: "What if the scooter no longer turns on?",
		a7: "Power it off for 5 seconds and try again. If it still does not start, reconnect and use Factory Restore when that option is available for your model.",
		q8: "Can I restore Stock Firmware?",
		a8: "Yes for ST5 Max. Factory Restore is in the catalog. ST3 currently has no separate factory restore image in CHIEF.",
		q9: "Do I need internet during the flash?",
		a9: "Yes to fetch the firmware for that session. The write itself goes over Bluetooth to the scooter.",
		q10: "How long does a flash take?",
		a10: "Usually a few minutes. Keep the screen on and stay next to the scooter until CHIEF says it is done.",
		q11: "Is every firmware available?",
		a11: "Yes. Connect a matching scooter in Garage and install any published image. Compatibility checks still run.",
		q12: "Do I need an account to flash?",
		a12: "No. Connect a scooter in Garage and install any image. Sign-in is optional.",
		q13: "What does Free Test Firmware do?",
		a13: "It is an ST5 Max motor image with a 30 km/h maximum. Zero Start is off. Police Mode is off. It is not the Custom Firmware.",
		q14: "Is there Zero Start?",
		a14: "Free Test Firmware does not include Zero Start. On a connected scooter the CHIEF app can still send start-speed commands when that control is available.",
		q15: "Is there Police Mode?",
		a15: "Free Test Firmware: Police Mode is off. ST5 Max Custom Firmware includes additional speed behaviour described before you flash."
	},
	apk: {
		title: "CHIEF Android App",
		download: "Download CHIEF",
		lead: "Android app for Bluetooth install. Version 2.6.46 · 11.2 MB · September 2026.",
		note: "CHIEF uses Bluetooth LE and the scooter update channel, so it is distributed as a direct APK instead of Google Play.",
		perms: "Android permissions",
		p1: "Bluetooth / BLE scan and connect — find the scooter and run the update.",
		p2: "Location (older Android) — required by the system for Bluetooth scanning.",
		p3: "Internet — fetch the firmware for the current session.",
		p4: "Vibration — feedback during the install.",
		file: "Download CHIEF.apk",
		web: "This preview uses the web installer in Garage. Connect a demo scooter and flash from the catalog — no APK required here."
	},
	roads: {
		title: "Germany / public roads",
		body: "Responsibility for using modified firmware and for complying with applicable law lies with the vehicle owner. In Germany, public-road use of e-scooters is regulated, including the eKFV. Modified firmware may mean a vehicle no longer meets those requirements. This is information, not legal advice."
	},
	gate: {
		title: "Before you continue",
		read: "Please read this carefully.",
		p1: "This site provides custom firmware for e-scooters.",
		p2a: "Use on public roads is prohibited.",
		p2b: "It is intended exclusively for private property: closed courses, private land, and test areas where all applicable rules are followed.",
		p3a: "No liability is accepted for damage to people, vehicles, third parties, or property caused by firmware from this site. You flash",
		p3b: "at your own risk.",
		check: "I understand — private property only",
		continue: "Continue",
		badge: "Private property only"
	},
	garage: {
		title: "Garage",
		lead: "Connect the scooter, then install any image from the catalog.",
		empty: "No scooters yet",
		emptyHint: "Connect your first scooter to get started.",
		connect: "Connect scooter",
		scanning: "Scanning Bluetooth…",
		found: "Found nearby",
		linking: "Linking…",
		disconnect: "Disconnect",
		battery: "Battery",
		serial: "Serial",
		controller: "Controller",
		rssi: "Signal",
		start: "Start speed",
		demoHint: "Preview uses a simulated scooter. Keep the original NAVEE app closed on a real install."
	},
	history: {
		title: "History",
		empty: "No installations yet.",
		ok: "Installed",
		fail: "Failed"
	},
	settings: {
		title: "Settings",
		safety: "Flash safety",
		start: "Start speed",
		startHint: "Connect the scooter first. Command is sent when the link is up.",
		diag: "Diagnostics",
		diagOff: "Diagnostics unavailable until a scooter is connected.",
		export: "Export diagnostic report",
		dev: "Developer mode",
		devHint: "Show BLE log and extra controller fields.",
		about: "About CHIEF",
		aboutBody: "Scooter firmware manager 1.0.0 — NAVEE ST5 Max and NAVEE ST3.",
		signedIn: "Signed in",
		signOut: "Sign out"
	},
	support: {
		title: "Support",
		lead: "Help with installation and the connected scooter.",
		install: "Installation",
		installBody: "Use an Android phone. Close the official NAVEE app. Keep the scooter nearby, standing, with battery above 50%.",
		compat: "Compatibility",
		compatBody: "CHIEF checks model, controller family and battery before a write. Every published image can be installed on a matching scooter.",
		after: "After installation",
		afterBody: "Power the scooter off for 5 seconds. The scooter starts at 22 km/h. Boost should not shut the scooter down."
	},
	login: {
		title: "Sign in",
		lead: "Sign in to save a session on this device and manage your scooter.",
		note: "The catalog is public. Sign-in is optional. Google/X are optional.",
		email: "Email",
		go: "Sign in",
		register: "No account — register",
		or: "or",
		google: "Google",
		x: "X",
		back: "Back to catalog",
		guest: "This preview stores the session on this device only."
	},
	flash: {
		details: "View details",
		install: "Install on scooter",
		needConnect: "Connect a matching scooter in Garage first.",
		mismatch: "Connected scooter does not match this image.",
		batteryLow: "Battery must be above 50%.",
		fetching: "Fetching image",
		checking: "Compatibility check",
		erasing: "Erase controller",
		writing: "Writing firmware",
		verifying: "Verifying checksum",
		done: "Install complete",
		fail: "Install did not finish",
		retry: "Retry",
		close: "Back to Garage",
		keep: "Keep the scooter standing, screen on, and stay close.",
		version: "Image",
		family: "Controller family",
		sum: "Checksum",
		zs: "Zero Start",
		pm: "Police Mode",
		on: "On",
		off: "Off"
	},
	legal: {
		imprint: "Legal Notice",
		imprintEff: "Effective: 20 September 2026",
		imprint1: "CHIEF provides custom firmware for supported NAVEE scooters.",
		service: "Service",
		brand: "Brand: CHIEF",
		site: "Website: this CHIEF preview",
		content: "Content",
		contentBody: "We are responsible for our own content. Linked third-party sites have their own operators. We remove a link if we are told it is unlawful. NAVEE is a third-party brand. CHIEF is not affiliated with NAVEE.",
		termsTitle: "Terms of use",
		termsEff: "Effective: 20 September 2026",
		t1: "A simple, non-transferable right to use custom or restore firmware for supported models (currently ST5 Max and ST3). There is no physical shipment.",
		t2: "All published firmware is available. Compatibility checks still run against the connected scooter.",
		t3: "The firmware is not for public roads. Use it only on private property, closed tracks, and test areas where that is allowed. Battery above 50%, standing, official NAVEE app closed.",
		t4: "This preview is a web installer. No purchase is required to use the catalog.",
		privacyTitle: "Privacy",
		p1: "Vehicle serial, model, flash session: time, result, firmware checksum. Stored on this device only in this preview.",
		p2: "To deliver firmware and keep a local install history. Security: errors. No tracking, ads, or sale of data.",
		p3: "No analytics or ad cookies. Only language, theme, session, and installer state so the service works."
	},
	label: {
		maxSpeed: "MAX SPEED",
		startSpeed: "Start",
		version: "Version",
		restore: "Factory Restore",
		controller: "Controller",
		dashboard: "Dashboard"
	},
	family: {
		custom: "Custom Firmware",
		test: "Free Test Firmware",
		dash: "Dashboard Firmware",
		stock: "Factory firmware / Restore"
	},
	fw: {
		st5custom: {
			title: "ST5 Max Custom Firmware",
			desc: "Custom firmware for the NAVEE ST5 Max motor controller."
		},
		st5test: {
			title: "ST5 Max Free Test Firmware",
			desc: "Test firmware for NAVEE ST5 Max. MAX 30 km/h."
		},
		st5sweden: {
			title: "ST5 Max Custom Firmware Sweden",
			desc: "Starts at 20 km/h. Additional firmware for Sweden."
		},
		st3custom: {
			title: "ST3 Custom Firmware",
			desc: "This firmware is being tested. Custom firmware for the NAVEE ST3 motor controller."
		},
		dash: {
			title: "Custom Dashboard Firmware",
			desc: "Fully tested dashboard firmware for the NAVEE ST5 Max."
		},
		stock: {
			title: "ST5 Max Factory Restore",
			desc: "Return the controller to original factory firmware."
		}
	},
	badge: {
		testing: "Testing",
		restore: "Factory Restore",
		zeroOff: "Zero Start off",
		policeOff: "Police Mode off"
	}
};
var DICTS = {
	en,
	de: {
		brand: "CHIEF",
		tag: "Custom Firmware für NAVEE.",
		nav: {
			home: "Home",
			firmware: "Firmware",
			how: "So funktioniert's",
			support: "Support",
			garage: "Garage",
			legal: "Impressum",
			terms: "AGB",
			privacy: "Datenschutz",
			history: "Verlauf",
			settings: "Einstellungen",
			signIn: "Anmelden"
		},
		hero: {
			kicker: "NAVEE ST5 Max · ST3",
			title1: "Dein Scooter.",
			title2: "Deine Firmware.",
			lead: "Custom Firmware für NAVEE ST5 Max und ST3. Custom Firmware, Factory Restore und ein 30 km/h Test-Image — installiert über CHIEF.",
			explore: "Firmware ansehen",
			checks: "Kompatibilitätsprüfung",
			open: "Jedes Image verfügbar",
			models: "NAVEE ST5 Max und ST3"
		},
		firmware: {
			title: "Firmware",
			sub: "Firmware für einen unterstützten NAVEE-Scooter wählen. Alle Images sind verfügbar.",
			import: "Firmware importieren",
			importHint: "Lokales .bin-Image zum Testen hinzufügen. Die Prüfung läuft trotzdem."
		},
		compare: {
			title: "Serie vs CHIEF Custom",
			stock: "Serie",
			custom: "CHIEF Custom",
			speed: "Höchstgeschwindigkeit",
			speedS: "Werksgrenze",
			speedC: "Limit des gewählten Images",
			cfg: "Eigene Konfiguration",
			cfgS: "Nein",
			cfgC: "Ja",
			restore: "Factory Restore",
			restoreS: "Original-Image",
			restoreC: "Verfügbar für ST5 Max.",
			app: "CHIEF App",
			appS: "Offizielle NAVEE-App",
			appC: "CHIEF Android-App und Web-Installer",
			updates: "Firmware-Updates",
			updatesS: "Werk",
			updatesC: "CHIEF-Katalog"
		},
		how: {
			title: "So funktioniert's",
			sub: "Ein geprüfter Installationsablauf — kein zweiter Flash-Screen.",
			s1t: "Firmware wählen",
			s1: "Custom Firmware, Test Firmware, Factory Restore oder Dashboard-Firmware.",
			s2t: "Kompatibilität prüfen",
			s2: "CHIEF prüft Modell, Controller und Image, bevor geschrieben wird.",
			s3t: "Scooter verbinden",
			s3: "Einschalten, offizielle NAVEE-App schließen, in CHIEF verbinden.",
			s4t: "CHIEF folgen",
			s4: "Scooter stehen lassen, Akku über 50 %, dann dem Installationsbildschirm folgen."
		},
		models: {
			title: "Unterstützte Modelle",
			sub: "Veröffentlichte Firmware für NAVEE ST5 Max und ST3"
		},
		made: {
			title: "Für deinen Scooter",
			lead: "Firmware für NAVEE ST5 Max und ST3, soweit gelistet.",
			simpleT: "Einfach",
			simple: "Den Schritten in CHIEF folgen. Kein extra Flash-Tool.",
			checkedT: "Geprüfte Installation",
			checked: "Kompatibilität und Image werden vor dem Schreiben geprüft.",
			provenT: "Bewährter Ablauf",
			proven: "Nutzt den vorhandenen Update-Kanal. Display an, nah am Scooter bleiben."
		},
		faq: {
			title: "FAQ",
			q1: "Welche Modelle werden unterstützt?",
			a1: "NAVEE ST5 Max und NAVEE ST3. Andere Modelle noch nicht.",
			q2: "Welche Controller-Versionen?",
			a2: "ST5 Max Motor-Firmware ist die Familie 0.0.0.9 / 7801 (Factory Restore). ST3 nutzt 0.0.1.1 / 3701. Dashboard 0.0.2.0. CHIEF prüft den verbundenen Scooter vor dem Schreiben.",
			q3: "Wie sehe ich die Firmware-Version?",
			a3: "Scooter in der Garage verbinden. CHIEF liest, was der Controller über Bluetooth meldet.",
			q4: "Wie sehe ich das Controller-Modell?",
			a4: "In der Garage verbinden. Seriennummer, Modell und Felder kommen vom Scooter, sobald die Verbindung steht.",
			q5: "Funktioniert CHIEF auf iPhone / iOS?",
			a5: "iPhone kann über Bluefy flashen. Die Android-App von CHIEF ist der zuverlässigere Installer. Ein iOS-APK gibt es nicht.",
			q6: "Was, wenn die Installation nicht durchläuft?",
			a6: "Scooter eingeschaltet lassen, nah bleiben, vom selben Screen erneut versuchen. Wenn der Controller im Update-Modus bleibt: neu verbinden. Factory Restore steht zur Verfügung.",
			q7: "Was, wenn der Scooter nicht mehr startet?",
			a7: "5 Sekunden aus, dann erneut. Wenn er weiter tot ist: verbinden und Factory Restore nutzen, sofern für das Modell verfügbar.",
			q8: "Kann ich Stock-Firmware zurückspielen?",
			a8: "Ja für ST5 Max. Factory Restore liegt im Katalog. ST3 hat derzeit kein separates Restore-Image.",
			q9: "Brauche ich Internet während des Flash?",
			a9: "Ja, um das Image für die Sitzung zu holen. Das Schreiben selbst läuft per Bluetooth.",
			q10: "Wie lange dauert ein Flash?",
			a10: "Meist ein paar Minuten. Display an, neben dem Scooter bleiben, bis CHIEF fertig sagt.",
			q11: "Ist jede Firmware verfügbar?",
			a11: "Ja. Passenden Scooter in der Garage verbinden und jedes veröffentlichte Image installieren. Die Kompatibilitätsprüfung läuft trotzdem.",
			q12: "Brauche ich ein Konto zum Flashen?",
			a12: "Nein. Scooter in der Garage verbinden und jedes Image installieren. Anmeldung ist optional.",
			q13: "Was macht Free Test Firmware?",
			a13: "ST5-Max-Motor-Image mit 30 km/h Maximum. Zero Start aus. Police Mode aus. Nicht die Custom Firmware.",
			q14: "Gibt es Zero Start?",
			a14: "Free Test Firmware enthält kein Zero Start. Am verbundenen Scooter kann die App trotzdem Startgeschwindigkeit senden, wenn das Steuerbefehl verfügbar ist.",
			q15: "Gibt es Police Mode?",
			a15: "Free Test: Police Mode aus. ST5 Max Custom Firmware enthält zusätzliches Geschwindigkeitsverhalten, beschrieben vor dem Flash."
		},
		apk: {
			title: "CHIEF Android-App",
			download: "CHIEF herunterladen",
			lead: "Android-App für Bluetooth-Install. Version 2.6.46 · 11,2 MB · September 2026.",
			note: "CHIEF nutzt Bluetooth LE und den Scooter-Update-Kanal und wird daher als APK statt über Google Play verteilt.",
			perms: "Android-Berechtigungen",
			p1: "Bluetooth / BLE scannen und verbinden — Scooter finden und Update starten.",
			p2: "Standort (älteres Android) — vom System für Bluetooth-Scan verlangt.",
			p3: "Internet — Image der Sitzung laden.",
			p4: "Vibration — Feedback während der Installation.",
			file: "CHIEF.apk laden",
			web: "In dieser Vorschau ist die Garage der Web-Installer. Demo-Scooter verbinden und aus dem Katalog flashen — kein APK nötig."
		},
		roads: {
			title: "Deutschland / öffentlicher Raum",
			body: "Verantwortung für geänderte Firmware und die Einhaltung geltenden Rechts liegt beim Fahrzeughalter. In Deutschland ist die Nutzung von E-Scootern im öffentlichen Verkehr geregelt, einschließlich eKFV. Geänderte Firmware kann bedeuten, dass das Fahrzeug diese Vorgaben nicht mehr erfüllt. Dies ist eine Information, keine Rechtsberatung."
		},
		gate: {
			title: "Bevor du weitergehst",
			read: "Bitte genau lesen.",
			p1: "Diese Seite stellt Custom Firmware für E-Scooter bereit.",
			p2a: "Nutzung im öffentlichen Verkehr ist untersagt.",
			p2b: "Ausschließlich für Privatgelände: geschlossene Strecken, privater Grund und Testflächen, auf denen alle geltenden Regeln eingehalten werden.",
			p3a: "Keine Haftung für Schäden an Personen, Fahrzeugen, Dritten oder Eigentum durch Firmware von dieser Seite. Du flashst",
			p3b: "auf eigenes Risiko.",
			check: "Ich verstehe — nur Privatgelände",
			continue: "Weiter",
			badge: "Nur Privatgelände"
		},
		garage: {
			title: "Garage",
			lead: "Scooter verbinden, dann jedes Image aus dem Katalog installieren.",
			empty: "Noch keine Scooter",
			emptyHint: "Verbinde deinen ersten Scooter.",
			connect: "Scooter verbinden",
			scanning: "Bluetooth-Scan…",
			found: "In der Nähe",
			linking: "Verbinden…",
			disconnect: "Trennen",
			battery: "Akku",
			serial: "Serie",
			controller: "Controller",
			rssi: "Signal",
			start: "Startgeschwindigkeit",
			demoHint: "Die Vorschau nutzt einen simulierten Scooter. Bei einer echten Installation die NAVEE-App schließen."
		},
		history: {
			title: "Verlauf",
			empty: "Noch keine Installationen.",
			ok: "Installiert",
			fail: "Fehlgeschlagen"
		},
		settings: {
			title: "Einstellungen",
			safety: "Flash-Sicherheit",
			start: "Startgeschwindigkeit",
			startHint: "Zuerst Scooter verbinden. Befehl geht, sobald die Verbindung steht.",
			diag: "Diagnose",
			diagOff: "Diagnose erst nach Verbindung verfügbar.",
			export: "Diagnosebericht exportieren",
			dev: "Entwicklermodus",
			devHint: "BLE-Log und zusätzliche Controller-Felder.",
			about: "Über CHIEF",
			aboutBody: "Scooter-Firmware-Manager 1.0.0 — NAVEE ST5 Max und NAVEE ST3.",
			signedIn: "Angemeldet",
			signOut: "Abmelden"
		},
		support: {
			title: "Support",
			lead: "Hilfe zu Installation und verbundenem Scooter.",
			install: "Installation",
			installBody: "Android-Telefon. Offizielle NAVEE-App schließen. Scooter in der Nähe, stehend, Akku über 50 %.",
			compat: "Kompatibilität",
			compatBody: "CHIEF prüft Modell, Controller-Familie und Akku vor dem Schreiben. Jedes veröffentlichte Image lässt sich auf einem passenden Scooter installieren.",
			after: "Nach der Installation",
			afterBody: "Scooter 5 Sekunden aus. Start bei 22 km/h. Boost soll den Scooter nicht abschalten."
		},
		login: {
			title: "Anmelden",
			lead: "Anmelden, um eine Sitzung auf diesem Gerät zu speichern und den Scooter zu verwalten.",
			note: "Der Katalog ist öffentlich. Anmeldung ist optional. Google/X sind optional.",
			email: "E-Mail",
			go: "Anmelden",
			register: "Kein Konto — registrieren",
			or: "oder",
			google: "Google",
			x: "X",
			back: "Zurück zum Katalog",
			guest: "Diese Vorschau speichert die Sitzung nur auf diesem Gerät."
		},
		flash: {
			details: "Details",
			install: "Auf Scooter installieren",
			needConnect: "Zuerst passenden Scooter in der Garage verbinden.",
			mismatch: "Verbundener Scooter passt nicht zu diesem Image.",
			batteryLow: "Akku muss über 50 % liegen.",
			fetching: "Image laden",
			checking: "Kompatibilitätsprüfung",
			erasing: "Controller löschen",
			writing: "Firmware schreiben",
			verifying: "Checksumme prüfen",
			done: "Installation abgeschlossen",
			fail: "Installation nicht durchgelaufen",
			retry: "Erneut",
			close: "Zur Garage",
			keep: "Scooter stehen lassen, Display an, nah bleiben.",
			version: "Image",
			family: "Controller-Familie",
			sum: "Checksumme",
			zs: "Zero Start",
			pm: "Police Mode",
			on: "An",
			off: "Aus"
		},
		legal: {
			imprint: "Impressum",
			imprintEff: "Stand: 20. September 2026",
			imprint1: "CHIEF stellt Custom Firmware für unterstützte NAVEE-Scooter bereit.",
			service: "Anbieter",
			brand: "Marke: CHIEF",
			site: "Website: diese CHIEF-Vorschau",
			content: "Inhalte",
			contentBody: "Wir sind für eigene Inhalte verantwortlich. Verlinkte Drittseiten haben eigene Betreiber. Rechtswidrige Links entfernen wir nach Hinweis. NAVEE ist eine Drittmarke. CHIEF ist nicht mit NAVEE verbunden.",
			termsTitle: "Nutzungsbedingungen",
			termsEff: "Stand: 20. September 2026",
			t1: "Ein einfaches, nicht übertragbares Recht, Custom- oder Restore-Firmware für unterstützte Modelle (derzeit ST5 Max und ST3) zu nutzen. Keine physische Lieferung.",
			t2: "Alle veröffentlichten Firmware-Images sind verfügbar. Die Kompatibilitätsprüfung läuft am verbundenen Scooter.",
			t3: "Die Firmware ist nicht für den öffentlichen Verkehr. Nur Privatgelände, geschlossene Strecken und erlaubte Testflächen. Akku über 50 %, stehend, offizielle NAVEE-App geschlossen.",
			t4: "Diese Vorschau ist ein Web-Installer. Kein Kauf nötig, um den Katalog zu nutzen.",
			privacyTitle: "Datenschutz",
			p1: "Fahrzeugseriennummer, Modell, Flash-Sitzung: Zeit, Ergebnis, Checksumme. In dieser Vorschau nur auf diesem Gerät gespeichert.",
			p2: "Firmware liefern und lokalen Installationsverlauf halten. Sicherheit: Fehler. Kein Tracking, keine Werbung, kein Verkauf von Daten.",
			p3: "Keine Analyse- oder Werbe-Cookies. Nur Sprache, Theme, Sitzung und Installer-Status, damit der Dienst funktioniert."
		},
		label: {
			maxSpeed: "MAX SPEED",
			startSpeed: "Start",
			version: "Version",
			restore: "Factory Restore",
			controller: "Controller",
			dashboard: "Dashboard"
		},
		family: {
			custom: "Custom Firmware",
			test: "Free Test Firmware",
			dash: "Dashboard-Firmware",
			stock: "Werksfirmware / Restore"
		},
		fw: {
			st5custom: {
				title: "ST5 Max Custom Firmware",
				desc: "Custom Firmware für den NAVEE ST5 Max Motor-Controller."
			},
			st5test: {
				title: "ST5 Max Free Test Firmware",
				desc: "Test-Firmware für NAVEE ST5 Max. MAX 30 km/h."
			},
			st5sweden: {
				title: "ST5 Max Custom Firmware Sweden",
				desc: "Startet bei 20 km/h. Zusätzliche Firmware für Schweden."
			},
			st3custom: {
				title: "ST3 Custom Firmware",
				desc: "Diese Firmware wird getestet. Custom Firmware für den NAVEE ST3 Motor-Controller."
			},
			dash: {
				title: "Custom Dashboard Firmware",
				desc: "Voll getestete Dashboard-Firmware für den NAVEE ST5 Max."
			},
			stock: {
				title: "ST5 Max Factory Restore",
				desc: "Controller auf originale Werksfirmware zurücksetzen."
			}
		},
		badge: {
			testing: "Test",
			restore: "Factory Restore",
			zeroOff: "Zero Start aus",
			policeOff: "Police Mode aus"
		}
	},
	ru: {
		brand: "CHIEF",
		tag: "Кастомная прошивка для NAVEE.",
		nav: {
			home: "Главная",
			firmware: "Прошивки",
			how: "Как это работает",
			support: "Поддержка",
			garage: "Гараж",
			legal: "Реквизиты",
			terms: "Условия",
			privacy: "Конфиденциальность",
			history: "История",
			settings: "Настройки",
			signIn: "Войти"
		},
		hero: {
			kicker: "NAVEE ST5 Max · ST3",
			title1: "Твой самокат.",
			title2: "Твоя прошивка.",
			lead: "Кастомная прошивка для NAVEE ST5 Max и ST3. Custom Firmware, Factory Restore и тестовый образ 30 км/ч — установка через CHIEF.",
			explore: "Смотреть прошивки",
			checks: "Проверка совместимости",
			open: "Все образы доступны",
			models: "NAVEE ST5 Max и ST3"
		},
		firmware: {
			title: "Прошивки",
			sub: "Выберите прошивку для поддерживаемого самоката NAVEE. Все образы доступны.",
			import: "Импорт прошивки",
			importHint: "Добавьте локальный .bin для теста. Проверки всё равно выполняются."
		},
		compare: {
			title: "Сток vs CHIEF Custom",
			stock: "Сток",
			custom: "CHIEF Custom",
			speed: "Максимальная скорость",
			speedS: "Заводской лимит",
			speedC: "Лимит выбранного образа",
			cfg: "Своя конфигурация",
			cfgS: "Нет",
			cfgC: "Да",
			restore: "Factory restore",
			restoreS: "Оригинальный образ",
			restoreC: "Доступно для ST5 Max.",
			app: "Приложение CHIEF",
			appS: "Официальное приложение NAVEE",
			appC: "Android-приложение CHIEF и веб-установщик",
			updates: "Обновления",
			updatesS: "Заводские",
			updatesC: "Каталог CHIEF"
		},
		how: {
			title: "Как это работает",
			sub: "Проверенная процедура установки — не второй экран прошивки.",
			s1t: "Выберите прошивку",
			s1: "Custom Firmware, Test Firmware, Factory Restore или прошивка панели.",
			s2t: "Проверьте совместимость",
			s2: "CHIEF проверяет модель, контроллер и образ до записи.",
			s3t: "Подключите самокат",
			s3: "Включите, закройте официальное NAVEE и подключитесь в CHIEF.",
			s4t: "Следуйте CHIEF",
			s4: "Самокат стоит, батарея выше 50%, затем идите по экрану установки."
		},
		models: {
			title: "Поддерживаемые модели",
			sub: "Опубликованные прошивки для NAVEE ST5 Max и ST3"
		},
		made: {
			title: "Для твоего самоката",
			lead: "Прошивки для NAVEE ST5 Max и ST3, где указано.",
			simpleT: "Просто",
			simple: "Следуйте шагам в CHIEF. Отдельный флешер не нужен.",
			checkedT: "Проверенная установка",
			checked: "Проверки совместимости и образа до начала записи.",
			provenT: "Проверенный путь",
			proven: "Используется штатный канал обновления. Экран включён, держитесь рядом."
		},
		faq: {
			title: "FAQ",
			q1: "Какие модели поддерживаются?",
			a1: "NAVEE ST5 Max и NAVEE ST3. Другие модели пока нет.",
			q2: "Какие версии прошивки контроллера?",
			a2: "Мотор ST5 Max — семейство 0.0.0.9 / 7801 (Factory Restore). ST3 — 0.0.1.1 / 3701. Панель — 0.0.2.0. CHIEF всё равно проверяет подключённый самокат.",
			q3: "Как увидеть версию прошивки?",
			a3: "Подключите самокат в Гараже. CHIEF читает то, что контроллер сообщает по Bluetooth.",
			q4: "Как увидеть модель контроллера?",
			a4: "Подключитесь в Гараже. Серийный номер, модель и поля приходят с самоката.",
			q5: "Работает ли CHIEF на iPhone / iOS?",
			a5: "iPhone может прошивать через Bluefy. Android-приложение CHIEF надёжнее. iOS APK нет.",
			q6: "Если установка не завершилась?",
			a6: "Не выключайте самокат, оставайтесь рядом, повторите с того же экрана. Если контроллер в режиме обновления — переподключитесь. Factory Restore доступен.",
			q7: "Если самокат больше не включается?",
			a7: "Выключите на 5 секунд и повторите. Если не стартует — подключитесь и используйте Factory Restore, если он есть для модели.",
			q8: "Можно вернуть сток?",
			a8: "Да для ST5 Max. Factory Restore есть в каталоге. У ST3 отдельного образа восстановления пока нет.",
			q9: "Нужен ли интернет во время прошивки?",
			a9: "Да, чтобы скачать образ сессии. Запись идёт по Bluetooth на самокат.",
			q10: "Сколько длится прошивка?",
			a10: "Обычно несколько минут. Не гасите экран и стойте рядом, пока CHIEF не скажет, что готово.",
			q11: "Все ли прошивки доступны?",
			a11: "Да. Подключите подходящий самокат в Гараже и установите любой опубликованный образ. Проверки совместимости всё равно идут.",
			q12: "Нужен ли аккаунт для прошивки?",
			a12: "Нет. Подключите самокат в Гараже и установите любой образ. Вход необязателен.",
			q13: "Что делает Free Test Firmware?",
			a13: "Моторный образ ST5 Max с максимумом 30 км/ч. Zero Start выкл. Police Mode выкл. Это не Custom Firmware.",
			q14: "Есть ли Zero Start?",
			a14: "В Free Test Firmware Zero Start нет. На подключённом самокате приложение всё равно может слать команды стартовой скорости, если управление доступно.",
			q15: "Есть ли Police Mode?",
			a15: "Free Test: Police Mode выкл. ST5 Max Custom Firmware включает дополнительное поведение скорости, описанное перед прошивкой."
		},
		apk: {
			title: "Android-приложение CHIEF",
			download: "Скачать CHIEF",
			lead: "Android-приложение для установки по Bluetooth. Версия 2.6.46 · 11,2 МБ · сентябрь 2026.",
			note: "CHIEF использует Bluetooth LE и канал обновления самоката, поэтому раздаётся как APK, а не через Google Play.",
			perms: "Разрешения Android",
			p1: "Bluetooth / BLE — найти самокат и запустить обновление.",
			p2: "Геолокация (старый Android) — требуется системой для сканирования Bluetooth.",
			p3: "Интернет — скачать образ сессии.",
			p4: "Вибрация — отклик во время установки.",
			file: "Скачать CHIEF.apk",
			web: "В этом превью установщик — веб-Гараж. Подключите демо-самокат и прошейте из каталога, APK не нужен."
		},
		roads: {
			title: "Германия / дороги общего пользования",
			body: "Ответственность за модифицированную прошивку и соблюдение закона несёт владелец. В Германии использование электросамокатов на дорогах регулируется, включая eKFV. Изменённая прошивка может означать, что ТС больше не соответствует требованиям. Это информация, не юридическая консультация."
		},
		gate: {
			title: "Прежде чем продолжить",
			read: "Прочитайте внимательно.",
			p1: "Сайт предоставляет кастомные прошивки для электросамокатов.",
			p2a: "Использование на дорогах общего пользования запрещено.",
			p2b: "Только частная территория: закрытые трассы, частная земля и тестовые площадки, где соблюдаются все правила.",
			p3a: "Ответственность за ущерб людям, технике, третьим лицам или имуществу не принимается. Вы прошиваете",
			p3b: "на свой риск.",
			check: "Понимаю — только частная территория",
			continue: "Продолжить",
			badge: "Только частная территория"
		},
		garage: {
			title: "Гараж",
			lead: "Подключите самокат, затем установите любой образ из каталога.",
			empty: "Самокатов пока нет",
			emptyHint: "Подключите первый самокат.",
			connect: "Подключить самокат",
			scanning: "Сканирование Bluetooth…",
			found: "Рядом",
			linking: "Соединение…",
			disconnect: "Отключить",
			battery: "Батарея",
			serial: "Серийный",
			controller: "Контроллер",
			rssi: "Сигнал",
			start: "Стартовая скорость",
			demoHint: "Превью использует симулированный самокат. При реальной установке закройте приложение NAVEE."
		},
		history: {
			title: "История",
			empty: "Установок пока нет.",
			ok: "Установлено",
			fail: "Сбой"
		},
		settings: {
			title: "Настройки",
			safety: "Безопасность прошивки",
			start: "Стартовая скорость",
			startHint: "Сначала подключите самокат. Команда уходит при активной связи.",
			diag: "Диагностика",
			diagOff: "Диагностика недоступна без самоката.",
			export: "Экспорт отчёта",
			dev: "Режим разработчика",
			devHint: "Журнал BLE и дополнительные поля контроллера.",
			about: "О CHIEF",
			aboutBody: "Менеджер прошивок 1.0.0 — NAVEE ST5 Max и NAVEE ST3.",
			signedIn: "Вы вошли",
			signOut: "Выйти"
		},
		support: {
			title: "Поддержка",
			lead: "Помощь по установке и подключённому самокату.",
			install: "Установка",
			installBody: "Телефон на Android. Закройте официальное NAVEE. Самокат рядом, стоит, батарея выше 50%.",
			compat: "Совместимость",
			compatBody: "CHIEF проверяет модель, семейство контроллера и батарею до записи. Любой опубликованный образ можно установить на подходящий самокат.",
			after: "После установки",
			afterBody: "Выключите самокат на 5 секунд. Старт с 22 км/ч. Boost не должен глушить самокат."
		},
		login: {
			title: "Войти",
			lead: "Войдите, чтобы сохранить сессию на этом устройстве и управлять самокатом.",
			note: "Каталог открыт. Вход необязателен. Google/X необязательны.",
			email: "Email",
			go: "Войти",
			register: "Нет аккаунта — регистрация",
			or: "или",
			google: "Google",
			x: "X",
			back: "Назад в каталог",
			guest: "Это превью хранит сессию только на этом устройстве."
		},
		flash: {
			details: "Подробнее",
			install: "Установить на самокат",
			needConnect: "Сначала подключите подходящий самокат в Гараже.",
			mismatch: "Подключённый самокат не подходит к образу.",
			batteryLow: "Батарея должна быть выше 50%.",
			fetching: "Загрузка образа",
			checking: "Проверка совместимости",
			erasing: "Стирание контроллера",
			writing: "Запись прошивки",
			verifying: "Проверка контрольной суммы",
			done: "Установка завершена",
			fail: "Установка не завершена",
			retry: "Повтор",
			close: "В гараж",
			keep: "Самокат стоит, экран включён, держитесь рядом.",
			version: "Образ",
			family: "Семейство контроллера",
			sum: "Checksum",
			zs: "Zero Start",
			pm: "Police Mode",
			on: "Вкл",
			off: "Выкл"
		},
		legal: {
			imprint: "Реквизиты",
			imprintEff: "Действует с 20 сентября 2026",
			imprint1: "CHIEF предоставляет кастомные прошивки для поддерживаемых самокатов NAVEE.",
			service: "Сервис",
			brand: "Бренд: CHIEF",
			site: "Сайт: это превью CHIEF",
			content: "Содержание",
			contentBody: "Мы отвечаем за собственный контент. У сторонних ссылок свои операторы. Незаконную ссылку удалим по уведомлению. NAVEE — сторонний бренд. CHIEF не связан с NAVEE.",
			termsTitle: "Условия использования",
			termsEff: "Действует с 20 сентября 2026",
			t1: "Простое, непередаваемое право использовать кастомную или restore-прошивку для поддерживаемых моделей (сейчас ST5 Max и ST3). Физической поставки нет.",
			t2: "Все опубликованные прошивки доступны. Проверки совместимости идут на подключённом самокате.",
			t3: "Прошивка не для дорог общего пользования. Только частная территория, закрытые трассы и разрешённые тестовые зоны. Батарея выше 50%, стоит, официальное NAVEE закрыто.",
			t4: "Это превью — веб-установщик. Покупка для каталога не нужна.",
			privacyTitle: "Конфиденциальность",
			p1: "Серийный номер, модель, сессия прошивки: время, результат, checksum. В этом превью только на этом устройстве.",
			p2: "Доставить прошивку и вести локальную историю установок. Безопасность: ошибки. Нет трекинга, рекламы и продажи данных.",
			p3: "Нет аналитических и рекламных cookie. Только язык, тема, сессия и состояние установщика."
		},
		label: {
			maxSpeed: "MAX SPEED",
			startSpeed: "Старт",
			version: "Версия",
			restore: "Factory Restore",
			controller: "Контроллер",
			dashboard: "Панель"
		},
		family: {
			custom: "Custom Firmware",
			test: "Free Test Firmware",
			dash: "Прошивка панели",
			stock: "Заводская / Restore"
		},
		fw: {
			st5custom: {
				title: "ST5 Max Custom Firmware",
				desc: "Кастомная прошивка мотор-контроллера NAVEE ST5 Max."
			},
			st5test: {
				title: "ST5 Max Free Test Firmware",
				desc: "Тестовая прошивка NAVEE ST5 Max. MAX 30 км/ч."
			},
			st5sweden: {
				title: "ST5 Max Custom Firmware Sweden",
				desc: "Старт 20 км/ч. Дополнительная прошивка для Швеции."
			},
			st3custom: {
				title: "ST3 Custom Firmware",
				desc: "Прошивка тестируется. Кастомная прошивка контроллера NAVEE ST3."
			},
			dash: {
				title: "Custom Dashboard Firmware",
				desc: "Полностью проверенная прошивка панели NAVEE ST5 Max."
			},
			stock: {
				title: "ST5 Max Factory Restore",
				desc: "Вернуть контроллер на заводскую прошивку."
			}
		},
		badge: {
			testing: "Тест",
			restore: "Factory Restore",
			zeroOff: "Zero Start выкл",
			policeOff: "Police Mode выкл"
		}
	}
};
function t(lang) {
	return DICTS[lang] ?? en;
}
var CANDIDATES = {
	st5max: {
		name: "NAVEE ST5 Max",
		model: "st5max",
		serial: "NV5M-7K2Q-8814",
		controller: "0.0.0.9 / 7801",
		firmware: "0.0.0.9",
		battery: 87,
		rssi: -52,
		startSpeed: 22
	},
	st3: {
		name: "NAVEE ST3",
		model: "st3",
		serial: "NV3S-4P18-2209",
		controller: "0.0.1.1 / 3701",
		firmware: "0.0.1.1",
		battery: 64,
		rssi: -61,
		startSpeed: 20
	}
};
var useAxle = create()(persist((set) => ({
	lang: "en",
	theme: "dark",
	gated: true,
	session: null,
	scooters: [],
	activeId: null,
	history: [],
	developer: false,
	imported: [],
	scan: "idle",
	bleLog: [],
	setLang: (lang) => set({ lang }),
	setTheme: (theme) => set({ theme }),
	acceptGate: () => set({ gated: false }),
	signIn: (email) => set({ session: {
		email,
		at: Date.now()
	} }),
	signOut: () => set({ session: null }),
	startScan: () => {
		set({ scan: "scanning" });
		window.setTimeout(() => set({ scan: "found" }), 1100);
	},
	connectFound: (model) => {
		set({ scan: "linking" });
		window.setTimeout(() => {
			const scooter = {
				...CANDIDATES[model],
				id: `${model}-${Date.now()}`,
				connected: true
			};
			set((s) => ({
				scooters: [...s.scooters.map((x) => ({
					...x,
					connected: false
				})), scooter],
				activeId: scooter.id,
				scan: "idle",
				bleLog: [
					`ATT connect ${scooter.serial}`,
					`GAP ${scooter.name} RSSI ${scooter.rssi}`,
					`Read ctrl ${scooter.controller}`
				]
			}));
		}, 700);
	},
	disconnect: () => set((s) => ({
		scooters: s.scooters.map((x) => ({
			...x,
			connected: false
		})),
		activeId: null,
		scan: "idle"
	})),
	setStartSpeed: (n) => set((s) => ({ scooters: s.scooters.map((x) => x.id === s.activeId ? {
		...x,
		startSpeed: n
	} : x) })),
	recordFlash: (rec) => set((s) => ({
		history: [{
			...rec,
			id: `fl-${rec.at}`
		}, ...s.history].slice(0, 40),
		scooters: s.scooters.map((x) => x.serial === rec.serial && rec.result === "ok" ? {
			...x,
			firmware: rec.title
		} : x)
	})),
	toggleDev: () => set((s) => ({ developer: !s.developer })),
	importFile: (name, size) => set((s) => ({ imported: [{
		name,
		size
	}, ...s.imported].slice(0, 8) })),
	pushLog: (line) => set((s) => ({ bleLog: [line, ...s.bleLog].slice(0, 24) }))
}), {
	name: "axle-v2",
	skipHydration: true,
	partialize: (s) => ({
		lang: s.lang,
		theme: s.theme,
		gated: s.gated,
		session: s.session,
		scooters: s.scooters.map((x) => ({
			...x,
			connected: false
		})),
		activeId: null,
		history: s.history,
		developer: s.developer,
		imported: s.imported
	})
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-medium transition-[background-color,color,opacity,transform,box-shadow] duration-150 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.96]", {
	variants: {
		variant: {
			accent: "bg-accent text-accent-fg hover:bg-accent-hover",
			raised: "border border-line bg-raised text-fg hover:border-accent/40",
			ghost: "text-muted hover:text-fg"
		},
		size: {
			md: "h-11 px-4 text-sm",
			lg: "h-12 px-6 text-sm",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "accent",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var LANGS = [
	"en",
	"de",
	"ru"
];
function applyChrome(theme, lang, gated) {
	const root = document.documentElement;
	root.setAttribute("data-theme", theme);
	root.style.colorScheme = theme;
	root.lang = lang;
	if (gated) root.setAttribute("data-gate", "1");
	else root.removeAttribute("data-gate");
}
function Shell({ children }) {
	const lang = useAxle((s) => s.lang);
	const theme = useAxle((s) => s.theme);
	const gated = useAxle((s) => s.gated);
	const setLang = useAxle((s) => s.setLang);
	const setTheme = useAxle((s) => s.setTheme);
	const copy = t(lang);
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		useAxle.persist.rehydrate();
	}, []);
	(0, import_react.useEffect)(() => {
		applyChrome(theme, lang, gated);
	}, [
		theme,
		lang,
		gated
	]);
	const nav = [
		{
			to: "/",
			label: copy.nav.home
		},
		{
			to: "/firmware",
			label: copy.nav.firmware
		},
		{
			to: "/",
			label: copy.nav.how,
			hash: "how"
		},
		{
			to: "/support",
			label: copy.nav.support
		},
		{
			to: "/garage",
			label: copy.nav.garage
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ambient flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-50 border-b border-line bg-bg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-display shrink-0 text-lg tracking-[0.18em]",
							children: "CHIEF"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-6 text-sm md:flex",
							children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								hash: "hash" in item ? item.hash : void 0,
								className: cn("transition-colors hover:text-fg", path === item.to && !("hash" in item) ? "text-accent" : "text-muted"),
								children: item.label
							}, item.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 sm:gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden sm:flex",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
										lang,
										setLang
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] border border-line bg-raised",
									"aria-label": theme === "dark" ? "Light theme" : "Dark theme",
									onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
									children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] border border-line bg-raised md:hidden",
									"aria-label": "Open menu",
									onClick: () => setOpen(true),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							]
						})
					]
				})
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-60 bg-bg/95 px-4 pt-6 md:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tracking-[0.18em]",
							children: "CHIEF"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "size-11",
							onClick: () => setOpen(false),
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-2 text-lg",
						children: [
							nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								hash: "hash" in item ? item.hash : void 0,
								className: "h-12 text-fg",
								onClick: () => setOpen(false),
								children: item.label
							}, item.label)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/history",
								className: "h-12 text-muted",
								onClick: () => setOpen(false),
								children: copy.nav.history
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/settings",
								className: "h-12 text-muted",
								onClick: () => setOpen(false),
								children: copy.nav.settings
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "h-12 text-muted",
								onClick: () => setOpen(false),
								children: copy.nav.signIn
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
							lang,
							setLang
						})
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-full flex-1 max-w-6xl px-4 pt-6 pb-16",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tracking-[0.18em]",
						children: "CHIEF"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: copy.tag
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/firmware",
								className: "hover:text-fg",
								children: copy.nav.firmware
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/support",
								className: "hover:text-fg",
								children: copy.nav.support
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/garage",
								className: "hover:text-fg",
								children: copy.nav.garage
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/impressum",
								className: "hover:text-fg",
								children: copy.nav.legal
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/agb",
								className: "hover:text-fg",
								children: copy.nav.terms
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/datenschutz",
								className: "hover:text-fg",
								children: copy.nav.privacy
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/history",
								className: "hover:text-fg",
								children: copy.nav.history
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/settings",
								className: "hover:text-fg",
								children: copy.nav.settings
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-4 pb-8 text-xs text-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.gate.badge }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
						lang,
						setLang
					})]
				})]
			}),
			gated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gate, {}) : null
		]
	});
}
function LangSwitch({ lang, setLang }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1 text-xs text-muted",
		"aria-label": "Language",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
			className: "size-3.5 shrink-0 text-subtle",
			"aria-hidden": true
		}), LANGS.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1",
			children: [i > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-subtle/70",
				children: "|"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: cn("h-11 min-w-11 px-1.5", lang === l ? "text-accent" : "hover:text-fg"),
				onClick: () => setLang(l),
				children: l.toUpperCase()
			})]
		}, l))]
	});
}
function Gate() {
	const lang = useAxle((s) => s.lang);
	const accept = useAxle((s) => s.acceptGate);
	const copy = t(lang);
	const [ok, setOk] = (0, import_react.useState)(false);
	const [sec, setSec] = (0, import_react.useState)(3);
	(0, import_react.useEffect)(() => {
		if (!ok) return;
		if (sec <= 0) return;
		const id = window.setTimeout(() => setSec((n) => n - 1), 1e3);
		return () => window.clearTimeout(id);
	}, [ok, sec]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-70 flex items-end justify-center bg-bg/80 p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg rounded-[var(--radius-lg)] border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.22em] text-accent",
					children: copy.gate.badge
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-3 text-2xl tracking-tight",
					children: copy.gate.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: copy.gate.read
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-fg",
					children: copy.gate.p1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "font-medium text-fg",
							children: copy.gate.p2a
						}),
						" ",
						copy.gate.p2b
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: [
						copy.gate.p3a,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "font-medium text-fg",
							children: copy.gate.p3b
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-6 flex min-h-11 cursor-pointer items-start gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						className: "mt-1 size-4 accent-[var(--color-accent)]",
						checked: ok,
						onChange: (e) => {
							setOk(e.target.checked);
							setSec(3);
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.gate.check })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-5 w-full",
					size: "lg",
					disabled: !ok || sec > 0,
					onClick: accept,
					children: [copy.gate.continue, ok && sec > 0 ? ` ${sec}s` : null]
				})
			]
		})
	});
}
var styles_default = "/assets/styles-DZUVgzex.css";
var APP_NAME = "CHIEF — NAVEE Custom Firmware";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#05090B"
			},
			{
				name: "description",
				content: "Custom firmware, factory restore and free test firmware for NAVEE ST5 Max and ST3. Flash with CHIEF."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$10 = () => import("./routes-x7JoS0VK.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./agb-Cn5XnmO3.mjs");
var Route$9 = createFileRoute("/agb")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./datenschutz-BlIiK4oq.mjs");
var Route$8 = createFileRoute("/datenschutz")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./firmware-DhfhpB1q.mjs");
var Route$7 = createFileRoute("/firmware")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./garage-gMt05Am9.mjs");
var Route$6 = createFileRoute("/garage")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./history-DkmwZfXD.mjs");
var Route$5 = createFileRoute("/history")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./impressum-DM6X6_R1.mjs");
var Route$4 = createFileRoute("/impressum")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./login-CMp65-oR.mjs");
var Route$3 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./settings-0Yn1bWHh.mjs");
var Route$2 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./support-DrTPYPNr.mjs");
var Route$1 = createFileRoute("/support")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./flash._slug-BIfYXTJ1.mjs");
var Route = createFileRoute("/flash/$slug")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$10.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$11
	}),
	AgbRoute: Route$9.update({
		id: "/agb",
		path: "/agb",
		getParentRoute: () => Route$11
	}),
	DatenschutzRoute: Route$8.update({
		id: "/datenschutz",
		path: "/datenschutz",
		getParentRoute: () => Route$11
	}),
	FirmwareRoute: Route$7.update({
		id: "/firmware",
		path: "/firmware",
		getParentRoute: () => Route$11
	}),
	GarageRoute: Route$6.update({
		id: "/garage",
		path: "/garage",
		getParentRoute: () => Route$11
	}),
	HistoryRoute: Route$5.update({
		id: "/history",
		path: "/history",
		getParentRoute: () => Route$11
	}),
	ImpressumRoute: Route$4.update({
		id: "/impressum",
		path: "/impressum",
		getParentRoute: () => Route$11
	}),
	LoginRoute: Route$3.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$11
	}),
	SettingsRoute: Route$2.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$11
	}),
	SupportRoute: Route$1.update({
		id: "/support",
		path: "/support",
		getParentRoute: () => Route$11
	}),
	FlashSlugRoute: Route.update({
		id: "/flash/$slug",
		path: "/flash/$slug",
		getParentRoute: () => Route$11
	})
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useAxle as a, cn as i, Route as n, t as o, Button as r, router_exports as t };
