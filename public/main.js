const addBtn = document.querySelector('#add-task')
const delBtn = document.querySelectorAll('.del-task')
const updBtn = document.querySelectorAll('.edit-task')
const reloadBtn = document.querySelector('#reload')
 
addBtn.addEventListener('click', () => {
    let inputTask = document.querySelector('#task')
    let inputTime = document.querySelector('#time')
    let inputTaskId = document.querySelector('#task_id')
    let inputTaskVal = inputTask.value.trim()
    let inputTimeVal = inputTime.value.trim()
    let inputTaskIdVal = inputTaskId.value.trim()
    if (inputTaskVal && inputTimeVal) {
        if (inputTaskIdVal) {
            // update task
            fetch('/list',{
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: inputTaskIdVal,
                    data: {
                        task: inputTaskVal,
                        time: inputTimeVal, 
                    },
                })
            })
            .then((result) => {
                if(result.status === 200){
                    alert("Your task is updated!");
                    window.location.reload(true);
                }
                else{
                    alert("Something went wrong, please try again later!");
                }
            })
            .catch((error) => {
                console.log(error.message);
                alert("Something went wrong, please try again later!");
            })
        } else {
            //add task
            fetch('/list', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    task: inputTaskVal,
                    time: inputTimeVal,
                })
            })
            .then((result) => {
                if (result.taskId !== 0) {
                    alert("Your task is added!");
                    window.location.reload(true);
                } else {
                    alert("Something went wrong, please try again later!");
                }
            })
            .catch((error) => {
                console.log(error.message);
                alert("Something went wrong, please try again later!");
            })
        }
    } else {
        alert('Invalid input!');
    }
})

function deleteTask() {
    let inputTaskId = this.getAttribute("data-val").trim();
    if (inputTaskId) {
        //delete task
        fetch('/list', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                taskId: inputTaskId,
            })
        })
        .then((result) => {
            if (result.status === 204) {
                alert("Your task is removed!");
                window.location.reload(true);
            } 
            else {
                alert("Something went wrong, please try again later!");
            }
        })
        .catch((error) => {
            console.log(error.message);
            alert("Something went wrong, please try again later!");
        })
    }
     else {
        alert('Invalid input!');
    }
}
Array.from(delBtn).forEach(function(element) {
    element.addEventListener('click', deleteTask);
});


function updateTask(){
    let inputTaskId = this.getAttribute("data-val").trim();
    if (inputTaskId) {  
        document.querySelector('#task').value = this.getAttribute("data-task").trim()
        document.querySelector('#time').value = this.getAttribute("data-time").trim()
        document.querySelector('#task_id').value = inputTaskId
        document.querySelector('#add-task').value = "Change Task +"
    } else {
        alert('Invalid input!')
    }
}
Array.from(updBtn).forEach(function(element) {
    element.addEventListener('click', updateTask);
});

reloadBtn.addEventListener('click', () => {
    window.location.reload(true);
})
