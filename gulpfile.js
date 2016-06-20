'use strict';
/**
 * Created by zyf on 2016/6/20.
 */
const gulp = require('gulp');
const path = require('path');

const es5dir = 'es5';
const outdir = 'out';

gulp.task('default', () => {
	gulp.src(['package.json', es5dir + '/**/*.js'])
		.pipe(gulp.dest(
			path.join('.', outdir)
		));
})