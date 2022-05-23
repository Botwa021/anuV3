let fs = require('fs')

let handler = m => m

handler.all = async function (m, { isBlocked }) {

    if (isBlocked) return

    let setting = global.db.data.settings

    // ketika ada yang invite/kirim link grup di chat pribadi

    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {

        this.reply(m.chat, `┌───── *「 𝗜𝗡𝗩𝗜𝗧𝗘 𝗚𝗥𝗨𝗣 」*─────
╔════════════════════════
║  𝙊𝙬𝙣𝙚𝙧 @${global.owner[0]}
╠════════════════════════
║╭──『 𝘿𝙤𝙣𝙖𝙨𝙞 』──⬣
║│⬡ 𝘿𝙖𝙣𝙖/𝙂𝙤𝙥𝙖𝙮
║│⬡ 𝟬𝟴𝟴𝟮𝟯𝟯𝟴𝟯𝟮𝟳𝟳𝟭 
║╰───────⬣
║
╠════════════════════════
║╭──『 𝙎𝙚𝙬𝙖 𝘽𝙤𝙩 』──⬣
║│⬡ 𝘾𝙝𝙖𝙩 𝙊𝙬𝙣𝙚𝙧 
║│⬡ wa.me/6288233832771
║╰───────⬣
╚════════════════════════

`.trim(), m, { contextIfo: { mentionedJid: [global.owner[0] + '@s.whatsapp.net'] } })

}

    // salam

    let reg = /(ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم)/i

    let isSalam = reg.exec(m.text)

    if (isSalam && !m.fromMe) {

        m.reply(`وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ\n_*wa\'alaikumussalam wr.wb.*_`)

    }

  // backup db

    if (setting.backup) {

        if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {

            let d = new Date

            let date = d.toLocaleDateString('id', {

                day: 'numeric',

                month: 'long',

                year: 'numeric'

            })

            await global.db.write()

            this.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${date}`, null)

            this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', 0, 0, { mimetype: 'application/json' })

            setting.backupDB = new Date() * 1

        }

    }

    // update status

    if (new Date() * 1 - setting.status > 1000) {

        let _uptime = process.uptime() * 1000

        let uptime = clockString(_uptime)

        await this.setStatus(`Aktif selama ${uptime} | Mode: ${global.opts['self'] ? 'Private' : setting.groupOnly ? 'Hanya Grup' : 'Publik'} | 𝘽𝙮 𝘽𝙊𝙏𝘾𝘼𝙃𝙓`).catch(_ => _)

        setting.status = new Date() * 1

    }

}

module.exports = handler
