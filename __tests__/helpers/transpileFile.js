import {transformFile} from "babel-core";

export default function (filename) {
	return new Promise((resolve, reject) => {
		transformFile(filename, {}, function (err, out) {
			if(err) return reject(err);
			
			resolve(out.code);
		});
	});
}