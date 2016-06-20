'use strict';
/**
 * 枢纽，作为处理中心处理采集器和机器人的交互
 * Created by zyf on 2016/6/14.
 */
import Errors from '../Errors'
import util from '../util'
import Collector from './Collector'
import Behavior from './Behavior'
import Matrix from './Matrix'
import DataEntries from './DataEntries'
import ActionFactory from './ActionFactory'

class Nexus{
	/**
	 * 合法运作的采集器
	 * @type {Object}
	 */
	collectors = {}
	/**
	 * 注册的母体
	 * @type {Object}
	 */
	matrixes = {}

	/**
	 * 开启黑客帝国
	 */
	constructor(){
		console.log('The Matrix starts.');
	}
	/**
	 * 创建采集器
	 * @param id {String} 采集器id
	 * @param dataEntryNames {Array<String>} 采集数据类型名
	 */
	registerCollector(id, dataEntryNames) {
		id = id + '';
		if(id in this.collectors){
			throw new Errors.RepeatData('This collector already exists');
		}
		util.assertArray(dataEntryNames);
		let dataEntries = [];
		for(let i in dataEntryNames){
			let name = dataEntryNames[i];
			util.assertDataEntry(name)
			let DE = DataEntries[name];
			if(util.contains(dataEntries, DE)){
				throw new Errors.RepeatData('Every kind of DataEntry just needs one');
			}
			dataEntries.push(DE);
		}
		let c = new Collector(id, dataEntries);
		this.collectors[id] = c;
		return c;
	}

	/**
	 * 移除采集器
	 * @param id {String} 采集器id
	 */
	removeCollector(id){

	}
	/**
	 * 创建母体
	 * @param id {String} 母体id
	 * @param behaviors {Array<Behavior>} 母体的行为
	 */
	registerMatrix(id, behaviors) {
		id = id + '';
		if(id in this.matrixes){
			throw new Errors.RepeatData('This matrix already exists');
		}
		let matrix = new Matrix(id, behaviors);
		this.matrixes[id] = matrix;
		return matrix;
	}

	/**
	 * 移除母体
	 * @param id {String} 母体id
	 */
	removeMatrix(id){

	}
	/**
	 * 接收数据
	 * //TODO 考虑返回流独立出去
	 */
	receiveData(collector_id, matrix_id, robot_id, data, cb){
		let collector = this.collectors[collector_id];
		if(collector == null){
			throw new Errors.WrongWay('This collector doesn\'t exist');
		}
		let matrix = this.matrixes[matrix_id];
		if(matrix == null){
			throw new Errors.WrongWay('This matrix doesn\'t exist, please create it.');
		}
		let robot = matrix.robots[robot_id];
		if(robot == null){
			robot = matrix.produce(robot_id);
		}
		let dataBundle = collector.make(matrix_id, robot_id, data);
		robot.communicate(dataBundle, cb);
	}
}

export default Nexus