
const clockDisplay = document.querySelector("#clockDisplay");
const addInput = document.getElementById("addInput");
const addBtn = document.querySelector("#addBtn");
const todoListContainer = document.querySelector("#todoListContainer");

// clock functionality
function updateClock(){
    const date = new Date();
    let hours = date.getHours();
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2,0);
    const minutes = date.getMinutes().toString().padStart(2,0);
    clockDisplay.textContent = `${hours}:${minutes}`;
}

// update Clock every sec
updateClock();
setInterval(updateClock, 1000);
let listCount = 1;


// load from storage
if(localStorage.length > 0){
    for(i=0; i < localStorage.length; i++){
        setupDisplay(localStorage[localStorage.key(i)]);
    }
}

//input
addBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const input = addInput.value;
    if(input.length <= 40 && input.length >= 1 && listCount <= 8){
        localStorage.setItem(input, input);
        setupDisplay(input);
    }
})

// using close button
document.addEventListener("click", (e) => {
    if(e.target.classList[1] == "close" || e.target.classList[1] == "check"){
        e.target.parentElement.remove();
        localStorage.removeItem(e.target.parentElement.firstChild.textContent.toString());
    }  
})

// Task display setup
function setupDisplay(input){
    const taskContainerDiv = document.createElement("div");
        taskContainerDiv.classList.add("taskContainer");

        const taskDiv = document.createElement("div");
        taskDiv.textContent = input;
        taskDiv.classList.add("task");

        const checkBtn = document.createElement("img");
        checkBtn.src = "./check.svg";
        checkBtn.classList.add("btn");
        checkBtn.classList.add("check");
        const closeBtn = document.createElement("img");
        closeBtn.src = "./close.svg";
        closeBtn.classList.add("btn");
        closeBtn.classList.add("close");
        const editBtn = document.createElement("img");
        editBtn.src = "./edit.svg";
        editBtn.classList.add("btn");
        editBtn.classList.add("edit");

        taskContainerDiv.appendChild(taskDiv);
        taskContainerDiv.appendChild(checkBtn);
        taskContainerDiv.appendChild(closeBtn);
        taskContainerDiv.appendChild(editBtn);

        todoListContainer.appendChild(taskContainerDiv);
        addInput.value = "";
        listCount ++;
}