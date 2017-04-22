import {transform} from "babel-core";
import importRedirect from "../../src";
import dynamicImport from "babel-plugin-syntax-dynamic-import";

export default function (code, options = {}) {
	return transform(code, {
		babelrc: false,
		plugins: [
			dynamicImport,
			[importRedirect, options]
		]
	}).code;
}