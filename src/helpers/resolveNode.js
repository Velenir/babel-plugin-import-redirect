import resolve from "resolve";
import path from "path";

const cache = {};

export default function (basedir, filename, extensions) {
	const cached = cache[basedir];
	
	if(cached) {
		const withFilename = cached[filename];
		if(withFilename) {
			let resolved = withFilename.get(extensions);
			if(resolved !== undefined) return resolved;
			
			resolved = getResolved();
			withFilename.set(extensions, resolved);
			return resolved;
		}
		
		const resolved = getResolved();
		cached[filename] = new Map().set(extensions, resolved);
		return resolved;
	}
	
	const resolved = getResolved();
	cache[basedir] = {
		[filename]: new Map().set(extensions, resolved)
	};
	
	return resolved;
	
	function getResolved(){
		try {
			return resolve.sync(filename, {
				basedir,
				extensions
			});
		} catch (err) {
			let errMessage = err.message + "\nMake sure it is available later", resolved;
			if(filename.startsWith("/") || filename.startsWith(".")) {
				resolved = path.resolve(basedir, filename);
			} else {
				errMessage += " in node_modules";
				resolved = "/node_modules/" + filename;
			}
			
			console.error(errMessage);
			return resolved;
		}
	}
}