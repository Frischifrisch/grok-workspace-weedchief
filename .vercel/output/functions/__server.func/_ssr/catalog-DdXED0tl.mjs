//#region node_modules/.nitro/vite/services/ssr/assets/catalog-DdXED0tl.js
var FIRMWARES = [
	{
		slug: "st5max-custom",
		model: "st5max",
		kind: "controller",
		familyKey: "family.custom",
		titleKey: "fw.st5custom.title",
		descKey: "fw.st5custom.desc",
		speedKey: "label.maxSpeed",
		speedValue: "50 km/h",
		badges: [],
		version: "1.4.2",
		controllerFamily: "0.0.0.9 / 7801",
		checksum: "A7F3-19C2-88E0",
		photo: "st5max-hero",
		accentCta: true,
		zeroStart: true,
		policeMode: true
	},
	{
		slug: "st5max-test",
		model: "st5max",
		kind: "controller",
		familyKey: "family.test",
		titleKey: "fw.st5test.title",
		descKey: "fw.st5test.desc",
		speedKey: "label.maxSpeed",
		speedValue: "30 km/h",
		badges: ["badge.zeroOff", "badge.policeOff"],
		version: "0.9.1-test",
		controllerFamily: "0.0.0.9 / 7801",
		checksum: "B21C-44A8-0D17",
		photo: "st5max-hero",
		accentCta: true,
		zeroStart: false,
		policeMode: false
	},
	{
		slug: "st5max-sweden",
		model: "st5max",
		kind: "controller",
		familyKey: "family.custom",
		titleKey: "fw.st5sweden.title",
		descKey: "fw.st5sweden.desc",
		speedKey: "label.startSpeed",
		speedValue: "20 km/h",
		badges: [],
		version: "1.4.2-se",
		controllerFamily: "0.0.0.9 / 7801",
		checksum: "C90E-12B4-77AA",
		photo: "st5max-hero",
		zeroStart: false,
		policeMode: false
	},
	{
		slug: "st3-custom",
		model: "st3",
		kind: "controller",
		familyKey: "family.custom",
		titleKey: "fw.st3custom.title",
		descKey: "fw.st3custom.desc",
		speedKey: "label.maxSpeed",
		speedValue: "50 km/h",
		testing: true,
		badges: ["badge.testing"],
		version: "0.3.0-beta",
		controllerFamily: "0.0.1.1 / 3701",
		checksum: "D4A1-90FF-2210",
		photo: "st3-hero",
		zeroStart: true,
		policeMode: true
	},
	{
		slug: "st5max-custom-meter",
		model: "st5max",
		kind: "dashboard",
		familyKey: "family.dash",
		titleKey: "fw.dash.title",
		descKey: "fw.dash.desc",
		speedKey: "label.version",
		speedValue: "v0.0.2.0",
		badges: [],
		version: "0.0.2.0",
		controllerFamily: "meter 0.0.2.0",
		checksum: "E118-6BC3-45D2",
		photo: "st5max-front"
	},
	{
		slug: "st5max-stock",
		model: "st5max",
		kind: "controller",
		familyKey: "family.stock",
		titleKey: "fw.stock.title",
		descKey: "fw.stock.desc",
		speedKey: "label.restore",
		speedValue: "",
		badges: ["badge.restore"],
		version: "0.0.0.9",
		controllerFamily: "0.0.0.9 / 7801",
		checksum: "STOCK-7801-0009",
		photo: "st5max-side"
	}
];
function firmwareBySlug(slug) {
	return FIRMWARES.find((f) => f.slug === slug);
}
var MODEL_LABEL = {
	st5max: "NAVEE ST5 Max",
	st3: "NAVEE ST3"
};
var PHOTO = {
	"st5max-hero": "/product/st5max-hero.jpg",
	"st3-hero": "/product/st3-hero.jpg",
	"st5max-front": "/product/st5max-front.jpg",
	"st5max-side": "/product/st5max-side.jpg"
};
//#endregion
export { firmwareBySlug as i, MODEL_LABEL as n, PHOTO as r, FIRMWARES as t };
