import fs from "fs";
import {transform} from "babel-core";
import importRedirect from "../../src";

export default function (filename, options = {}) {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, "utf8", function (err, data) {
			if(err) return reject(err);
			
			const out = transform(data, {
				babelrc: false,
				plugins: [
					[importRedirect, options]
				]
			});
			
			resolve(out.code);
		});
	});
}