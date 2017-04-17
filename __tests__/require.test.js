import {compareTranspiled} from "./helpers";

const tests = {
	'should change relative paths': "examples/<dir>/relative2relative",
	'should change relative paths dynamically': "examples/<dir>/relative2relativeD",
	'should change path from a node module to relative': "examples/<dir>/module2relative",
	'should dynamically change path from a node module to relative': "examples/<dir>/module2relativeD",
	'should change path from a node module to a different node module': "examples/<dir>/module2module",
	'should dynamically change path from a node module to a different node module': "examples/<dir>/module2moduleD",
	'should change path from relative to a node module': "examples/<dir>/relative2module",
	'should dynamically change path from relative to a node module': "examples/<dir>/relative2moduleD",
	'should not change when no matching redirect is found': "examples/<dir>/no_match",
	'should change even when': {
		'file at original relative path doesn\'t exist': "examples/<dir>/original_relative_not_exist",
		'file at the final path doesn\'t exist': "examples/<dir>/final_relative_not_exist",
		'module at original path doesn\'t exist': "examples/<dir>/original_module_not_exist",
		'module at the final path doesn\'t exist': "examples/<dir>/final_module_not_exist"
	}
};

const declarations = ["require", "import", "export"];

function runTestsFor(tests, decl) {
	function describeTests(tests) {
		Object.keys(tests).map(description => {
			const dir = tests[description];
			if(typeof dir === "object") {
				describe(description, () => {
					describeTests(dir);
				});
			} else {
				test(description, () => {
					console.log(description);
					return compareTranspiled(dir.replace("<dir>", decl));
				});
			}
		});
	}
	
	describeTests(tests);
}



for(let decl of declarations) {
	describe(decl, () => {
		runTestsFor(tests, decl);
	});
}