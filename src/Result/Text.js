'use strict';
/**
 * 文本结果
 * Created by zyf on 2016/6/20.
 */

import Result from '../Super/Result'
import util from '../util'

class Text extends Result{
	/**
	 *
	 * @param matrix_id
	 * @param robot_id
	 * @param value
	 */
	constructor(matrix_id, robot_id, value){
		util.assertString(value);
		super(matrix_id, robot_id, {
			type: String,
			value: value
		});
	}
}

export default Text