import {compareTranspiled} from "./helpers";

const tests = {
	'should change relative paths': "examples/require/relative2relative",
	'should change relative paths dynamically': "examples/require/relative2relativeD",
	'should change path from a node module to relative': "examples/require/module2relative",
	'should dynamically change path from a node module to relative': "examples/require/module2relativeD",
	'should change path from a node module to a different node module': "examples/require/module2module",
	'should dynamically change path from a node module to a different node module': "examples/require/module2moduleD",
	'should change path from relative to a node module': "examples/require/relative2module",
	'should dynamically change path from relative to a node module': "examples/require/relative2moduleD",
	'should not change when no matching redirect is found': "examples/require/no_match",
	'should change even when': {
		'file at original relative path doesn\'t exist': "examples/require/original_relative_not_exist",
		'file at the final path doesn\'t exist': "examples/require/final_relative_not_exist",
		'module at original path doesn\'t exist': "examples/require/original_module_not_exist",
		'module at the final path doesn\'t exist': "examples/require/final_module_not_exist"
	}
};

const declarations = ["reqiuire"];

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
				return compareTranspiled(dir);
			});
		}
	});
}

for(let decl of declarations) {
	describe(decl, () => {
		describeTests(tests);
	});
}