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