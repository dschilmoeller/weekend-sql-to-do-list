const express = require('express');
const router = express.Router();
const pg = require('pg')

const pool = new pg.Pool({
    database: 'todolist',
    host: 'localhost',
    port: 5432
});

router.get('/', (req, res) => {
    console.log(`in router.get`);
    const queryText = `SELECT * FROM "todolist";`;
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    console.log('in router.post');
    let newTask = req.body;
    console.log(`req.body is`, req.body);

    let queryText = `INSERT INTO "todolist" ("taskname", "taskdesc", "complete")
                        VALUES ($1, $2, $3);;`
    
    pool.query(queryText, [newTask.taskName, newTask.taskDesc, newTask.complete])
    .then(result => {
        console.log('Success adding task', newTask);
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Failure adding new task', error);
        res.sendStatus(500);
    })
});


module.exports = router