import {resolve} from "path";
import transpileFile from "./transpileFile";
import transpileCode from "./transpileCode";
import readFile from "./readFile";

export default function (dir, codeOnly = false) {
	const file = dir + "/index.js", cwd = process.cwd();
	const absFile = resolve(cwd, file);
	const absFileTranspiled = resolve(cwd, dir + "/transpiled.js");
	
	return Promise.all([
		(codeOnly ? transpileCode : transpileFile)(absFile),
		readFile(absFileTranspiled)
	]).then(([codeIn, codeOut]) => expect(codeIn).toBe(codeOut));
}