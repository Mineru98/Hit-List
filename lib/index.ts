import * as crypto from 'crypto';
import { PRODUCT, DEV } from './mode';

interface hList {
	[key: string]: any;
}

interface normalObject {
	[key: string]: number;
}

interface hashObject {
	[key: string]: any;
}

enum Mode {
	PRODUCT = 0,
	DEV = 1,
}

enum ERROR {
	LACKLIST = 0,
	TYPECOMPLICATED = 1,
}

/**
 * 데이터 무결성 체크를 하기 위해서 단방향 암호화를 한 뒤 반환함.
 * @param {string} text
 * @returns {string}
 */
function encrypt(text: string) {
	return crypto.createHash('sha256').update(text).digest('base64');
}

/**
 * Array<hList>을 일반 배열 객체로 변환함.
 * @param {Array<hList>} source
 * @returns {Array<Any>}
 */
function toList(source: any): Array<any> {
	const list = [];
	for (let k in source) {
		list.push(source[<any>k]);
	}
	return list;
}

class HitList {
	private hitList?: hList[];
	private listType: string;
	private interrupt: ERROR[] = [];

	constructor(list: any[] = [], private mode: Mode = Mode.PRODUCT) {
		const itemType = typeof list[0];
		this.listType = typeof list[0];
		const itemTypeCheckSum = list.length === list.filter((n) => typeof n === itemType).length;

		if (list.length == 0) {
			this.interrupt.push(ERROR.LACKLIST);
		}

		if (!itemTypeCheckSum) {
			this.interrupt.push(ERROR.TYPECOMPLICATED);
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

	get(): any {
		this.interrupt.forEach((error: ERROR) => {
			if (error == ERROR.LACKLIST) {
				if (this.mode == Mode.DEV) {
					console.error('Error : Array is not large enough.');
				}
			}
		});

		if (this.interrupt.length > 0) {
			return;
		}

		return toList(this.hitList);
	}

	count(key: any): any {
		this.interrupt.forEach((error: ERROR) => {
			if (error == ERROR.LACKLIST) {
				if (this.mode == Mode.DEV) {
					console.error('Error : Array is not large enough.');
				}
				return;
			} else if (error == ERROR.TYPECOMPLICATED) {
				if (this.mode == Mode.DEV) {
					console.error('Error : Not all elements have the same type.');
				}
			}
		});

		if (this.interrupt.length > 0) {
			return;
		}

		if (typeof key == 'undefined') {
			if (this.mode == Mode.DEV) {
				console.error('Error : Input the desired key value as a parameter.');
				return;
			}
		}

		const list: Array<hList> = toList(this.hitList);
		let result: string = '';

		switch (this.listType) {
			case 'string':
				list.forEach((value: any) => {
					if (Object.keys(value)[0] == key) {
						result = value[key];
					}
				});
				break;
			case 'number':
				list.forEach((value: any) => {
					if (Object.keys(value)[0] == key) {
						result = value[key];
					}
				});
				break;
			case 'object':
				list.forEach((value: any) => {
					if (JSON.stringify(value.data) == JSON.stringify(key)) {
						result = value[encrypt(JSON.stringify(key))];
					}
				});
				break;
			default:
				break;
		}

		if (result == '') {
			return undefined;
		} else {
			return result;
		}
	}
	
	filter(condition: any): HitList {
		const list: any[] = [];
		const tList: any[] = toList(this.hitList);
		
		for(let idx in tList) {
			if (condition(Object.values(tList[idx])[0])) {
				list.push(tList[idx])
			}
		}
		
		this.hitList = list;
		return this;
	}
}

export = HitList;