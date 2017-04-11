import fs from "fs";
import {transform} from "babel-core";
import importRedirect from "../../src";

export function transpileFile(filepath, options = {}) {
	return new Promise((resolve, reject) => {
		fs.readFile("./examples/require/index.js", "utf8", function (err, data) {
			if(err) reject(err);
			
			// use our plugin to transform the source
			const out = transform(data, {
				plugins: [
					[importRedirect, options]
				]
			});
			
			resolve(out.code);
		});
	});
}
