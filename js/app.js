/**
 * Todolist
 */
const app = {
  todo: document.getElementById('todo'),
  list: null,
  counter: null,
  tasks: [],
  redraw: () => {
    app.todo.innerHTML = '';
    app.createTitle();
    app.createImg();
    app.createButtonDelete();
    app.createForm();
    app.createCount();
    app.createList();
  },

  createTitle: () => {
    const title = document.createElement('h1');
    title.id = 'todo-title';
    title.textContent = 'Ma todo list';

    app.todo.appendChild(title);
  },

  createImg: () => {
    const img = document.createElement('img');
    img.src = './assets/images/todolist.png';
    img.id = 'img';
    const divImg = document.createElement('div');
    divImg.id= 'divImg';
    divImg.appendChild(img);
    app.todo.appendChild(divImg);
  },

  createForm: () => {
    const form = document.createElement('form');
    // give an id
    form.id = 'todo-form';

    // add event listener on submit
    form.addEventListener('submit', app.onSubmit);

    // add an input
    const input = document.createElement('input');

    // with params
    input.type = 'text';
    input.setAttribute('placeholder', 'Ajouter une tâche');
    input.id = 'todo-input';
    input.name = 'newTask';

    // add input into form
    form.appendChild(input);

    // and into html
    app.todo.appendChild(form);
  },
  createCount: () => {
    app.counter = document.createElement('div');
    app.counter.id = 'todo-counter';
    app.counter.textContent = '0 tâche en cours';
    app.todo.appendChild(app.counter);
  },
  createList: () => {
    // create a list into app
    app.list = document.createElement('ul');
    app.list.id = 'todo-list';

    app.todo.appendChild(app.list);

    app.tasks.forEach((task, index) => app.createTask(task, index));
  },

  createTask: ({name , done}, index) => {
    const task = document.createElement('li');
    task.className = done ? 'todo-item todo-item--done' : 'todo-item';

    // create an input type checkbox
    const check = document.createElement('input');
    check.className = 'todo-item-cb';
    check.type = 'checkbox';

    // calculate an id
    const newId = `todo-item-${index}`;
    check.id = newId;
    // if done == true, checkbox is checked
    check.checked = done;

    // event listener on change
    check.addEventListener('change', () => {
      app.tasks[index].done = !done;
      // and redraw
      app.redraw();
    });
    

    // add checkbox into li
    task.appendChild(check);

    // create a label
    const label = document.createElement('label');
    label.className = 'todo-item-text';
    label.setAttribute('for', newId);
    label.textContent = name;
    // add label into li
    task.appendChild(label);

    // add the task into the list
    app.list.appendChild(task);

    // and... update counter
    app.updateCounter();
  },
  onSubmit: (event) => {
    // no refresh
    event.preventDefault();
    // add the task into our state
    app.tasks.push({name: event.target.childNodes[0].value, done: false});
    //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/push

    // reset input
    event.target.childNodes[0].value = '';

    // and redraw
    app.redraw();
  },
 
  updateCounter: () => {
    const taskNumber = app.tasks.filter(task => !task.done).length;

    if (taskNumber === 1) {
      app.counter.textContent = 'Une tâche en cours';
    } else if (taskNumber === 0) {
      app.counter.textContent = 'Aucune tâche en cours';
    } else {
      app.counter.textContent = `${taskNumber} tâches en cours`; 
    }
  },

  createButtonDelete: () => {
    const button = document.createElement('button');
    button.id= 'button';
    button.textContent = 'Vider la liste';
    const div= document.createElement('div');
    div.id= 'divButton';
    div.appendChild(button);
    app.todo.appendChild(div);

    button.addEventListener('click', () => {
      app.tasks=[];
      app.redraw();
    })
  }
};


// DOM
document.addEventListener('DOMContentLoaded', app.redraw);

