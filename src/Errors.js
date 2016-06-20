'use strict';
/**
 * 各种错误类型
 * Created by zyf on 2016/6/14.
 */

import _util from 'util'

const inherits = (ctor, superCtor) => {
	_util.inherits(ctor, superCtor);
	ctor.prototype.name = ctor.name;
}

/**
 * 不匹配的类型
 */
function MismatchType (msg) {
	Error.captureStackTrace(this, MismatchType);
	this.message = msg;
}
inherits(MismatchType, Error);

/**
 * 重复数据
 */
function RepeatData (msg) {
	Error.captureStackTrace(this, RepeatData);
	this.message = msg;
}
inherits(RepeatData, Error);

/**
 * 错误方式
 */
function WrongWay(msg){
	Error.captureStackTrace(this, WrongWay);
	this.message = msg;
}
inherits(WrongWay, Error);

export default {MismatchType, RepeatData, WrongWay}