import replacePath from "../helpers/replacePath";

export default function (t, path, state, {regexps, toRemove}) {
	const sourcePath = path.get("source");
	if(sourcePath.node) {
		replacePath(t, sourcePath, state, regexps, toRemove, path.isImportDeclaration() && !path.node.specifiers.length && path);
	}
}