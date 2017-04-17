import {transformFile} from "babel-core";

export default function (filename) {
	// console.log(filename);
	// console.log("DIRNAME", __dirname);
	return new Promise((resolve, reject) => {
		transformFile(filename, {}, function (err, out) {
			if(err) return reject(err);
			
			resolve(out.code);
		});
	});
}