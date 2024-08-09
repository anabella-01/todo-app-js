import {Todo} from '../models/todo.model'
import {createTodoHTML} from './create-todo-html';

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */

export const renderTodos = ( elementId, todos = [] ) =>{

    if(!element) 
     element = document.querySelector(elementId);

    if(!element) throw new Error (`Element ${elementId} not found.`)

     element.innerHTML = '';  

    todos.forEach(todo=>{
        //Creamos otro use-cases create-todo-html  para crear el html
        element.append( createTodoHTML(todo)); 
    });

}