'use strict';
/**
 * Created by zyf on 2016/6/20.
 */

import TheMatrix from './index'

/*
* 现有的DataEntry包括Position、Text、Time
* */
let model = "cb(null, new ctx.Result('1', '2', '${fills.name}'))";
let af = TheMatrix.architect.createActionFactory(['Text', 'Time'], 'Text', model);
let action = af.generate('action', {name: 'The matrix'});
let collector = TheMatrix.nexus.registerCollector('collector', ['Text', 'Time']);
let behavior = TheMatrix.architect.createBehavior(collector, action);
let matrix = TheMatrix.nexus.registerMatrix('matrix', [behavior]);
matrix.produce('robot');

TheMatrix.nexus.collectData('collector', 'matrix', 'robot', {
	Time: Date.now(),
	Text: 'First test'
}, function (err, result) {
	if(err){
		throw err
	}else{
		console.log('result', result)
	}
})



