const Sequelize = require('Sequelize')
const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost/detach`)

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastDetach: {
        type: Sequelize.DATE,
        allowNull: true
    },
    response: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "I'm currently detached from my phone, I will be back online soon"
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})


const Contact = db.define('contact', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastDetach: {
        type: Sequelize.DATE,
        allowNull: true
    },
    response: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "I'm currently detached from my phone, I will be back online soon"
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

const Message = db.define('message', {
    body: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

Message.belongsTo(User)
Contact.belongsToMany(User, { through: 'UserContact' })
User.belongsToMany(Contact, { through: 'UserContact' })


const syncAndSeed = () => {
    return db.sync({ force: true })
            .then(() => {
                return Promise.all([
                    User.create({
                        name: 'Amr Thameen',
                        phoneNumber: '+18557550509',
                        lastDetach: '2018-11-08T23:38:39.774Z'
                    })
                ])
            })
            .then((users) => {
                [amr] = users
                return Promise.all([
                    Contact.create({
                        name: 'Harry Kihonge',
                        phoneNumber: '+14157661755'
                    }),
                    Contact.create({
                        name: 'Andrea Tanco',
                        phoneNumber: '+14133873104'
                    }),
                    Contact.create({
                        name: 'Robert Joyce',
                        phoneNumber: '+18483911957'
                    }),
                    Contact.create({
                        name: 'Laith Thameen',
                        phoneNumber: '+9647901329575'
                    })
                ])
            })
            .then((contacts) => {
                [harry, andrea, robert, nawras] = contacts
                return Promise.all([
                    amr.addContact(harry),
                    amr.addContact(robert),
                    amr.addContact(andrea),
                    amr.addContact(nawras)
                ])
            })
}


module.exports = {
    models: {
        User, 
        Message,
        Contact
    },
    syncAndSeed
}