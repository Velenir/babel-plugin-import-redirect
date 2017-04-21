/*eslint-disable*/
// default imports
import foo1 from "./style.css";

import {default as foo2} from "./style.css";

// named imports
import {bar3} from "./style.css";

import {bar4, baz4} from "./style.css";

import {bar as baz5} from "./style.css";

import {bar as baz6, xyz6} from "./style.css";

// glob imports
import * as foo7 from "./style.css";

// mixing imports
import foo8, {baz as xyz8} from "./style.css";

import foo9, * as bar9 from "./style.css";