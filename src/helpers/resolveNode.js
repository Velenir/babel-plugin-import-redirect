import resolve from "resolve";
import path from "path";

let cache;
const ext = Symbol("extensions");

export default function (basedir, filename, extensions) {
	if(!cache || cache[ext] !== extensions) {
		cache = {[ext]: extensions};
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
			let resolved, errMessage = err.message + "\nMake sure it is available later";
			if(/^\.\.?\//.test(filename)) {
				resolved = path.resolve(basedir, filename);
			} else {
				errMessage += " in node_modules";
				resolved = "/node_modules/" + filename;
			}
			
			console.warn(errMessage);
			return resolved;
		}
	}
}