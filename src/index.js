import requireCall from './transformers/requireCall';
import importDeclaration from './transformers/importDeclaration';

export default ({types: t}) => {
	return {
		pre(state) {
			console.log("PRE");
			// console.log(Object.keys(state));
			console.log("filename", state.opts.filename);
			console.log("filenameRelative", state.opts.filenameRelative);
			// console.log(this.opts);
			// console.log(state.opts === this.opts);
			if(!this.opts.root) this.opts.root = process.cwd();

		},
		visitor: {
			CallExpression(path, state) {
				// console.log(state.opts === this.opts);
				requireCall(t, path, state);
			},
			ImportDeclaration(path, state) {
				importDeclaration(t, path, state);
			}
		}
	};
};