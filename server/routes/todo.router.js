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

router.put('/complete/:id', (req, res) => {
    let completeID = req.params.id;
    const sqlText = `update todolist SET complete = true where id=$1`
    pool.query(sqlText, [completeID])
    .then((result) => {
        console.log('task with id', completeID, 'marked true');
        res.sendStatus(200)
    })
    .catch((error) => {
        console.log(`error:`, error);
        res.sendStatus(500)
    })
})

router.put('/uncomplete/:id', (req, res) => {
    let completeID = req.params.id;
    const sqlText = `update todolist SET complete = false where id=$1`
    pool.query(sqlText, [completeID])
    .then((result) => {
        console.log('task with id', completeID, 'marked false');
        res.sendStatus(200)
    })
    .catch((error) => {
        console.log(`error:`, error);
        res.sendStatus(500)
    })
})


module.exports = router