$(document).ready(function () {
  var baseUrl = "https://jsonplaceholder.typicode.com";

  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: "GET",
      url: baseUrl + "/todos",
      dataType: "json",
      success: function (response, textStatus) {
        $("#todo-list").empty();
        response.forEach(function (task) {
          $("#todo-list").append(
            '<div class="row"><p class="col-xs-8">' +
              task.title +
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
      url: baseUrl + "/todos",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        title: $("#new-task-content").val(),
        completed: false,
      }),
      success: function (response, textStatus) {
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
      url: baseUrl + "/todos/" + id,
      success: function (response, textStatus) {
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
      type: "PATCH",
      url: baseUrl + "/todos/" + id,
      dataType: "json",
      data: JSON.stringify({
        completed: true,
      }),
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  var markTaskActive = function (id) {
    $.ajax({
      type: "PATCH",
      url: baseUrl + "/todos/" + id,
      dataType: "json",
      data: JSON.stringify({
        completed: false,
      }),
      success: function (response, textStatus) {
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
