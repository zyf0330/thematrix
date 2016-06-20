'use strict';
/**
 * 机器人的行为动作
 * Created by zyf on 2016/6/15.
 */
import Errors from '../Errors'
import util from '../util'
import Results from './Results'

class Action {
	/**
	 * 动作id
	 * @type {String}
	 */
	id
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
	 * 处理器，处理采集数据
	 * @type {function(DataBundle, function(Error, Result))}
	 */
	handle = function(dataBundle, cb){
		throw new Errors.WrongWay('Need to be rewritted');
	}

	/**
	 * 构建一个动作
	 * @param id {string}
	 * @param dataEntries {Array<function(DataEntry)>} 可处理的数据类型
	 * @param result {function(Result)} 返回结果类型
	 * @param handle {function(DataBundle, function(Error, Result))} 处理器函数
	 */
	constructor(id, dataEntries, result, handle){
		this.id = id;
		this.dataEntries = dataEntries;
		this.result = result;
		this.handle = function (dataBundle, cb){
			util.assertDataBundle(dataBundle);
			if(typeof cb !== 'function'){
				throw new Errors.MismatchType('The cb requires function');
			}
			let _cb = function(err, result){
				util.assertResultInstance(result);
				cb(err, result);
			}
			handle.call(this, {Result: result}, dataBundle, _cb);
		};
	}
}

export default Action