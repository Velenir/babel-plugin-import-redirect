import resolveNode from "./resolveNode";
import match from "./matchRedirect";
import {relative, dirname, extname} from "path";

export default function (t, {pathToMatch, pathToRemove, pathToReplace, toMatch, toRemove, toReplace, replaceFn}, {opts: {root, extensions}, file: {opts: {filename}}}) {
	const requiredFilename = resolveNode(dirname(filename), pathToMatch.node.value, extensions);
	console.log("requiredFilename:", requiredFilename);
	console.log("pathToRemove", !!pathToRemove);
	console.log("pathToReplace", !!pathToReplace);
	// console.log("Options:", {toMatch, root});
	const matched = match(requiredFilename, toMatch, root, extensions);
	if(matched !== null) {
		const {redirect, redirected} = matched;
		console.log("CALCULATED REDIRECT:", redirected);
		// args[0] = t.stringLiteral("PPAth");
		
		// path has a corresponing redirect
		if(redirected !== null) {
			// console.log("from:", dirname(filename));
			// console.log("rel:", relative(dirname(filename), redirected));
			// args[0] = t.stringLiteral(redirected);
			if(redirected.includes("/node_modules/")) {
				if(resolveNode(dirname(filename), redirect, extensions)) {
					console.log("FINAL -- MODULE", redirect);
					pathToMatch.replaceWith(t.stringLiteral(redirect));
					return;
				}
				
			}
			let relativeRedirect = relative(dirname(filename), redirected);
			if(!relativeRedirect.startsWith(".")) relativeRedirect = "./" + relativeRedirect;
			
			if(!extname(redirect)) {
				const ext = extname(relativeRedirect);
				if(ext) relativeRedirect = relativeRedirect.slice(0, -ext.length);
			}
			
			pathToMatch.replaceWith(t.stringLiteral(relativeRedirect));
		}
	// can be removed
	} else if(pathToRemove) {
		if(toRemove.some(regexp => regexp.test(requiredFilename)) || toReplace.find(([regexp]) => regexp.test(requiredFilename))) pathToRemove.remove();
	// can be replaced
	} else if(pathToReplace) {
		const replacement = toReplace.find(([regexp]) => regexp.test(requiredFilename));
		
		if(replacement) replaceFn(t, replacement[1], pathToReplace);
	}
}