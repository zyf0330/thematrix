'use strict';
/**
 * 机器人处理成功后返回的结果
 * Created by zyf on 2016/6/16.
 */

class Result{
	name
	/**
	 * 处理母体id
	 * @type {String}
	 */
	matrix_id
	/**
	 * 处理机器人id
	 * @type {String}
	 */
	robot_id
	/**
	 * 结果数据
	 * @type {Object}
	 */
	data = {
		type: null,
		value: null
	}
	/**
	 * 机器人动作返回的结果
	 * @param {String} matrix_id
	 * @param {String} robot_id
	 * @param {Object} data
	 */
	constructor(matrix_id, robot_id, data){
		this.name = this.constructor.name;
		this.matrix_id = matrix_id;
		this.robot_id = robot_id;
		this.data = {
			type: data.type,
			value: data.value
		}
	}

	toString(){
		return this.data.value.toString();
	}
	valueOf(){
		return this.data.value;
	}
}

export default Result