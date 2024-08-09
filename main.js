import './style.css'
import { App } from './src/todos/app';
import todoStore from './src/store/todo.store'

todoStore.initStore(); //Acá llamamos nuestro init store

App('#app'); 