import * as crypto from 'crypto';

interface hList {
	[key: string]: any;
}

interface normalObject {
	[key: string]: number;
}

interface hashObject {
	[key: string]: any;
}

function encrypt(text: string) {
	return crypto.createHash('sha256').update(text).digest('base64');
}

export function get(list: any[] = []) {
	const itemType = typeof list[0];
	const itemTypeCheckSum = list.length === list.filter((n) => typeof n === itemType).length;

	if (!itemTypeCheckSum) {
		throw new Error('Not all elements have the same type.');
	}

	const stackList =
		itemType === 'object' ? new Set(list.map((item) => JSON.stringify(item))) : new Set(list);
	const hitList: hList[] = [];

	stackList.forEach((key: any) => {
		if (key !== '' && itemType === 'string') {
			const obj: normalObject = {};
			obj[key] = 0;
			hitList.push(obj);
		} else if (itemType === 'number') {
			const obj: normalObject = {};
			obj[key.toString()] = 0;
			hitList.push(obj);
		} else if (itemType === 'object') {
			const obj: hashObject = {};
			const _key = encrypt(key);
			obj[_key] = 0;
			obj['data'] = JSON.parse(key);
			hitList.push(obj);
		}
	});

	list.forEach((value: any) => {
		if (value instanceof Object) {
			for (let idx in hitList) {
				if (JSON.stringify(hitList[idx].data) == JSON.stringify(value)) {
					hitList[idx][encrypt(JSON.stringify(value))] += 1;
				}
			}
		} else {
			for (let idx in hitList) {
				if (Object.keys(hitList[idx])[0] === value.toString()) {
					hitList[idx][value] += 1;
				}
			}
		}
	});

	return hitList;
}