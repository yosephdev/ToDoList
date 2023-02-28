$(document).ready(function () {
  var baseUrl = "http://localhost:8000/";

  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: "GET",
      url: baseUrl + "tasks/",
      headers: {
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
      },
      success: function (response) {
        console.log(response); // Check the value of response
        response = [response];
        $("#todo-list").empty();

        response.forEach(function (task) {
          $("#todo-list").append(
            '<div class="row"><p class="col-xs-8">' +
              task.content +
              '</p><button class="delete" data-id="' +
              task.id +
              '">Delete</button><input type="checkbox" class="mark-complete" data-id="' +
              task.id +
              '"' +
              (task.completed ? "checked" : "") +
              "></div>"
          );
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  var createTask = function () {
    $.ajax({
      type: "POST",
      url: baseUrl + "tasks/",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        content: $("#new-task-content").val(),
        due_string: "today",
        due_lang: "en",
      }),
      success: function (response) {
        $("#new-task-content").val("");
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  $("#create-task").on("submit", function (e) {
    e.preventDefault();
    createTask();
  });

  var deleteTask = function (id) {
    $.ajax({
      type: "DELETE",
      url: baseUrl + "tasks/" + id + "/",
      headers: {
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
      },
      success: function (response) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  $(document).on("click", ".delete", function () {
    deleteTask($(this).data("id"));
  });

  var markTaskComplete = function (id) {
    $.ajax({
      type: "POST",
      url: baseUrl + "tasks/" + id + "/close/",
      dataType: "json",
      headers: {
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
      },
      success: function (response) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  var markTaskActive = function (id) {
    $.ajax({
      type: "POST",
      url: baseUrl + "tasks/" + id + "/reopen/",
      dataType: "json",
      headers: {
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
      },
      success: function (response) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  $(document).on("change", ".mark-complete", function () {
    var id = $(this).data("id");
    if (this.checked) {
      markTaskComplete(id);
    } else {
      markTaskActive(id);
    }
  });

  getAndDisplayAllTasks();
});
