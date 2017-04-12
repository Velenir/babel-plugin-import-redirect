import requireCall from './transformers/requireCall';
import importDeclaration from './transformers/importDeclaration';

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
			
			const regexps = [], {redirect} = opts;
			for(let pattern in redirect) {
				regexps.push([new RegExp(pattern), redirect[pattern]]);
			}
			
			this.regexps = regexps;
		},
		visitor: {
			CallExpression(path, state) {
				// console.log(state.opts === this.opts);
				requireCall(t, path, state, this.regexps);
			},
			ImportDeclaration(path, state) {
				importDeclaration(t, path, state, this.regexps);
			}
		}
	};
};