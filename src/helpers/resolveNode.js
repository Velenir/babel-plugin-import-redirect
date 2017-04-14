import resolve from "resolve";

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
		return resolve.sync(filename, {
			basedir,
			extensions
		});
	}
}