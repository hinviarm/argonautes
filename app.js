const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Sequelize } = require('sequelize');

// Database component
const config = {
    host: 'localhost',
    user: 'root',
    password: 'Qwerty123',
    database: 'argodb',
    port: 3306
};

const app = express();

app.use(bodyParser.json());
app.use(express.static('./web'));

app.get('/api/v1/members', async (req, res) => {
    res.json(await getAllMembers());
});

app.post('/api/v1/members', async (req, res) => {
    let output = { name: req.body.name};
    if (req.body && req.body.name) {
        output.id = await addMember(req.body.name);
    }
    res.json(output);
});

const sequelize = new Sequelize(config.database, config.user, config.password, {
    dialect: "mysql",
    host: config.host
});

try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL!');
} catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
}




const webserver = app.listen(5000, function () {
    console.log('Node Web server is running on port 5000 ...');
});


function getAllMembers() {
    return sequelize.query("select * from members").then(([results, metadata]) => {
        return results;
    });
}

function addMember(name) {
    if (!name) return ;
    return sequelize.query("insert into members (name) values ('" + name + "')").then(([results, metadata]) => {
        console.log(results);
        return results;
    });
}