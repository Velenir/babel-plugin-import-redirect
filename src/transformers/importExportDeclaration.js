import replacePath from "../helpers/replacePath";

export default function (t, path, state, {toMatch, toRemove, toReplace}) {
	const pathIsImportDeclaration = path.isImportDeclaration();
	const pathToMatch = path.get("source"),
		pathToRemove = pathIsImportDeclaration && !path.node.specifiers.length && path,
		pathToReplace = pathIsImportDeclaration && path.node.specifiers.length && path;
	
	if(pathToMatch.node) {
		replacePath(t, {
			pathToMatch,
			pathToRemove,
			// TODO replacement functionality
			pathToReplace,
			toMatch, toRemove, toReplace
		}, state);
	}
}