'use strict';
/**
 * Created by zyf on 2016/6/14.
 */

import _util from 'util'
import Errors from './Errors'

import DataEntries from './Item/DataEntries'
import Collector from './Item/Collector'
import Action from './Item/Action'
import Behavior from './Item/Behavior'
import Matrix from './Item/Matrix'
import DataBundle from './Item/DataBundle'
import Result from './Super/Result'
import Results from './Item/Results'

const inherits = (ctor, superCtor) => {
	_util.inherits(ctor, superCtor);
	ctor.prototype.name = ctor.name;
}


/**
 * 检查数组是否包含元素，默认使用三等号判断。可以传入一个比较器
 * @param arr {Array} 数组
 * @param ele {any} 元素
 * @param {function} (comparator) 比较器，比较两个元素是否相等，返回true或false
 * @returns {boolean} 是否包含
 */
const contains = (arr, ele, comparator) => {
	if(Array.isArray(arr) === false){
		throw new Errors.MismatchType('arr requires Array');
	}
	if(!!comparator && typeof comparator !== 'function'){
		throw new Errors.MismatchType('comparator requires a function');
	}
	comparator = comparator || ((o1, o2) => {
			return o1 === o2;
		});
	for (let i = 0, l = arr.length; i < l; i++) {
		if(comparator(arr[i], ele) === true){
			return true;
		}
	}
	return false;
}

/**
 * 使用函数模板生成处理器
 * @param model {String} 函数模板，要填充的值，必须使用${fills.key}的形式，key在fills对象中填入
 * @param fills {Object} 要填充的值
 * @param variablename {String} fills的名称，默认为fills
 * @returns {function} 处理器
 */
const generate = (model, fills = {}, variablename = 'fills') => { 
	assertString(model);
	if(typeof fills !== 'object' || fills === null){
		fills = {};
	}
	variablename = variablename || 'fills';
	let body = eval('let ' + variablename + ' = ' + JSON.stringify(fills) + ';`\'use strict\';\n' + model + '`');
	let func = new Function('ctx', 'dataBundle', 'cb', body);
	return func;
}

/**
 * 判断是否是非null对象
 * @param {any} o
 * @returns {boolean}
 */
const assertObject =  o => {
	if(typeof o !== 'object' || o === null){
		throw new Errors.MismatchType('Require Object');
	}
}
/**
 * 判断是否是非0长度字符串
 */
const assertString = o => {
	if(typeof o !== 'string' || o.trim().length <= 0){
		throw new Errors.MismatchType('Require non-zero length String');
	}
}
/**
 * 是否是非空数组
 */
const assertArray = o=> {
	if(Array.isArray(o) === false || o.length <= 0){
		throw new Errors.MismatchType('Require non-zero length Array');
	}
}
/**
 * 是否是有效日期类型
 */
const assertDate = o => {
	if(o instanceof Date === false || o + '' === 'Invalid Date'){
		throw new Errors.MismatchType('Require valid Date format');
	}
}

/**
 * 判断是否属于DataEntry的子类
 * @param o {String|function} DataEntry子类或者它的name
 */
const assertDataEntry = o => {
	if(!(typeof o === 'string' && DataEntries[o].name === o)
		&& !(typeof o === 'function' && DataEntries[o.name] === o)){
		throw new Errors.MismatchType('Require DataEntry child type constructor function or name');
	}
}
/**
 * 判断是否是Result的子类
 * @param o {String|function} Result子类或者它的name
 */
const assertResult = o => {
	if(!(typeof o === 'string' && Results[o].name === o)
		&& !(typeof o === 'function' && Results[o.name] === o)){
		throw new Errors.MismatchType('Require Result child type constructor function or name');
	}
}
const assertResultInstance = o => {
	if(o instanceof Result === false){
		throw new Errors.MismatchType('Require Result child type instance');
	}
}
const assertCollector = o => {
	if(o instanceof Collector === false){
		throw new Errors.MismatchType('Require Collector instance');
	}
}
const assertAction = o => {
	if(o instanceof Action === false){
		throw new Errors.MismatchType('Require Action instance');
	}
}
const assertBehavior = o => {
	if(o instanceof Behavior === false){
		throw new Errors.MismatchType('Require Behavior instance');
	}
}
const assertMatrix = o => {
	if(o instanceof Matrix === false){
		throw new Errors.MismatchType('Require Matrix instance');
	}
}
const assertDataBundle = o => {
	if(o instanceof DataBundle === false){
		throw new Errors.MismatchType('Require DataBundle instance');
	}
}

export default {inherits, contains, generate, assertObject, assertString, assertArray, assertDate, assertDataEntry, assertResult, assertResultInstance, assertCollector, assertAction, assertBehavior, assertMatrix, assertDataBundle}