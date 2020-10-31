const hList = require('./dist');
const DEV = require('./dist/mode').DEV;

const str_list = ["apple", "apple", "apple", "banana", "banana", "orange"];
const num_list = [1, 1, 1, 2, 2, 3];
const obj_list = [
	{ name: "amazon", count: 2 },
	{ name: "amazon", count: 2 },
	{ name: "apple", count: 1 },
	{ name: "apple", count: 1 },
	{ name: "apple", count: 1 },
	{ name: "amazon", count: 3 }
];
const str_result = new hList(str_list);
const num_result = new hList(num_list);
const obj_result = new hList(obj_list, DEV);

console.log(str_result.get());
console.log(num_result.get());
console.log(obj_result.get());

const a_num = str_result.count('orange');
const n_num = num_result.count(2);
const o_num = obj_result.count({ name: "apple", count: 1 });

console.log(a_num);
console.log(n_num);
console.log(o_num);

console.log(obj_result.filter((item) => {
	return item > 1;
}).get());
