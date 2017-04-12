import replacePath from "../helpers/replacePath";

export default function (t, path, state) {
	replacePath(t, state, path.get("source"));
}