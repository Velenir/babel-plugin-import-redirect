import replacePath from "../helpers/replacePath";

export default function (t, path, state, {regexps, functionNames}) {
	console.log("CHECKING", path.node.callee.name);
	console.log("IN", functionNames);
	if(functionNames.has(path.node.callee.name)) {
		// console.log(__dirname, __filename);
		console.log(state.file.opts.filename);
		console.log(state.file.opts.basename);
		console.log(state.file.opts.filenameRelative);
		console.log(path.node.arguments.length);
		
		
		const argPath = path.get("arguments.0");
		if(argPath.isStringLiteral()) {
			replacePath(t, argPath, state, regexps);
		}
	}
}