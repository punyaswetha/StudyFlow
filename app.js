let dashboard = document.querySelector("#dashboard");

let totalTask = document.querySelector(".total-tasks p");

let complete = document.querySelector(".completed p");

let pending = document.querySelector(".pending p");

let progress = document.querySelector(".progress p");

let task = document.querySelector("#tasks");

let taskName = document.querySelector("#task-name");

let subject = document.querySelector("#subject");

let priority = document.querySelector("#priority");

let taskbtn = document.querySelector("#add-task");

let taskList = document.querySelector("#task-list");

let title = document.querySelector("#title");

let content = document.querySelector("#content");

let noteBtn = document.querySelector("#add-note");

let noteList = document.querySelector("#notes-list");

let timer = document.querySelector("#timer-display");

let startbtn = document.querySelector("#start");

let pausebtn = document.querySelector("#pause");

let resetbtn = document.querySelector("#reset");

let sessionComplete = document.querySelector("#session-complete");

let taskCount = 0;
let completeCount = 0;


taskbtn.addEventListener("click", function(event) {

    event.preventDefault();

    let taskValue = taskName.value;
    let subValue = subject.value;
    let priorityValue = priority.value;

    // Validation
    if (taskValue === "" || subValue === "" || priorityValue === "") {
        alert("Please enter the required field");
        return;
    }

    // Create li
    let li = document.createElement("li");

    // Create checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Create task text
    let text = document.createTextNode(
        taskValue + " | " + subValue + " | " + priorityValue
    );

    // Create delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";


    // Checkbox event
    checkbox.addEventListener("change", function() {

        if (checkbox.checked) {
            completeCount++;
        } else {
            completeCount--;
        }

        complete.textContent = completeCount;

        // Update pending
        pending.textContent = taskCount - completeCount;

        // Update progress
        if (taskCount === 0) {
            progress.textContent = "0%";
        } else {
            progress.textContent =
                (completeCount / taskCount) * 100 + "%";
        }

    });


    // Delete event
    deleteBtn.addEventListener("click", function() {

        // If deleted task was completed
        if (checkbox.checked) {
            completeCount--;
            complete.textContent = completeCount;
        }

        // Decrease total
        taskCount--;
        totalTask.textContent = taskCount;

        // Update pending
        pending.textContent = taskCount - completeCount;

        // Update progress
        if (taskCount === 0) {
            progress.textContent = "0%";
        } else {
            progress.textContent =
                (completeCount / taskCount) * 100 + "%";
        }

        // Remove task
        li.remove();

    });


    // Add checkbox, text and delete button to li
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    // Add li to task list
    taskList.appendChild(li);

    taskList.style.display = "block";


    // Clear form
    taskName.value = "";
    subject.value = "";
    priority.value = "";


    // Update total
    taskCount++;
    totalTask.textContent = taskCount;

    // Update pending
    pending.textContent = taskCount - completeCount;

    // Update progress
    if (taskCount === 0) {
        progress.textContent = "0%";
    } else {
        progress.textContent = (completeCount / taskCount) * 100 + "%";
    }

});

 // Notes display
noteBtn.addEventListener("click", function(event) {

    event.preventDefault();

    let noteTitle = title.value;
    let noteContent = content.value;

    if (noteTitle === "" || noteContent === "") {
        alert("Please enter the required field");
        return;
    }

    let Info = noteTitle + ":- " + noteContent;

    let note = document.createElement("div");

    note.textContent = Info;

    noteList.appendChild(note);
    noteList.style.display = "block";

    title.value = "";
    content.value = "";
});

//Timer
let time = 25*60;
let timerId = null;

function updateTimer(){
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    seconds = seconds.toString().padStart(2,"0");
    timer.textContent = minutes + ":" + seconds;
}
startbtn.addEventListener("click",function(){
    if(timerId != null){
        return;
    } 
    timerId = setInterval(function(){
        if(time>0){
            time--;
            updateTimer();
        }
        else{
            clearInterval(timerId);
            timerId = null;
            sessionComplete.textContent = "Session Complete! 🥳";
        }
    },1000);
});

pausebtn.addEventListener("click",function(){
    clearInterval(timerId);
    timerId = null;
});
resetbtn.addEventListener("click",function(){
    clearInterval(timerId);
    timerId = null;
    time = 25*60;
    updateTimer();
    sessionComplete.textContent = "";
});
updateTimer();