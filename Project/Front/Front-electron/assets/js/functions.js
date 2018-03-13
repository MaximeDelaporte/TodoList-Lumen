$(document).ready(function () {
    let htmlRender = "";
    let htmlRenderBis = "";
    let htmlRenderTer = "";
    let listUl = "";
    let i;
    let z;
    let todoListNumber = 0;

    // Create a new todoList
    $('#addTodoList').on('click', function () {
        i = 1;
        z = 0;
        todoListNumber += 1;

        //add list name to navbar
        let todoListName = $('#TodoListName')[0].value;
        let idRoom = localStorage.getItem('currentRoom');
        listUl += "<li><a href='#' data-action='showTasks' data-value='" + idRoom + "'>" + todoListName + "</a></li>";
        $('#navbar').removeClass('hidden');
        $('#listTodoList').html(listUl);
        localStorage.setItem('currentTodoList', todoListName);

        //adding title and table tag
        let todoTable = $('<h3>')
            .append(todoListName);
        let createTable =$('<table>')
            .attr("data-todolist", todoListNumber);
        $('[data-action="createTable"]').html(todoTable).append(createTable);

        //adding button and the 3 inputs task bar
        let createTodoTaskButton = $('<button>');
        createTodoTaskButton.append('+')
            .attr("data-use","create-todo-list")
            .attr("data-action","newTask");
        let input1 = $('<input>')
                .attr({
                    type:"text",
                    name:"Task-Name",
                    id:"taskName",
                    placeholder:"Type your task name",
                    "data-use":"newTodo",
                    required: true,
                    autocomplete: true
                });
        let input2 = $('<input>')
                .attr({
                    type:"text",
                    name:"Task-Description",
                    id:"taskDescription",
                    placeholder:"Type your task Description",
                    "data-use":"newDescription",
                    required: true,
                    autocomplete: true
                });
        let input3 = $('<input>')
                .attr({
                    type:"text",
                    name:"Task-Category",
                    id:"taskCategory",
                    placeholder:"Type your task Category",
                    "data-use":"newCategory",
                    list: "taskCategoryName",
                    required: true
                });
        let datalistInput = $('<datalist>')
                .attr("id", "taskCategoryName")
                .append($('<option>')
                    .append("Work"))
                .append($('<option>')
                    .append("Home"))
                .append($('<option>')
                    .append("Misc"));
        $('#typingTask').html(createTodoTaskButton).append(input1, input2, input3, datalistInput);
        return todoListNumber;
    });

    // One TodoList Table creation
    $('body').on('click', '[data-use="create-todo-list"]',  function () {
        let htmlRenderResult = "";
        if ($('#taskName')[0].value != "" && $('#taskDescription')[0].value != "" && $('#taskCategory')[0].value != "") {
            let taskName = $('#taskName')[0].value;
            let taskDescription = $('#taskDescription')[0].value;
            let taskCategory = $('#taskCategory')[0].value;

            $.post("http://192.168.33.10:8000/api/todo/",
                {
                    todo:taskName ,
                    description: taskDescription,
                    category: taskCategory,
                    Authorization: localStorage.getItem('token'),
                    room_id: localStorage.getItem('currentRoom'),
                    todo_id: localStorage.getItem('currentTodoList')
                },function(data){
                    if(data == "failed"){
                        htmlRenderResult = "<p>Task already added</p>";
                    }
                    else{
                        //it's ok
                    }
                });
            if (i == 1 && z == 0) {
                htmlRender += "<thead>";
                htmlRender += "<tr>";
                htmlRender += "<th>Done</th>";
                htmlRender += "<th>Task name</th>";
                htmlRender += "<th>Task Description</th>";
                htmlRender += "<th>Task Category</th>";
                htmlRender += "</tr>";
                htmlRender += "</thead>";
                z++;
            }
            htmlRender += "<tr>";
            htmlRender += "<td><input type='checkbox' id='checktodo-" + i + "'></td>";
            htmlRender += "<td>" + taskName + "</td>";
            htmlRender += "<td>" + taskDescription + "</td>";
            htmlRender += "<td>" + taskCategory + "</td>";
            htmlRender += "<td><button name='delete' id='delete-" +  i + " ' data-action='deleteToDo'>Bin</button></td>";
            htmlRender += "</tr>";
            i++;
            $('[data-todolist="' + todoListNumber + '"]').html(htmlRender);
        } if ($('#taskName')[0].value == "") {
                    alert("Task Name is required");
        } if ($('#taskDescription')[0].value == "") {
                    alert("Task Description is required");
        } if ($('#taskCategory')[0].value == "") {
                    alert("Task Category is required");
        }
         //Checking for available category task
        for (let p = 0; p<$('#taskCategoryName')[0].options.length;p++){
            if ($('#taskCategory')[0].value == $('#taskCategoryName')[0].options[p].innerText) {
                break;
            } else if ($('#taskCategory')[0].value != $('#taskCategoryName')[0].options[p].innerText) {

                //adding a new category task
                let datalistInput = $('<option>').append($('#taskCategory')[0].value);
                $('#taskCategoryName').append(datalistInput);
                break;
            }
        }
    });

    // Achieve a task
    $('#mytodolist').on('click', function () {
        for(let j = 1; j < i; j++){
            if ($("input[id='checktodo-" + j + "']").prop('checked')) {
                $('tr:nth-child(' + j + ') td').addClass('taskDone')
            } else if ($("input[id='checktodo-" + j + "']").prop('checked') == false){
                $('tr:nth-child(' + j + ') td').removeClass('taskDone')
            }
        }
    });

    // Delete a task
    $('#mytodolist').on('click', '[name="delete"]',function () {
        alert('Are you sure?');
        let text = document.querySelector('[id^="checktodo-"]');
        let firstTr = $(text)["0"].id.slice(-1); // take the first checkbox id button for initialize "l" in the loop

        $(this).closest('tr').remove();
        htmlRenderBis = htmlRender.split('<tr>'); // put the string into an array to make easier the deleting
        for (let k = 2, l=firstTr; l < htmlRenderBis.length; k++, l++) {
            if($(this).closest('tr')["0"].firstChild.children["0"].id.slice(-1) == l){
                htmlRenderBis[k] = htmlRenderBis[k].replace(/(<.+)/g, ""); //delete the needed table row
                if (htmlRenderBis[k+1] != null){
                    for(let m = k+1, n = l; m < htmlRenderBis.length; m++, n++)
                    htmlRenderBis[m] = htmlRenderBis[m].replace(/-(\d+)/g, '-' + n); //change id from next row if exists
                }
                i -= 1;
            }
        }

        htmlRenderTer = ""; //reinitialize the variable
        $.each(htmlRenderBis, function(index, value) {
            htmlRenderTer += JSON.stringify(htmlRenderBis[index]); // stringify the Array
        });

        htmlRender = htmlRenderTer.replace(/"([^"]+)"/g, "<tr>$1"); // we put back the tr tag
        htmlRender = htmlRender.replace(htmlRender.slice(0, 4), ""); // we delete the extra tr tag at the start
        htmlRender = htmlRender.replace(/""/g, "");

        $('[data-todolist="' + todoListNumber + '"]').html(htmlRender); // refresh the page
    });

    //Show Todo_ From Room
    $('[data-action="showTasks"]').on('click', function(){
        debugger;
        $.get("http://192.168.33.10:8000/api/todo", {Authorization:localStorage.getItem('token'), room_id:localStorage.getItem('currentRoom'), todo_id:localStorage.getItem('currentTodoList')})
    });
});