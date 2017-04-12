import {resolve} from "path";

export default function (filename, regexps, root) {
	for(let redirectPair of regexps) {
		if(redirectPair[0].test(filename)) {
			console.log("FOUND MATCH", redirectPair[0]);
			return resolve(root, redirectPair[1]);
		}
	}
	
	return null;
}