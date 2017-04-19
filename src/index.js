import requireCall from './transformers/requireCall';
import importExportDeclaration from './transformers/importExportDeclaration';

const defaultExtensions = [".js", ".jsx", ".es", "es6"];

export default ({types: t}) => {
	return {
		pre(state) {
			console.log("PRE");
			// console.log(Object.keys(state));
			console.log("filename", state.opts.filename);
			console.log("filenameRelative", state.opts.filenameRelative);
			// console.log(this.opts);
			// console.log(state.opts === this.opts);
			const opts = this.opts;
			if(!opts.root) opts.root = process.cwd();
			
			if(!opts.extensions) opts.extensions = defaultExtensions;
			
			const regexps = [], toRemove = [], {redirect} = opts;
			for(let pattern in redirect) {
				const regexp = new RegExp(pattern), redirected = redirect[pattern];
				
				if(redirected === false) {
					toRemove.push(regexp);
				}else if(typeof redirected === "string") {
					regexps.push([regexp, redirected]);
				}
			}
			
			const {extraFunctions} = this.opts;
						
			const functionNames = new Set(extraFunctions && (Array.isArray(extraFunctions) ? extraFunctions : [extraFunctions])).add("require");
			
			this.calculatedOpts = {
				regexps,
				functionNames,
				toRemove
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