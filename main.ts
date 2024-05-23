#! /usr/bin/env node


import inquirer from 'inquirer';
import chalk from 'chalk'
import showBanner from "node-banner"


let nameBanner = async () => {
    await showBanner('Todo App', 'This app Made by Adil Malik');
};
await nameBanner()



let green = chalk.green.italic;
let white = chalk.white.italic;
let yellow = chalk.yellow.italic;
let red = chalk.red.italic;




console.log(yellow("\nALERT: IF YOU ARE EXIT SO YOUR TODOS LIST IS EMPTY \n"));


let todos: string[] = []


async function selectionOperation(): Promise<void> {
    let crudOperation = await inquirer.prompt([
        {
            name: "action",
            message: yellow("Select Any One operation Do you want ?"),
            type: "list",
            choices: ["Create Todo", "Read All Todo", "Delete Todo", "Update Todo", "Exit"]
        }
    ])




    let isExit = false
    do {
        if (crudOperation.action == "Create Todo") {
            await createTodo()
            return;
        } else if (crudOperation.action == "Read All Todo") {
            await readTodos()
            return
        } else if (crudOperation.action == "Delete Todo") {
            await deleteTodo()
            return
        } else if (crudOperation.action == "Update Todo") {
            await updateTodo()
            return
        } else if (crudOperation.action == "Exit") {
            isExit = true
        }
    } while (!isExit)

}




////////////////////////////////////// CREATE TODO ///////////////////////////////////////
async function addSingleTodo(): Promise<void> {

    let enterTodo = await inquirer.prompt([
        {
            name: "create",
            message: yellow("Write Your Todo Task......"),
            type: "string",
        }
    ])

    if (enterTodo.create.length > 0 && enterTodo.create.length < 20) {
        todos.push(enterTodo.create)
    } else {
        console.log(red("Please Write 1 to 20 letter"));
    }
    await againSelect("Do you want to Add More Todo ?")
}



////////////////////////////////////// CREATE TODO ///////////////////////////////////////
async function createTodo(): Promise<void> {

    let enterTodo = await inquirer.prompt([
        {
            name: "create",
            message: yellow("Write Your Todo Task......."),
            type: "string",
        }
    ])

    if (enterTodo.create.length > 0 && enterTodo.create.length < 20) {
        todos.push(enterTodo.create)
    } else {
        console.log(red("Please Write 1 to 20 letter"));
    }

    await againSelect("Do you want to Add More Todo ?")
}


////////////////////////////////////// READ ALL TODOS ///////////////////////////////////////
async function readTodos(): Promise<void> {
    console.log(green("ALL TODOS"));
    todos.forEach((todo, i) => {
        console.log(white(`[${i + 1}]  ${todo}`));
    })


    await againSelect("Do you want to Add More Todo ?")
}


////////////////////////////////////// UPDATE TODO ///////////////////////////////////////
async function updateTodo(): Promise<void> {

    let updatePrompt = await inquirer.prompt([
        {
            name: "updateTodo",
            message: white("Please Choose you want update Index Number?"),
            type: "checkbox",
            choices: todos
        }
    ])

    if (updatePrompt.updateTodo.length! > 0 && updatePrompt.updateTodo! <= 1) {
        console.log(red("Please Select One Todo"));
        return;
    }

    let newUpdatePrompt = await inquirer.prompt([
        {
            name: "newUpdateTodo",
            message: white("Enter Your Update Todo?"),
            type: "string",
        }
    ])

    let indexing = todos.indexOf(updatePrompt.updateTodo[0])
    let a = todos.splice(indexing, 1, newUpdatePrompt.newUpdateTodo)
    if (a.length > 0 && a.length <= 1) {
        console.log(green("TODO UPDATE SUCCESSFULLY"));
    }
    againSelect("Do You want Update More Todo ?")
}


////////////////////////////////////// DELETE TODO ///////////////////////////////////////
async function deleteTodo(): Promise<void> {

    let deletePrompt = await inquirer.prompt([
        {
            name: "deleteTodo",
            message: white("Please Choose you want delete ?"),
            type: "checkbox",
            choices: todos,
            validate: function (answers) {
                if (answers.length !== 1) {
                    return red("Select Only One todo at a time")
                }
                return true
            }
        }
    ])

    let indexing = todos.indexOf(deletePrompt.deleteTodo[0])
    todos.splice(indexing, 1)
    console.log(green(`Deleted Successfully`));

    againSelect("Do you want delete More Todo ?")
}


////////////////////////////////////// AGAIN SELECTION CRUD OPERATION ///////////////////////////////////////
async function againSelect(param: string) {


    let againAddTodo = await inquirer.prompt([
        {
            name: "againAdd",
            message: yellow((`${param}`)),
            type: "confirm",
        }
    ])

    if (againAddTodo.againAdd === true) {
        if (param == "Do you want to Add More Todo ?") {
            addSingleTodo()
        } else if (param == "Do You want Update More Todo ?") {
            updateTodo()
        } else if (param == "Do you want delete More Todo ?") {
            deleteTodo()
        }
        return;
    } else {
        await selectionOperation();
    }
}

selectionOperation()
