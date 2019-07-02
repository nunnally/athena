var express = require('express');
var app = express();
var consign = require('consign')
/*

//While import is indeed part of ES6, it is unfortunately not yet supported in
// NodeJS by default, and has only very recently landed support in browsers.


import express from 'express';
import consign from 'consign';
*/

consign()
    .include('libs/middlewares.js')
    .then('libs/common.js')
    .then('routes')
    .then('libs/boot.js')
    .into(app)







 