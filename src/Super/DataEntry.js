'use strict';

/**
 * 数据项，规定了各种采集器可以采集的数据类型，以及机器人行为输入的数据。
 * Created by zyf on 2016/6/14.
 */
class DataEntry{
	name

	data = {
		type: null,
		value: null
	}
	constructor(type, value){
		this.name = this.constructor.name;
		this.data.type = type;
		this.data.value = value;
	}
	toString(){
		return this.data.value.toString();
	}
	valueOf(){
		return this.data.value;
	}
}

export default DataEntry
