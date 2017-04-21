import resolve from "resolve";
import path from "path";

let cache;

export default function (basedir, filename, extensions) {
	if(!cache || cache.extensions !== extensions) {
		cache = {};
		cache.extensions = extensions;
	}
	const cached = cache[basedir];
	
	if(cached) {
		return cached[filename] || (cached[filename] = getResolved());
	}
	
	const resolved = getResolved();
	cache[basedir] = {
		[filename]: resolved
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