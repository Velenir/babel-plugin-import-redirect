import {compareTranspiled} from "./helpers";

describe('require', () => {
	test('should change relative path', () => {
		const options = {
			redirect: {
				"/examples(/\\w+)*/lib\\.js$" : "./examples/require/different/lib"
			}
		};
		
		return compareTranspiled("examples/require/relative.js", options);
	});
});