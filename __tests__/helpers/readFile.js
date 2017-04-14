import fs from "fs";

export default function (filename) {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, "utf8", function (err, out) {
			if(err) return reject(err);
			
			resolve(out);
		});
	});
}