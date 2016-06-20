'use strict';
/**
 * 机器人行为
 * Created by zyf on 2016/6/15.
 */
import util from '../util'
import Errors from '../Errors'

class Behavior {
	/**
	 * 注册的采集器
	 * @type {Collector}
	 */
	collector
	/**
	 * 关联的动作
	 * @type {Action}
	 */
	action

	/**
	 * 让行为注册到一个采集器，关联一个动作。相同采集器的行为被认为是相同的
	 * @param collector {Collector} 采集器
	 * @param {Action} action
	 */
	constructor(collector, action){
		this.collector = collector;
		this.action = action;
	}
}

export default Behavior