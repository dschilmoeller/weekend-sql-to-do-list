console.log('todoJS');

$(document).ready(onReady)

function onReady() {
    // startup get&render
    getList()
    // click listeners
    $('#submitBtn').on('click', addTask)
    $('#listRenderArea').on('click', '#incompleteTask', completeTask)
    $('#listRenderArea').on('click', '#completedTask', decompleteTask)
    $('#listRenderArea').on('click', '#deleteBtn', deleteTask)
}

// retrieve task database entries
function getList() {
    // console.log('in getlist')
    $.ajax({
        method: 'GET',
        url: '/todolist'
    }).then(function (response) {
        // console.log('to do list', response)
        // render (below) response onto DOM
        render(response)
    }).catch(function (error) {
        console.log('error retrieving todo list', error)
    })
}

// add new task to database
function addTask() {
    let newData = {
        taskName: $('#taskNameIn').val(),
        taskDesc: $('#taskDescIn').val(),
        complete: false
        // complete, above, may not be necessary due to DEFAULT false
    }
    // console.log('name', newData.taskName, 'desc', newData.taskDesc, 't/f', newData.complete)
    // console.log('inside addTask')
    // check fields
    if (newData.taskName && newData.taskDesc) {
        // check description length so text doesn't overflow post it
        if (newData.taskDesc.length < 100) {
            $.ajax({
                type: 'POST',
                url: '/todolist',
                data: newData
            }).then((response) => {
                // console.log('response from server', response);
                // run GET to retrieve and render data including new task
                getList()
                // clear inputs
                $('#taskNameIn').val(''),
                $('#taskDescIn').val('')
            }).catch((error) => {
                console.log('error in post', error);
            });
        } else {
            // encourage user to be sparing in their verbiage for their own good
            alert('Come on, your description is too long!')
        }
    } else {
        alert('Please fill out all required fields')
    }
}

// mark task as complete in database
function completeTask() {
    // console.log(`inside complete task`);
    let idToComplete = $(this).parent().data().id
    $.ajax({
        method: 'PUT',
        url: `/todolist/complete/${idToComplete}`
    }).then((response) => {
        // get updated list and re-render.
        getList()
    }).catch((error) => {
        alert('task not marked complete - PUT error')
    })
}

// mark task as not complete
function decompleteTask() {
    // console.log(`I'm fairly sure decomplete isn't a word.`);
    let idToUncomplete = $(this).parent().data().id
    $.ajax({
        method: 'PUT',
        url: `/todolist/uncomplete/${idToUncomplete}`
    }).then((response) => {
        // get updated list and re-render.
        getList()
    }).catch((error) => {
        alert('task not marked uncomplete - PUT error')
    })
}

// delete task from DB / DOM
function deleteTask() {
    $.ajax({
        type: "DELETE",
        url: `/todolist/delete/${$(this).parent().parent().data().id}`
    }).then((result) => {
        // get updated list and re-render
        getList();
    }).catch((error) => {
        console.log(`error deleting task`, error);
    })
}

function render(input) {
    // empty render area
    $('#listRenderArea').empty()
    // run through DB rows and render as appropriate based on task completion being T/F
    for (let todo of input) {
        console.log('todo is', todo)
        if (todo.complete === false) {
            $('#listRenderArea').append(`
            <li data-id='${todo.id}'>
                <a href="#" id="incompleteTask">
                <h2>${todo.taskname}</h2>
                <p>${todo.taskdesc}</p>
                <button id="deleteBtn">X</button>
                </a>
            </li>
            `)
        } else {
            $('#listRenderArea').append(`
            <li data-id='${todo.id}'>
                <a href="#" id="completedTask">
                <h2>${todo.taskname}</h2>
                <p>${todo.taskdesc}</p>
                <button id="deleteBtn">X</button>
                </a>
            </li>
            `)
        }
    }
}