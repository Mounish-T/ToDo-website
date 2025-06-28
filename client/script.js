let array = new Array();

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
updateUI();