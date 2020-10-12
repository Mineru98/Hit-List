# JavaScript Hit List

Hit-List is a javascript data structure implementation that expresses the number of duplicates and the number of duplicates in the list with duplicate values.

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
	{ name: "apple", count: 3 },
	{ name: "apple", count: 3 },
	{ name: "apple", count: 3 },
	{ name: "amazon", count: 1 }
];

const str_result = hList.get(str_list);
const num_result = hList.get(num_list);
const obj_result = hList.get(obj_list);

console.log(str_result);
/*
[ { apple: 3 }, { banana: 2 }, { orange: 1 } ]
*/
console.log(num_result);
/*
[ { '1': 3 }, { '2': 2 }, { '3': 1 } ]
*/
console.log(obj_result);
/*
[
	{
		
	},
	{
	
	},
	{
	
	},
]
*/

```
