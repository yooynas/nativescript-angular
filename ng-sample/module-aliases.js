var shelljs = require("shelljs");
var path = require("path");

var tnsPackage = "tns-core-modules";
var tnsModulesDir = path.join("node_modules", tnsPackage);

exports.tnsCoreModulesDirs = function tnsCoreModulesDirs(platform) {
	return shelljs.find("node_modules/tns-core-modules").filter(function(file) {
		return /package\.json$/.test(file);
	}).map(function(fullPath) {
		return fullPath.replace(/^node_modules\/tns-core-modules\//, "");
	}).map(function(packageJson) {
		return [packageJson, getPackageMain(path.dirname(packageJson))];
	}).map(function(entry) {
		return [path.dirname(entry[0]), entry[1]];
	}).map(function(entry) {
		return [entry[0], getPlatformModuleName(platform, entry[1])];
	}).filter(function(entry) {
		return !!entry[1];
	}).map(function(entry) {
		return [entry[0], path.join(tnsPackage, entry[1])];
	});
}

exports.tnsCoreModulesFiles = function tnsCoreModulesFiles(platform) {
	return shelljs.find("node_modules/tns-core-modules").filter(function(file) {
		return /\.js$/i.test(file);
	}).map(function(fullPath) {
		return fullPath.replace(/^node_modules\/tns-core-modules\//, "");
	}).filter(function(modulePath) {
		if (platform === "android") {
			return !/\.ios\.js$/i.test(modulePath);
		} else if (platform === "ios") {
			return !/\.android\.js$/i.test(modulePath);
		} else {
			throw new Error("Unknown platform: " + platform);
		}
	}).map(function(modulePath) {
		var platformMatcher = new RegExp("\\." + platform + "\\.js$", "i");
		var fullModulePath = path.join(tnsPackage, modulePath);
		if (platformMatcher.test(modulePath)) {
			return [modulePath.replace(platformMatcher, ""), fullModulePath];
		} else {
			return [modulePath.replace(/\.js$/i, ""), fullModulePath];

		}
	});
}

exports.tnsCoreModulesAliases = function tnsCoreModulesAliases(platform) {
	var result = {};
	exports.tnsCoreModulesFiles(platform).forEach(function(entry) {
		result[entry[0]] = entry[1];
	});
	// packages with package.json files overwrite any file-only modules
	exports.tnsCoreModulesDirs(platform).forEach(function(entry) {
		result[entry[0]] = entry[1];
	});
	return result;
}

function getPackageMain(dir) {
	var packageJson = path.join(tnsModulesDir, dir, "package.json");
	if (shelljs.test("-f", packageJson)) {
		var data = JSON.parse(shelljs.cat(packageJson));
		if (data.main) {
			var main = data.main;
			if (/\.js$/i.test(main)) {
				return path.join(dir, main);
			} else {
				return path.join(dir, main + ".js");
			}
		} else {
			var indexPath = path.join(tnsModulesDir, dir, "index.js");
			if (shelljs.test("-f", indexPath)) {
				return path.join(dir, "index.js");
			} else {
				return null;
			}
		}
	}
}

function getPlatformModuleName(platform, modulePath) {
	if (!modulePath) {
		return null;
	}
	var fullModulePath = path.join(tnsModulesDir, modulePath);
	if (shelljs.test("-f", fullModulePath)) {
		return modulePath;
	} else {
		var platformModule = modulePath.replace(/\.js$/i, "." + platform + ".js")
		var fullPlatformModule = path.join(tnsModulesDir, platformModule);
		if (shelljs.test("-f", fullPlatformModule)) {
			return platformModule;
		} else {
			return null;
		}
	}
}

//console.log(exports.tnsCoreModulesDirs("android"));
//console.log(exports.tnsCoreModulesFiles("android"));
//console.log(exports.tnsCoreModulesAliases("android"));
