const mainUrl = 'http://192.168.167.244:1000/';
const baseUrl = 'http://192.168.167.244:1000/tasks';

export async function defaultRoute() {
    try{
        const respone = await fetch(mainUrl);
        console.log(respone);
    }
    catch (error){
        alert("Server is not Connected");
    }
}

export async function getTasks(){
    try {
        const response = await fetch(baseUrl, {
            method: "GET"
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export async function createTask(newTask){
    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify({
                'task_name': newTask
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        if(response.status == 201){
            const data = await response.json();
            return data;
        }
        else if(response.status == 409){
            alert("Given Task is already added, Please add different task");
        }
    } catch (error) {
        return error;
    }
}

export async function updateTask(modifyTask, id){
    try{
        var url = baseUrl + "/" + id;
        console.log(url);
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                'task_name': modifyTask
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        if(response.status == 200){
            const data = await response.json();
            return data;
        }
        else if(response.status == 409){    
            alert("Given Task is already added, Please add different task");
        }
    } catch (error){
        return error.message;
    }
}

export async function deleteTask(id){
    try{
        var url = baseUrl + "/" + id;
        const response = await fetch(url, {
            method: "DELETE"
        });
        if(response.status == 200){
            const data = response.json();
            return data;
        }
    } catch (error){
        return error.message;
    }
}
