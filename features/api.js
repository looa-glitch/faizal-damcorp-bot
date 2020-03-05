const { NlpManager } = require("node-nlp");
const manager = new NlpManager();
const httpContext = require('express-http-context')
const uuid = require('uuid/v4')
const tm = require('../helper/trackingManager')
module.exports = (controller) => {
	controller.webserver.use(httpContext.middleware)
	controller.webserver.use((req, res, next) => {
		httpContext.set("reqId", uuid())
		next()
	})

    controller.webserver.post("/api/translate", async (req, res) => {
        await manager.load("./nlp/model.json");
		manager.process(req.body.message)
		.then(result => {
			tm.info(JSON.stringify(result));
			res.send(result);
		})
		.catch(err => {
            console.log("err", err)
			res.send(err);
		});
    })
}