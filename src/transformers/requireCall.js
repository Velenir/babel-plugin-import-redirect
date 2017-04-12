import resolve from "../helpers/resolveFilename";
import match from "../helpers/matchRedirect";
import {relative, dirname} from "path";

export default function (t, path, state) {
	if(path.node.callee.name === "require") {
		// console.log(__dirname, __filename);
		console.log(state.file.opts.filename);
		console.log(state.file.opts.basename);
		console.log(state.file.opts.filenameRelative);
		console.log(path.node.arguments.length);
		
		
		const args = path.node.arguments;
		if(t.isStringLiteral(args[0])) {
			const currentFilename = state.file.opts.filename;
			const requiredFilename = resolve(currentFilename, args[0].value);
			console.log("requiredFilename:", requiredFilename);
			
			const opts = state.opts;
			// console.log("Options:", opts);
			const redirect = match(requiredFilename, opts.redirect, opts.root);
			console.log("CALCULATED REDIRECT:", redirect);
			// args[0] = t.stringLiteral("PPAth");
			
			if(redirect !== null) {
				// console.log("from:", dirname(currentFilename));
				// console.log("rel:", relative(dirname(currentFilename), redirect));
				// args[0] = t.stringLiteral(redirect);
				args[0] = t.stringLiteral("./" + relative(dirname(currentFilename), redirect));
			}
			// if(state.opts)
			
		}
	}
}