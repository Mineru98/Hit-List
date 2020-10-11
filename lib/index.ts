interface hList {
  key: string;
  count: number;
}

export function get(list: any[] = []) {
	const hitList: hList[] = [];
	const stackList = new Set(list);

	stackList.forEach((key) => {
		hitList.push({key, count: 0});
	});

	list.forEach((value) => {
		for (let idx in hitList) {
			if (hitList[idx].key === value) {
				hitList[idx].count += 1;
			}
		}
	});
	
	return hitList;
}
