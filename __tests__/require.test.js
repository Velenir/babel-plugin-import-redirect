import {transpileFile} from "./helpers";
import {resolve} from "path";

function transpile(file) {
	return transpileFile(resolve(__dirname, file));
}

describe('require', () => {
	test('should change path', () => {
		
		return transpile("../examples/index.js").then(out => console.log(out));
	});
});
