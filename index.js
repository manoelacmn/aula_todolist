import 'regenerator-runtime/runtime';
import axios  from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getTodoItems = async () => {
  try{
    const response = await axios.get(`${BASE_URL}/todo?_limit=5`)
    const todoItems = response.data;
    console.log('lista de tarefas'.todoItems);
  }catch(err){
    console.log(err);
  }
}

const creteTodoElement = item => {
  const todoElement = document.createElement('li');
  todoElement.id = item.id
  todoElement.appendChild(document.createTextNode(item.title));
  todoElement.onclick = async event => 
  await removeTodoElement(event,todoElement);
  return todoElement;
}

const updateTodoList = todoItems => {
  const todoList = document.querySelector('ul');
  if(Array.isArray(todoItems) && todoItems.length > 0 ){
    todoItems.map(todoItem => {
      todoList.appendChild(creteTodoElement(todoItem));
    })
  }else if (todoItems){
    todoList.appendChild(creteTodoElement(todoItems));
  }
}
const form = document.querySelector('form');
form.addEventListener('submit', async event =>{
  event.preventDefault();
  const title = document.querySelector('#new-todos__title').value;

  const todo = {
    userID: 1,
    title: title,
    completed: false
  };

const submitTodoItem = await addTodoItem(todo);
updateTodoList(submitTodoItem);
});

export const addTodoItem  = async todo => {
  try{
    const response = await axios.post(`${BASE_URL}/todos`,todo);
    const newTodoItem = response.data;
    console.log('tarefa adicionada: ',newTodoItem);
    return newTodoItem;
  }catch (err){
    console.log(err)
  }

};

export const deleteTodoItem = async id => {
  try{
    const response = await axios.delete(`${BASE_URL}/todos/${id}`);
    console.log('Tarefa excluida de id: ',id);
    return response.data;
  }catch(err){
    console.log(err);
  }
} 

const removeTodoElement = async (event, element) => {
  event.target.parentElement.removeChild(element);
  const id = element.id;
  await deleteTodoItem(id);
}

const main = async () => {
  (await getTodoItems());

};

main();