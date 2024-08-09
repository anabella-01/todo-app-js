import { v4 as uuid } from 'uuid';

export class Todo {
    /**
     * 
     * @param {String} description 
     */
    constructor(description) {
        if (!description) throw new Error('argument Description is required.');

        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createAt = new Date();
    }
}