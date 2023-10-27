const abi = require("./abi.json");
const { token } = require('./config.json');

const ethers = require('ethers');
const { Client, Intents, GatewayIntentBits, MessageAttachment } = require('discord.js');

require('dotenv').config();

// #mint-and-reveal: 1138191803095449702

const network = {
  name: "ethereum",
  chainId: 1,
  _defaultProvider: (providers) => new providers.JsonRpcProvider(process.env.ALCHEMY_URL)
};

const provider = ethers.getDefaultProvider(network);
const scrollsContract = new ethers.Contract('0xcE8169a6fb6770C0c6D411A734DD6d74bB241097', abi, provider);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', async () => {
  console.log('Ready!', Date.now());

  const discordChannel = client.channels.cache.get('1167483429139513384');

  // TODO: mention @taisheen //<@763073740136513577>
  // TODO: mention Zkitty @556699524203151363

  // when the public mint happens
  scrollsContract.on("Transfer", async (from, to ,tokenId) => {
    const callTaisheen =
      Number(tokenId.toString()) > 3800
      ? '<@763073740136513577> <@556699524203151363> Be ready for breakTransfer()!'
      : '';

    discordChannel.send(
      `New mint! ${tokenId.toString()}. ${callTaisheen}`
    );
  });

});

client.login(token);
