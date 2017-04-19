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
});