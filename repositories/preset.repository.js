const Sequelize = require('sequelize');

const db = new Sequelize('fhu_presets', '', '', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: '../fhu-sync-db/database.sqlite'
});

const Preset = db.define('preset', {
    name : {
        type: Sequelize.STRING,
        unique: true
    },
    download_link: {
        type: Sequelize.STRING,
        unique: true
    },
    author_id : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    size : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    thumbnail : {
        type: Sequelize.STRING,
        allowNull : true
    },
    preview_1 : {
        type: Sequelize.STRING,
        allowNull : true
    },
    preview_2 : {
        type: Sequelize.STRING,
        allowNull : true
    },
})

module.exports = {
    syncModel: () => { Preset.sync(); },

    getPresets: async (startIndex, size, sort) => {
        return await Preset.findAll();
    },

    getAllPresets: async (sinceTimestamp) => {
        return await Preset.findAll({
            order: [
                ['createdAt', 'DESC'],
            ]
        });
    }
}