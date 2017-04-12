import resolve from "../helpers/resolveFilename";
import match from "../helpers/matchRedirect";
import {relative, dirname} from "path";

export default function (t, path, state) {
	const source = path.node.source;
	
	const currentFilename = state.file.opts.filename;
	const requiredFilename = resolve(currentFilename, source.value);
	console.log("requiredFilename:", requiredFilename);
	
	const opts = state.opts;
	// console.log("Options:", opts);
	const redirect = match(requiredFilename, opts.redirect, opts.root);
	console.log("CALCULATED REDIRECT:", redirect);
	
	if(redirect !== null) {
		// console.log("from:", dirname(currentFilename));
		// console.log("rel:", relative(dirname(currentFilename), redirect));
		path.node.source = t.stringLiteral("./" + relative(dirname(currentFilename), redirect));
	}
}