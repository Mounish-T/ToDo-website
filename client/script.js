/* import { getTasks } from "./api-handler/fetch-api";

let array = new Array();

var availableTasks = {};

getTasks().then(data => {
    availableTasks = data;
    console.log(availableTasks);
});


let list_count = -1;

let count = document.getElementById('count');
let add = document.getElementById("add");
let card = document.getElementsByClassName("card")[0];


// Initial UI setup
function updateUI() {
    if (array.length === 0) {
        card.innerHTML = `<h4 style="justify-self: center; padding-top: 33%; font-size: large;">Currently, You have no pending tasks!!!</h4>`;
        list_count = -1;
    } 
    else {
        let display_text = '';
        array.forEach((task, index) => {
            display_text += `
                <div class="group">
                    <div class="content">
                        <h3>${task}</h3>
                    </div>
                    <div class="icons">
                        <i class='fas fa-pen' data-index="${index}" style='font-size:24px'></i>
                        <i class='fas fa-trash' data-index="${index}" style='font-size:24px; padding-left: 40px'></i>
                    </div>
                </div>
                <hr>`;
        });
        card.innerHTML = display_text;
    }
    count.innerText = "Count: " + (array.length);
}


card.addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');
    // Ignore clicks outside icons
    if (!index) return; 

    if (e.target.classList.contains('fa-pen')) {
        // Edit Task
        const newTask = prompt("Edit Task:", array[index]);
        if (newTask !== null && newTask.trim() !== "") {
            array[index] = newTask.trim();
            updateUI();
        } else if (newTask !== null) {
            alert("Input can't be empty!");
        }
    } else if (e.target.classList.contains('fa-trash')) {
        // Delete Task
        array.splice(index, 1);
        updateUI();
    }
});


// Add New Task
add.addEventListener('click', () => {
    const newTask = prompt("Enter the task:");
    if (newTask !== null && newTask.trim() !== "") {
        array.push(newTask.trim());
        updateUI();
    } else if (newTask !== null) {
        alert("Input can't be empty!");
    }
});

// Initialize
updateUI(); */

import { createTask, defaultRoute, deleteTask, getTasks, updateTask } from "./api-handler/fetch-api.js";

let availableTasks = [];

const count = document.getElementById('count');
const add = document.getElementById('add');
const card = document.getElementsByClassName('card')[0];

function updateUI(){
    if(!Array.isArray(availableTasks[0]) || availableTasks[0].length === 0){
        card.innerHTML = `<h4 style="justify-self: center; padding-top: 33%; font-size: large;">Currently, You have no pending tasks!!!</h4>`
    }
    else{
        let display_text = '';
        availableTasks[0].forEach((task, index) => {
            display_text += `<div class="group">
                    <div class="content">
                        <h3>${task.task_name}</h3>
                    </div>
                    <div class="icons">
                        <i class='fas fa-pen' data-index="${index}" style='font-size:24px'></i>
                        <i class='fas fa-trash' data-index="${index}" style='font-size:24px; padding-left: 40px'></i>
                    </div>
                </div>
                <hr>`;
        });
        card.innerHTML = display_text;
    }
    count.innerText = "Count: " + (!Array.isArray(availableTasks[0]) || availableTasks[0].length == 0 ? 0 : availableTasks[0].length);
}

async function loadTasks() {
    try {
        const data = await getTasks();
        availableTasks = [data];
        console.log(availableTasks);
        updateUI();
    } catch (error) {
        prompt("Server is not connected");
    }
}

// Add New Task
add.addEventListener('click', async () => {
    const newTask = prompt("Enter the task:");
    if (newTask && newTask.trim() !== "") {
        await createTask(newTask.trim());
        loadTasks();
    } else if (newTask !== null) {
        alert("Input can't be empty!");
    }
});

// Handle edit/delete clicks
card.addEventListener('click', async (e) => {
    const index = e.target.getAttribute('data-index');
    if (index === null) return;

    if (e.target.classList.contains('fa-pen')) {
        const newTask = prompt("Edit Task:", availableTasks[0][index].task_name);
        if (newTask && newTask.trim() !== "") {
            await updateTask(newTask, availableTasks[0][index]._id)
            loadTasks();
        } else if (newTask !== null) {
            alert("Input can't be empty!");
        }
    } else if (e.target.classList.contains('fa-trash')) {
        await deleteTask(availableTasks[0][index]._id);
        loadTasks();
    }
});

defaultRoute();
loadTasks();