module.exports = {
	"globDirectory": ".next",
	"globPatterns": [
		"/",
		"**/*.css",
		"**/*.js",
		"**/*.ttf",
		"**/*.woff",
		"**/*.woff2",
		"**/*.png",
		"**/*.svg",
		"**/*.eot",
		"index.html",
		"manifest.json",
	],
	"swSrc": "sw.js",
	"swDest": ".next/sw.js",
	"globIgnores": [
		"../workbox-config.js"
	]
};