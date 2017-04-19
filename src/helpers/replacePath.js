import resolveNode from "./resolveNode";
import match from "./matchRedirect";
import {relative, dirname, extname} from "path";

export default function (t, originalPath, {opts: {root, extensions}, file: {opts: {filename}}}, regexps, toRemove, pathToRemove, toReplace, pathToReplace) {
	const requiredFilename = resolveNode(dirname(filename), originalPath.node.value, extensions);
	console.log("requiredFilename:", requiredFilename);
	
	// console.log("Options:", {regexps, root});
	const matched = match(requiredFilename, regexps, root, extensions);
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
					originalPath.replaceWith(t.stringLiteral(redirect));
					return;
				}
				
			}
			let relativeRedirect = relative(dirname(filename), redirected);
			if(!relativeRedirect.startsWith(".")) relativeRedirect = "./" + relativeRedirect;
			
			if(!extname(redirect)) {
				const ext = extname(relativeRedirect);
				if(ext) relativeRedirect = relativeRedirect.slice(0, -ext.length);
			}
			
			originalPath.replaceWith(t.stringLiteral(relativeRedirect));
		}
	} else if(pathToRemove && toRemove.some(regexp => regexp.test(requiredFilename))) {
		pathToRemove.remove();
	} else if(pathToReplace) {
		const replacement = toReplace.find(([regexp]) => regexp.test(requiredFilename));
		
		if(replacement) {
			let obj = replacement[1];
			if(pathToReplace.parentPath.isMemberExpression({object: pathToReplace.node})) {
				obj = t.parenthesizedExpression(obj);
			}
			
			pathToReplace.replaceWith(obj);
		}
	}
}