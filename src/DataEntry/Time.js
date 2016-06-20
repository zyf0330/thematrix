'use strict';
/**
 * 时间
 * Created by zyf on 2016/6/14.
 */

import util from '../util'
import DataEntry from '../Super/DataEntry'

class Time extends DataEntry{
	/**
	 * 时间
	 * @param value {Date} 时间
	 */
	constructor(value){
		value = new Date(value);
		util.assertDate(value);
		super(Date, value);
	}
}

export default Time