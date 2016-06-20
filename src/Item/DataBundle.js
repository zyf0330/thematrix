'use strict';
/**
 * 采集的数据包
 * Created by zyf on 2016/6/14.
 */
import DataEntries from './DataEntries'

class DataBundle{
	/**
	 * 来源采集器id
	 * @type {String}
	 */
	collector_id
	/**
	 * 目标母体
	 * @type {String}
	 */
	matrix_id
	/**
	 * 目标机器人
	 * @type {String}
	 */
	robot_id
	/**
	 * 携带数据，键为DataEntry名，值为子类实例
	 * @type {Object}
	 */
	data
	/**
	 * 创建时间
	 */
	time
	/**
	 * 用data中属于DataEntries的部分构造一个数据包
	 * @param collector_id {String} 来源采集器id
	 * @param matrix_id {String} 目标母体
	 * @param robot_id {String} 目标机器人
	 * @param collecDataEntries {Array<function(DataEntry)>} 需要采集的数据类型
	 * @param {Object} data
	 */
	constructor(collector_id, matrix_id, robot_id, collecDataEntries, data){
		this.collector_id = collector_id;
		this.matrix_id = matrix_id;
		this.robot_id = robot_id;
		let _data = {};
		for(let i in collecDataEntries){
			let name = collecDataEntries[i].name;
			_data[name] = new DataEntries[name](data[name]);
		}
		this.data = _data;
		this.time = new Date();
	}
}

export default DataBundle