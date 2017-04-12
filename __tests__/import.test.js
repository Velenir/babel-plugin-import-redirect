import {compareTranspiled} from "./helpers";

describe('import', () => {
	test('should change relative path', () => {
		const options = {
			redirect: {
				"/examples(/\\w+)*/lib\\.js$" : "./examples/import/different/lib"
			}
		};
		
		return compareTranspiled("examples/import/relative.js", options);
	});
});