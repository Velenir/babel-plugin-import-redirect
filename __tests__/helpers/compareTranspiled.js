import {resolve, parse, join} from "path";
import transpileFile from "./transpileFile";
import transpileCode from "./transpileCode";
import readFile from "./readFile";

export default function (file, options, codeOnly = false) {
	const absFile = resolve(process.cwd(), file);
	const {dir, name, ext} = parse(absFile);
	const absFileTranspiled = join(dir, name + "_transpiled" + ext);
	
	return Promise.all([
		(codeOnly ? transpileCode : transpileFile)(absFile, options),
		readFile(absFileTranspiled)
	]).then(([codeIn, codeOut]) => expect(codeIn).toBe(codeOut));
}