import {transformFile} from "babel-core";
import importRedirect from "../../src";

export default function (filename, options = {}) {
	// console.log(filename);
	// console.log("DIRNAME", __dirname);
	return new Promise((resolve, reject) => {
		transformFile(filename, {
			plugins: [
				[importRedirect, options]
			]
		}, function (err, out) {
			if(err) reject(err);
			
			// TODO: reject when out is undefined
			resolve(out.code);
		});
	});
}