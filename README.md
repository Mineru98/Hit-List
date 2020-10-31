# JavaScript Hit List

Hit-List is a data structure that expresses the number of duplicates of duplicated data in a collection type array.

* [npm](https://www.npmjs.com/package/hit-list)
* [GitHub](https://github.com/Mineru98/hit-list) 

## Installation

```shell script
npm install hit-list
```

## Example

### Usage
```javascript
const hList = require("hit-list");

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
const obj_result = new hList(obj_list);

console.log(str_result.get());
/*
[ { apple: 3 }, { banana: 2 }, { orange: 1 } ]
*/
console.log(num_result.get());
/*
[ { '1': 3 }, { '2': 2 }, { '3': 1 } ]
*/
console.log(obj_result.get());
/*
[
	{
		'hash key 1': 2,
		data: {
			name: 'amazon', count: 2
		}
	},
	{
		'hash key 2': 1,
		data: {
			name: 'apple', count: 1
		}
	},
	{
		'hash key 3': 3,
		data: {
			name: 'amazon', count: 3
		}
	},
]
*/

const a_num = str_result.count('orange');
const n_num = num_result.count(2);
const o_num = obj_result.count({ name: "amazon", count: 2 });

console.log(a_num);
/*
1
*/
console.log(n_num);
/*
2
*/
console.log(o_num);
/*
3
*/

console.log(obj_result.filter((item) => {
	return item > 1;
}).get());

/*
[
	{
		'hash key 1': 2,
		data: {
			name: 'amazon', count: 2
		}
	},
	{
		'hash key 2': 3,
		data: {
			name: 'apple', count: 1
		}
	},
]
*/

```
