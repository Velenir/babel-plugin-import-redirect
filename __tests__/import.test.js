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
	
	test('should change relative path dynamically', () => {
		const options = {
			redirect: {
				"/examples(?:/\\w+)*/(\\w+)\\.js$" : "./examples/import/different/$1"
			}
		};
		
		return compareTranspiled("examples/import/relative.js", options);
	});
});