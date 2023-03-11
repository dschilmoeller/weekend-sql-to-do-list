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


function getList() {
    console.log('in getlist')
    $.ajax({
        method: 'GET',
        url: '/todolist'
    }).then(function (response) {
        console.log('to do list', response)
        render(response)
    }).catch(function (error) {
        console.log('error retrieving todo list', error)
    })
}

function addTask() {
    let newData = {
        taskName: $('#taskNameIn').val(),
        taskDesc: $('#taskDescIn').val(),
        complete: false
    }
    // console.log('name', newData.taskName, 'desc', newData.taskDesc, 't/f', newData.complete)
    // console.log('inside addTask')
    if (newData.taskName && newData.taskDesc) {
        if (newData.taskDesc.length < 100) {
            $.ajax({
                type: 'POST',
                url: '/todolist',
                data: newData
            }).then((response) => {
                console.log('response from server', response);
                getList()
                $('#taskNameIn').val(''),
                    $('#taskDescIn').val('')
            }).catch((error) => {
                console.log('error in post', error);
            });
        } else {
            alert('Come on, your description is too long!')
        }
    } else {
        alert('Please fill out all required fields')
    }
}

function completeTask() {
    console.log(`inside complete task`);
    let idToComplete = $(this).parent().data().id
    $.ajax({
        method: 'PUT',
        url: `/todolist/complete/${idToComplete}`
    }).then((response) => {
        getList()
    }).catch((error) => {
        alert('task not marked complete - PUT error')
    })
}

function decompleteTask() {
    console.log(`I'm fairly sure decomplete isn't a word.`);
    let idToUncomplete = $(this).parent().data().id
    $.ajax({
        method: 'PUT',
        url: `/todolist/uncomplete/${idToUncomplete}`
    }).then((response) => {
        getList()
    }).catch((error) => {
        alert('task not marked uncomplete - PUT error')
    })
}

function deleteTask() {
    $.ajax({
        type: "DELETE",
        url: `/todolist/delete/${$(this).parent().parent().data().id}`
    }).then((result) => {
        getList();
    }).catch((error) => {
        console.log(`error deleting task`, error);
    })
}

function render(input) {
    $('#listRenderArea').empty()
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