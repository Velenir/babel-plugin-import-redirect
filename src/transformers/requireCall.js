import replacePath from "../helpers/replacePath";

const membToString = (t, {object, property, computed}) => {
	const propIsIdentifier = t.isIdentifier(property);
	if(!object.name || (computed && propIsIdentifier)) return null;
	return object.name + "." + (propIsIdentifier ? property.name : property.value);
};

export default function (t, path, state, {regexps, functionNames, toRemove}) {
	console.log("CHECKING", path.node.callee.name);
	console.log("IN", functionNames);
	const {callee} = path.node;
	if((t.isIdentifier(callee) && functionNames.has(callee.name)) ||
		t.isImport(callee) ||
		(t.isMemberExpression(callee) && functionNames.has(membToString(t, callee)))
	) {
		console.log(state.file.opts.filename);
		console.log(state.file.opts.basename);
		console.log(state.file.opts.filenameRelative);
		
		const argPath = path.get("arguments.0");
		if(argPath.isStringLiteral()) {
			replacePath(t, argPath, state, regexps, toRemove, path.parentPath.isExpressionStatement() && path.parentPath);
		}
	}
}