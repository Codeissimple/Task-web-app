var todoList = {
    todos: [],
    deleteTodo: function(position){
        this.todos.splice(position, 1);
    },
    addTodo: function(todoText){
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;

    },
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        this.todos.forEach(function(todo) {
          if (todo.completed === true) {
            completedTodos++;
          }
        });
            this.todos.forEach(function(todo) {
               if(completedTodos === totalTodos) {
                 todo.completed = false;
               } else {
              todo.completed = true;
                 }
            });
    }
 
  };

    var handlers = {
      addTodo: function() {
        var addNewTaskText = document.getElementById('addNewTaskText');
        todoList.addTodo(addNewTaskText.value);
        addNewTaskText.value='';
        view.displayTodos();
      },
      deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
      },
      changeTodo: function() {
        var changeTaskPositionInput = document.getElementById('changeTaskPositionInput');
        var changeTaskTextInput = document.getElementById('changeTaskTextInput');
        todoList.changeTodo(changeTaskPositionInput.valueAsNumber, changeTaskTextInput.value);
        changeTaskPositionInput.value = "";
        changeTaskTextInput.value = "";
        view.displayTodos();
      },
      toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = '';
        view.displayTodos();
      },
      toggleAll: function() {
      todoList.toggleAll();
      view.displayTodos();
      },
    };
    
    var view = {
      displayTodos: function() {
         var todosUl = document.querySelector('ul');
         todosUl.innerHTML = '';
      todoList.todos.forEach(function(todo, position){
          var todoLi = document.createElement('li');
          var todoTextWithCompletion = '';
          
          if (todo.completed === true) {
            todoTextWithCompletion = "(x) " +  todo.todoText;
          } else {
            todoTextWithCompletion = "( ) " +  todo.todoText;            
          }
            todoLi.id = position;
          todoLi.textContent = todoTextWithCompletion;
          todoLi.appendChild(this.createDeleteButton());
          todosUl.appendChild(todoLi);
        }, this);
      },
        createDeleteButton: function() {
          var deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.className = 'deleteButton';
          return deleteButton;
      },
        setUpEventListeners: function() {
          var todosUl = document.querySelector('ul');
          todosUl.addEventListener('click', function(event) {
          var elementClicked = event.target;
          if (elementClicked.className === 'deleteButton') {
            handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
          }
    });
    }
    };
    view.setUpEventListeners();
