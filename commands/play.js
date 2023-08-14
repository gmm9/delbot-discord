const { GuildMember, ApplicationCommandOptionType } = require('discord.js');
const { QueryType, useMainPlayer } = require('discord-player');
const { isInVoiceChannel } = require("../utils/voicechannel");

module.exports = {
    name: 'play',
    description: 'Tocar musica!',
    options: [
        {
            name: 'query',
            type: ApplicationCommandOptionType.String,
            description: 'A musica que você quer ouvir',
            required: true,
        },
    ],
    async execute(interaction) {
        console.log(interaction.user.username)
        // if (interaction.user.username === "yagoamorim") {
        //     await interaction.reply("Pegue essa playlist e aprenda a ter um bom gosto ! \n https://open.spotify.com/playlist/0osMdYiMMIMFxaYkJoHmAA?si=b15d74783e7049cb");
        //     return;
        // } else {
        try {
            const inVoiceChannel = isInVoiceChannel(interaction)
            if (!inVoiceChannel) {
                return
            }

            await interaction.deferReply();

            const player = useMainPlayer()
            const query = interaction.options.getString('query');
            const searchResult = await player.search(query)
            if (!searchResult.hasTracks())
                return void interaction.followUp({ content: 'Nada encontrado aqui!' });

            try {
                const res = await player.play(interaction.member.voice.channel.id, searchResult, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        leaveOnEmptyCooldown: 300000,
                        leaveOnEmpty: true,
                        leaveOnEnd: false,
                        bufferingTimeout: 0,
                        volume: 10,
                        //defaultFFmpegFilters: ['lofi', 'bassboost', 'normalizer']
                    }
                });

 
                    await interaction.followUp({
                        content: `⏱ | Carregando sua ${searchResult.playlist ? 'playlist' : 'fila'}...`,
                    });
            } catch (error) {
                await interaction.editReply({
                    content: 'Um erro aconteceu!'
                })
                return console.log(error);
            }
        } catch (error) {
            await interaction.reply({
                content: 'Aconteceu um erro ao tentar reproduzir sua musica: ' + error.message,
            });
        }
        // }
    },
};
