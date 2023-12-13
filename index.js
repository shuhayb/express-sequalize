const express = require("express");
const sequelize = require('./database')
const User = require('./User');

sequelize.sync({ force: true}).then(() => console.log("db is ready"))

const app = express();

app.use(express.json());

app.post('/users', (req, res) => {
    User.create(req.body).then(() => {
        res.send("user is inserted")
    })
})

app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.send(users);
})

app.get('/users/:id', async (req, res) => {
    const requestedID = req.params.id;
    const user = await User.findOne({ where: {id: requestedID}})
    res.send(user);
})

app.put('/users/:id', async (req, res) => {
    const requestedID = req.params.id;
    const user = await User.findOne({ where: {id: requestedID}})
    user.username = req.body.username;
    await user.save();
    res.send("user has been updated");
})

app.delete('users/:id', async (req,res) => {
   const requestedID = req.params.id;
   await User.destroy({ where: {id: requestedID}});
   res.send("User has been removed");
})

app.listen(3000, () => {
    console.log("app is running on port 3000")
})