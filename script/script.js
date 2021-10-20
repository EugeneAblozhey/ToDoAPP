var input = document.getElementById('inputTask');
var tasks = document.getElementsByTagName('li');
var btnAddTask = document.getElementById('btn-add');
var taskList = document.getElementById('list');
var spans = document.getElementsByTagName('span');
var btnInfo = document.getElementById('btn-info');
var btnCloseInfo = document.querySelector('.button');



function addNewTask(){
    var inputContent = input.value;
    if(!/\S/.test(inputContent)){
        input.value = '';
        input.focus();
        input.style.border = 'solid red';
    }else{
        input.value = '';
        var newLi = document.createElement('li');
        newLi.innerText = inputContent;
        var newSpan = document.createElement('span');
        newSpan.innerText = ' Delete';
        var currentTime = document.createTextNode(' ' + new Date().toLocaleDateString());
        taskList.appendChild(newLi).appendChild(newSpan);
        newLi.appendChild(currentTime);
        deleteTask();
        completedTask();
    }
}




function clearTasks(){
    let ulList = document.querySelector('#list');
    while(ulList.children.length != 0){
        ulList.firstElementChild.remove();
    }
    localStorage.setItem('taskList', taskList.innerHTML);
}

function generateTasks(){
    taskList.innerHTML = localStorage.getItem('taskList');
}

function saveTasks(){
    localStorage.setItem('taskList', taskList.innerHTML);
}

function counterCompletedTasks(){
    var counterCompleted = 0;
    var counterUncomplited = 0;
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].style.textDecoration === 'line-through'){
            counterCompleted++;
        }else{
            counterUncomplited++;
        }
    }
    var elemComp = document.querySelector('.counter-comp');
    var elemUncomp = document.querySelector('.counter-uncomp');
    elemComp.innerText = counterCompleted;
    elemUncomp.innerText = counterUncomplited;
}

function deleteTask(){
    for(let spanItem of spans){
        spanItem.onclick = function(){
            spanItem.parentElement.remove();
            counterCompletedTasks();
        }
    }
    
}

function showModalWindow(){
    var modalWindow = document.querySelector('.modal-window');
    modalWindow.style.display = 'block';
}

function closeModalInfo(){
    var modalWindow = document.querySelector('.modal-window');
    modalWindow.style.display = 'none';
}

function completedTask(){
    for(let i=0; i<tasks.length; i++){
        tasks[i].onclick = function(){
            tasks[i].style.textDecoration = 'line-through';
            counterCompletedTasks();
        }
        counterCompletedTasks();
    }
}

document.querySelector('#btn-clear').addEventListener('click', clearTasks);

document.querySelector('#btn-save').addEventListener('click', saveTasks);

btnCloseInfo.onclick = closeModalInfo; 

btnInfo.onclick = showModalWindow;

btnAddTask.onclick = addNewTask;

generateTasks();
deleteTask();
completedTask();
counterCompletedTasks();
