document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function newTask() {
    const taskName = prompt("Enter a new task name:");
    if (taskName !== null && taskName.trim() !== "") {
        addTask(taskName);
        saveTasksToCookie();
    }
}

function addTask(name) {
    const taskList = document.getElementById("ft_list");
    const taskContainer = document.createElement("ul");
    const taskData = document.createElement("li");

    taskData.textContent = name;
    taskContainer.classList.add("todo-item");
    taskContainer.addEventListener("click", function () {
        const isDelete = confirm("Do you want to delete this task?");
        if(isDelete) {
            deleteTask(taskContainer);
            saveTasksToCookie();
        }
    });
    taskContainer.appendChild(taskData);
    taskList.prepend(taskContainer);
}

function deleteTask(taskId) {
    taskId.remove();
}

function saveTasksToCookie() {
    const taskList = document.getElementById("ft_list");
    const tasks = [];
    
    taskList.childNodes.forEach(function (taskItem) {
        if (taskItem.nodeName === "UL") {
            tasks.push(taskItem.firstChild.textContent);
        }
    });

    document.cookie = "tasks=" + JSON.stringify(tasks);
}

function loadTasks() {
    const cookies = document.cookie.replace("tasks=[","").replace("]","").replace(/"/g, '').split(",");
    console.log(cookies);
    
    if(cookies[0] != "") {
        for(let i = cookies.length-1 ; i >= 0  ; i--) {
            addTask(cookies[i])
            console.log(cookies[i]);
        
        }
    }
}