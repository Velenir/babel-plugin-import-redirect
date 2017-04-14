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
	
	test('should change path from a node module to a different node module', () => {
		const options = {
			redirect: {
				"node_module" : "different_node_module"
			},
			root: "./examples"
		};
		
		return compareTranspiled("examples/require/module2module.js", options);
	});
	
	test('should dynamically change path from a node module to a different node module', () => {
		const options = {
			redirect: {
				"node_module/([\\w.]+)$" : "different_node_module/$1"
			},
			root: "./examples"
		};
		
		return compareTranspiled("examples/require/module2moduleRelative.js", options);
	});
	
	test('should dynamically change path from relative to a node module', () => {
		const options = {
			redirect: {
				"/examples(/\\w+)*/lib\\.js$" : "node_module"
			},
			root: "./examples"
		};
		
		return compareTranspiled("examples/require/relative2module.js", options);
	});
});