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
	
	test('should change relative path dynamically', () => {
		const options = {
			redirect: {
				"/examples(?:/\\w+)*/(\\w+)\\.js$" : "./examples/require/different/$1"
			}
		};
		
		return compareTranspiled("examples/require/relative.js", options);
	});
	
	test('should change path from a node module to relative', () => {
		const options = {
			redirect: {
				"node_module" : "./examples/require/different/lib.js"
			}
		};
		
		return compareTranspiled("examples/require/module.js", options);
	});
	
	test('should dynamically change path from a node module to relative', () => {
		const options = {
			redirect: {
				"node_module/(\\w+)\\.js$" : "./examples/require/different/$1"
			}
		};
		
		return compareTranspiled("examples/require/moduleRelative.js", options);
	});
});