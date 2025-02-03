$(document).ready(function () {

    loadTasks();

    $("button").on("click", function (event) {
        const taskName = prompt("Enter a new task name:");
        if (taskName !== null && taskName.trim() !== "") {
            addTask(taskName);
            saveTasksToCookie();
        }
    });

    function addTask(taskName) {
        const taskList = $("#ft_list");
        const taskContainer = $("<ul>");
        const taskData = $("<li>");

        taskData.text(taskName);
        taskContainer.addClass("todo-item");
        taskContainer.on("click", function (event) {
            const isDelete = confirm("Do you want to delete this task?");
            if (isDelete) {
                deleteTask(taskContainer);
                saveTasksToCookie();
            }
        });
        taskContainer.append(taskData);
        taskList.prepend(taskContainer);
    }

    function deleteTask(taskId) {
        taskId.remove();
    }


    function saveTasksToCookie() {
        const taskList = $("#ft_list");
        const tasks = [];

        taskList.children().each(function () {
            if ($(this).prop("tagName") === "UL") {
                tasks.push($(this).children(":first").text());
            }
        });

        document.cookie = "tasks=" + JSON.stringify(tasks);
    }

    function loadTasks() {
        const cookies = document.cookie.replace("tasks=[","").replace("]","").replace(/"/g, "").split(",");
        
        if(cookies[0] != "") {
            for(let i = cookies.length-1 ; i >= 0  ; i--) {
                addTask(cookies[i])
            }
        }
    }


});