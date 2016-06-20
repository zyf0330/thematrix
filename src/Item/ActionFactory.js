'use strict';
/**
 * 动作生产工厂
 * Created by zyf on 2016/6/15.
 */

import util from '../util'
import Action from './Action'

class ActionFactory {
	/**
	 * 要处理的数据类型
	 * @type {Array<function(DataEntry)>}
	 */
	dataEntries
	/**
	 * 返回结果类型
	 * @type {function(Result)}
	 */
	result
	/**
	 * 处理函数的模板
	 * @type {string}
	 */
	model

	/**
	 * 构造一个动作生成工厂
	 * @param dataEntries {Array<function(DataEntry)>} 处理器可处理的数据类型
	 * @param result {function(Result)} 返回结果类型
	 * @param model {String} 处理函数模板
	 */
	constructor(dataEntries, result, model){
		this.dataEntries = dataEntries;
		this.result = result;
		this.model = model;
	}

	/**
	 *生成一个动作处理器
	 * @param fills {Object} 模板填充对象
	 * @returns {Action} 处理器
	 */
	generate(action_id, fills){
		let handle = util.generate(this.model, fills);
		return new Action(action_id, this.dataEntries, this.result, handle);
	}
}

export default ActionFactory