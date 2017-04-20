import {compareTranspiled} from "./helpers";

describe('simple export', () => {
	test('should not change path', () => {
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
	// TODO: replace import ... from with an object per property when needed
});