let fetch = require('node-fetch')
let handler = async (m, { conn }) => conn.send2ButtonLoc(m.chat, await (await fetch(fla + 'KRIZYN BOTz')).buffer(), `
📮 𝘔𝘢𝘶 𝘴𝘤𝘳𝘪𝘱𝘵𝘯𝘺𝘢 𝘤𝘩𝘢𝘵 𝘰𝘸𝘯𝘦𝘳 𝘺𝘢
wa.me/6288233832771
`.trim(), ' instagram.com/Mursid.st', 'Thanks', '.tqto', 'Menu','.menu')
handler.help = ['sc']
handler.tags = ['info']
handler.command = /^(sourcecode|sc|scbot|script|scmursid|github)$/i

module.exports = handler
