import replacePath from "../helpers/replacePath";

export default function (t, path, state, {regexps}) {
	const sourcePath = path.get("source");
	if(sourcePath.node) {
		replacePath(t, sourcePath, state, regexps);
	}
}