const authModule = {
  uid: 0,
  users: [],

  loggedIn: false,
  currentUserId: null,

  registerWithEmail: function (email, password) {
    this.users.push({ email: email, password: password, id: this.uid });
    this.uid++;
  },

  getUsers: function () {
    return this.users;
  },

  login: function (email, password) {
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];

      if (email === user.email) {
        if (password === user.password) {
          this.currentUserId = user.id;
          this.loggedIn = true;
          return;
        } else {
          return console.log("passwords do not match");
        }
      }
    }
  },

  logOut: function () {
    this.loggedIn = false;
    this.currentUserId = null;
  },
};

const todosModule = {
  todos: [],

  addTodo: function (todo, userId) {
    this.todos.push({ userId: userId, todo: todo });
  },

  getAllTodos: function () {
    return this.todos;
  },

  findTodoById: function (userId) {
    const todosForUser = this.todos.filter((todo) => todo.userId === userId);
    return todosForUser;
  },
};

authModule.registerWithEmail("admin@admin.com", "12345");
authModule.registerWithEmail("jay@admin.com", "password");

authModule.login("jay@admin.com", "password");
authModule.logOut();

authModule.login("admin@admin.com", "12345");

if (authModule.loggedIn) {
  todosModule.addTodo("Super important todo", authModule.currentUserId);
  todosModule.addTodo("Another thing", authModule.currentUserId);
  console.log(
    "My stuff ===>",
    todosModule.findTodoById(authModule.currentUserId)
  );
  authModule.logOut();
} else {
  console.log("Must log in");
}

authModule.login("jay@admin.com", "password");

if (authModule.loggedIn) {
  // do things

  todosModule.addTodo("New Todo for jay", authModule.currentUserId);
  todosModule.addTodo("Jay again", authModule.currentUserId);
  console.log(
    "Jays stuff ===>",
    todosModule.findTodoById(authModule.currentUserId)
  );
  authModule.logOut();
} else {
  console.log("Must log in");
}
