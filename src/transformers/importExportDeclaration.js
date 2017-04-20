import replacePath from "../helpers/replacePath";

export default function (t, path, state, {toMatch, toRemove}) {
	const pathToMatch = path.get("source");
	if(pathToMatch.node) {
		replacePath(t, {
			pathToMatch,
			pathToRemove: path.isImportDeclaration() && !path.node.specifiers.length && path,
			// TODO replacement functionality
			pathToReplace: null,
			toMatch,
			toRemove,
			toReplace: null
		}, state);
	}
}