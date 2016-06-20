'use strict';
/**
 * 地理位置坐标
 * Created by zyf on 2016/6/14.
 */

import util from '../util'
import Errors from '../Errors'
import DataEntry from '../Super/DataEntry'

class Position extends DataEntry{
	/**
	 * 地理位置坐标
	 * @param value {object} 包含latitude,longitude,altitude信息
	 */
	constructor(value){
		util.assertObject(value);
		super(Object, {
			latitude: value.latitude,
			longitude: value.longitude,
			altitude: value.altitude
		});
	}
}

export default Position