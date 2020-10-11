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

const list = ["apple", "apple", "apple", "banana", "banana", "orange"];

const result = hList(list);

console.log(result);

/*
{
	apple: 3,
	banana: 2,
	orange: 1
}
*/
```
