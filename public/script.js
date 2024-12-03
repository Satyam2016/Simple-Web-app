// To-Do List
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task');

// Fetch tasks from the server
async function fetchTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();

  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  });
}

// Create a task element
function createTaskElement(task) {
  const li = document.createElement('li');
  li.textContent = task.name;

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.onclick = async () => {
    await fetch(`/api/tasks/${task._id}`, { method: 'DELETE' });
    fetchTasks();
  };

  li.appendChild(delBtn);
  return li;
}

// Add a task to the server
addTaskBtn.addEventListener('click', async () => {
  if (taskInput.value.trim() === '') return;

  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: taskInput.value }),
  });

  taskInput.value = '';
  fetchTasks();
});

// Initial load
fetchTasks();




   // Calculator
   let calcInput = "";
   function appendCalc(value) {
     calcInput += value;
     document.getElementById("calc-display").value = calcInput;
   }
   
   function clearCalc() {
     calcInput = "";
     document.getElementById("calc-display").value = "0";
   }
   
   function calculate() {
     try {
       calcInput = eval(calcInput).toString();
       document.getElementById("calc-display").value = calcInput;
     } catch {
       document.getElementById("calc-display").value = "Error";
       calcInput = "";
     }
   }
   
   // Random Quote Generator
   document.getElementById('new-quote').addEventListener('click', async () => {
    const res = await fetch('/api/quotes');
    const data = await res.json();
    const quoteDisplay = document.getElementById('quote-display');
  
    quoteDisplay.style.opacity = 0; 
    setTimeout(() => {
      quoteDisplay.textContent = data.quote;
      quoteDisplay.style.opacity = 1; 
    }, 300);
  });
  