var path = require('path');
var devConfigPath = path.join(__dirname, './development.js');
var productionConfigPath = path.join(__dirname, './production.js');
var testingConfigPath = path.join(__dirname, './testing.js');

if (process.env.NODE_ENV === 'production') {
    module.exports = require(productionConfigPath);
} else if(process.env.NODE_ENV === 'development') {
    module.exports = require(devConfigPath);
} else {
	module.exports = require(testingConfigPath);
}