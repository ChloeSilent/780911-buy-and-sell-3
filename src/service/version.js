'use strict';

const pj = require('../../package.json');
const getVersion = () => {
  console.log(pj.version);
};

exports.version = getVersion;




