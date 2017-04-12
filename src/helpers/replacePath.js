import resolve from "../helpers/resolveFilename";
import match from "../helpers/matchRedirect";
import {relative, dirname} from "path";

export default function (t, originalPath, {opts: {root, extensions}, file: {opts: {filename}}}, regexps) {
	const requiredFilename = resolve(filename, originalPath.node.value, extensions);
	console.log("requiredFilename:", requiredFilename);
	
	// console.log("Options:", {regexps, root});
	const redirected = match(requiredFilename, regexps, root);
	console.log("CALCULATED REDIRECT:", redirected);
	// args[0] = t.stringLiteral("PPAth");
	
	// path has a corresponing redirect
	if(redirected !== null) {
		// console.log("from:", dirname(filename));
		// console.log("rel:", relative(dirname(filename), redirected));
		// args[0] = t.stringLiteral(redirected);
		originalPath.replaceWith(t.stringLiteral("./" + relative(dirname(filename), redirected)));
	}
}