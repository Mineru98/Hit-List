const hList = require('./dist');
const mode = require('./dist/mode');
const DEV = require('./dist/mode').DEV;
const str_list = ["apple", "apple", "apple", "banana", "banana", "orange"];
const num_list = [1, 1, 1, 2, 2, 3];
const obj_list = [
	{ name: "amazon", count: 2 },
	{ name: "amazon", count: 2 },
	{ name: "apple", count: 3 },
	{ name: "apple", count: 3 },
	{ name: "apple", count: 3 },
	{ name: "amazon", count: 1 }
];

const str_result = new hList(str_list);
const num_result = new hList(num_list);
const obj_result = new hList(obj_list, DEV);

// console.log(str_result.get());
// console.log(num_result.get());
// console.log(obj_result.get());
obj_result.count();
console.log(mode);
