import replacePath from "../helpers/replacePath";

const membToString = (t, {object, property, computed}) => {
	const propIsIdentifier = t.isIdentifier(property);
	if(!object.name || (computed && propIsIdentifier)) return null;
	return object.name + "." + (propIsIdentifier ? property.name : property.value);
};

const replaceRequire = (t, replacementObj, pathToReplace) => {
	if(pathToReplace.parentPath.isMemberExpression({object: pathToReplace.node})) {
		replacementObj = t.parenthesizedExpression(replacementObj);
	}
	
	pathToReplace.replaceWith(replacementObj);
};

export default function (t, path, state, {toMatch, functionNames, toRemove, toReplace, filename}) {
	// console.log("CHECKING", path.node.callee.name);
	// console.log("IN", functionNames);
	const {callee} = path.node;
	if((t.isIdentifier(callee) && functionNames.has(callee.name)) ||
		t.isImport(callee) ||
		(t.isMemberExpression(callee) && functionNames.has(membToString(t, callee)))
	) {
		console.log("FILENAME:", filename);
		console.log("BASENAME:", state.file.opts.basename);
		console.log("FILENAME_RELATIVE:", state.file.opts.filenameRelative);
		
		const pathToMatch = path.get("arguments.0"), pathToRemove = path.parentPath.isExpressionStatement() && path.parentPath;
		if(pathToMatch.isStringLiteral()) {
			replacePath(t, {
				pathToMatch,
				pathToRemove,
				pathToReplace: !pathToRemove && path,
				toMatch, toRemove, toReplace,
				replaceFn: replaceRequire,
				filename
			}, state);
		}
	}
}