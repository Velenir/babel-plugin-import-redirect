import resolve from "resolve";
import path from "path";

export default function (fromFile, filename, extensions) {
	return resolve.sync(filename, {
		basedir: path.dirname(fromFile),
		extensions
	});
}