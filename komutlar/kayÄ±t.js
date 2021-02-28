const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')
let p = ayarlar.prefix
let ek = ayarlar.erkek1
let kd = ayarlar.kadın1
exports.run = async (client, message, args) => {
  
const sunucu = message.member.guild
  

  
if(!message.member.roles.cache.has(ayarlar.KayıtYetkilisi) && (!message.member.roles.cache.has(ayarlar.üstYetkiliRolü) && (!message.member.hasPermission("ADMINISTRATOR")))) return message.channel.send(new MessageEmbed().setDescription(`**Gerekli yetikiye sahip değilsin.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));  

if(!ayarlar.erkek1) return message.channel.send (new MessageEmbed().setDescription(`**(\`Erkek1\`) Rolü ayarlanmamış.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
if(!ayarlar.erkek2) return message.channel.send (new MessageEmbed().setDescription(`**(\`Erkek2\`) Rolü ayarlanmamış.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
if(!ayarlar.unregister) return message.channel.send (new MessageEmbed().setDescription(`**(\`Kayıtsız\`) Rolü ayarlanmamış.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000})); 
if(!ayarlar.tag) return message.channel.send (new MessageEmbed().setDescription(`**(\`TAG\`) sembölü ayarlanmamış.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));



const kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`**Bir kullanıcı etiketlemelisin.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
    
if(kullanici.roles.cache.has(ayarlar.erkek1)) return message.channel.send(new MessageEmbed().setDescription(`**Daha önceden kayıt olan birini tekrar kayıt edemezsin.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
if(kullanici.roles.cache.has(ayarlar.erkek2)) return message.channel.send(new MessageEmbed().setDescription(`**Daha önceden kayıt olan birini tekrar kayıt edemezsin.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
if(!kullanici.roles.cache.has(ayarlar.unregister)) return message.channel.send(new MessageEmbed().setDescription(`<a:hydrastarrr:802176913757831198> **Kişide <@&${ayarlar.unregister}> rölü bulunmadığından dolayı kayıt işlemine devam edemiyoruz.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
 
  
  
let isim = args[1]
let yas = Number(args[2])
if(kullanici.id === message.author.id) return message.channel.send(new MessageEmbed().setDescription(`**Kendini kayıt edemez.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`**Bu Kullanıcı senden üst/aynı pozisyonda.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!isim || !yas) return message.channel.send(new MessageEmbed().setDescription(`**Geçerli isim veya yaş belirtiniz.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));

kullanici.setNickname(`${ayarlar.tag} ${isim} | ${yas}`)


  
let timereplace = args[0];
let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat') 
datab.add('case', 1)
const darkly = await datab.fetch('case')
var tarih = new Date(Date.now())
var tarih2 = ms(timereplace)
var tarih3 = Date.now() + tarih2 +10800000
let ay = moment(Date.now()+10800000).format("MM")  
let gün = moment(Date.now()+10800000).format("DD")
let saat = moment(Date.now()+10800000).format("HH:mm:ss")
let yıl = moment(Date.now()+10800000).format("YYYY")
let kayıtsaat = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``
   
 
let kayıtlar = datab.fetch(`yetkili.${message.author.id}.toplam`)
let kayıtno = datab.fetch(`kayıtNo.${sunucu.name}`)
  
if(kayıtno === null) kayıtno = "0"
if(kayıtno === undefined) kayıtno = "0"
  
    
let toplamisim = datab.fetch(`isimler.${kullanici.id}.toplam1`);
  
  
if(toplamisim === null) toplamisim = "0"
if(toplamisim === undefined) toplamisim = "0"
  
  
datab.push(`isimlergösterme.${kullanici.id}.toplama`, {İsim: isim , Yas: yas , Yetkili: message.author.id , Zaman: kayıtsaat, KayıtNO: `${kayıtno}`});
     
let isimler = datab.get(`isimlergösterme.${kullanici.id}.toplama`)
let isimleriyazdır = isimler.filter(vader => vader.userID === isim.id).map(vader => ` • (\`${vader.İsim} | ${vader.Yas}\`) **${vader.Cinsiyet ? vader.Cinsiyet : "Belirleniyor"}** `)


const embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`

<a:hydraalevv:808620322030878750> **${kullanici} üyesinin ismi başarıyla "${ayarlar.tag} ${isim} | ${yas}" olarak güncellendi"**
<a:hydragoldstar:791092863806996520> **Cinsiyet belirlemek için sadece: \`${p}erkek /${p}kadın\` yazman yeterli.**
<a:hydrastarrr:802176913757831198> **Tagımızı almak için herhangi bir kanala tag yazıp alabilirsin**
<a:hydrastar:790708497637572638> **İyi eğlenceler**
`)

.setColor("RANDOM")
message.channel.send(embed).then(async mesaj => {
let kayıtonay = await message.channel.awaitMessages((m) => m.author.id == message.author.id && ["erkek", "kadın", "iptal"].some(cevap => m.content.toLowerCase().includes(cevap)), {max: 1, time: 60000 });

if(kayıtonay.size === null) return message.channel.send(
      
 new MessageEmbed()
.setColor("#ff0000")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`**${kullanici} üyesinin kayıt işlemi herhangi bir işlem gerçekleşmediğinden iptal oldu**`))
.then(x => x.delete({timeout: 5000}));
  



let erkekonay = kayıtonay.first();
if (erkekonay.content.toLocaleLowerCase().includes(`${p}erkek`)) {

kullanici.roles.add(ayarlar.erkek1)
kullanici.roles.add(ayarlar.erkek2)
kullanici.roles.remove(ayarlar.unregister)
  
//--------------------------------------------------------------------------------------------------------------------------------------------
  
const onayembed = new MessageEmbed()
.setColor("#220230")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setImage('https://cdn.discordapp.com/attachments/721047488026378250/785652339201671218/a_7a9f9325b2e57149b9039f1a7bb37791.gif')
.setDescription(`
<a:hydrastarrr:802176913757831198> ${kullanici} **adlı kullanıcının kaydı başarılı!** <a:hydrastarrr:802176913757831198>

<a:hydragoldstar:791092863806996520> **Kayıt Eden Yetkili:** <@${message.author.id}>

<a:hydraalevv:808620322030878750>**Kullanıcının Yeni ismi:** \`${isim} | ${yas}\`

<a:hydratk:798145168758669332> **Alınan roller : <@&${ayarlar.unregister}> ** 

<a:hydratk:798145168758669332> **Verilen roller : <@&${ayarlar.erkek1}> , <@&${ayarlar.erkek2}>** `)

.setFooter(`Toplam kayıtların: (${kayıtlar})`)
message.channel.send(onayembed)

datab.add(`isimler.${kullanici.id}.toplam1`, 1 );
datab.add(`yetkili.${message.author.id}.erkek`, 1); 
datab.add(`yetkili.${message.author.id}.toplam`, 1)  
datab.add(`kayıtNo.${sunucu.name}`, 1)
datab.delete(`isimlergösterme.${kullanici.id}.toplama` ,1)
    
await datab.push(`isimlergösterme.${kullanici.id}.toplama`, {İsim: isim , Yas: yas , Yetkili: message.author.id , Cinsiyet: "ERKEK", Zaman: kayıtsaat,  KayıtNO: `${kayıtno},`});

client.channels.cache.get(ayarlar.genelChat).send(new MessageEmbed().setAuthor('Aramıza Katıldı !').setDescription(`<a:hydrastarrr:802176913757831198> **${kullanici} Adlı Kullanıcı Aramıza katıldı ! hoşgeldin umarım keyifli vakit geçirirsin.**`).setColor('BLUE'))

client.channels.cache.get(ayarlar.kayitLog).send(new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setColor("#220230")
.setImage('https://cdn.discordapp.com/attachments/721047488026378250/785652339201671218/a_7a9f9325b2e57149b9039f1a7bb37791.gif')
.setDescription(`• <a:hydraalevv:808620322030878750>**Yetkili:** (<@${message.author.id}>)
• <a:hydraalevv:808620322030878750>**Kayıt Edilen:** (<@${kullanici.user.id}>)
• <a:hydraalevv:808620322030878750>**Yeni ismi:** (\`${isim} | ${yas}\`)
• <a:hydraalevv:808620322030878750>**Kayıt saat:** (\`${kayıtsaat}\`)`))
message.react('👑')     
}

let kadınonay = kayıtonay.first();
if (kadınonay.content.toLocaleLowerCase().includes(`${p}kadın`)) {

kullanici.roles.add(ayarlar.kadın1)
kullanici.roles.add(ayarlar.kadın2)
kullanici.roles.remove(ayarlar.unregister)

//----------------------------------------------------------------------------------------------------------------------------------------------
  
const onayembed = new MessageEmbed()
.setColor("#ffc3f6")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setImage('https://media.discordapp.net/attachments/791413854839373864/807950379185602570/image0.gif?width=195&height=110')
.setDescription(`
<a:hydrastarrr:802176913757831198> ${kullanici} **adlı kullanıcının kaydı başarılı!** <a:hydrastarrr:802176913757831198>

<a:hydragoldstar:791092863806996520> **Kayıt Eden Yetkili:** <@${message.author.id}>

<a:hydraalevv:808620322030878750> **Kullanıcının Yeni ismi:** \`${isim} | ${yas}\`

<a:hydratk:798145168758669332> **Alınan roller : <@&${ayarlar.unregister}> ** 

<a:hydratk:798145168758669332> **Verilen roller : <@&${ayarlar.kadın1}> , <@&${ayarlar.kadın2}>**
 `)
.setFooter(`Toplam kayıtların: (${kayıtlar})`)
message.channel.send(onayembed)
    
datab.add(`isimler.${kullanici.id}.toplam1`, 1 );
datab.add(`yetkili.${message.author.id}.kadın`, 1); 
datab.add(`yetkili.${message.author.id}.toplam`, 1)  
datab.add(`kayıtNo.${sunucu.name}`, 1)
datab.delete(`isimlergösterme.${kullanici.id}.toplama` ,1)
    
await datab.push(`isimlergösterme.${kullanici.id}.toplama`, {İsim: isim ,Yas: yas ,Yetkili: message.author.id ,Cinsiyet: "KADIN",Zaman: kayıtsaat, KayıtNO: `${kayıtno}`});
  
client.channels.cache.get(ayarlar.genelChat).send(new MessageEmbed().setAuthor('Aramıza Katıldı !').setDescription(`<a:hydratac:789369824249643009> **${kullanici} Adlı Kullanıcı Aramıza katıldı ! hoşgeldin umarım keyifli vakit geçirirsin.**`).setColor('RANDOM'))

client.channels.cache.get(ayarlar.kayitLog).send(new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setColor("#ffc3f6")
.setImage('https://media.discordapp.net/attachments/791413854839373864/807950379185602570/image0.gif?width=195&height=110')
.setDescription(`• <a:hydraalevv:808620322030878750>**Yetkili:** (<@${message.author.id}>)
• <a:hydraalevv:808620322030878750>**Kayıt Edilen:** (<@${kullanici.user.id}>)
• <a:hydraalevv:808620322030878750>**Yeni ismi:** (\`${isim} | ${yas}\`)
• <a:hydraalevv:808620322030878750>**Kayıt saat:** (\`${kayıtsaat}\`)
`))
message.react('👑')  
}

let iptal = kayıtonay.first();
if (iptal.content.toLocaleLowerCase().includes(`${p}iptal`)) {
const iptalembed = new MessageEmbed()
.setColor("RANDOM")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`${kullanici} üyesinin kayıt işlemi iptal edildi. ❌`)
message.channel.send(iptalembed).then(x => x.delete({timeout: 5000}));
      
datab.delete(`isimlergösterme.${kullanici.id}.toplama` ,1)}})


  }

  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["n", "i"],
  permLevel: 0
};
exports.help = {
  name: "isim",
  description: "",
  usage: ""
};
   