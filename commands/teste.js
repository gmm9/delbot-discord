// const { Client, GatewayIntentBits } = require('discord.js');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');
// const { SlashCommandBuilder } = require('@discordjs/builders');
// const Speech = require('@google-cloud/speech');

// const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.VoiceStates] });

// const commands = [
//   new SlashCommandBuilder()
//     .setName('play')
//     .setDescription('Tocar música')
//     .addStringOption(option =>
//       option.setName('query')
//         .setDescription('A música que você quer ouvir')
//         .setRequired(true)),
// ]
//   .map(command => command.toJSON());

// const rest = new REST({ version: '9' }).setToken('YOUR_BOT_TOKEN');

// (async () => {
//   try {
//     console.log('Started refreshing application (/) commands.');

//     await rest.put(
//       Routes.applicationGuildCommands('YOUR_CLIENT_ID', 'YOUR_GUILD_ID'),
//       { body: commands },
//     );

//     console.log('Successfully reloaded application (/) commands.');
//   } catch (error) {
//     console.error(error);
//   }
// })();

// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('interactionCreate', async interaction => {
//   if (!interaction.isCommand()) return;

//   const query = interaction.options.getString('query');
//   const audioBuffer = ''/* Capture and convert audio from interaction's voice channel */
  
//   const speechClient = new Speech.SpeechClient();
//   const request = {
//     config: {
//       encoding: 'LINEAR16',
//       sampleRateHertz: 16000,
//       languageCode: 'en-US',
//     },
//     audio: {
//       content: audioBuffer.toString('base64'),
//     },
//   };

//   const [response] = await speechClient.recognize(request);
//   const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');

//   // Process the transcription to extract the song name
//   let songName = '';
//   const playCommand = '/play';
//   if (transcription.includes(playCommand)) {
//     songName = transcription.slice(transcription.indexOf(playCommand) + playCommand.length).trim();
//   }
  
//   console.log(`Song Name: ${songName}`);
  
//   // Continue with your current play logic
// });

// client.login('YOUR_BOT_TOKEN');
