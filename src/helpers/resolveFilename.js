import resolve from "resolve";
import {dirname} from "path";

const cache = {};

export default function (fromFile, filename, extensions) {
	const dir = dirname(fromFile);
	const cached = cache[dir];
	
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
	cache[dir] = {
		[filename]: new Map().set(extensions, resolved)
	};
	
	return resolved;
	
	
	function getResolved(){
		return resolve.sync(filename, {
			basedir: dir,
			extensions
		});
	}
}