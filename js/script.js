//задаем переменные
var input = document.getElementById("input");
var inputDate = document.getElementById("inputDate");
var ul = document.getElementById("ul");
var container = document.getElementById("todo");
var lists = document.querySelectorAll("li");
var spans = document.getElementsByTagName("span");
var saveBtn = document.querySelector(".save");
var clearBtn = document.querySelector(".clear");

//удаление li с помощью клика на svg
function deleteTodo(){
  for(let span of spans){
    span.addEventListener ("click",function (){
      span.parentElement.remove();
      event.stopPropagation();
    });
  }
}
//загрузка todo
function loadTodo(){
  if(localStorage.getItem('todoList')){
    ul.innerHTML = localStorage.getItem('todoList');
    deleteTodo();
  }
}
//при нажатии на Enter
input.addEventListener("keypress",function(keyPressed){
  if(keyPressed.which === 13){
    let now = new Date;
    let startToDo = new Date(inputDate.value);
    let li = document.createElement("li");
    let spanElement = document.createElement("span");
    let icon = document.createElement("i");
    let newTodo = this.value;
    ul.innerHTML+='<li id="'+now+'">'+'<span><i class="fas fa-trash-alt"></i></span>'+
    +newTodo+"  "+HowMuchTimeToEnd(now, startToDo)+'</li>';
    rePrintDataInLi(now, startToDo,this.value);
    deleteTodo();
    }
});
//непосредственно таймер
function HowMuchTimeToEnd(now, startToDo) {
   let today = Math.floor((startToDo-now)/1000);
   let tsec=today%60; today=Math.floor(today/60); if(tsec<10)tsec='0'+tsec;
   let tmin=today%60; today=Math.floor(today/60); if(tmin<10)tmin='0'+tmin;
   let thour=today%24; today=Math.floor(today/24);
   let timestr=today +" дней "+ thour+" часов "+tmin+" минут "+tsec+" секунд";
   return timestr;
}

function rePrintDataInLi(now,startToDo,task){
  let today = new Date();
  today = Math.floor((startToDo-today)/1000);
  let tsec=today%60; today=Math.floor(today/60); if(tsec<10)tsec='0'+tsec;
  let tmin=today%60; today=Math.floor(today/60); if(tmin<10)tmin='0'+tmin;
  let thour=today%24; today=Math.floor(today/24);
  let timestr=today +" дней "+ thour+" часов "+tmin+" минут "+tsec+" секунд";
  document.getElementById(now).innerHTML='<span><i class="fas fa-trash-alt"></i></span>'+
  ''+task+" -- "+timestr;
  deleteTodo();
  window.setTimeout(rePrintDataInLi,1000,now,startToDo,task);
}
//кнопка сохранения
saveBtn.addEventListener('click',function(){
  localStorage.setItem('todoList',ul.innerHTML );

});
//кнопка удаления
clearBtn.addEventListener('click', function(){
  ul.innerHTML= "";
  localStorage.removeItem('todoList',ul.innerHTML );
});

deleteTodo();

loadTodo();