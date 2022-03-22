const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL ||'postgres://localhost/dealers_choice_full_stack');

const Task = sequelize.define('task', {
    name: {
        type: Sequelize.STRING
    }
})

Task.generateRandom = function() {
    return this.create({ name: `Task ${ Math.ceil(Math.random()*5000)}`});
}
const start = async()=>{
    try{
        await sequelize.sync({ force:true });
        await Promise.all([
            Task.generateRandom(),
            Task.generateRandom(),
            Task.generateRandom(),
        ]);
    
    }
    catch(ex) {
        console.log(ex)
    }
}

const express = require('express');
const app = express();
const path = require('path');


app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

start();