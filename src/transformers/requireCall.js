import replacePath from "../helpers/replacePath";

export default function (t, path, state, regexps) {
	if(path.node.callee.name === "require") {
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