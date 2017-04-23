import requireCall from './transformers/requireCall';
import importExportDeclaration from './transformers/importExportDeclaration';
import {parseExpression} from "babylon";
import {resolve} from "path";

const defaultExtensions = [".js", ".jsx", ".es", "es6"];

export default ({types: t}) => {
	return {
		pre(state) {
			console.log("PRE");
			// console.log(Object.keys(state));
			console.log("filename", state.opts.filename, typeof state.opts.filename);
			console.log("filenameRelative", state.opts.filenameRelative, typeof state.opts.filenameRelative);
			// console.log(this.opts);
			// console.log(state.opts === this.opts);
			const opts = this.opts;
			if(!opts.root) opts.root = process.cwd();
			
			const filename = state.opts.filename === "unknown" ? resolve(opts.root, "index.js") : state.opts.filename;
			
			if(!opts.extensions) opts.extensions = defaultExtensions;
			
			const toMatch = [], toRemove = [], toReplace = [], {redirect} = opts;
			for(let pattern of Object.keys(redirect)) {
				const regexp = new RegExp(pattern), redirected = redirect[pattern];
				
				if(redirected === false) {
					toRemove.push(regexp);
				}else if(typeof redirected === "string") {
					toMatch.push([regexp, redirected]);
				} else {
					toReplace.push([regexp, parseExpression(JSON.stringify(redirected))]);
				}
			}
			
			const {extraFunctions} = this.opts;
						
			const functionNames = new Set(extraFunctions && (Array.isArray(extraFunctions) ? extraFunctions : [extraFunctions])).add("require");
			
			this.calculatedOpts = {
				filename,
				toMatch,
				functionNames,
				toRemove,
				toReplace
			};
		},
		visitor: {
			CallExpression(path, state) {
				// console.log(state.opts === this.opts);
				requireCall(t, path, state, this.calculatedOpts);
			},
			ModuleDeclaration(path, state) {
				importExportDeclaration(t, path, state, this.calculatedOpts);
			}
		}
	};
};