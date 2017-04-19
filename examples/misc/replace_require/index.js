/*eslint-disable no-undef, no-unused-vars*/
const styles1 = require("./style.css");
const s1 = require("./style.css").s1;

const styles2 = import("./style.css");
const s2 = import("./style.css").s2;

const styles3 = custom_require_function("./style.css");
const s3 = custom_require_function("./style.css").s3;

const styles4 = Object.method("./style.css");
const s4 = Object.method("./style.css").s4;