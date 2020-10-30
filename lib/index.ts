import * as crypto from 'crypto';
import { PRODUCT, DEV, TEST } from './mode';

interface hList {
	[key: string]: any;
}

interface normalObject {
	[key: string]: number;
}

/**/
interface hashObject {
	[key: string]: any;
}

enum Mode {
	PRODUCT = 0,
  DEV = 1,
	TEST = 2
}

/**
 * 데이터 무결성 체크를 하기 위해서 단방향 암호화를 한 뒤 반환함.
 * @param {string} text
 * @returns {string}
 */
function encrypt(text: string) {
	return crypto.createHash('sha256').update(text).digest('base64');
}

function toList(tmp: any) {
	const list = [];
	for(let k in tmp) {
		list.push(tmp[<any>k]);
	}
	return list;
}

class HitList {
	private hitList?: hList[];
	
	constructor(list: any[] = [], private mode: Mode = Mode.PRODUCT) {
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
		this.hitList = hitList;
	}
	
	get(): Array<hList> {
		return toList(this.hitList);
	}
	
	count(key: string) {
		const list: Array<hList> = toList(this.hitList);
		list.forEach((value: any) => {
			console.log(Object.keys(value));
		});
	}
}

export = HitList;
