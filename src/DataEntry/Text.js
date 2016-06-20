'use strict';
/**
 * 文本关键字
 * Created by zyf on 2016/6/14.
 */

import util from '../util'
import DataEntry from '../Super/DataEntry'

class Text extends DataEntry{
	/**
	 * 文本关键字
	 * @param value {String} 文本
	 */
	constructor(value){
		util.assertString(value);
		super(String, value);
	}
}

export default Text