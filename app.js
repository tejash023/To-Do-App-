//Define UI varibale

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners

loadEventListeners();

function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit',addTask);
  //remove task list
  taskList.addEventListener('click',removeTask);
  //clear all task
  clearBtn.addEventListener('click',clearAll);
  //filter task
  filter.addEventListener('keyup',filterTasks);
}
//get tasks from local storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // console.log(tasks);
  // console.log('helllo');

  tasks.forEach(function(task){
    //create li element
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  //add text node and append
  li.appendChild(document.createTextNode(task));
  //add cross link 
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //add inner html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append to li
  li.appendChild(link);
  //append li as child to ul
  taskList.appendChild(li);
  // console.log(li);

  })

}

//add task
function addTask(e){
  if(taskInput.value === ''){
    alert('Please enter a value');
  }

  //create li element
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  //add text node and append
  li.appendChild(document.createTextNode(taskInput.value));
  //add cross link 
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //add inner html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append to li
  li.appendChild(link);
  //append li as child to ul
  taskList.appendChild(li);

  //Store in local storage
  storeInLocalStorage(taskInput.value);
  //clear input
  taskInput.value = '';


  //PREVENT default
  e.preventDefault();
}

//store in local storage
function storeInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
//-------------------------------

//--------------------------------

//Remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
    //remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from local storage
function removeTaskFromLocalStorage(taskItem){
  // console.log(taskItem);
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // console.log(tasks);

  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}
//clear all
function clearAll(e){
  // taskList.innerHTML = ''; //slower way

  //faster way
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  
  //clear from LS
  clearFromLocalStorage();
}

//Clear from Local Storage
function clearFromLocalStorage(){
  localStorage.clear();
}

//filter taks
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1 ){
      task.style.display = 'block';
    }else
     task.style.display = 'none';

  });


}