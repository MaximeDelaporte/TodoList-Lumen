$(document).ready(function () {
    let htmlRender = "";
    let i = 1;
    $('body').on('click', '[data-use="create-todo-list"]', function () {
        if (document.querySelector('#taskName').value != "" && document.querySelector('#taskDescription').value != "" && document.querySelector('#taskCategory').value != "") {
            let taskName = document.querySelector('#taskName').value;
            let taskDescription = document.querySelector('#taskDescription').value;
            let taskCategory = document.querySelector('#taskCategory').value;
            localStorage.setItem("1",taskName);
            localStorage.setItem("2",taskDescription);
            localStorage.setItem("3",taskCategory);

            /*$.ajax({
                type: "POST",
                url: "",
                data : {taskName, taskDescription, taskCategory}
            });*/
            if (i == 1) {
                htmlRender += "<table data-todolist='" + i + "'>";
                htmlRender += "<tr>";
                htmlRender += "<th>Done</th>";
                htmlRender += "<th>Task name</th>";
                htmlRender += "<th>Task Descrition</th>";
                htmlRender += "<th>Task Category</th>";
                htmlRender += "</tr>";
                htmlRender += "<tr>";
                htmlRender += "<td><input type='checkbox' id='unchecked'></td>";
                htmlRender += "<td>" + taskName + "</td>";
                htmlRender += "<td>" + taskDescription + "</td>";
                htmlRender += "<td>" + taskCategory + "</td>";
                htmlRender += "</tr>";
                htmlRender += "</table>";
                i++;
                $('[data-action="createTable"]').html(htmlRender);
            } else {
                htmlRender += "<tr>";
                htmlRender += "<th> </th>";
                htmlRender += "<th> </th>";
                htmlRender += "<th> </th>";
                htmlRender += "<th> </th>";
                htmlRender += "</tr>";
                htmlRender += "<tr>";
                htmlRender += "<td><input type='checkbox' id='unchecked'></td>";
                htmlRender += "<td>" + taskName + "</td>";
                htmlRender += "<td>" + taskDescription + "</td>";
                htmlRender += "<td>" + taskCategory + "</td>";
                htmlRender += "</tr>";
                i++;
                $('[data-todolist="1"]').html(htmlRender);
            }
        } if (document.querySelector('#taskName').value == "") {
                    alert("Task Name is required");
        } if (document.querySelector('#taskDescription').value == "") {
                    alert("Task Description is required");
        } if (document.querySelector('#taskCategory').value == "") {
                    alert("Task Category is required");
        }
    });
});