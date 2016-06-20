'use strict';
/**
 * 机器人
 * Created by zyf on 2016/6/15.
 */

import util from '../util'
import Errors from '../Errors'

class Robot {
	/**
	 * @type {String}
	 */
	id
	/**
	 * 机器人的母体
	 * @type {Matrix}
	 */
	matrix

	/**
	 * 构造一个机器人
	 * @param id
	 * @param matrix 机器人的母体
	 */
	constructor(id, matrix){
		this.id = id + '';
		this.matrix = matrix;
	}

	/**
	 * 处理数据包返回结果
	 * @param dataBundle
	 * @param {function(Error, Result)} cb(err, result)
	 */
	communicate(dataBundle, cb){
		let behaviors = this.matrix.behaviors;
		let behavior = null;
		for(let i in behaviors){
			let b = behaviors[i];
			if(b.collector.id === dataBundle.collector_id){
				behavior = b;
				break;
			}
		}
		if(behavior != null){
			behavior.action.handle(dataBundle, cb);
		}else{
			throw new Errors.WrongWay('This Robot cannot handle this collector');
		}
	}
}

export default Robot