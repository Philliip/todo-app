// Retrieve todo from local storage or initialize an empty array
//let - can be changed later
//const - cannot be changed later
let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// initialize project
document.addEventListener("DOMContentLoaded",
    function () {
        addButton.addEventListener("click", addTask);
        todoInput.addEventListener('keydown', function (event){
            if (event.key === 'Enter') {
                event.preventDefault(); //does not refresh/send us to different page
                addTask()
            }
        });
        deleteButton.addEventListener("click", deleteAllTasks);
        displayTasks();
    }
);

function addTask() {
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        todo.push({
            task: newTask,
            completed: false
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
}

function deleteAllTasks() {
    todo = [];
    saveToLocalStorage()
    displayTasks()
}

function displayTasks() {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        // modify HTML code in JS through ``
        p.innerHTML = `
            <div class="todo-container">
               <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.completed ? "checked" : ""}> 
               <p id="todo-${index}" class="${item.completed ? "disabled" : ""}" onclick="editTask(${index})">
                    ${item.task}
               </p>
            </div>
        `
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index)
        });
        todoList.appendChild(p)
    });
    todoCount.textContent = todo.length.toString();
}

function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].task;
    const inputElement = document.createElement("input");
    if (todo[index].completed) {
        return
    }
    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();
    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].task = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });
    inputElement.addEventListener('keydown', function (event){
        if (event.key === 'Enter') {
            event.preventDefault(); //does not refresh/send us to different page
            const updatedText = inputElement.value.trim();
            if (updatedText) {
                todo[index].task = updatedText;
                saveToLocalStorage();
            }
            displayTasks();
        }
    });

}

function toggleTask(index) {
    todo[index].completed = !todo[index].completed;
    saveToLocalStorage();
    displayTasks();
}


function saveToLocalStorage(){
    localStorage.setItem("todo", JSON.stringify(todo))
}