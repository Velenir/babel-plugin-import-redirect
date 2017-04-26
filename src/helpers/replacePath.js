import resolveNode from "./resolveNode";
import match from "./matchRedirect";
import {relative, dirname, extname} from "path";

export default function (t, {pathToMatch, pathToRemove, pathToReplace, replaceFn}, {toMatch, toRemove, toReplace, filename, wrapReplacementInPromise}, {opts: {root, extensions}}) {
	const requiredFilename = resolveNode(dirname(filename), pathToMatch.node.value, extensions);
	const matched = match(requiredFilename, toMatch, root, extensions);
	
	if(matched !== null) {
		const {redirect, redirected} = matched;
		
		// path has a corresponing redirect
		if(redirected !== null) {
			if(redirected.includes("/node_modules/")) {
				// resolveNode here only generates a warning when necessary
				resolveNode(dirname(filename), redirect, extensions);
				pathToMatch.replaceWith(t.stringLiteral(redirect));
				return;
			}
			
			let relativeRedirect = relative(dirname(filename), redirected);
			if(!relativeRedirect.startsWith(".")) relativeRedirect = "./" + relativeRedirect;
			
			if(!extname(redirect)) {
				const ext = extname(relativeRedirect);
				if(ext) relativeRedirect = relativeRedirect.slice(0, -ext.length);
			}
			pathToMatch.replaceWith(t.stringLiteral(relativeRedirect));
		}
	// if can be removed
	} else if(pathToRemove) {
		if(toRemove.some(regexp => regexp.test(requiredFilename)) || toReplace.find(([regexp]) => regexp.test(requiredFilename))) {
			pathToRemove.remove();
		}
		
	// if can be replaced
	} else if(pathToReplace) {
		const replacement = toReplace.find(([regexp]) => regexp.test(requiredFilename));
		
		if(replacement) {
			replaceFn(t, replacement[1], pathToReplace, wrapReplacementInPromise);
		}
	}
}