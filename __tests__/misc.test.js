import {compareTranspiled, transpileCode} from "./helpers";

describe('simple export', () => {
	test('should not be changed', () => {
		return compareTranspiled("examples/misc/export_noop");
	});
});

describe('for paths with corresponding redirect of false', () => {
	test('should remove imports without side effects', () => {
		return compareTranspiled("examples/misc/remove_import");
	});
	
	test('should not remove imports with side effects and exports', () => {
		return compareTranspiled("examples/misc/dont_remove_import");
	});
});

describe('for paths with corresponding redirect of object', () => {
	test('should replace require statements with the corresponding objects', () => {
		return compareTranspiled("examples/misc/replace_require");
	});
	
	test('should remove imports without side effects', () => {
		return compareTranspiled("examples/misc/dont_replace_import_but_remove");
	});
	
	test('should replace named imports with the corresponding object\'s properties', () => {
		return compareTranspiled("examples/misc/replace_import");
	});
});

describe('when code is provided directly (not from a file)', () => {
	test('assume filename to be <root>/index.js when resolving path', () => {
		const input = `
			import lib from "./lib";
			export { default as lib } from "./lib";
			require("./lib");
			import("./lib").then(module => module.default);
			custom_require_function("./lib");
			SystemJS.import("./lib");
		`;
		
		const options = {
			extraFunctions: ["custom_require_function", "SystemJS.import"],
			redirect: {
				"/examples(/\\w+)*/lib\\.js$" : "./different/lib"
			},
			root: "./examples"
		};
		
		const output = `
import lib from "./different/lib";
export { default as lib } from "./different/lib";
require("./different/lib");
import("./different/lib").then(module => module.default);
custom_require_function("./different/lib");
SystemJS.import("./different/lib");`;
		
		expect(transpileCode(input, options)).toBe(output);
	});
	
	test('assume filename to be <cwd>/index.js (if no root provided) when resolving path', () => {
		const input = `
			import lib from "./examples/lib";
			export { default as lib } from "./examples/lib";
			require("./examples/lib");
			import("./examples/lib").then(module => module.default);
			custom_require_function("./examples/lib");
			SystemJS.import("./examples/lib");
		`;
		
		const options = {
			extraFunctions: ["custom_require_function", "SystemJS.import"],
			redirect: {
				"/examples(/\\w+)*/lib\\.js$" : "./examples/different/lib"
			}
		};
		
		const output = `
import lib from "./examples/different/lib";
export { default as lib } from "./examples/different/lib";
require("./examples/different/lib");
import("./examples/different/lib").then(module => module.default);
custom_require_function("./examples/different/lib");
SystemJS.import("./examples/different/lib");`;
		
		expect(transpileCode(input, options)).toBe(output);
	});
});

describe('when redirect points to a node module but require("node_module") in the source file would resolve to a different module by the same name ', () => {
	test('should replace with a relative path to the original node module', () => {
		return compareTranspiled("examples/misc/same_module_different_depth");
	});
});