import {compareTranspiled} from "./helpers";

describe('simple export', () => {
	test('should not change path', () => {
		return compareTranspiled("examples/misc/export_noop");
	});
});