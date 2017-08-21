var todos = {
	//todos array
	todoLists: [],
	//add todo 
	addTodo : function(todoText){
		this.todoLists.push({
			todoText: todoText,
			completed: false
		});
		views.displayTodos();
	},
	//changtodo
	changeTodo: function(index, changedItem){
		this.todoLists[index].todoText =  changedItem;
		views.displayTodos();
	},
	//delete todo
	deleteTodo: function(index){
		this.todoLists.splice(index, 1);
		views.displayTodos();
	},
	toggleTodo: function(index){
		var todo = this.todoLists[index];
		todo.completed = !todo.completed;
		views.displayTodos();
	},
	toggleAll: function(){			
			var completedTodos = 0;
			var totalTodos = this.todoLists.length;
			for(var i = 0; i < totalTodos; i++){
				if(this.todoLists[i].completed === true){
					completedTodos++
				}
			}
			if(completedTodos === totalTodos){
			//if everything is true then make everything false
				for(var i = 0; i < totalTodos; i++ ){
					this.todoLists[i].completed = false;
				}
			}else{
				//else everything should be true
					//1.if everything is false then make everything true
					//2.some of the item are true the make everything true
				for(var i = 0; i < totalTodos; i++ ){
					this.todoLists[i].completed = true;
				}				
			}
		views.displayTodos();
	}
}

var handlers = {
	toggleAll: function(){
		todos.toggleAll()	
	},
	addTodo: function(){
		var addTodoTextInput = document.getElementById("addTodoTextInput");
		//console.log(todoTextInput.value);
		todos.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = "";
	},
	changeTodo: function(){
		var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
		var changeTodoTextInput = document.getElementById("changeTodoTextInput");
		todos.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
		changeTodoPositionInput.value = "";
		changeTodoTextInput.value = "";
	},
	toggleTodo: function(){
		var toggleTodoPositionInput = document.getElementById("toggleTodoPositionInput");
		todos.toggleTodo(toggleTodoPositionInput.valueAsNumber);
		toggleTodoPositionInput.value = "";
	},
	deleteTodo: function(position){
		//var deleteTodoPositionInput = document.getElementById("deleteTodoPositionInput");
		todos.deleteTodo(position);
		//deleteTodoPositionInput.value = "";
	},
	setUpDeleteBtnListener: function(){
		//var deleteBtn = document.getElementById("delete");
		//deleteBtn.addEventListener("click",function(){
		//	console.log("you clciked delete Button");
		//});
		//event delegation
		//we are attaching event on parent rather than children
		var ul = document.querySelector("ul");
		ul.addEventListener("click",function(evt){
			//console.log("you clicked inside ul");
			if(evt.target.id === "delete"){
				//using simple menthod
				//var li = evt.target.parentNode;
				//console.log(li);
				//ul.removeChild(li);


				handlers.deleteTodo(parseInt(evt.target.parentNode.id))

			}
			
		})
	}

};
var views = {
	displayTodos: function(){
		var todosUl = document.querySelector("ul");
		//we will see later(Debugging section)
		todosUl.innerHTML = "";
		for(var i = 0; i < todos.todoLists.length; i++){
			var todoLi = document.createElement("li");
			var todo = todos.todoLists[i];
			if(todos.todoLists.length === 0){
				console.log("your todo lists is empty");
			}else{
			//check either item is completed or not
				if(todos.todoLists[i].completed === true){
					//show if completed is true
					//console.log("(X)" , this.todoLists[i].todoText)
					todoLi.textContent = "(X)" + todo.todoText;
				}else{
					//show if completed is false
					todoLi.textContent = "()" + todo.todoText;
				}		
			}
			todoLi.id = i;
			todoLi.appendChild(this.createDeleteBtn());
			todosUl.appendChild(todoLi);
		}
	},
	createDeleteBtn: function(){
		var dltBtn = document.createElement("button");
		dltBtn.id = "delete";
		dltBtn.textContent = "Delete";
		return dltBtn;

	}
};
handlers.setUpDeleteBtnListener();
todos.addTodo("Buy onion");
todos.addTodo("Buy garlic");
todos.addTodo("Buy banana");
todos.addTodo("Buy potato");
//views.displayTodos();
/*  var todoLists = [{
			todoText: "item 1",
			completed: true
		},
		{
			todoText: "item 2",
			completed: true
		},
		]*/

//I got the problem and it is solved in next class happy coding

//version with edit in place

/*var todoList = {

  todos: [],

  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    })
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1)
  },
  toggleCompleted: function (position) {
    this.todos[position].completed = !this.todos[position].completed
  },
  toggleAll: function () {
    var statusAll = []
    this.todos.forEach(function (todo) {
      statusAll.push(todo.completed)
    })
    this.todos.forEach(function (todo) {
      if (statusAll.indexOf(false) === -1) {
        todo.completed = false
      } else {
        todo.completed = true
      }
    })
  }
}

var handlers = {

  addTodo: function () {
    var addTodoTextInput = document.querySelector('.add-todo-text-input')
    todoList.addTodo(addTodoTextInput.value)
    addTodoTextInput.value = ''
    view.displayTodos()
  },
  changeTodo: function (position) {
    view.displayTodos(position)
  },
  saveChangeTodo: function (position) {
    var changeTodoTextInput = document.querySelector('.change-todo-text-input')
    todoList.changeTodo(position, changeTodoTextInput.value)
    view.displayTodos()
  },
  deleteTodo: function (position) {
    todoList.deleteTodo(position)
    view.displayTodos()
  },
  toggleCompleted: function (position) {
    todoList.toggleCompleted(position)
    view.displayTodos()
  },
  toggleAll: function () {
    todoList.toggleAll()
    view.displayTodos()
  }
}

var view = {

  displayTodos: function (position) {
    var todosUl = document.querySelector('ul')
    todosUl.innerHTML = ''

    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li')

      todosUl.appendChild(todoLi)
      todoLi.id = i

      todoLi.appendChild(this.createCheckbox())
      document.querySelector(`li:nth-of-type(${i + 1}) > input[type='checkbox']`).checked = todoList.todos[i].completed

      if (position === i) {
        todoLi.appendChild(this.createChangeTextbox(todoList.todos[i].todoText))
        document.querySelector('.change-todo-text-input').focus()
      } else {
        todoLi.appendChild(this.createTodoText(todoList.todos[i].todoText))
        if (todoList.todos[i].completed) {
          document.querySelector(`li:nth-of-type(${i + 1}) > label`).style.textDecoration = 'line-through'
        }
      }
      todoLi.appendChild(this.createDeleteButton())
    }
  },
  createCheckbox: function () {
    var checkbox = document.createElement('input')
    checkbox.className = 'toggle-todo-checkbox'
    checkbox.type = 'checkbox'
    return checkbox
  },
  createTodoText: function (content) {
    var label = document.createElement('label')
    label.className = 'todo-text'
    label.textContent = content
    return label
  },
  createDeleteButton: function () {
    var deleteButton = document.createElement('img')
    deleteButton.className = 'delete-button'
    deleteButton.src = 'icons/delete.png'
    return deleteButton
  },
  createChangeTextbox: function (content) {
    var changeTextbox = document.createElement('input')
    changeTextbox.placeholder = content
    changeTextbox.className = 'change-todo-text-input'
    changeTextbox.type = 'text'
    return changeTextbox
  },
  setUpEventListeners: function () {
    var todosUl = document.querySelector('ul')

    todosUl.addEventListener('click', function (e) {
      if (e.target.className === 'delete-button') {
        handlers.deleteTodo(parseInt(e.target.parentNode.id))
      } else if (e.target.className === 'toggle-todo-checkbox') {
        handlers.toggleCompleted(parseInt(e.target.parentNode.id))
      } else if (e.target.className === 'todo-text') {
        handlers.changeTodo(parseInt(e.target.parentNode.id))
      }
    })
    todosUl.addEventListener('keypress', function (e) {
      if (e.keyCode === 13) {
        handlers.saveChangeTodo(parseInt(e.target.parentNode.id))
      }
    })
    document.querySelector('.add-todo-text-input').addEventListener('keypress', function (e) {
      if (e.keyCode === 13) {
        handlers.addTodo(parseInt(e.target.parentNode.id))
      }
    })
    document.querySelector('.toggle-all-button').addEventListener('click', function (e) {
      handlers.toggleAll()
    })
  }
}

view.setUpEventListeners()*/

// GORDON'S TOGGLE ALL FUNCTION
//
//  toggleAll: function() {
//
//    var totalTodos = this.todos.length;
//    var completedTodos = 0;
//
//    for (var i=0; i<totalTodos; i++) {
//      if (this.todos[i].completed === true) {
//        completedTodos++;
//      }
//    }
//    if (completedTodos === totalTodos) {
//      for (var i=0; i<totalTodos; i++) {
//        this.todos[i] = false;
//      }
//    } else {
//     for (var i=0; i<totalTodos; i++) {
//     this.todos[i] = true;
//     }
//   }
//   this.displayTodos();
// }

// VERSIONS 1 & 2

// var todos = ["item 1", "item 2", "item 3"];
//
// function displayTodos() {
//   console.log("To do:", todos);
// }
//
// function addTodo(todo) {
//   todos.push(todo);
//   displayTodos();
// }
//
// function changeTodo(position, value) {
//   todos[position] = value;
//   displayTodos();
// }
//
// function deleteTodo(position) {
//   todos.splice(position, 1);
//   displayTodos();
// }