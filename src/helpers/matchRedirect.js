import resolveNode from "./resolveNode";
// import {resolve} from "path";

export default function (filename, regexps, root, extensions) {
	const redirectPair = regexps.find(([regexp]) => regexp.test(filename));
	
	if(redirectPair) {
		let [regexp, redirect] = redirectPair;
		console.log("FOUND MATCH", regexp);
		console.log("REDIRECTING TO", redirect);
		// if redirect is of "different/path/$1.js" form
		if(/\$\d/.test(redirect)) {
			// "abs/path/to/path/lib.js".match(/path/(\w+).js$/)[0] ->
			// "path/lib.js".replace(/path/(\w+).js$/, "different/path/$1.js") ->
			// "different/path/lib.js"
			redirect = filename.match(regexp)[0].replace(regexp, redirect);
		}
		
		// return resolve(root, redirect);
		return {
			redirected: resolveNode(root, redirect, extensions),
			redirect
		};
	}
	
	return null;
}