import {compareTranspiled} from "./helpers";

describe('require', () => {
	test('should change relative paths', () => {
		return compareTranspiled("examples/require/relative2relative");
	});
	
	test('should change relative paths dynamically', () => {
		return compareTranspiled("examples/require/relative2relativeD");
	});
	
	test('should change path from a node module to relative', () => {
		return compareTranspiled("examples/require/module2relative");
	});
	
	test('should dynamically change path from a node module to relative', () => {
		return compareTranspiled("examples/require/module2relativeD");
	});
	
	test('should change path from a node module to a different node module', () => {
		return compareTranspiled("examples/require/module2module");
	});
	
	test('should dynamically change path from a node module to a different node module', () => {
		return compareTranspiled("examples/require/module2moduleD");
	});
	
	test('should change path from relative to a node module', () => {
		return compareTranspiled("examples/require/relative2module");
	});
	
	test('should dynamically change path from relative to a node module', () => {
		return compareTranspiled("examples/require/relative2moduleD");
	});
	
	test('should not change when no matching redirect is found', () => {
		return compareTranspiled("examples/require/no_match");
	});
	
	describe('should change even when', () => {
		test('file at original relative path doesn\'t exist', () => {
			return compareTranspiled("examples/require/original_relative_not_exist");
		});
		
		test('file at the final path doesn\'t exist', () => {
			return compareTranspiled("examples/require/final_relative_not_exist");
		});
		
		test('module at original path doesn\'t exist', () => {
			return compareTranspiled("examples/require/original_module_not_exist");
		});
		
		test('module at the final path doesn\'t exist', () => {
			return compareTranspiled("examples/require/final_module_not_exist");
		});
	});
});