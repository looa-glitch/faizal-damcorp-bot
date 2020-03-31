const { NlpManager } = require("node-nlp");
const manager = new NlpManager();
const httpContext = require('express-http-context')
const uuid = require('uuid/v4')
const tm = require('../helper/trackingManager')
module.exports = (controller) => {
	controller.plugins.cms.before("default", "final", async(convo, bot) => {

	})

	controller.plugins.cms.onChange("default", "variablename", async(response, convo, bot) => {

	})
}