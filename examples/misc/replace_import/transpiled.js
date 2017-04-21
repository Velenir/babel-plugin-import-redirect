/*eslint-disable*/
// default imports
const {
  default: foo1
} = { "class1": "className1", "class2": "className2" };
const {
  default: foo2
} = { "class1": "className1", "class2": "className2" };

// named imports

const {
  bar3
} = { "class1": "className1", "class2": "className2" };
const {
  bar4,
  baz4
} = { "class1": "className1", "class2": "className2" };
const {
  bar: baz5
} = { "class1": "className1", "class2": "className2" };
const {
  bar: baz6,
  xyz6
} = { "class1": "className1", "class2": "className2" };

// glob imports

const foo7 = { "class1": "className1", "class2": "className2" };

// mixing imports

const {
  default: foo8,
  baz: xyz8
} = { "class1": "className1", "class2": "className2" };
const bar9 = { "class1": "className1", "class2": "className2" },
      {
  default: foo9
} = bar9;