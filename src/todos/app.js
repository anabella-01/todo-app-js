import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos} from '../todos/use-cases/render-todos';
import {renderPending} from '../todos/use-cases/render-pending';

const ElementIDs = { //Se recomienda esta práctica para no enviar el string como tal ya que es muy volátil. Mejor manejarlo en una constante.
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',

}

//esta función va a crear lo que queremos renderizar en pantalla
/**
 * 
 * @param {String} elementId 
 */


export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();

    }

    const updatePendingCount = () =>{
        renderPending(ElementIDs.PendingCountLabel);
    }


    //Cuando la función App() se llama, se ejecuta esto 
    (() => {
        //Esto es una función síncrona que crea el elemento en el HTML
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();

    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);
    


    //Listeners

    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return; //Solo pasa a ejecutar esto si presionó enter.

        todoStore.addTodo(event.target.value); //Insertar
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    //Delete toggle
    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = (event.target.className === 'destroy');
        const element = event.target.closest('[data-id]');
        if (!element || !isDestroyElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {

        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach(element => {

        element.addEventListener('click', (element) => {
            filtersLIs.forEach( el => el.classList.remove('selected') );
            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                    break;
            }
            displayTodos();

        });
    });


}