'use strict';
/**
 * Created by zyf on 2016/6/16.
 */

import Nexus from './Item/Nexus'
import Behavior from './Item/Behavior'
import ActionFactory from './Item/ActionFactory'
import DataEntries from './Item/DataEntries'
import Results from './Item/Results'

import util from './util'
import Errors from './Errors'

const nexus = new Nexus();
/**
 *创建动作工厂
 * @param dataEntryNames {Array<String>} 动作模板处理的类型名
 * @param <String> resultName 返回结果类型名
 * @param <String> model 动作处理函数模板
 * @returns {ActionFactory} 机器人工厂
 */
const createActionFactory = (dataEntryNames, resultName, model) => {
	util.assertArray(dataEntryNames);
	util.assertString(model);
	util.assertResult(resultName);
	let dataEntries = [];
	for(let i in dataEntryNames){
		let name = dataEntryNames[i];
		util.assertDataEntry(name);
		let DE = DataEntries[name];
		if(util.contains(dataEntries, DE)){
			throw new Errors.RepeatData('Every kind of DataEntry just need one in dataEntryNames');
		}
		dataEntries.push(DE);
	}
	let result = Results[resultName];
	return new ActionFactory(dataEntries, result, model);
}
/**
 *创建行为
 * @param {Collector} collector
 * @param action {Action} 由ActionFactory生成
 */
const createBehavior = (collector, action) => {
	let behavior = new Behavior(collector, action);
	return behavior;
}
/**
 * 接收采集数据
 */
nexus.collectData = function(collector_id, matrix_id, robot_id, data, cb){
	let is_return = false;
	try{
		let args = [...arguments];
		args = args.slice(0, args.length - 1);
		nexus.receiveData(...args, function (err, result) {
			if(is_return === false){
				cb(err, result);
				is_return = true;
			}
		});
	}catch(e){
		is_return = true;
		cb(e);
	}
};

const architect = {createActionFactory, createBehavior};
export default {architect, nexus};

//TODO 1. 机器人系统建立后,页面的采集器初始化,要拉取采集器信息
//TODO 2、检查model合法的正则