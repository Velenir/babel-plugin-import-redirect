import {compareTranspiled} from "./helpers";

describe('export from', () => {
	test('should change relative path', () => {
		const options = {
			redirect: {
				"/examples(/\\w+)*/lib\\.js$" : "./examples/exportFrom/different/lib"
			}
		};
		
		return compareTranspiled("examples/exportFrom/relative.js", options);
	});
});

describe('export', () => {
	test('should not change path', () => {
		const options = {
			redirect: {
				"/examples(/\\w+)*/lib\\.js$" : "./examples/exportFrom/different/lib"
			}
		};
		
		return compareTranspiled("examples/exportFrom/noop.js", options);
	});
});