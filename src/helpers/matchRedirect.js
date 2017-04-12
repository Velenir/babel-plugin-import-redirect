import {resolve} from "path";

export default function (filename, redirects, root) {
	for(let pattern in redirects) {
		if(filename.search(pattern) !== -1) {
			// console.log("FOUND MATCH", pattern);
			return resolve(root, redirects[pattern]);
		}
	}
	
	return null;
}