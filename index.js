// Utility function to load tasks from localStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
};

// Utility function to save tasks to localStorage
const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to render tasks to the DOM
const renderTasks = (tasks, filter = 'all') => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the task list

    // Filter tasks based on filter type
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true; // Show all tasks
    });

    // Loop through tasks and create HTML elements
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : 'pending';

        const taskContent = document.createElement('span');
        taskContent.textContent = task.name;

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.onclick = () => toggleComplete(task.id);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);

        li.appendChild(taskContent);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
};

// Function to add a new task
const addTask = (name) => {
    const tasks = loadTasks();
    const newTask = {
        id: Date.now(),
        name: name,
        completed: false,
    };
    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks(tasks);
};

// Function to toggle the completion status of a task
const toggleComplete = (taskId) => {
    const tasks = loadTasks();
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        renderTasks(tasks);
    }
};

// Function to delete a task
const deleteTask = (taskId) => {
    const tasks = loadTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(filteredTasks);
    renderTasks(filteredTasks);
};

// Function to set up event listeners for adding tasks and filtering tasks
const setUpEventListeners = () => {
    const addTaskButton = document.getElementById('add-task-button');
    const taskInput = document.getElementById('task-input');
    const filterButtons = document.querySelectorAll('.filter-button');

    addTaskButton.addEventListener('click', () => {
        const taskName = taskInput.value.trim();
        if (taskName) {
            addTask(taskName);
            taskInput.value = ''; // Clear input after adding task
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const filterType = event.target.dataset.filter;
            const tasks = loadTasks();
            renderTasks(tasks, filterType);
        });
    });
};

// Function to handle task editing
const editTask = (taskId, newName) => {
    const tasks = loadTasks();
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.name = newName;
        saveTasks(tasks);
        renderTasks(tasks);
    }
};

// Function to mark all tasks as completed
const completeAllTasks = () => {
    const tasks = loadTasks();
    tasks.forEach(task => {
        task.completed = true;
    });
    saveTasks(tasks);
    renderTasks(tasks);
};

// Function to delete all completed tasks
const deleteCompletedTasks = () => {
    const tasks = loadTasks();
    const filteredTasks = tasks.filter(task => !task.completed);
    saveTasks(filteredTasks);
    renderTasks(filteredTasks);
};

// Function to count total tasks and completed tasks
const taskStats = () => {
    const tasks = loadTasks();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    return {
        totalTasks,
        completedTasks,
        pendingTasks,
    };
};

// Function to display task statistics in the DOM
const displayTaskStats = () => {
    const stats = taskStats();
    const statsDiv = document.getElementById('task-stats');
    statsDiv.innerHTML = `
        <p>Total Tasks: ${stats.totalTasks}</p>
        <p>Completed Tasks: ${stats.completedTasks}</p>
        <p>Pending Tasks: ${stats.pendingTasks}</p>
    `;
};

// Function to search tasks by name
const searchTasks = (searchTerm) => {
    const tasks = loadTasks();
    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchTerm.toLowerCase()));
    renderTasks(filteredTasks);
};

// Function to handle task searching
const handleSearch = () => {
    const searchInput = document.getElementById('task-search');
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.trim();
        searchTasks(searchTerm);
    });
};

// Function to initialize the app
const initApp = () => {
    const tasks = loadTasks();
    renderTasks(tasks);
    setUpEventListeners();
    displayTaskStats();
    handleSearch();
};

// Call initApp to initialize the app when the page loads
document.addEventListener('DOMContentLoaded', initApp);

// HTML Structure for the application (included in the JavaScript for demo)
const htmlContent = `
    <div>
        <input type="text" id="task-input" placeholder="Add new task..." />
        <button id="add-task-button">Add Task</button>
    </div>
    <div>
        <input type="text" id="task-search" placeholder="Search tasks..." />
    </div>
    <div>
        <button class="filter-button" data-filter="all">All</button>
        <button class="filter-button" data-filter="pending">Pending</button>
        <button class="filter-button" data-filter="completed">Completed</button>
    </div>
    <div id="task-stats"></div>
    <ul id="task-list"></ul>
    <div>
        <button id="complete-all-button">Complete All</button>
        <button id="delete-completed-button">Delete Completed</button>
    </div>
`;

document.body.innerHTML = htmlContent;

// CSS Styling for the app (included in the JavaScript for demo)
const styleContent = `
    body {
        font-family: Arial, sans-serif;
        margin: 20px;
    }

    input[type="text"] {
        padding: 10px;
        margin-right: 10px;
    }

    button {
        padding: 10px;
        margin: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #ddd;
    }

    #task-list {
        list-style-type: none;
        padding: 0;
    }

    li {
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    
    button:hover {
        background-color: #ddd;
    }

    #task-list {
        list-style-type: none;
        padding: 0;
    }

    li {
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    button:hover {
        background-color: #ddd;
    }

    #task-list {
        list-style-type: none;
        padding: 0;
    }

    li {
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    button:hover {
        background-color: #ddd;
    }

    #task-list {
        list-style-type: none;
        padding: 0;
    }

    li {
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .completed {
        background-color: #d3ffd3;
    }

    .pending {
        background-color: #ffd3d3;
    }

    .completed span {
        text-decoration: line-through;
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = styleContent;
document.head.appendChild(styleElement);
