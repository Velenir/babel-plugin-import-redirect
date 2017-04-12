import resolve from "../helpers/resolveFilename";
import match from "../helpers/matchRedirect";
import {relative, dirname} from "path";

export default function (t, {opts: {redirect, root}, file: {opts: {filename}}}, originalPath) {
	const requiredFilename = resolve(filename, originalPath.node.value);
	console.log("requiredFilename:", requiredFilename);
	
	// console.log("Options:", {redirect, root});
	const redirected = match(requiredFilename, redirect, root);
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