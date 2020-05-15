const { NlpManager } = require("node-nlp");
const config = require("../constant").config;
const consumers = require("../controllers/consumers.controller");
const bs = require("../controllers/botstorage.controller");
const sessionChat = require("../controllers/session.controller");
const manager = new NlpManager();
const httpContext = require('express-http-context')
const uuid = require('uuid/v4')
const moment = require('moment');
const msgin = require('../model/messages-in');
const storage = require('../model/storage');
const helper = require("../helper/helper");

module.exports = (controller) => {

	controller.plugins.cms.before("hello", "default", async (convo, bot) => {
        
        console.log("CONVERSATION STARTED",  /* bot._config */);
        
        const user = await consumers.getUserByPhone(bot._config.activity.from.id);
        if(user !== null){
            await convo.gotoThread('menu_utama')
        }
        
    })

	controller.plugins.cms.onChange("hello", "_answ_default", async(response, convo, bot) => {
        

        switch(response.toLowerCase()) {
            case 'lanjut':
            case '1':
                const user = await consumers.createUser(bot._config.activity.from.name, bot._config.activity.from.id); 
                await convo.gotoThread('menu_utama')
            break
            default:
                await convo.gotoThread('default')
        }

        
    })
    
    controller.plugins.cms.onChange("hello", "_answ_menu_utama", async(response, convo, bot) => {
        

        if(response) {
            await convo.gotoThread('nama_perusahaan')
        }
        else {
        await convo.gotoThread('menu_utama')
        }

        
    })
    
    controller.plugins.cms.onChange("hello", "_answ_nama_perusahaan", async(response, convo, bot) => {
        
        
        if(response) {
            await convo.gotoThread('alamat_email')
        }
        else {
            await convo.gotoThread('nama_perusahaan')
        }

        
    })
    
    controller.plugins.cms.onChange("hello", "_answ_alamat_email", async(response, convo, bot) => {
        

        if(ValidateEmail(convo.vars._answ_alamat_email) == true) {
            await convo.gotoThread('alamat_lokasi')
        }
        else {
            await convo.gotoThread('email_salah')
        }

        
    })
    
    controller.plugins.cms.onChange("hello", "_answ_alamat_lokaso", async(response, convo, bot) => {
        
        const messageType = bot._config.activity.messageType;
        console.log(messageType);
        if(messageType == "location") {
            let dataLocation = convo.vars._answ_alamat_lokaso
            console.log(dataLocation);
            
            await convo.gotoThread('photo_selfie')
        }
        else {
        await convo.gotoThread('alamat_lokasi')
        }

        
    })
    
    controller.plugins.cms.onChange("hello", "_answ_photo_selfie", async(response, convo, bot) => {
        
        const messageType = bot._config.activity.messageType;
        console.log(messageType);
    
        if(response) {
            await helper.api({
                method: "post",
                url: "https://private-65030d-dam7.apiary-mock.com/api/v1/bussines",
                data: {
                    phone : config.number
                    }
                })
                .then( async res => {
                const list = res.data.data.list;
                list.forEach((el,i) => {
                list[i] = `${i + 1}. ${el}`;
                })
                let dataList = 'Silahkan pilih kebutuhan Anda:\n\n' + list.join('\n');
                
                convo.setVar('listArr', list);
                convo.setVar('list',dataList);

                await convo.gotoThread('data_list');
            })

        }
        else {
            await convo.gotoThread('photo_selfie')
        }

        
    })

    controller.plugins.cms.onChange("hello", "_answ_data_list", async(response, convo, bot) => {
        
        switch(response.toLowerCase()) {
            case '1':
            case 'whatsapp':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '2':
            case 'pawon':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '3':
            case 'kiosk':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '4':
            case 'loker':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '5':
            case 'flo':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '6':
            case 'digiresto':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '7':
            case 'gowes':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '8':
            case 'edc':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '9':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '10':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '11':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '12':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '13':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '14':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '15':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '16':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            case '17':
                storage.create({
                    ticket: convo.vars.listArr[Number(response) - 1],
                    createdAt: moment().format(),
                    updatedAt: moment().format()
                }); 
                await convo.gotoThread('penutup')
            break
            default:
                await convo.gotoThread('data_list')
        }
   
    })

    controller.plugins.cms.onChange("hello", "_answ_penutup", async(response, convo, bot) => {
        if(response == '0') {
            await convo.gotoThread('default')
        }
        else {
        await convo.gotoThread('data_list')
        }

        
    })
    

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return true
        }
            return false
    }
    

    // function msg_in(bot,msg,tn){
    //     let now = moment().format()
    //     let activity = bot._config.activity
    //     console.log(activity)
    //     msgin.create({
    //         wa_id: activity.from.id,
    //         message: msg,
    //         thread_name: tn,
    //         message_type: activity.messageType,
    //         timestamp: now
    //     }).catch(err => {

    //     })
    // }

}