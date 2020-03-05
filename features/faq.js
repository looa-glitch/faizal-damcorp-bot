const tm = require('../helper/trackingManager')
const brain = require('../nlp/brain')
const helper = require('../helper/helper')
const config = require('../constant').config
module.exports = (controller) => {
    controller.plugins.cms.before("bank-indo", "default", async(convo, bot) => {
        let message = bot._config.activity.text, activity = bot._config.activity
        await brain.extract(message).then(async ({ classifications, intent }) => {
            if(intent == "faq.ojk"){
                await convo.gotoThread("faq.ojk")
            } else if(intent == "faq.kas"){
                await convo.gotoThread("faq.kas")
            } else if(intent == "faq.ijin"){
                await convo.gotoThread("faq.ijin")
            } else if(intent == "faq.kurs"){
                await convo.gotoThread("faq.kurs")
            }
        })
    })

    controller.plugins.cms.before("bank-indo", "faq.kurs", async(convo, bot) => {
        let message = bot._config.activity.text, activity = bot._config.activity
        let rate_str = "", image = null
        await helper.api({
            method: "get",
            url: "http://bi-kurs-scrapper.glitch.me/"
        }).then(({ data }) => {
            rate_str = data.rates.map(v => {
                return `*${v.name}*\n  ${v.value}`
            }).join("\n")
            image = data.imgUrl
        })

        await helper.api({
            method: "post",
            url: config.whatsappApi + "whatsapp/sendImage",
            data: {
                to: "+" + bot._config.activity.from.id,
                token: config.token,
                image: image,
                caption: rate_str
            }
        }).then(() => {
            convo.gotoThread("void")
        })
    })

    controller.plugins.cms.after("bank-indo", async(convo, bot) => {
        tm.info("##### conversation end #####")
    })
}