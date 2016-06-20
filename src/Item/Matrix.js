'use strict';
/**
 * 机器人母体，设置了机器人行为，负责生产、管理和调度机器人
 * Created by zyf on 2016/6/15.
 */

import util from '../util'
import Errors from '../Errors'
import Robot from './Robot'

class Matrix {
	/**
	 * 母体id
	 * @type {String}
	 */
	id
	/**
	 * 注册的行为。
	 * @type {Array<Behavior>}
	 */
	behaviors
	/**
	 * 管理的机器人，robot_id作为键
	 * @type {Object}
	 */
	robots = {};

	/**
	 * 生成一个母体
	 * @param id {String} 母体id
	 * @param {Array<Behavior>} behaviors
	 */
	constructor(id, behaviors){
		this.id = id + '';
		this.behaviors = behaviors;
	}

	/**
	 * 生产机器人
	 * @param id {String} 机器人id
	 * @returns {Robot}
	 */
	produce(id){
		let robot = new Robot(id, this);
		this.robots[id] = robot;
		return robot;
	}
}

export default Matrix