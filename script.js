const inputEl = document.getElementById("todoinput");
const listEl = document.getElementById("todolist");
const formEl = document.querySelector("form");

let alltodos =gettodo();
updatetodo();
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  addtodo();
});

function addtodo() {
  const inputvalue = inputEl.value.trim();
  if (inputvalue.length > 0) {
    const todoobj={
      text:inputvalue,
      completed:false
    }
    alltodos.push(todoobj);
    updatetodo();
    savetodo();
    inputEl.value = "";
  }
}
function updatetodo() {
  listEl.innerHTML = "";
  alltodos.forEach((todo, todoindex) => {
    const todoitem = creattodoitem(todo, todoindex);
    listEl.append(todoitem);
  });
}
function creattodoitem(todo, todoindex) {
  const todoid = "todo-" + todoindex;
  const todotext=todo.text;
  const li = document.createElement("li");
  li.classList.add("todo");
  li.innerHTML = ` <input type="checkbox" id="${todoid}">
                <label class="custom-check" for="${todoid}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="${todoid}" class="todotext">
              ${todotext}
                </label>
                <button class="delbtn">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>`;
                const delbtn=li.querySelector('.delbtn');
                delbtn.addEventListener('click',()=>{
                  delettodoitem(todoindex);
                });
                const checkbox=li.querySelector('input');
                checkbox.addEventListener('change',()=>{
                  alltodos[todoindex].completed=checkbox.checked;
                  savetodo();
                })
                checkbox.checked=todo.completed;
  return li;
}
function delettodoitem(todoindex){
  alltodos=alltodos.filter((_,i)=>i !=todoindex);
  savetodo();
  updatetodo();
}

function savetodo(){
  const todosjson=JSON.stringify(alltodos);
  localStorage.setItem("todos",todosjson);
}
function gettodo(){
  const todos=localStorage.getItem("todos")|| "[]";
  return JSON.parse(todos);
}