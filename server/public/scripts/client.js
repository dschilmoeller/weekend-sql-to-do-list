console.log('todoJS');

$(document).ready(onReady)

function onReady() {
    // startup get&render
    getList()
    // click listener
    $('#submitBtn').on('click', addTask)
    $('#toDoTable').on('click', '#completeBtn', completeTask)
    $('#toDoTable').on('click', '#decompleteBtn', decompleteTask)
    $('#toDoTable').on('click', '#deleteBtn', deleteTask)
}

// from sticky guide - making notes editable and storable.
// things are likely to go off the rails here.

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
    console.log('name', newData.taskName, 'desc', newData.taskDesc, 't/f', newData.complete)
    console.log('inside addTask')
    if (newData.taskName && newData.taskDesc) {
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

        })
    } else {
        alert('Please fill out all required fields')
    }
}

function completeTask() {
    console.log(`inside complete task`);
    let idToComplete = $(this).parent().parent().data().id
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
    let idToUncomplete = $(this).parent().parent().data().id
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
                <a href="#">
                <h2>${todo.taskname}</h2>
                <p>${todo.taskdesc}</p>
                </a>
            </li>
            `)
        } else {
            $('#listRenderArea').append(`
            <li data-id='${todo.id}'>
                <a href="#">
                <h2>${todo.taskname}</h2>
                <p>${todo.taskdesc}</p>
                </a>
            </li>
            `)  
        }
    }
}

// <th><button id='completeBtn'>Finish This</button></th>
//                 <th><button id='deleteBtn'>Delete</button></th>
// <th><button id='decompleteBtn'>Wait I'm not quite done</button></th>
//                 <th><button id='deleteBtn'>Delete</button></th>
