document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-button');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const filterAll = document.getElementById('filter-all');
    const filterCompleted = document.getElementById('filter-completed');
    const filterPending = document.getElementById('filter-pending');

    addButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            todoInput.value = '';
            todoInput.focus();
        }
    });
    //edit

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });

    function addTask(taskText) {
        const listItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');

        checkbox.addEventListener('change', () => {
            listItem.classList.toggle('completed');
            if (checkbox.checked) {
                editButton.disabled = true;
            } else {
                editButton.disabled = false;
            }
        });

        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            editTask(listItem, taskSpan);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            listItem.remove();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    }

    function editTask(listItem, taskSpan) {
        const currentText = taskSpan.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.classList.add('edit-input');
        listItem.replaceChild(input, taskSpan);

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                taskSpan.textContent = input.value;
                listItem.replaceChild(taskSpan, input);
            }
        });

        input.addEventListener('blur', () => {
            taskSpan.textContent = input.value;
            listItem.replaceChild(taskSpan, input);
        });

        input.focus();
    }

    filterAll.addEventListener('click', () => {
        const items = todoList.querySelectorAll('li');
        items.forEach(item => item.style.display = 'flex');
    });

    filterCompleted.addEventListener('click', () => {
        const items = todoList.querySelectorAll('li');
        items.forEach(item => {
            if (item.querySelector('.checkbox').checked) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    filterPending.addEventListener('click', () => {
        const items = todoList.querySelectorAll('li');
        items.forEach(item => {
            if (!item.querySelector('.checkbox').checked) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
