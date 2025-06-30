// const baseUrl = 'https://jsonplaceholder.typicode.com';
const baseUrl = 'http://127.0.0.1:1000';
var val;
var desc = "dADDF";
console.log(baseUrl);

function getData(){
    var url = baseUrl + '/addwork';
    fetch(url).then((response)=>{
        console.log(response.statusText);
        return response.json();
    }).then((data)=>{
        console.log(data);
    });
}

function postData(){
    var url = baseUrl + '/posts';
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            name: "Mounish",
            body: "My name",
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=> console.log(data));
}

function editData(){
    var url = baseUrl + '/posts/3';
    fetch(url, {
        method: "put",
        body: JSON.stringify({
            id: 1,
            title: "heldlo",
            body: desc,
            userId: 120,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
    })
}

function deleteData(){
    var url = baseUrl + '/posts/4';
    fetch(url, {
        method: 'DELETE',   
    });
}

function fetchParticularData(){
    var url = baseUrl + '/posts?id=1&title=qui est esse';
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
    })
}

add.addEventListener('click', () => {
    const newTask = prompt("Enter the task:");
    if (newTask !== null && newTask.trim() !== "") {
        // array.push(newTask.trim());
        getData();
        // editData();
        // deleteData();
        // fetchParticularData();
    } else if (newTask !== null) {
        alert("Input can't be empty!");
    }
});