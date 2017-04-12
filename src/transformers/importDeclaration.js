import replacePath from "../helpers/replacePath";

export default function (t, path, state, regexps) {
	replacePath(t, path.get("source"), state, regexps);
}