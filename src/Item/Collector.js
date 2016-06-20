'use strict';
/**
 * 采集器
 * Created by zyf on 2016/6/14.
 */
import DataBundle from './DataBundle'

class Collector {
	/**
	 * @type {string}
	 */
	id
	/**
	 * 要采集的数据类型名
	 * @type {Array<function(DataEntry)>}
	 */
	dataEntries

	/**
	 * 构造一个采集器，指定id和采集数据类型
	 * @param id {String} 采集器id，指示它的用处和位置
	 * @param dataEntries {Array<function(DataEntry)>} 采集数据类型
	 */
	constructor(id, dataEntries){
		this.id = id + '';
		this.dataEntries = dataEntries;
	}
	/**
	 * 使用采集到的数据，制作数据包
	 * @param data {Object} 采集到的数据，其中包含robot_id
	 * @returns {DataBundle} 数据包
	 */
	make(matrix_id, robot_id, data) {
		return new DataBundle(this.id, matrix_id, robot_id, this.dataEntries, data);
	}
}

export default Collector