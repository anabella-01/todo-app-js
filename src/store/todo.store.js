import { Todo } from "../todos/models/todo.model";

export const Filters ={
    All:'all',
    Completed: 'Completed', //Sirve para saber que filtro quiero aplicar.
    Pending: 'Pending'      //Utilizamos propiedades de mi objeto para apuntar a sintrings.
}
const state = { //Información que quiero proporcionar de manera global en mi aplicación.
    todos:[
        new Todo ('Piedra del alma'),
        new Todo ('Piedra del tiempo'),
        new Todo ('Escama del dragón de fuego'),
        new Todo ('Espada del héroe pasado'),
        new Todo ('Espada del héroe del tiempo'),
    ],
    filter: Filters.All, //Si lo manejamos de esta forma ya tenemos las opciones centralizadas.
}

//funciones adicionales 
const initStore = () =>{ //Inicializa el Storage
    loadStore();
    console.log('InitStore 🚀 ');
}

const loadStore = () =>{
    if(!localStorage.getItem('state') ) return;

    //pero si existe
    const {todos = [] , filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;

}

const saveStateToLocalStorage = () =>{

    localStorage.setItem('state', JSON.stringify(state) );
}

const getTodos = (filter = Filters.All) =>{

        switch (filter) {
            case Filters.All:
                return [...state.todos];

            case Filters.Completed:
                return state.todos.filter(todo => todo.done);

            case Filters.Pending:
                return state.todos.filter(todo => !todo.done);
                
            default:
             throw new Error (`Option ${filter} is not valid.`); 
        }
}

/**
 * 
 * @param {String} description 
 */

const addTodo = (description)=>{
if(!description) throw new Error ('Description is required.');
state.todos.push( new Todo(description) );
saveStateToLocalStorage();

}

/**
 * 
 * @param {String} todoId 
 */

const toggleTodo = (todoId) =>{
    state.todos = state.todos.map (todo =>{
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = (todoId)=>{
state.todos = state.todos.filter(todo => todo.id !== todoId);
saveStateToLocalStorage();

}

const deleteCompleted = ()=>{
state.todos = state.todos.filter(todo => !todo.done);
saveStateToLocalStorage();

    
}


/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) =>{

   /* const propsExist = 
           'all' in Filters &&  
     'Completed' in Filters &&
       'Pending' in Filters;
    console.log(propsExist? 'All required properties are present.': 'One or more required properties are missing.');  */


    state.filter = newFilter;
    saveStateToLocalStorage();


}

const getCurrentFilter = () =>{
    return state.filter;

}

export default {  //Únicamente voy a exportar esto
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}