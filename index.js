const express = require('express');

const app = express();


var listener = app.listen(process.env.PORT || 2000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center
  </body>`)
});
const {
  WITHDRAW_CHANNEL_ID,
  COMMAND_CHANNEL_ID,
  withdraw_results_channel
} = require('./config.json');
const Discord = require("discord.js")
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const client = new Discord.Client({ intents: 32767 })
const tax = require('probot-tax-calculator')
const mongoose = require("mongoose");
const timestamp = require('discord-timestamp');
const moment = require("moment")
const ms = require('ms');
var _0x16c5 = ["\x6C\x6F\x67", "\x63\x61\x74\x63\x68", "\x44\x41\x54\x41\x42\x41\x53\x45\x20\x43\x4F\x4E\x4E\x45\x43\x54", "\x74\x68\x65\x6E", "\x6D\x6F\x6E\x67\x6F\x64\x62\x2B\x73\x72\x76\x3A\x2F\x2F\x65\x76\x61\x6E\x7A\x62\x6F\x6F\x6F\x6E\x32\x3A\x7A\x61\x45\x45\x41\x64\x50\x4C\x58\x6A\x4A\x6E\x5A\x6C\x48\x6B\x40\x63\x6C\x75\x73\x74\x65\x72\x30\x2E\x6F\x62\x71\x6E\x6D\x7A\x39\x2E\x6D\x6F\x6E\x67\x6F\x64\x62\x2E\x6E\x65\x74\x2F\x3F\x72\x65\x74\x72\x79\x57\x72\x69\x74\x65\x73\x3D\x74\x72\x75\x65\x26\x77\x3D\x6D\x61\x6A\x6F\x72\x69\x74\x79", "\x63\x6F\x6E\x6E\x65\x63\x74"]; mongoose[_0x16c5[5]](_0x16c5[4])[_0x16c5[3]](() => { return console[_0x16c5[0]](`${_0x16c5[2]}`) })[_0x16c5[1]]((_0xd9edx1) => { return console[_0x16c5[0]](_0xd9edx1) })
const db = require("./models/databaseusers")
const game = require("./models_games/game")
const nrd = require("./models_games/nrd")
const nrdusr = require("./models_games/nrdusergame")
const takribi = require("./models_games/takribi")
const tkusr = require("./models_games/takribiusergame")

let ownertr = "882271128247214122"
let probotId = "282859044593598464"

let owners = ["882271128247214122","353418418281644032"]


client.on("ready", async () => {
  console.log(`${client.user.tag} IS Ready!`)
})



const { Probot } = require("discord-probot-transfer");
client.probot = Probot(client, {
  fetchGuilds: true,
  data: [
    {
      fetchMembers: true,
      guildId: "1275302153166000280",
      probotId: "282859044593598464",
      owners: ["882271128247214122"],

    },
  ],
});


client.on("ready", async () => {
  setInterval(async () => {
    let es = (await game.find())
    es.forEach(async d => {
      let time = await d.time
      if (!time) return;

      if (time == timestamp(moment(Date.now())) || time < timestamp(moment(Date.now()))) {
        let ndata = await nrd.findOne({
          idstusr: d.id,
          msgID: d.msgID
        })
        let tkdata = await takribi.findOne({
          idstusr: d.id,
          msgID: d.msgID
        })
        if (ndata) {
          let gdata = await game.findOne({
            id: d.id,
            with: d.with,
            msgID: d.msgID
          })
          let st1usrrr = client.users.cache.get(ndata.notrole)
          let st2usrrr = client.users.cache.get(ndata.role)
          let userr1r = await nrdusr.findOne({
            id: st1usrrr.id
          })
          let userr2r = await nrdusr.findOne({
            id: st2usrrr.id
          })
          client.channels.cache.get(gdata.channelID).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({
            content: `بسبب الخمول لقد فاز ${st1usrrr} بمجموع \`${userr1r.result || 0}\`

لقد خسر ${st2usrrr} بمجموع \`${userr2r.result || 0}\`

> || ${st1usrrr} | ${st2usrrr} ||`, components: [], embeds: [embed]
          })).catch(err => console.error(err))
          let datacoinsusr1st = await db.findOne({
            id: st1usrrr.id
          })
          if (!datacoinsusr1st) {
            datacoinsusr1st = await db.create({
              id: st1usrrr.id,
              coins: 0,
              status_playing: "no"
            })
          }
          let tax = parseInt(gdata.coins) * 0.04;
          let total = parseInt(gdata.coins) - parseInt(tax);
          datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
          await datacoinsusr1st.save()
          let datacoinsusr2st = await db.findOne({
            id: st2usrrr.id
          })
          if (!datacoinsusr2st) {
            datacoinsusr2st = await db.create({
              id: st2usrrr.id,
              coins: 0,
              status_playing: "no"
            })
          }
          datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
          await datacoinsusr2st.save()
          datacoinsusr1st.status_playing = "no"
          await datacoinsusr1st.save()
          datacoinsusr2st.status_playing = "no"
          await datacoinsusr2st.save()
          await nrd.findOneAndDelete({
            msgID: gdata.msgID,
            idstusr: d.id
          })
          await nrdusr.findOneAndDelete({
            id: st1usrrr.id
          })
          await nrdusr.findOneAndDelete({
            id: st2usrrr.id
          })
          await game.findOneAndDelete({
            id: d.id,
            with: d.with,
            msgID: d.msgID
          })
        }
        if (tkdata) {
          let gdata = await game.findOne({
            id: d.id,
            with: d.with,
            msgID: d.msgID
          })
          let st1usrrr = client.users.cache.get(tkdata.notrole)
          let st2usrrr = client.users.cache.get(tkdata.role)
          let stusrgame = client.users.cache.get(gdata.id)
          let wthusrgame = client.users.cache.get(gdata.with)
          let userr1r = await tkusr.findOne({
          })
          let userr2r = await tkusr.findOne({
            id: st1usrrr
          })
          if (!userr1r) return;
          if (!userr2r) return;
          let embed = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${tkdata.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> ${userr1r.numbers.join(" + ") || ""} = **${userr1r.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${userr2r.numbers.join(" + ") || ""} = **${userr2r.result || 0}**` })
          client.channels.cache.get(gdata.channelID).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({
            content: `بسبب الخمول لقد فاز ${st1usrrr} بمجموع \`${userr1r.result || 0}\`

لقد خسر ${st2usrrr} بمجموع \`${userr2r.result || 0}\`

> || ${st1usrrr} | ${st2usrrr} ||`, components: [], embeds: [embed]
          })).catch(err => console.error(err))
          let datacoinsusr1st = await db.findOne({
            id: st1usrrr.id
          })
          if (!datacoinsusr1st) {
            datacoinsusr1st = await db.create({
              id: st1usrrr.id,
              coins: 0,
              status_playing: "no"
            })
          }
          let tax = parseInt(gdata.coins) * 0.04;
          let total = parseInt(gdata.coins) - parseInt(tax);
          datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
          await datacoinsusr1st.save()
          let datacoinsusr2st = await db.findOne({
            id: st2usrrr.id
          })
          if (!datacoinsusr2st) {
            datacoinsusr2st = await db.create({
              id: st2usrrr.id,
              coins: 0,
              status_playing: "no"
            })
          }
          datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
          await datacoinsusr2st.save()
          datacoinsusr1st.status_playing = "no"
          await datacoinsusr1st.save()
          datacoinsusr2st.status_playing = "no"
          await datacoinsusr2st.save()
          await takribi.findOneAndDelete({
            msgID: gdata.msgID,
            idstusr: d.id
          })
          await tkusr.findOneAndDelete({
            id: st1usrrr.id,
            msgID: d.msgID
          })
          await tkusr.findOneAndDelete({
            id: st2usrrr.id,
            msgID: d.msgID
          })
          await game.findOneAndDelete({
            id: d.id,
            with: d.with,
            msgID: d.msgID
          })
        }
        if (!ndata && !tkdata) {
          let stusrgame = client.users.cache.get(d.id)
          if (!stusrgame) stusrgame = "unknown";
          let wthusrgame = client.users.cache.get(d.with)
          if (!wthusrgame) wthusrgame = "unknown";
          let gdata = await game.findOne({
            id: d.id,
            with: d.with,
            msgID: d.msgID
          })
          client.channels.cache.get(gdata.channelID).messages.fetch(d.msgID).then(msg1 => msg1.edit({
            embeds: [], content: `>  تم إلغاء التحدي بنجاح لعدم التفاعل ! 
> || ${stusrgame} | ${wthusrgame} || `, components: []
          })).catch(err => console.error(err))
          let datacoinsusr1st = await db.findOne({
            id: d.id
          })
          if (!datacoinsusr1st) {
            datacoinsusr1st = await db.create({
              id: d.id,
              coins: 0,
              status_playing: "no"
            })
          }
          let datacoinsusr2st = await db.findOne({
            id: d.with
          })
          if (!datacoinsusr2st) {
            datacoinsusr2st = await db.create({
              id: d.with,
              coins: 0,
              status_playing: "no"
            })
          }
          datacoinsusr1st.status_playing = "no"
          await datacoinsusr1st.save()
          datacoinsusr2st.status_playing = "no"
          await datacoinsusr2st.save()
          if (gdata) {
            await game.findOneAndDelete({
              id: d.id,
              with: d.with,
              msgID: d.msgID
            })
          }
        }
      }
    })
  }, 8000)
})



client.probot.on("transfered", async (guild, data, err) => {
  //
  if (err) return console.log(err);
  //
  var { member, price, receiver, isOwner, fullPrice, channel } = data;
  if (isOwner == false) return;
  let datausr = await db.findOne({
    id: member.id
  })
  if (!datausr) {
    datausr = await db.create({
      id: member.id,
      coins: 0,
      status_playing: "no"
    })
  }
  let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setThumbnail(client.user.avatarURL({ dynamic: true }))
    .setDescription("تم الشحن بنجاح")
    .addFields({ name: 'المبلغ', value: `> ${price}` }, { name: `المستلم`, value: `> ${member}` }, { name: `الرصيد الحالي`, value: `> ${parseInt(datausr.coins) + parseInt(price)}` })
    .setFooter(channel.guild.name)
    .setTimestamp()
  channel.send({ embeds: [embed], content: `${member}` })
  datausr.coins = parseInt(datausr.coins) + parseInt(price)
  await datausr.save()
})

// client.on("messageCreate", async message => {
// if(message.content.startsWith("#credit") || message.content.startsWith("#credits") || message.content.startsWith("/credits") || message.content.startsWith("c") || message.content.startsWith("C")) {
// if(!message.content.includes(ownertr)) return;
//   let credits = message.content.split(" ")[2]
//   if(!credits) return;
//   let coins = tax(credits)
//   let coinss = credits - (coins.protax)
//   let collect1 = await message.channel.awaitMessages({ filter: m => m.author.id == probotId, max: 1 }).catch(() => 0);
//   if(!collect1.first().content.includes(`** ${message.author.username}, Transfer Fees: \`${coins.protax}\`, Amount :\`$${coinss}\``)) return;
//   const filter = ({ content, author: { id } }) => {
//   return content.startsWith(`**:moneybag: | ${message.author.username}, has transferred `) && content.includes(`${ownertr}`) && id === probotId && content.includes(`${coinss}`)
//   }
// let data = await db.findOne({
//   id: message.author.id
// })
// if(!data) {
//   data = await db.create({
//     id: message.author.id,
//     coins: 0,
//     status_playing: "no"
//   })
// }
// message.channel.awaitMessages({
//   filter,
//   max: 1,
//   time: 13000,
//   errors: ['time']
//   }).then(async msg => {
// if(!message.channel) return;
// let embed = new Discord.MessageEmbed()
// .setColor("GREEN")
// .setThumbnail(message.guild.iconURL({ dynamic: true}))
// .setDescription("تم الشحن بنجاح")
// .addFields({ name: 'المبلغ', value: `> ${coinss}`}, { name: `المستلم`, value: `> ${message.author}`}, { name: `الرصيد الحالي`, value: `> ${parseInt(data.coins) + parseInt(coinss)}`})
// .setFooter(message.guild.name)
// .setTimestamp()
// message.channel.send({embeds: [embed], content: `${message.author}`})
// data.coins = parseInt(data.coins) + parseInt(coinss)
// await data.save()
// })
// }
// })

//فلوس 
client.on("messageCreate", async message => {
  if (message.content.split(" ")[0] == "فلوس" || message.content.split(" ")[0] == "Money" || message.content.split(" ")[0] == "money") {
    let user = message.mentions.users.first() || message.author;
    let data = await db.findOne({
      id: user.id
    })
    if (!data) {
      data = await db.create({
        id: user.id,
        coins: 0,
        status_playing: "no"
      })
    }
    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setThumbnail(client.user.avatarURL({ dynamic: true }))
      .setTitle(`الرصيد الحالي لـ ${user.tag}`)
      .setDescription(`> $${parseInt(data.coins).toLocaleString()}`)
      .setFooter(message.guild.name)
      .setTimestamp()
    message.reply({ embeds: [embed], content: `> ${message.author}` })
  }
})



client.on("messageCreate", async message => {
  if (message.content.split(" ")[0] == "تحويل" || message.content.split(" ")[0] == "Transfer" || message.content.split(" ")[0] == "transfer") {
    let data = await db.findOne({
      id: message.author.id
    })
    if (!data) {
      data = await db.create({
        id: message.author.id,
        coins: 0,
        status_playing: "no"
      })
    }
    if (data.status_playing == "yes") return message.reply({ content: `> لا يمكنك التحويل ل عضو اثناء تحدي !` })
    let args = message.content.split(" ")
    if (!args[1]) return message.reply({ content: `> لم تقم بتحديد العضو !` })
    let user = message.mentions.users.first() || message.guild.members.cache.find(s => s.id == args[1])
    if (!user) return message.reply({ content: `\`❎\` **لم استطيع العثور على هذا الشخص**` })
    let data2 = await db.findOne({
      id: user.id
    })
    if (!data2) {
      data2 = await db.create({
        id: user.id,
        coins: 0,
        status_playing: "no"
      })
    }
    if (data2.status_playing == "yes") return message.reply({ content: `> لا يمكنك التحويل ل عضو اثناء تحدي !` })
    if (!args[2]) return message.reply({ content: `> لم تقم بتحديد المبلغ !` })
    if (args[2].endsWith("k") || args[2].endsWith("K") || args[2].endsWith("m") || args[2].endsWith("M")) {
      if (args[2].includes(".") || args[2].includes(",")) return message.reply({ content: `\`❎\` **لا يمكن اضافة ارقام عشرية**` })
      let coin = args[2].replace("k", `000`).replace("m", `000000`).replace("K", `000`).replace("M", `000000`)
      if (parseInt(data.coins) == 0) return message.reply({ content: `\`❎\` **لا يمكنك التحويل ، ليس لديك اي فلوس**` })
      if (parseInt(data.coins) < parseInt(coin)) return message.reply({ content: `\`❎\` **ليس لديك فلوس كافية لتحويل هذا المبلغ**` })
      let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setDescription("تم التحويل بنجاح")
        .addFields({ name: 'المبلغ', value: `> ${parseInt(coin)}` }, { name: `المستلم`, value: `> ${user}` }, { name: `بواسطة`, value: `> ${message.author}` }, { name: `الرصيد الحالي`, value: `> ${parseInt(data.coins) - parseInt(coin)}` })
        .setFooter(message.guild.name)
        .setTimestamp()
      message.channel.send({ embeds: [embed], content: `${message.author}` })
      data.coins = parseInt(data.coins) - parseInt(coin)
      await data.save()
      data2.coins = parseInt(data2.coins) + parseInt(coin)
      await data2.save()
      return;
    }
    if (isNaN(args[2])) return message.reply({ content: `\`❎\` **برجاء وضع ارقام صحيحة**` })
    if (args[2].includes(".") || args[2].includes(",")) return message.reply({ content: `\`❎\` **لا يمكن تحويل ارقام عشرية**` })
    if (parseInt(data.coins) == 0) return message.reply({ content: `\`❎\` **لا يمكنك التحويل ، ليس لديك اي فلوس**` })
    if (parseInt(data.coins) < parseInt(args[2])) return message.reply({ content: `\`❎\` **ليس لديك فلوس كافية لتحويل هذا المبلغ**` })
    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .setDescription("تم التحويل بنجاح")
      .addFields({ name: 'المبلغ', value: `> ${parseInt(args[2])}` }, { name: `المستلم`, value: `> ${user}` }, { name: `بواسطة`, value: `> ${message.author}` }, { name: `الرصيد الحالي`, value: `> ${parseInt(data.coins) - parseInt(args[2])}` })
      .setFooter(message.guild.name)
      .setTimestamp()
    message.channel.send({ embeds: [embed], content: `${message.author}` })
    data.coins = parseInt(data.coins) - parseInt(args[2])
    await data.save()
    data2.coins = parseInt(data2.coins) + parseInt(args[2])
    await data2.save()
  }
})





//add 
client.on("messageCreate", async message => {
  if (message.content.split(" ")[0] == "add" || message.content.split(" ")[0] == "Add") {
    if (!owners.find(s => s == message.author.id)) return;
    let args = message.content.split(" ")
    if (!args[1]) return message.reply({ content: `> لم تقم بتحديد العضو !` })
    let user = message.mentions.users.first() || message.guild.members.cache.find(s => s.id == args[1])
    if (!user) return message.reply({ content: `\`❎\` **لم استطيع العثور على هذا الشخص**` })
    if (!args[2]) return message.reply({ content: `> لم تقم بتحديد المبلغ !` })
    if (args[2].endsWith("k") || args[2].endsWith("K") || args[2].endsWith("m") || args[2].endsWith("M")) {
      if (args[2].includes(".") || args[2].includes(",")) return message.reply({ content: `\`❎\` **لا يمكن اضافة ارقام عشرية**` })
      let coin = args[2].replace("k", `000`).replace("m", `000000`).replace("K", `000`).replace("M", `000000`)
      let data = await db.findOne({
        id: user.id
      })
      if (!data) {
        data = await db.create({
          id: user.id,
          coins: 0,
          status_playing: "no"
        })
      }
      let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setThumbnail(user.avatarURL({ dynamic: true }))
        .setDescription(`تم الإضافة بنجاح`)
        .addFields({ name: "بواسطة", value: `${message.author}` }, { name: `اضاف`, value: `$${coin}` }, { name: `المستلم`, value: `${user}` }, { name: `الرصيد الحالي للمستلم`, value: `${parseInt(data.coins) + parseInt(coin)}` })
      message.reply({ embeds: [embed] })
      data.coins = parseInt(data.coins) + parseInt(coin)
      await data.save()
      return;
    }
    if (isNaN(args[2])) return message.reply({ content: `\`❎\` **برجاء وضع ارقام صحيحة**` })
    if (args[2].includes(".") || args[2].includes(",")) return message.reply({ content: `\`❎\` **لا يمكن اضافة ارقام عشرية**` })
    let data = await db.findOne({
      id: user.id
    })
    if (!data) {
      data = await db.create({
        id: user.id,
        coins: 0,
        status_playing: "no"
      })
    }
    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setThumbnail(user.avatarURL({ dynamic: true }))
      .setDescription(`تم الإضافة بنجاح`)
      .addFields({ name: "بواسطة", value: `${message.author}` }, { name: `اضاف`, value: `$${args[2]}` }, { name: `المستلم`, value: `${user}` }, { name: `الرصيد الحالي للمستلم`, value: `${parseInt(data.coins) + parseInt(args[2])}` })
    message.reply({ embeds: [embed] })
    data.coins = parseInt(data.coins) + parseInt(args[2])
    await data.save()
  }
})



//remove
client.on("messageCreate", async message => {
  if (message.content.split(" ")[0] == "rmv" || message.content.split(" ")[0] == "remove" || message.content.split(" ")[0] == "Remove" || message.content.split(" ")[0] == "Rmv") {
    if (!owners.find(s => s == message.author.id)) return;
    let args = message.content.split(" ")
    if (!args[1]) return message.reply({ content: `> لم تقم بتحديد العضو !` })
    let user = message.mentions.users.first() || message.guild.members.cache.find(s => s.id == args[1])
    if (!user) return message.reply({ content: `\`❎\` **لم استطيع العثور على هذا الشخص**` })
    if (!args[2]) return message.reply({ content: `> لم تقم بتحديد المبلغ !` })
    if (args[2].endsWith("k") || args[2].endsWith("K") || args[2].endsWith("m") || args[2].endsWith("M")) {
      if (args[2].includes(".") || args[2].includes(",")) return message.reply({ content: `\`❎\` **لا يمكن حذف ارقام عشرية**` })
      let coin = args[2].replace("k", `000`).replace("m", `000000`).replace("K", `000`).replace("M", `000000`)
      let data = await db.findOne({
        id: user.id
      })
      if (!data) {
        data = await db.create({
          id: user.id,
          coins: 0,
          status_playing: "no"
        })
      }
      if (data.coins == 0) return message.reply({ content: `\`❎\` **هذا الشخص ليس لديه اي رصيد للحذف**` })
      if (parseInt(data.coins) < parseInt(coin)) return message.reply({ content: `\`❎\` **هذا الشخص ليس معه هذا المبلغ لحذفه**` })
      let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setThumbnail(user.avatarURL({ dynamic: true }))
        .setDescription(`تم حذف بنجاح`)
        .addFields({ name: "بواسطة", value: `${message.author}` }, { name: `حذف`, value: `$${coin}` }, { name: `من`, value: `${user}` }, { name: `الرصيد الحالي للمستلم`, value: `${parseInt(data.coins) - parseInt(coin)}` })
      message.reply({ embeds: [embed] })
      data.coins = parseInt(data.coins) - parseInt(coin)
      await data.save()
      return;
    }
    if (isNaN(args[2])) return message.reply({ content: `\`❎\` **برجاء وضع ارقام صحيحة**` })
    if (args[2].includes(".") || args[2].includes(",")) return message.reply({ content: `\`❎\` **لا يمكن حذف ارقام عشرية**` })
    let data = await db.findOne({
      id: user.id
    })
    if (!data) {
      data = await db.create({
        id: user.id,
        coins: 0,
        status_playing: "no"
      })
    }
    if (data.coins == 0) return message.reply({ content: `\`❎\` **هذا الشخص ليس لديه اي رصيد للحذف**` })
    if (parseInt(data.coins) < parseInt(args[2])) return message.reply({ content: `\`❎\` **هذا الشخص ليس معه هذا المبلغ لحذفه**` })
    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setThumbnail(user.avatarURL({ dynamic: true }))
      .setDescription(`تم حذف بنجاح`)
      .addFields({ name: "بواسطة", value: `${message.author}` }, { name: `حذف`, value: `$${args[2]}` }, { name: `من`, value: `${user}` }, { name: `الرصيد الحالي للمستلم`, value: `${parseInt(data.coins) - parseInt(args[2])}` })
    message.reply({ embeds: [embed] })
    data.coins = parseInt(data.coins) - parseInt(args[2])
    await data.save()
  }
})



//top
client.on("messageCreate", async message => {
  if (message.content.split(" ")[0] == "توب" || message.content.split(" ")[0] == "top" || message.content.split(" ")[0] == "Top") {
    let money = (await db.find()).sort((a, b) => b.coins - a.coins)
    var finalLb = "";
    let num = 0;
    for (var i in money) {
      if (message.guild.members.cache.get(money[i].id)) {
        num += 1;
        finalLb += `**#${num}. ${client.users.cache.get(money[i].id)}** - \`${money[i].coins}\`\n`;
      }
      if (num == 10) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(`توب رصيد`)
          .setThumbnail(client.user.avatarURL({ dynamic: true }))
          .setColor("BLUE")
          .setDescription(finalLb)
          .setFooter(message.guild.name)
          .setTimestamp()
        message.reply({ embeds: [embed] })
        return;
      }
    }
    const embed = new Discord.MessageEmbed()
      .setAuthor(`توب رصيد`)
      .setThumbnail(client.user.avatarURL({ dynamic: true }))
      .setColor("BLUE")
      .setDescription(finalLb)
      .setFooter(message.guild.name)
      .setTimestamp()
    message.reply({ embeds: [embed] })
  }
})





//تحدي 
client.on("messageCreate", async (message) => {
  const prefixes = ["تحدي", "Challenge", "challenge"];
  const parentId = "1275302153166000281";

  const args = message.content.split(" ");
  const command = args[0].split("!")[0];

  if (!prefixes.includes(command)) return;
  if (message.channel.parentId !== parentId || message.channel.id === parentId) return;

  try {
    let data = await db.findOne({ id: message.author.id });
    if (!data) {
      data = await db.create({
        id: message.author.id,
        coins: 99,
        status_playing: "no",
      });
    }

    if (data.status_playing === "yes") {
      return message.reply({
        content: `\`❎\` **لا يمكنك اللعب ، لأنك تمتلك تحدي جاري**`,
      });
    }

    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[1]);
    const amount = parseInt(args[2]);

    if (!user) {
      return message.reply({
        content: `\`❎\` **لم استطيع العثور على هذا الشخص**`,
      });
    }

    if (!args[2] || isNaN(amount)) {
      return message.reply({
        content: `\`❎\` **برجاء وضع ارقام صحيحة**`,
      });
    }

    let data2 = await db.findOne({ id: user.id });
    if (!data2) {
      data2 = await db.create({
        id: user.id,
        coins: 0,
        status_playing: "no",
      });
    }

    if (data2.status_playing === "yes") {
      return message.reply({
        content: `> العضو يمتلك تحدي جاري حاليا !`,
      });
    }

    if (data.coins < amount || data2.coins < amount) {
      return message.reply({
        content: `\`❎\` **ليس لديك ما يكفي انت وصديقك للتحدي على ${amount}**`,
      });
    }

    const embed = new Discord.MessageEmbed()
      .setColor("GREY")
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.avatarURL({ dynamic: true }),
      })
      .setTitle("اختار نوع اللعبة")
      .setDescription(`> العضو: ${user}\nالمبلغ: \`${amount}\``)
      .addFields(
        {
          name: `لعبة النرد 🎲`,
          value: `> يفوز الذي يحصل على أعلى مجموع من ثلاث مرات, التعادل ليس فوزا!`,
        },
        {
          name: `الرقم التقريبي 📊`,
          value: `> في كل جولة سوف تحصل على رقم عشوائي, و انت عليك ان تحصل على نفس الرقم او اقل منه, الذي يحصل عليه يفوز, في حال الحصول على اعلى تعتبر خاسر, جولة واحدة لكل تحدي! انهاء الجولة يعني انهاء التحدي, التعادل ليس فوزا!`,
        }
      )
      .setFooter({ text: "مثال على نص الفوتر", iconURL: "https://example.com/icon.png" });

    const button_nrd = new MessageButton()
      .setCustomId(`nrd_${message.author.id}`)
      .setLabel("النرد")
      .setEmoji("🎲")
      .setStyle("PRIMARY");

    const button_rkmtakribi = new MessageButton()
      .setCustomId(`takribi_${message.author.id}`)
      .setLabel("الرقم التقريبي")
      .setEmoji("📊")
      .setStyle("PRIMARY");

    const button_cancel = new MessageButton()
      .setCustomId(`cancel_${message.author.id}`)
      .setLabel("إلغاء")
      .setStyle("DANGER");

    const row = new MessageActionRow().setComponents(
      button_nrd,
      button_rkmtakribi,
      button_cancel
    );

    const msg = await message.reply({
      embeds: [embed],
      components: [row],
      allowedMentions: { repliedUser: false },
    });

    const gameData = {
      id: message.author.id,
      msgID: msg.id,
      coins: amount,
      with: user.id,
      game: null,
      channelID: message.channel.id,
      time: timestamp(moment(ms("40s")) + Date.now()),
    };

    let gdata = await game.findOne({ id: message.author.id });
    if (!gdata) {
      await game.create(gameData);
    } else {
      await game.findOneAndUpdate({ id: message.author.id }, gameData);
    }

    data2.status_playing = "yes";
    await data2.save();
    data.status_playing = "yes";
    await data.save();
  } catch (error) {
    console.error("Error during message handling:", error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    // تعامل مع التفاعل هنا
  }
});


//nrd game

client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {
    if (interaction.customId == `nrd_${interaction.user.id}`) {
      let gdata = await game.findOne({
        id: interaction.user.id
      });

      // بقية الكود هنا...

      if (!gdata) return;
      if (!gdata.coins || gdata.coins == null) return;
      if (!gdata.with || gdata.with == null) return;
      if (!gdata.msgID || gdata.msgID == null) return;
      gdata.game = "nrd"
      await gdata.save()
      await interaction.deferReply({ ephemeral: true })
      let usraccano = interaction.guild.members.cache.find(s => s.id == gdata.with)
      if (!usraccano) return interaction.reply({ content: `\`❎\` **لم استطيع إجاد صديقك في الخادم**`, ephemeral: true })
      gdata.time = timestamp(moment(ms("40s")) + Date.now())
      await gdata.save()
      let embed_edit = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`> تنبيه: في حال عدم استجابة الطرفين و عدم اكمال التحدي يؤدي الى خصم نصف المبلغ من الطرفين.
> عند التعادل لا يتم سحب اي مبلغ من الطرفين.`)
        .addFields({ name: `🎲 لعبة النرد:`, value: `> يفوز الذي يحصل على أعلى مجموع من ثلاث مرات, التعادل ليس فوزا !` }, { name: `المبلغ:`, value: `${parseInt(gdata.coins)}` })


      let button_yes = new MessageButton()
        .setCustomId(`yesg_${gdata.msgID}`)
        .setLabel("قبول")
        .setStyle("SUCCESS")

      let button_no = new MessageButton()
        .setCustomId(`nog_${gdata.msgID}`)
        .setLabel("رفض")
        .setStyle("DANGER")

      let row = new MessageActionRow()
        .setComponents(button_yes, button_no)

      interaction.editReply({ content: `> لقد تم اختيار العبة هي : \`نرد\` !!`, ephemeral: true })
      client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit], content: `> بانتظار رد من ${usraccano} ...`, components: [row] })).catch(err => console.error(err))
    }

    if (interaction.customId == `yesg_${interaction.message.id}`) {
      let gdatawith = await game.findOne({
        with: interaction.user.id
      })
      if (!gdatawith) return;
      if (interaction.message.id !== gdatawith.msgID) return;
      await interaction.deferReply({ ephemeral: true })
      let stusrgame = client.users.cache.get(gdatawith.id)
      let wthusrgame = client.users.cache.get(gdatawith.with)
      let nums = ["1", "2"]
      let numr = nums[Math.floor(Math.random() * nums.length)]
      let usrchoose = "";
      let notrole = "";
      if (numr == "1") {
        usrchoose = gdatawith.id;
        notrole = gdatawith.with;
      }
      if (numr == "2") {
        usrchoose = gdatawith.with;
        notrole = gdatawith.id;
      }
      gdatawith.time = timestamp(moment(ms("90s")) + Date.now())
      await gdatawith.save()
      interaction.editReply({ content: `> لقد تم القبول اللعبة هي : \`نرد\` ، اللعب مع : ${stusrgame} !!`, ephemeral: true })
      setTimeout(async () => {
        let embed_edit_nrd_game = new Discord.MessageEmbed()
          .setTitle("بيانات التحدي")
          .addFields({ name: `${stusrgame.tag}`, value: `0` }, { name: `${wthusrgame.tag}`, value: `0` })
        let button_nrdk = new MessageButton()
          .setCustomId(`nrdk_${gdatawith.msgID}`)
          .setLabel("العب نردك")
          .setStyle("PRIMARY")
        let row = new MessageActionRow()
          .setComponents(button_nrdk)
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdatawith.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], content: `<@!${usrchoose}>\n اصبح دورك`, components: [row] })).catch(err => console.error(err))
      }, 2500)



      let nrdata = await nrd.findOne({
        msgID: gdatawith.msgID
      })
      if (!nrdata) {


        nrdata = await nrd.create({
          msgID: gdatawith.msgID,
          idstusr: gdatawith.id,
          role: usrchoose,
          notrole: notrole,
          players: [stusrgame.id, wthusrgame.id]
        })


      } else {


        nrdata = await nrd.findOneAndUpdate({
          msgID: gdatawith.msgID,
          idstusr: gdatawith.id,
          role: usrchoose,
          notrole: notrole,
          players: [stusrgame.id, wthusrgame.id]
        })


      }






      let nrdusrdata = await nrdusr.findOne({
        id: gdatawith.id
      })

      if (!nrdusrdata) {

        nrdusrdata = await nrdusr.create({
          id: gdatawith.id,
          with: gdatawith.with,
          attempt: 0,
          numbers: [],
          result: 0
        })


      } else {


        nrdusrdata = await nrdusr.findOneAndUpdate({
          id: gdatawith.id,
          with: gdatawith.with,
          attempt: 0,
          numbers: [],
          result: 0
        })


      }



      let nrdusr1data = await nrdusr.findOne({
        id: gdatawith.with
      })
      if (!nrdusr1data) {
        nrdusr1data = await nrdusr.create({
          id: gdatawith.with,
          with: gdatawith.id,
          attempt: 0,
          numbers: [],
          result: 0
        })


      } else {


        nrdusr1data = await nrdusr.findOneAndUpdate({
          id: gdatawith.with,
          with: gdatawith.id,
          attempt: 0,
          numbers: [],
          result: 0
        })


      }
      return;
    }
    if (interaction.customId == `cancel_${interaction.user.id}`) {
      let gdata = await game.findOne({
        id: interaction.user.id
      })
      if (!gdata) return;
      let stusrgame = client.users.cache.get(gdata.id)
      let wthusrgame = client.users.cache.get(gdata.with)
      client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({
        embeds: [], content: `>  تم إلغاء التحدي بنجاح ${interaction.user} ! 
> || ${stusrgame} | ${wthusrgame} || `, components: []
      })).catch(err => console.error(err))
      await game.findOneAndDelete({
        id: stusrgame.id,
        with: wthusrgame.id,
        msgID: interaction.message.id
      })
      let data = await db.findOne({
        id: stusrgame.id
      })
      if (!data) {
        data = await db.create({
          id: stusrgame.id,
          coins: 0,
          status_playing: "no"
        })
      }
      let data2 = await db.findOne({
        id: wthusrgame.id
      })
      if (!data2) {
        data2 = await db.create({
          id: wthusrgame.id,
          coins: 0,
          status_playing: "no"
        })
      }
      data2.status_playing = "no";
      await data2.save()
      data.status_playing = "no";
      await data.save()
    }
    if (interaction.customId == `nog_${interaction.message.id}`) {
      let gdata = await game.findOne({
        msgID: interaction.message.id
      })
      if (!gdata) return;
      let stusrgame = client.users.cache.get(gdata.id)
      let wthusrgame = client.users.cache.get(gdata.with)
      if (stusrgame.id !== interaction.user.id && wthusrgame.id !== interaction.user.id) return;
      if (stusrgame.id == interaction.user.id) {
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({
          embeds: [], content: `>  تم إلغاء التحدي بنجاح ${interaction.user} ! 
  > || ${stusrgame} | ${wthusrgame} || `, components: []
        })).catch(err => console.error(err))
      }
      if (wthusrgame.id == interaction.user.id) {
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({
          embeds: [], content: `>  تم رفض التحدي بنجاح ${interaction.user} ! 
> || ${stusrgame} | ${wthusrgame} || `, components: []
        })).catch(err => console.error(err))
      }
      await game.findOneAndDelete({
        id: stusrgame.id,
        with: wthusrgame.id,
        msgID: interaction.message.id
      })
      let data = await db.findOne({
        id: stusrgame.id
      })
      if (!data) {
        data = await db.create({
          id: stusrgame.id,
          coins: 0,
          status_playing: "no"
        })
      }
      let data2 = await db.findOne({
        id: wthusrgame.id
      })
      if (!data2) {
        data2 = await db.create({
          id: wthusrgame.id,
          coins: 0,
          status_playing: "no"
        })
      }
      data2.status_playing = "no";
      await data2.save()
      data.status_playing = "no";
      await data.save()
    }
    if (interaction.customId == `nrdk_${interaction.message.id}`) {
      let data = await nrd.findOne({
        msgID: interaction.message.id
      })
      if (!data) return;
      let datausr = await nrdusr.findOne({
        id: interaction.user.id
      })
      if (!datausr) return;
      await interaction.deferReply({ ephemeral: true })
      if (data.role !== interaction.user.id && data.notrole == interaction.user.id) return interaction.editReply({ content: `انه ليس دورك !`, ephemeral: true })
      if (data.role !== interaction.user.id) return;
      let gdata = await game.findOne({
        id: data.idstusr
      })
      if (!gdata) return;
      let stusrgame = client.users.cache.get(data.idstusr)
      if (!stusrgame) return;
      let wthusrgame = client.users.cache.get(gdata.with)
      if (!wthusrgame) return;
      let nums = ["1", "2", "3", "4", "5", "6"]
      let num = nums[Math.floor(Math.random() * nums.length)]
      datausr.numbers.push(num)
      await datausr.save()
      datausr.result = parseInt(datausr.result) + parseInt(num)
      await datausr.save()
      datausr.attempt = parseInt(datausr.attempt) + 1;
      await datausr.save()
      gdata.time = timestamp(moment(ms("90s")) + Date.now())
      await gdata.save()
      interaction.editReply({ content: `> تم اللعب ، رقمك هو \`${num}\` !!`, ephemeral: true })
      let datausrus = await nrdusr.findOne({
        id: stusrgame.id
      })
      let datausrue = await nrdusr.findOne({
        id: wthusrgame.id
      })
      let resultnum1;
      if (datausrus.numbers.length == 2) resultnum1 = `${datausrus.numbers[0]} + ${datausrus.numbers[1]} = **${datausrus.result}**`;
      if (datausrus.numbers.length == 3) resultnum1 = `${datausrus.numbers[0]} + ${datausrus.numbers[1]} + ${datausrus.numbers[2]} = **${datausrus.result}**`;

      let resultnum2;
      if (datausrue.numbers.length == 2) resultnum2 = `${datausrue.numbers[0]} + ${datausrue.numbers[1]} = **${datausrue.result}**`;
      if (datausrue.numbers.length == 3) resultnum2 = `${datausrue.numbers[0]} + ${datausrue.numbers[1]} + ${datausrue.numbers[2]} = **${datausrue.result}**`;
      if (parseInt(datausr.attempt) == 1) {
        if (gdata.with == interaction.user.id) {
          let embed_edit_nrd_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrus.numbers[0] || 0}` }, { name: `${wthusrgame.tag}`, value: `> ${num}` })
          let button_nrdk = new MessageButton()
            .setCustomId(`nrdk_${gdata.msgID}`)
            .setLabel("العب نردك")
            .setStyle("DANGER")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_nrdk)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let button_nrdk1 = new MessageButton()
              .setCustomId(`nrdk_${gdata.msgID}`)
              .setLabel("العب نردك")
              .setStyle("PRIMARY")
            let row1 = new MessageActionRow()
              .setComponents(button_nrdk1)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], content: `${stusrgame}\n اصبح دورك`, components: [row1] })).catch(err => console.error(err))
          }, 2500)
        }
        if (data.idstusr == interaction.user.id) {
          let embed_edit_nrd_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .addFields({ name: `${stusrgame.tag}`, value: `> ${num}` }, { name: `${wthusrgame.tag}`, value: `> ${datausrue.numbers[0] || 0}` })
          let button_nrdk = new MessageButton()
            .setCustomId(`nrdk_${gdata.msgID}`)
            .setLabel("العب نردك")
            .setStyle("DANGER")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_nrdk)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let button_nrdk1 = new MessageButton()
              .setCustomId(`nrdk_${gdata.msgID}`)
              .setLabel("العب نردك")
              .setStyle("PRIMARY")
            let row1 = new MessageActionRow()
              .setComponents(button_nrdk1)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], content: `${wthusrgame}\n اصبح دورك`, components: [row1] })).catch(err => console.error(err))
          }, 2500)
        }
        return;
      }
      if (parseInt(datausr.attempt) == 2) {
        if (datausrus.numbers.length == 1) resultnum1 = `${datausrus.numbers[0]}`
        if (datausrue.numbers.length == 1) resultnum2 = `${datausrue.numbers[0]}`
        if (wthusrgame.id == interaction.user.id) {
          var datausrup = await nrdusr.findOne({
            id: interaction.user.id
          })
          let embed_edit_nrd_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .addFields({ name: `${stusrgame.tag}`, value: `> ${resultnum1}` }, { name: `${wthusrgame.tag}`, value: `> ${datausrue.numbers[0]} + ${datausrue.numbers[1]} = **${datausrue.result}**` })
          let button_nrdk = new MessageButton()
            .setCustomId(`nrdk_${gdata.msgID}`)
            .setLabel("العب نردك")
            .setStyle("DANGER")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_nrdk)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let button_nrdk1 = new MessageButton()
              .setCustomId(`nrdk_${gdata.msgID}`)
              .setLabel("العب نردك")
              .setStyle("PRIMARY")
            let row1 = new MessageActionRow()
              .setComponents(button_nrdk1)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], content: `${stusrgame}\n اصبح دورك`, components: [row1] })).catch(err => console.error(err))
          }, 2500)
        }
        if (stusrgame.id == interaction.user.id) {
          var datausrup = await nrdusr.findOne({
            id: interaction.user.id
          })
          let embed_edit_nrd_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .addFields({ name: `${stusrgame.tag}`, value: `> ${resultnum1}` }, { name: `${wthusrgame.tag}`, value: `> ${resultnum2}` })
          let button_nrdk = new MessageButton()
            .setCustomId(`nrdk_${gdata.msgID}`)
            .setLabel("العب نردك")
            .setStyle("DANGER")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_nrdk)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let button_nrdk1 = new MessageButton()
              .setCustomId(`nrdk_${gdata.msgID}`)
              .setLabel("العب نردك")
              .setStyle("PRIMARY")
            let row1 = new MessageActionRow()
              .setComponents(button_nrdk1)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], content: `${wthusrgame}\n اصبح دورك`, components: [row1] })).catch(err => console.error(err))
          }, 2500)
        }
        return;
      }
      if (parseInt(datausr.attempt) == 3) {
        if (wthusrgame.id == interaction.user.id) {
          var datausrup = await nrdusr.findOne({
            id: interaction.user.id
          })
          let embed_edit_nrd_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .addFields({ name: `${stusrgame.tag}`, value: `> ${resultnum1}` }, { name: `${wthusrgame.tag}`, value: `> ${resultnum2}` })
          let button_nrdk = new MessageButton()
            .setCustomId(`nrdk_${gdata.msgID}`)
            .setLabel("العب نردك")
            .setStyle("DANGER")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_nrdk)
          let datausrupst = await nrdusr.findOne({
            id: stusrgame.id
          })
          let datausrupwh = await nrdusr.findOne({
            id: wthusrgame.id
          })
          let embed_end_nrd_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .addFields({ name: `${stusrgame.tag}`, value: `> ${resultnum1}` }, { name: `${wthusrgame.tag}`, value: `> ${resultnum2}` })
          if ((parseInt(datausrupst.attempt) == 3 && datausrupst.numbers.length == 3) && (parseInt(datausrupwh.attempt) == 3 && datausrupwh.numbers.length == 3)) {
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_end_nrd_game], content: `> انتهى التحدي...`, components: [] })).catch(err => console.error(err))
          } else {
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], components: [row] })).catch(err => console.error(err))
          }
          setTimeout(async () => {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            if ((parseInt(datausrupst.attempt) == 3 && datausrupst.numbers.length == 3) && (parseInt(datausrupwh.attempt) == 3 && datausrupwh.numbers.length == 3)) {
              let userr1r = await nrdusr.findOne({
                id: stusrgame.id
              })
              let userr2r = await nrdusr.findOne({
                id: wthusrgame.id
              })
              if (parseInt(userr1r.result) == parseInt(userr2r.result)) {
                let embed_end = new Discord.MessageEmbed()
                  .setTitle("بيانات التحدي")
                  .addFields({ name: `${stusrgame.tag}`, value: `> ${resultnum1}` }, { name: `${wthusrgame.tag}`, value: `> ${resultnum2}` })
                client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_end], content: `${stusrgame} / ${wthusrgame} تعادل !\n اللعبة: النرد, المبلغ: **${gdata.coins}**` })).catch(err => console.error(err))
                let datacoinsusr1st = await db.findOne({
                  id: stusrgame.id
                })
                if (!datacoinsusr1st) {
                  datacoinsusr1st = await db.create({
                    id: stusrgame.id,
                    coins: 0,
                    status_playing: "no"
                  })
                }
                let datacoinsusr2st = await db.findOne({
                  id: wthusrgame.id
                })
                if (!datacoinsusr2st) {
                  datacoinsusr = await db.create({
                    id: wthusrgame.id,
                    coins: 0,
                    status_playing: "no"
                  })
                }
                datacoinsusr1st.status_playing = "no"
                await datacoinsusr1st.save()
                datacoinsusr2st.status_playing = "no"
                await datacoinsusr2st.save()
                await nrd.findOneAndDelete({
                  msgID: gdata.msgID,
                  idstusr: stusrgame.id
                })
                await nrdusr.findOneAndDelete({
                  id: stusrgame.id
                })
                await nrdusr.findOneAndDelete({
                  id: wthusrgame.id
                })
                await game.findOneAndDelete({
                  id: stusrgame.id,
                  with: wthusrgame.id
                })
              }
              if (parseInt(userr1r.result) > parseInt(userr2r.result)) {
                let embed_end = new Discord.MessageEmbed()
                  .setTitle("بيانات التحدي")
                  .addFields({ name: `${stusrgame.tag}`, value: `> ${resultnum1}` }, { name: `${wthusrgame.tag}`, value: `> ${resultnum2}` })
                client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({
                  embeds: [embed_end], content: `**${stusrgame}** فائززززز !!! ب مجموع **${parseInt(userr1r.result)}** الي يفوز فيه نقطة!\n\n**${wthusrgame}** خاسر ب مجموع **${parseInt(userr2r.result)}** نقطة!
> اللعبة: **النرد**, المبلغ: **${gdata.coins}**`
                })).catch(err => console.error(err))
                let datacoinsusr1st = await db.findOne({
                  id: stusrgame.id
                })
                if (!datacoinsusr1st) {
                  datacoinsusr1st = await db.create({
                    id: stusrgame.id,
                    coins: 0,
                    status_playing: "no"
                  })
                }
                let tax = parseInt(gdata.coins) * 0.04;
                let total = parseInt(gdata.coins) - parseInt(tax);
                datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
                await datacoinsusr1st.save()
                let datacoinsusr2st = await db.findOne({
                  id: wthusrgame.id
                })
                if (!datacoinsusr2st) {
                  datacoinsusr = await db.create({
                    id: wthusrgame.id,
                    coins: 0,
                    status_playing: "no"
                  })
                }
                datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
                await datacoinsusr2st.save()
                datacoinsusr1st.status_playing = "no"
                await datacoinsusr1st.save()
                datacoinsusr2st.status_playing = "no"
                await datacoinsusr2st.save()
                await nrd.findOneAndDelete({
                  msgID: gdata.msgID,
                  idstusr: stusrgame.id
                })
                await nrdusr.findOneAndDelete({
                  id: stusrgame.id
                })
                await nrdusr.findOneAndDelete({
                  id: wthusrgame.id
                })
                await game.findOneAndDelete({
                  id: stusrgame.id,
                  with: wthusrgame.id
                })
              }

              if (parseInt(userr2r.result) > parseInt(userr1r.result)) {
                let embed_end = new Discord.MessageEmbed()
                  .setTitle("بيانات التحدي")
                  .addFields({ name: `${stusrgame.tag}`, value: `> ${resultnum1}` }, { name: `${wthusrgame.tag}`, value: `> ${resultnum2}` })
                client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({
                  embeds: [embed_end], content: `**${wthusrgame}** فائززززز !!! ب مجموع **${parseInt(userr2r.result)}** الي يفوز فيه نقطة!\n\n**${stusrgame}** خاسر ب مجموع **${parseInt(userr1r.result)}** نقطة!
> اللعبة: **النرد**, المبلغ: **${gdata.coins}**`
                })).catch(err => console.error(err))
                let datacoinsusr1st = await db.findOne({
                  id: wthusrgame.id
                })
                if (!datacoinsusr1st) {
                  datacoinsusr1st = await db.create({
                    id: wthusrgame.id,
                    coins: 0,
                    status_playing: "no"
                  })
                }
                let tax = parseInt(gdata.coins) * 0.04;
                let total = parseInt(gdata.coins) - parseInt(tax);
                datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
                await datacoinsusr1st.save()
                let datacoinsusr2st = await db.findOne({
                  id: stusrgame.id
                })
                if (!datacoinsusr2st) {
                  datacoinsusr2st = await db.create({
                    id: stusrgame.id,
                    coins: 0,
                    status_playing: "no"
                  })
                }
                datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
                await datacoinsusr2st.save()
                datacoinsusr1st.status_playing = "no"
                await datacoinsusr1st.save()
                datacoinsusr2st.status_playing = "no"
                await datacoinsusr2st.save()
                await nrd.findOneAndDelete({
                  msgID: gdata.msgID,
                  idstusr: stusrgame.id
                })
                await nrdusr.findOneAndDelete({
                  id: stusrgame.id
                })
                await nrdusr.findOneAndDelete({
                  id: wthusrgame.id
                })
                await game.findOneAndDelete({
                  id: stusrgame.id,
                  with: wthusrgame.id
                })
              }
              return;
            } else {
              let button_nrdk1 = new MessageButton()
                .setCustomId(`nrdk_${gdata.msgID}`)
                .setLabel("العب نردك")
                .setStyle("PRIMARY")
              let row1 = new MessageActionRow()
                .setComponents(button_nrdk1)
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], content: `${stusrgame}\n اصبح دورك`, components: [row1] })).catch(err => console.error(err))
            }
          }, 2500)
        }
        if (stusrgame.id == interaction.user.id) {
          var datausrupst = await nrdusr.findOne({
            id: interaction.user.id
          })
          let datausrupwh = await nrdusr.findOne({
            id: wthusrgame.id
          })
          let embed_edit_nrd_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .addFields({ name: `${stusrgame.tag}`, value: `> ${resultnum1}` }, { name: `${wthusrgame.tag}`, value: `> ${resultnum2}` })
          let button_nrdk = new MessageButton()
            .setCustomId(`nrdk_${gdata.msgID}`)
            .setLabel("العب نردك")
            .setStyle("DANGER")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_nrdk)
          let embed_end_nrd_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .addFields({ name: `${stusrgame.tag}`, value: `> ${resultnum1}` }, { name: `${wthusrgame.tag}`, value: `> ${resultnum2}` })
          if ((parseInt(datausrupst.attempt) == 3 && datausrupst.numbers.length == 3) && (parseInt(datausrupwh.attempt) == 3 && datausrupwh.numbers.length == 3)) {
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_end_nrd_game], content: `> انتهى التحدي...`, components: [] })).catch(err => console.error(err))
          } else {
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], components: [row] })).catch(err => console.error(err))
          }
          setTimeout(async () => {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            if ((parseInt(datausrupst.attempt) == 3 && datausrupst.numbers.length == 3) && (parseInt(datausrupwh.attempt) == 3 && datausrupwh.numbers.length == 3)) {
              let userr1r = await nrdusr.findOne({
                id: stusrgame.id
              })
              let userr2r = await nrdusr.findOne({
                id: wthusrgame.id
              })
              if (parseInt(userr1r.result) == parseInt(userr2r.result)) {
                let embed_end = new Discord.MessageEmbed()
                  .setTitle("بيانات التحدي")
                  .addFields({ name: `${stusrgame.tag}`, value: `> ${resultnum1}` }, { name: `${wthusrgame.tag}`, value: `> ${resultnum2}` })
                client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_end], content: `${stusrgame} / ${wthusrgame} تعادل !\n اللعبة: النرد, المبلغ: **${gdata.coins}**` })).catch(err => console.error(err))
                let datacoinsusr1st = await db.findOne({
                  id: stusrgame.id
                })
                if (!datacoinsusr1st) {
                  datacoinsusr1st = await db.create({
                    id: stusrgame.id,
                    coins: 0,
                    status_playing: "no"
                  })
                }
                let datacoinsusr2st = await db.findOne({
                  id: wthusrgame.id
                })
                if (!datacoinsusr2st) {
                  datacoinsusr = await db.create({
                    id: wthusrgame.id,
                    coins: 0,
                    status_playing: "no"
                  })
                }
                datacoinsusr1st.status_playing = "no"
                await datacoinsusr1st.save()
                datacoinsusr2st.status_playing = "no"
                await datacoinsusr2st.save()
                await nrd.findOneAndDelete({
                  msgID: gdata.msgID,
                  idstusr: stusrgame.id
                })
                await nrdusr.findOneAndDelete({
                  id: stusrgame.id
                })
                await nrdusr.findOneAndDelete({
                  id: wthusrgame.id
                })
                await game.findOneAndDelete({
                  id: stusrgame.id,
                  with: wthusrgame.id
                })
              }
              if (parseInt(userr1r.result) > parseInt(userr2r.result)) {
                let embed_end = new Discord.MessageEmbed()
                  .setTitle("بيانات التحدي")
                  .addFields({ name: `${stusrgame.tag}`, value: `> ${resultnum1}` }, { name: `${wthusrgame.tag}`, value: `> ${resultnum2}` })
                client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({
                  embeds: [embed_end], content: `**${stusrgame}** فائززززز !!! ب مجموع **${parseInt(userr1r.result)}** الي يفوز فيه نقطة!\n\n**${wthusrgame}** خاسر ب مجموع **${parseInt(userr2r.result)}** نقطة!
> اللعبة: **النرد**, المبلغ: **${gdata.coins}**`
                })).catch(err => console.error(err))
                let datacoinsusr1st = await db.findOne({
                  id: stusrgame.id
                })
                if (!datacoinsusr1st) {
                  datacoinsusr1st = await db.create({
                    id: stusrgame.id,
                    coins: 0,
                    status_playing: "no"
                  })
                }
                let tax = parseInt(gdata.coins) * 0.04;
                let total = parseInt(gdata.coins) - parseInt(tax);
                datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
                await datacoinsusr1st.save()
                let datacoinsusr2st = await db.findOne({
                  id: wthusrgame.id
                })
                if (!datacoinsusr2st) {
                  datacoinsusr = await db.create({
                    id: wthusrgame.id,
                    coins: 0,
                    status_playing: "no"
                  })
                }
                datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
                await datacoinsusr2st.save()
                datacoinsusr1st.status_playing = "no"
                await datacoinsusr1st.save()
                datacoinsusr2st.status_playing = "no"
                await datacoinsusr2st.save()
                await nrd.findOneAndDelete({
                  msgID: gdata.msgID,
                  idstusr: stusrgame.id
                })
                await nrdusr.findOneAndDelete({
                  id: stusrgame.id
                })
                await nrdusr.findOneAndDelete({
                  id: wthusrgame.id
                })
                await game.findOneAndDelete({
                  id: stusrgame.id,
                  with: wthusrgame.id
                })
              }
              if (parseInt(userr2r.result) > parseInt(userr1r.result)) {
                let embed_end = new Discord.MessageEmbed()
                  .setTitle("بيانات التحدي")
                  .addFields({ name: `${stusrgame.tag}`, value: `> ${resultnum1}` }, { name: `${wthusrgame.tag}`, value: `> ${resultnum2}` })
                client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({
                  embeds: [embed_end], content: `**${wthusrgame}** فائززززز !!! ب مجموع **${parseInt(userr2r.result)}** الي يفوز فيه نقطة!\n\n**${stusrgame}** خاسر ب مجموع **${parseInt(userr1r.result)}** نقطة!
> اللعبة: **النرد**, المبلغ: **${gdata.coins}**`
                })).catch(err => console.error(err))
                let datacoinsusr1st = await db.findOne({
                  id: wthusrgame.id
                })
                if (!datacoinsusr1st) {
                  datacoinsusr1st = await db.create({
                    id: wthusrgame.id,
                    coins: 0,
                    status_playing: "no"
                  })
                }
                let tax = parseInt(gdata.coins) * 0.04;
                let total = parseInt(gdata.coins) - parseInt(tax);
                datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
                await datacoinsusr1st.save()
                let datacoinsusr2st = await db.findOne({
                  id: stusrgame.id
                })
                if (!datacoinsusr2st) {
                  datacoinsusr2st = await db.create({
                    id: stusrgame.id,
                    coins: 0,
                    status_playing: "no"
                  })
                }
                datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
                await datacoinsusr2st.save()
                datacoinsusr1st.status_playing = "no"
                await datacoinsusr1st.save()
                datacoinsusr2st.status_playing = "no"
                await datacoinsusr2st.save()
                await nrd.findOneAndDelete({
                  msgID: gdata.msgID,
                  idstusr: stusrgame.id
                })
                await nrdusr.findOneAndDelete({
                  id: stusrgame.id
                })
                await nrdusr.findOneAndDelete({
                  id: wthusrgame.id
                })
                await game.findOneAndDelete({
                  id: stusrgame.id,
                  with: wthusrgame.id
                })
              }
              return;
            } else {
              let button_nrdk1 = new MessageButton()
                .setCustomId(`nrdk_${gdata.msgID}`)
                .setLabel("العب نردك")
                .setStyle("PRIMARY")
              let row1 = new MessageActionRow()
                .setComponents(button_nrdk1)
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], content: `${wthusrgame}\n اصبح دورك`, components: [row1] })).catch(err => console.error(err))
            }
          }, 2500)
        }
        return;
      }
    }
    if (interaction.customId == `takribi_${interaction.user.id}`) {

      let gdata = await game.findOne({
        id: interaction.user.id
      })

      if (!gdata) return;
      if (!gdata.coins || gdata.coins == null) return;
      if (!gdata.with || gdata.with == null) return;
      if (!gdata.msgID || gdata.msgID == null) return;
      gdata.game = "takribi"
      await gdata.save()
      await interaction.deferReply({ ephemeral: true })
      let usraccano = interaction.guild.members.cache.find(s => s.id == gdata.with)
      if (!usraccano) return interaction.reply({ content: `\`❎\` **لم استطيع إجاد صديقك في الخادم**`, ephemeral: true })
      gdata.time = timestamp(moment(ms("40s")) + Date.now())
      await gdata.save()
      let embed_edit = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`> تنبيه: في حال عدم استجابة الطرفين و عدم اكمال التحدي يؤدي الى خصم نصف المبلغ من الطرفين.
  > عند التعادل لا يتم سحب اي مبلغ من الطرفين.`)
        .addFields({ name: `📊 لعبة الرقم التقريبي:`, value: `> في كل جولة سوف تحصل على رقم عشوائي, و انت عليك ان تحصل على نفس الرقم او اقل منه, الذي يحصل عليه يفوز, في حال الحصول على اعلى تعتبر خاسر, جولة واحدة لكل تحدي ! انهاء الجولة يعني انهاء التحدي, التعادل ليس فوزا !` }, { name: `المبلغ:`, value: `${parseInt(gdata.coins)}` })


      let button_yes = new MessageButton()
        .setCustomId(`yestkg_${gdata.msgID}`)
        .setLabel("قبول")
        .setStyle("SUCCESS")

      let button_no = new MessageButton()
        .setCustomId(`notkg_${gdata.msgID}`)
        .setLabel("رفض")
        .setStyle("DANGER")

      let row = new MessageActionRow()
        .setComponents(button_yes, button_no)

      interaction.editReply({ content: `> لقد تم اختيار العبة هي : \`الرقم التقريبي\` !!`, ephemeral: true })
      client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit], content: `> بانتظار رد من ${usraccano} ...`, components: [row] })).catch(err => console.error(err))
    }
    if (interaction.customId == `yestkg_${interaction.message.id}`) {
      let gdatawith = await game.findOne({
        with: interaction.user.id
      })
      if (!gdatawith) return;
      if (interaction.message.id !== gdatawith.msgID) return;
      await interaction.deferReply({ ephemeral: true })
      let stusrgame = client.users.cache.get(gdatawith.id)
      let wthusrgame = client.users.cache.get(gdatawith.with)
      let nums = ["1", "2"]
      let numr = nums[Math.floor(Math.random() * nums.length)]
      let usrchoose = "";
      let notrole = "";
      if (numr == "1") {
        usrchoose = gdatawith.id;
        notrole = gdatawith.with;
        statusuingame1 = "**Playing..**";
        statusuingame2 = "Waiting.."
      }
      if (numr == "2") {
        usrchoose = gdatawith.with;
        notrole = gdatawith.id;
        statusuingame1 = "Waiting..";
        statusuingame2 = "**Playing..**"
      }
      gdatawith.time = timestamp(moment(ms("90s")) + Date.now())
      await gdatawith.save()
      interaction.editReply({ content: `> لقد تم القبول اللعبة هي : \`الرقم التقريبي\` ، اللعب مع : ${stusrgame} !!`, ephemeral: true })
      const firstNumbers = [];
      for (let i = 19; i <= 79; i += 3) {
        firstNumbers.push(i);
      }

      const secondNumbers = [2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7];
      const thirdNumbers = [4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14];
      const fourthNumbers = [5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 12, 12, 13, 14, 15, 15, 16, 16, 17, 18, 18, 19];
      const fiveNumbers = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 22, 23, 24, 25, 26, 27];


      const randomIndex = Math.floor(Math.random() * firstNumbers.length);
      const a = secondNumbers[randomIndex];
      const b = thirdNumbers[randomIndex];
      const c = fourthNumbers[randomIndex];
      const d = fiveNumbers[randomIndex]
      const numaksa = firstNumbers[randomIndex];
      setTimeout(async () => {
        let embed_edit_nrd_game = new Discord.MessageEmbed()
          .setTitle("بيانات التحدي")
          .setDescription(`اقصى رقم : **${numaksa}**`)
          .addFields({ name: `${stusrgame.tag}`, value: `> ${statusuingame1}` }, { name: `${wthusrgame.tag}`, value: `> ${statusuingame2}` })
        let button_arkam1 = new MessageButton()
          .setCustomId(`arkam1tk_${gdatawith.msgID}`)
          .setLabel(`${a} - ${b}`)
          .setStyle("PRIMARY")
        let button_finish = new MessageButton()
          .setCustomId(`finishtk_${gdatawith.msgID}`)
          .setLabel("finish")
          .setStyle("SUCCESS")
        let button_arkam2 = new MessageButton()
          .setCustomId(`arkam2tk_${gdatawith.msgID}`)
          .setLabel(`${c} - ${d}`)
          .setStyle("PRIMARY")
        let row = new MessageActionRow()
          .setComponents(button_arkam1, button_finish, button_arkam2)
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdatawith.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], content: `<@!${usrchoose}>\n انه دورك`, components: [row] })).catch(err => console.error(err))
      }, 1250)



      let tkdata = await takribi.findOne({
        msgID: gdatawith.msgID
      })
      if (!tkdata) {


        tkdata = await takribi.create({
          msgID: gdatawith.msgID,
          idstusr: gdatawith.id,
          role: usrchoose,
          notrole: notrole,
          max_number: numaksa,
          number_players_done: 0,
          number_smaller1: a,
          number_smaller2: b,
          number_greater1: c,
          number_greater2: d
        })


      } else {


        tkdata = await takribi.findOneAndUpdate({
          msgID: gdatawith.msgID,
          idstusr: gdatawith.id,
          role: usrchoose,
          notrole: notrole,
          max_number: numaksa,
          number_players_done: 0,
          number_smaller1: a,
          number_smaller2: b,
          number_greater1: c,
          number_greater2: d
        })


      }






      let tkusrdata = await tkusr.findOne({
        id: gdatawith.id
      })

      if (!tkusrdata) {

        tkusrdata = await tkusr.create({
          id: gdatawith.id,
          with: gdatawith.with,
          attempt: 0,
          numbers: [],
          result: 0,
          msgID: interaction.message.id
        })


      } else {


        tkusrdata = await tkusr.findOneAndUpdate({
          id: gdatawith.id,
          with: gdatawith.with,
          attempt: 0,
          numbers: [],
          result: 0,
          msgID: interaction.message.id
        })


      }



      let tkusr1data = await tkusr.findOne({
        id: gdatawith.with
      })
      if (!tkusr1data) {
        tkusr1data = await tkusr.create({
          id: gdatawith.with,
          with: gdatawith.id,
          attempt: 0,
          numbers: [],
          result: 0,
          msgID: interaction.message.id
        })


      } else {


        tkusr1data = await tkusr.findOneAndUpdate({
          id: gdatawith.with,
          with: gdatawith.id,
          attempt: 0,
          numbers: [],
          result: 0,
          msgID: interaction.message.id
        })


      }
      return;
    }
    if (interaction.customId == `notkg_${interaction.message.id}`) {
      let gdata = await game.findOne({
        msgID: interaction.message.id
      })
      if (!gdata) return;
      let stusrgame = client.users.cache.get(gdata.id)
      let wthusrgame = client.users.cache.get(gdata.with)
      if (stusrgame.id !== interaction.user.id && wthusrgame.id !== interaction.user.id) return;
      if (stusrgame.id == interaction.user.id) {
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({
          embeds: [], content: `>  تم إلغاء التحدي بنجاح ${interaction.user} ! 
          > || ${stusrgame} | ${wthusrgame} || `, components: []
        })).catch(err => console.error(err))
      }
      if (wthusrgame.id == interaction.user.id) {
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({
          embeds: [], content: `>  تم رفض التحدي بنجاح ${interaction.user} ! 
        > || ${stusrgame} | ${wthusrgame} || `, components: []
        })).catch(err => console.error(err))
      }
      await game.findOneAndDelete({
        id: stusrgame.id,
        with: wthusrgame.id,
        msgID: interaction.message.id
      })
      let data = await db.findOne({
        id: stusrgame.id
      })
      if (!data) {
        data = await db.create({
          id: stusrgame.id,
          coins: 0,
          status_playing: "no"
        })
      }
      let data2 = await db.findOne({
        id: wthusrgame.id
      })
      if (!data2) {
        data2 = await db.create({
          id: wthusrgame.id,
          coins: 0,
          status_playing: "no"
        })
      }
      data2.status_playing = "no";
      await data2.save()
      data.status_playing = "no";
      await data.save()
    }
    if (interaction.customId == `finishtk_${interaction.message.id}`) {
      let data = await takribi.findOne({
        msgID: interaction.message.id
      })
      if (!data) return;
      let datausr = await tkusr.findOne({
        id: interaction.user.id,
        msgID: interaction.message.id
      })
      if (!datausr) return;
      await interaction.deferReply({ ephemeral: true })
      if (data.role !== interaction.user.id && data.notrole == interaction.user.id) return interaction.editReply({ content: `انه ليس دورك !`, ephemeral: true })
      if (data.role !== interaction.user.id) return;
      let gdata = await game.findOne({
        id: data.idstusr,
        msgID: interaction.message.id
      })
      if (!gdata) return;
      let stusrgame = client.users.cache.get(data.idstusr)
      if (!stusrgame) return;
      let wthusrgame = client.users.cache.get(gdata.with)
      if (!wthusrgame) return;
      data.number_players_done = parseInt(data.number_players_done) + 1;
      await data.save()
      let dataup = await takribi.findOne({
        msgID: interaction.message.id
      })
      if (!dataup) return;
      gdata.time = timestamp(moment(ms("90s")) + Date.now())
      await gdata.save()
      if (parseInt(dataup.number_players_done) == 1) {
        if (data.notrole == stusrgame.id) {
          data.role = stusrgame.id;
          await data.save()
          data.notrole = wthusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          interaction.editReply({ content: `> تم الأنتهاء من اللعب ، انتظر صديقك حتى يلعب !`, ephemeral: true })
          return;
        }
        if (data.notrole == wthusrgame.id) {
          data.role = wthusrgame.id;
          await data.save()
          data.notrole = stusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          interaction.editReply({ content: `> تم الأنتهاء من اللعب ، انتظر صديقك حتى يلعب !`, ephemeral: true })
          return;
        }
      }
      let datausrtk1 = await tkusr.findOne({
        id: stusrgame.id,
        with: wthusrgame.id,
        msgID: interaction.message.id
      })
      if (!datausrtk1) return;
      let datausrtk2 = await tkusr.findOne({
        id: wthusrgame.id,
        with: stusrgame.id,
        msgID: interaction.message.id
      })
      if (!datausrtk2) return;
      if (parseInt(dataup.number_players_done) == 2) {
        let embed_finish_tk_game = new Discord.MessageEmbed()
          .setTitle("بيانات التحدي")
          .setDescription(`اقصى رقم : **${dataup.max_number}**`)
          .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
        let button_arkam1 = new MessageButton()
          .setCustomId(`arkam1tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let button_finish = new MessageButton()
          .setCustomId(`finishtk_${gdata.msgID}`)
          .setLabel("finish")
          .setStyle("SUCCESS")
          .setDisabled()
        let button_arkam2 = new MessageButton()
          .setCustomId(`arkam2tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let row = new MessageActionRow()
          .setComponents(button_arkam1, button_finish, button_arkam2)
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
        setTimeout(async () => {
          if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
        }, 1500)
        return;
      }
    }



    if (interaction.customId == `arkam1tk_${interaction.message.id}`) {
      let data = await takribi.findOne({
        msgID: interaction.message.id
      })
      if (!data) return;
      let datausr = await tkusr.findOne({
        id: interaction.user.id,
        msgID: interaction.message.id
      })
      if (!datausr) return;
      await interaction.deferReply({ ephemeral: true })
      if (data.role !== interaction.user.id && data.notrole == interaction.user.id) return interaction.editReply({ content: `انه ليس دورك !`, ephemeral: true })
      if (data.role !== interaction.user.id) return;
      let gdata = await game.findOne({
        id: data.idstusr,
        msgID: interaction.message.id
      })
      if (!gdata) return;
      let stusrgame = client.users.cache.get(data.idstusr)
      if (!stusrgame) return;
      let wthusrgame = client.users.cache.get(gdata.with)
      if (!wthusrgame) return;
      let dataup = await takribi.findOne({
        msgID: interaction.message.id
      })
      if (!dataup) return;
      gdata.time = timestamp(moment(ms("90s")) + Date.now())
      await gdata.save()
      let urnum = getRandomNumber(parseInt(data.number_smaller1), parseInt(data.number_smaller2))
      datausr.numbers.push(urnum)
      await datausr.save()
      datausr.result = parseInt(datausr.result) + urnum;
      await datausr.save()
      let datausrup = await tkusr.findOne({
        id: interaction.user.id,
        msgID: interaction.message.id
      })
      if (!datausrup) return;
      let datausrtk1 = await tkusr.findOne({
        id: stusrgame.id,
        with: wthusrgame.id,
        msgID: interaction.message.id
      })
      if (!datausrtk1) return;
      let datausrtk2 = await tkusr.findOne({
        id: wthusrgame.id,
        with: stusrgame.id,
        msgID: interaction.message.id
      })
      if (!datausrtk2) return;
      if ((parseInt(data.max_number) < parseInt(datausrup.result))) {
        data.number_players_done = parseInt(data.number_players_done) + 1
        await data.save()
        datausrup = await tkusr.findOne({
          id: interaction.user.id,
          msgID: interaction.message.id
        })
        datausrtk1 = await tkusr.findOne({
          id: stusrgame.id,
          with: wthusrgame.id,
          msgID: interaction.message.id
        })
        datausrtk2 = await tkusr.findOne({
          id: wthusrgame.id,
          with: stusrgame.id,
          msgID: interaction.message.id
        })
        dataup = await takribi.findOne({
          msgID: interaction.message.id
        })
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                    اصبح مجموعك ${datausrup.result}
                    > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                    اصبح مجموعك ${datausrup.result}
                    > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
        }

        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                    اصبح مجموعك ${datausrup.result}
                    > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                    اصبح مجموعك ${datausrup.result}
                    > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          return;
        }





        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)
          return;
        }
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
                  اصبح مجموعك ${datausrup.result}
                  > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)
        }
      }
      if ((parseInt(data.max_number) == parseInt(datausrup.result))) {
        data.number_players_done = parseInt(data.number_players_done) + 1
        await data.save()
        datausrup = await tkusr.findOne({
          id: interaction.user.id,
          msgID: interaction.message.id
        })
        datausrtk1 = await tkusr.findOne({
          id: stusrgame.id,
          with: wthusrgame.id,
          msgID: interaction.message.id
        })
        datausrtk2 = await tkusr.findOne({
          id: wthusrgame.id,
          with: stusrgame.id,
          msgID: interaction.message.id
        })
        dataup = await takribi.findOne({
          msgID: interaction.message.id
        })
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
        }

        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          return;
        }





        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
            اصبح مجموعك ${datausrup.result}
            > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)
          return;
        }
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
                    اصبح مجموعك ${datausrup.result}
                    > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)
        }
      }
      if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
        if (data.notrole == stusrgame.id) {
          data.role = stusrgame.id;
          await data.save()
          data.notrole = wthusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
        if (data.notrole == wthusrgame.id) {
          data.role = wthusrgame.id;
          await data.save()
          data.notrole = stusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
      }

      if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
        if (data.notrole == stusrgame.id) {
          data.role = stusrgame.id;
          await data.save()
          data.notrole = wthusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
        if (data.notrole == wthusrgame.id) {
          data.role = wthusrgame.id;
          await data.save()
          data.notrole = stusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
        return;
      }





      if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
        interaction.editReply({
          content: `لقد حصلت على **${urnum}**
اصبح مجموعك ${datausrup.result}
> يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
        })
        let embed_finish_tk_game = new Discord.MessageEmbed()
          .setTitle("بيانات التحدي")
          .setDescription(`اقصى رقم : **${dataup.max_number}**`)
          .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
        let button_arkam1 = new MessageButton()
          .setCustomId(`arkam1tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let button_finish = new MessageButton()
          .setCustomId(`finishtk_${gdata.msgID}`)
          .setLabel("finish")
          .setStyle("SUCCESS")
          .setDisabled()
        let button_arkam2 = new MessageButton()
          .setCustomId(`arkam2tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let row = new MessageActionRow()
          .setComponents(button_arkam1, button_finish, button_arkam2)
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
        setTimeout(async () => {
          if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
        }, 1500)
        return;
      }
      if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
        interaction.editReply({
          content: `لقد حصلت على **${urnum}**
        اصبح مجموعك ${datausrup.result}
        > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
        })
        let embed_finish_tk_game = new Discord.MessageEmbed()
          .setTitle("بيانات التحدي")
          .setDescription(`اقصى رقم : **${dataup.max_number}**`)
          .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
        let button_arkam1 = new MessageButton()
          .setCustomId(`arkam1tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let button_finish = new MessageButton()
          .setCustomId(`finishtk_${gdata.msgID}`)
          .setLabel("finish")
          .setStyle("SUCCESS")
          .setDisabled()
        let button_arkam2 = new MessageButton()
          .setCustomId(`arkam2tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let row = new MessageActionRow()
          .setComponents(button_arkam1, button_finish, button_arkam2)
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
        setTimeout(async () => {
          if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
        }, 1500)
        return;
      }
      return interaction.editReply({
        content: `لقد حصلت على **${urnum}**
       اصبح مجموعك ${datausrup.result}
       ||تنبيه: انتبه ان يصبح مجموعك اعلى من الرقم المطلوب, يمكنك انهاء دورك بالضغط على الزر الاخضر||`, ephemeral: true
      })
    }



















    if (interaction.customId == `arkam2tk_${interaction.message.id}`) {
      let data = await takribi.findOne({
        msgID: interaction.message.id
      })
      if (!data) return;
      let datausr = await tkusr.findOne({
        id: interaction.user.id,
        msgID: interaction.message.id
      })
      if (!datausr) return;
      await interaction.deferReply({ ephemeral: true })
      if (data.role !== interaction.user.id && data.notrole == interaction.user.id) return interaction.editReply({ content: `انه ليس دورك !`, ephemeral: true })
      if (data.role !== interaction.user.id) return;
      let gdata = await game.findOne({
        id: data.idstusr,
        msgID: interaction.message.id
      })
      if (!gdata) return;
      let stusrgame = client.users.cache.get(data.idstusr)
      if (!stusrgame) return;
      let wthusrgame = client.users.cache.get(gdata.with)
      if (!wthusrgame) return;
      data.number_players_done = parseInt(data.number_players_done) + 1;
      let dataup = await takribi.findOne({
        msgID: interaction.message.id
      })
      if (!dataup) return;
      gdata.time = timestamp(moment(ms("90s")) + Date.now())
      await gdata.save()
      let urnum = getRandomNumber(parseInt(data.number_greater1), parseInt(data.number_greater2))
      datausr.numbers.push(urnum)
      await datausr.save()
      datausr.result = parseInt(datausr.result) + urnum;
      await datausr.save()
      let datausrup = await tkusr.findOne({
        id: interaction.user.id,
        msgID: interaction.message.id
      })
      if (!datausrup) return;
      let datausrtk1 = await tkusr.findOne({
        id: stusrgame.id,
        with: wthusrgame.id,
        msgID: interaction.message.id
      })
      if (!datausrtk1) return;
      let datausrtk2 = await tkusr.findOne({
        id: wthusrgame.id,
        with: stusrgame.id,
        msgID: interaction.message.id
      })
      if (!datausrtk2) return;
      if ((parseInt(data.max_number) < parseInt(datausrup.result))) {
        data.number_players_done = parseInt(data.number_players_done) + 1
        await data.save()
        datausrup = await tkusr.findOne({
          id: interaction.user.id,
          msgID: interaction.message.id
        })
        datausrtk1 = await tkusr.findOne({
          id: stusrgame.id,
          with: wthusrgame.id,
          msgID: interaction.message.id
        })
        datausrtk2 = await tkusr.findOne({
          id: wthusrgame.id,
          with: stusrgame.id,
          msgID: interaction.message.id
        })
        dataup = await takribi.findOne({
          msgID: interaction.message.id
        })
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
        }

        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          return;
        }





        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
            اصبح مجموعك ${datausrup.result}
            > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)
          return;
        }
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
                    اصبح مجموعك ${datausrup.result}
                    > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)
        }
      }
      if ((parseInt(data.max_number) == parseInt(datausrup.result))) {
        data.number_players_done = parseInt(data.number_players_done) + 1
        await data.save()
        datausrup = await tkusr.findOne({
          id: interaction.user.id,
          msgID: interaction.message.id
        })
        datausrtk1 = await tkusr.findOne({
          id: stusrgame.id,
          with: wthusrgame.id,
          msgID: interaction.message.id
        })
        datausrtk2 = await tkusr.findOne({
          id: wthusrgame.id,
          with: stusrgame.id,
          msgID: interaction.message.id
        })
        dataup = await takribi.findOne({
          msgID: interaction.message.id
        })
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                        اصبح مجموعك ${datausrup.result}
                        > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                        اصبح مجموعك ${datausrup.result}
                        > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
        }

        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                        اصبح مجموعك ${datausrup.result}
                        > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                        اصبح مجموعك ${datausrup.result}
                        > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          return;
        }





        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
              اصبح مجموعك ${datausrup.result}
              > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)

          return;
        }
      }

      if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
        if (data.notrole == stusrgame.id) {
          data.role = stusrgame.id;
          await data.save()
          data.notrole = wthusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
        if (data.notrole == wthusrgame.id) {
          data.role = wthusrgame.id;
          await data.save()
          data.notrole = stusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
      }

      if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
        if (data.notrole == stusrgame.id) {
          data.role = stusrgame.id;
          await data.save()
          data.notrole = wthusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
        if (data.notrole == wthusrgame.id) {
          data.role = wthusrgame.id;
          await data.save()
          data.notrole = stusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
        return;
      }





      if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
        interaction.editReply({
          content: `لقد حصلت على **${urnum}**
اصبح مجموعك ${datausrup.result}
> يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
        })
        let embed_finish_tk_game = new Discord.MessageEmbed()
          .setTitle("بيانات التحدي")
          .setDescription(`اقصى رقم : **${dataup.max_number}**`)
          .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
        let button_arkam1 = new MessageButton()
          .setCustomId(`arkam1tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let button_finish = new MessageButton()
          .setCustomId(`finishtk_${gdata.msgID}`)
          .setLabel("finish")
          .setStyle("SUCCESS")
          .setDisabled()
        let button_arkam2 = new MessageButton()
          .setCustomId(`arkam2tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let row = new MessageActionRow()
          .setComponents(button_arkam1, button_finish, button_arkam2)
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
        setTimeout(async () => {
          if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
        }, 1500)
        return;
      }
      if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
        interaction.editReply({
          content: `لقد حصلت على **${urnum}**
        اصبح مجموعك ${datausrup.result}
        > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
        })
        let embed_finish_tk_game = new Discord.MessageEmbed()
          .setTitle("بيانات التحدي")
          .setDescription(`اقصى رقم : **${dataup.max_number}**`)
          .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
        let button_arkam1 = new MessageButton()
          .setCustomId(`arkam1tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let button_finish = new MessageButton()
          .setCustomId(`finishtk_${gdata.msgID}`)
          .setLabel("finish")
          .setStyle("SUCCESS")
          .setDisabled()
        let button_arkam2 = new MessageButton()
          .setCustomId(`arkam2tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let row = new MessageActionRow()
          .setComponents(button_arkam1, button_finish, button_arkam2)
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
        setTimeout(async () => {
          if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame}  فائززززز !!! ب مجموع ${datausrtk1.result} نقطة!\n\n${wthusrgame} خاسر ب مجموع **${datausrtk2.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
        }, 1500)
        return;
      }
      return interaction.editReply({
        content: `لقد حصلت على **${urnum}**
       اصبح مجموعك ${datausrup.result}
       ||تنبيه: انتبه ان يصبح مجموعك اعلى من الرقم المطلوب, يمكنك انهاء دورك بالضغط على الزر الاخضر||`, ephemeral: true
      })
    }
  }
})






function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



// client.on("messageCreate", async message => {
// if(message.author.bot) return;
// return message.author.send({ content: `** تم نقل السيرفر 
// https://discord.gg/GjhZN7Zqj4 .**

// > ${message.author}` })
// })

client.on("messageCreate", async (message) => {
  if(message.author.bot) return;
  const args = message.content.trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  let user = message.mentions.users.first() || await client.users.fetch(args[0], {
    force: true
  }).catch(() => undefined);
  let userData = await db.findOne({
    id: message.author.id
  });
  if(!userData) await db.create({
    id: message.author.id
  }).then((data) => userData = data).catch(() => 0);
  if(cmd == "سحب") {
    const userId = message.author.id;
    if(message.channel.id !== COMMAND_CHANNEL_ID) return message.reply({
      content: ` يجب عليك استخدام امر السحب في روم <#${COMMAND_CHANNEL_ID}>`,
      ephemeral: true
    });
    if(!args[0]) return message.reply('يرجى تحديد مبلغ.');
    let coinAmount = args[0].replace("k", `000`).replace("m", `000000`).replace("K", `000`).replace("M", `000000`).replace("ك", `000`).replace("م", `000000`).replace("مليون", `000000`)
    let amount = coinAmount;
    if(userData.status_playing == "yes") return message.reply({
      content: "انت بتلعب مينفعش تسحب !!",
      allowedMentions: {
        repliedUser: false
      }
    });
    if(userData.withdraw_amount != 0) return message.reply({
      content: "انت ساحب قبل كده لازم تصبر لحد ما تتقبل او تترفض"
    });
    if(!amount) return message.reply({
      content: `دخل رقم طيب !!`,
      allowedMentions: {
        repliedUser: false
      }
    });
    if(isNaN(amount)) return message.reply({
      content: `دخل رقم مظبوط لاجي أظبطك !!`,
      allowedMentions: {
        repliedUser: false
      }
    });
    if(amount <= 0 || args[0].includes('.') || args[0].includes('-')) return message.reply({
      content: `دخل رقم مظبوط لاجي أظبطك !!`,
      allowedMentions: {
        repliedUser: false
      }
    });
    if(!userData || parseInt(userData.coins) < parseInt(amount)) return message.reply({
      content: "معكش الفلوس اللي عاوز تسحبها !!",
      allowedMentions: {
        repliedUser: false
      }
    });
    let first = Math.floor(Math.random() * 10);
    let second = Math.floor(Math.random() * 10);
    let third = Math.floor(Math.random() * 10);
    let fourth = Math.floor(Math.random() * 10);
    let num = `${first}${second}${third}${fourth}`;
    let resulting = amount;
    let embed = new MessageEmbed().setDescription(`انت هتقدم طلب سحب بمبلغ: ${resulting}\nعلشان تأكد الطلب اكتب: ${num}`)
    let msg = await message.reply({
      embeds: [embed],
      allowedMentions: {
        repliedUser: false
      }
    });
    const filter = response => response.author.id === message.author.id;
    message.channel.awaitMessages({
      filter,
      max: 1,
      time: 300000,
      errors: ["time"]
    }).then(async collected => {
      if(collected.first().content === num) {
        msg.delete().catch(() => 0);
        collected.first().delete();
        userData.withdraw_amount = parseInt(amount);
        userData.coins -= parseInt(amount);
        await userData.save();
        let embed = new MessageEmbed().setTitle(`طلب سحب`).setDescription(`الشخص: ${message.author.username}\nالمبلغ: ${amount}`).setThumbnail(message.author.displayAvatarURL({
          dynamic: true
        }))
        message.reply({
          content: `تم تقديم طلب سحب: \`${amount}\`\nبرجاء انتظار نتيجة السحب هنا <#${withdraw_results_channel}>`
        });
        const withdrawMessage = await client.channels.cache.get(WITHDRAW_CHANNEL_ID).send({
          embeds: [embed]
        });
        userData.withdrawmessages.push(withdrawMessage.id);
        const transfercommandmessage = await client.channels.cache.get(WITHDRAW_CHANNEL_ID).send({
          content: `قبول السحب <@${message.author.id}>`
        });
        userData.withdrawmessages.push(transfercommandmessage.id);
        await userData.save();
      } else {
        msg.delete().catch(() => 0);
        collected.first().delete();
      }
    }).catch(async collected => {
      msg.delete().catch(() => 0);
    });
  } else if(cmd == "الغاء") {
    if(args[0] == "السحب" || args[0] == "سحب") {
      if(message.channel.id !== COMMAND_CHANNEL_ID) {
        return message.reply(`** الغاء السحب فقط يعمل في روم <#${COMMAND_CHANNEL_ID}> **`);
      }
      if(userData.status_playing == "yes") return message.reply({
        content: "انت بتلعب مينفعش تلغي سحب او تسحب !!",
        allowedMentions: {
          repliedUser: false
        }
      });
      if(userData.withdraw_amount == 0) return message.reply({
        content: "انت معندكش طلب سحب علشان تلغيه !!"
      });
      let first = Math.floor(Math.random() * 10);
      let second = Math.floor(Math.random() * 10);
      let third = Math.floor(Math.random() * 10);
      let fourth = Math.floor(Math.random() * 10);
      let num = `${first}${second}${third}${fourth}`;
      let resulting = userData.withdraw_amount;
      let embed = new MessageEmbed().setDescription(`انت هتلغي طلب السحب اللي بمبلغ: ${resulting}\nعلشان تأكد الالغاء اكتب: ${num}`)
      let msg = await message.reply({
        embeds: [embed],
        allowedMentions: {
          repliedUser: false
        }
      });
      const filter = response => response.author.id === message.author.id;
      message.channel.awaitMessages({
        filter,
        max: 1,
        time: 300000,
        errors: ["time"]
      }).then(async collected => {
        if(collected.first().content === num) {
          msg.delete().catch(() => 0);
          collected.first().delete();
          message.reply({
            content: `تم الغاء طلب سحب: \`${userData.withdraw_amount}\``
          });
          userData.coins += parseInt(userData.withdraw_amount);
          userData.withdraw_amount = 0;
          for(const messageId of userData.withdrawmessages) {
            try {
              const channel = await client.channels.fetch(WITHDRAW_CHANNEL_ID);
              const messageToDelete = await channel.messages.fetch(messageId);
              await messageToDelete.delete();
            } catch (error) {
              console.error(`Failed to delete message with ID ${messageId}:`, error);
            }
          }
          userData.withdrawmessages = [];
          await userData.save();
        } else {
          msg.delete().catch(() => 0);
          collected.first().delete();
        }
      }).catch(async () => {
        msg.delete().catch(() => 0);
      });
    }
  } else if(cmd == "رفض") {
    if(args[0] == "السحب" || args[0] == "سحب") {
      if(!owners.includes(message.author.id)) return;
      user = message.mentions.users.first() || await client.users.fetch(args[1], {
        force: true
      }).catch(() => undefined);
      if(!args[1]) return message.reply({
        content: "من فضلك منشن شخص !!",
        allowedMentions: {
          repliedUser: false
        }
      });
      if(!user) return message.reply({
        content: "لا أستطيع العثور على الشخص اللي منشنته !!",
        allowedMentions: {
          repliedUser: false
        }
      });
      if(user.bot) return message.reply({
        content: "البوتات ملهاش فلوس !!",
        allowedMentions: {
          repliedUser: false
        }
      });
      let anotherUserData = await db.findOne({
        id: user.id
      });
      if(!anotherUserData) await db.create({
        id: user.id
      }).then((data) => anotherUserData = data);
      if(anotherUserData.withdraw_amount == 0) return message.reply({
        content: "هو معندوش طلب سحب علشان تلغيه !!"
      });
      anotherUserData.coins += parseInt(anotherUserData.withdraw_amount);
      anotherUserData.withdraw_amount = 0;
      for(const messageId of anotherUserData.withdrawmessages) {
        try {
          const channel = await client.channels.fetch(WITHDRAW_CHANNEL_ID);
          const messageToDelete = await channel.messages.fetch(messageId);
          await messageToDelete.delete();
        } catch (error) {
          console.error(`Failed to delete message with ID ${messageId}:`, error);
        }
      }
      anotherUserData.withdrawmessages = [];
      await anotherUserData.save();
      await client.channels.cache.get(withdraw_results_channel).send({
        content: `تم رفض سحب ${user}`,
        allowedMentions: {
          repliedUser: false
        }
      }).catch(() => 0);
      message.reply({
        content: `تم رفض سحب ${user}`,
        allowedMentions: {
          repliedUser: false
        }
      });
    }
  } else if(cmd == "قبول") {
    if(args[0] == "السحب" || args[0] == "سحب") {
      if(!owners.includes(message.author.id)) return;
      user = message.mentions.users.first() || await client.users.fetch(args[1], {
        force: true
      }).catch(() => undefined);
      if(!args[1]) return message.reply({
        content: "من فضلك منشن شخص !!",
        allowedMentions: {
          repliedUser: false
        }
      });
      if(!user) return message.reply({
        content: "لا أستطيع العثور على الشخص اللي منشنته !!",
        allowedMentions: {
          repliedUser: false
        }
      });
      if(user.bot) return message.reply({
        content: "البوتات ملهاش فلوس !!",
        allowedMentions: {
          repliedUser: false
        }
      });
      let anotherUserData = await db.findOne({
        id: user.id
      });
      if(!anotherUserData) await db.create({
        id: user.id
      }).then((data) => anotherUserData = data);
      if(anotherUserData.withdraw_amount == 0) return message.reply({
        content: "هو معندوش طلب سحب علشان تقبله !!"
      });
      const withdrawamount = anotherUserData.withdraw_amount
      anotherUserData.withdraw_amount = 0;
      for(const messageId of anotherUserData.withdrawmessages) {
        try {
          const channel = await client.channels.fetch(WITHDRAW_CHANNEL_ID);
          const messageToDelete = await channel.messages.fetch(messageId);
          await messageToDelete.delete();
        } catch (error) {
          console.error(`Failed to delete message with ID ${messageId}:`, error);
        }
      }
      anotherUserData.withdrawmessages = [];
      await anotherUserData.save();
      await client.channels.cache.get(withdraw_results_channel).send({
        content: `تم قبول سحب ${user}`,
        allowedMentions: {
          repliedUser: false
        }
      }).catch(() => 0);
      await client.channels.cache.get(withdraw_results_channel).send({
        content: `c ${user.id} ${withdrawamount}`
      }).catch(() => 0);
      message.reply({
        content: `تم قبول سحب ${user}`,
        allowedMentions: {
          repliedUser: false
        }
      });
    }
  }
});

//
client.on('messageCreate', message => {
if(message.content.startsWith("شحن")) { // رسالة 
message.reply("#credit 882271128247214122 (العدد) ") // الرد 
}


});
//



client.login('MTI3NTMwMjUwOTQ5MzA5MjM3Mw.GyxijG.W6uKwTWXNZbs-vwuCR0LveH8W8hmW8eKCcVP5I')