$(document).ready(function () {
    let htmlRender = "";
    let htmlRenderBis = "";
    let htmlRenderTer = "";
    let listUl = "";
    let i;
    let z;

    function TableCreation(todoListName) {
        let todoTable = $('<h3>')
            .append(todoListName);
        let createTable =$('<table>')
            .attr("data-table", localStorage.getItem('currentTodoList'));
        $('[data-action="createTable"]').html(todoTable).append(createTable);
    }

    function TaskCreationBar() {
        let createTodoTaskButton = $('<button>');
        createTodoTaskButton.append('+')
            .attr("data-use","create-todo-list")
            .attr("data-action","newTodo");
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
    }

    function RowTableCreationTitle () {
        htmlRender = "";
        htmlRender += "<thead>";
        htmlRender += "<tr>";
        htmlRender += "<th>Done</th>";
        htmlRender += "<th>Task name</th>";
        htmlRender += "<th>Task Description</th>";
        htmlRender += "<th>Task Category</th>";
        htmlRender += "</tr>";
        htmlRender += "</thead>";
        $('[data-table="' + localStorage.getItem('currentTodoList') + '"]').html(htmlRender);
    }

    function RowTableCreation (taskName, taskDescription, taskCategory, i) {
        htmlRender += "<tr>";
        htmlRender += "<td><input type='checkbox' data-checktodo='" + i + "'></td>";
        htmlRender += "<td>" + taskName + "</td>";
        htmlRender += "<td>" + taskDescription + "</td>";
        htmlRender += "<td>" + taskCategory + "</td>";
        htmlRender += "<td><button name='delete' id='delete-" +  i + " ' data-action='deleteToDo'>Bin</button></td>";
        htmlRender += "</tr>";
        $('[data-table="' + localStorage.getItem('currentTodoList') + '"]').html(htmlRender);
    }

    //Show All To Do List in Current Room
    $('[data-action="showList"]').ready(function(){
        $.get("http://192.168.33.10:8000/api/room/list/all",{room_id: localStorage.getItem('currentRoom'), Authorization: localStorage.getItem('token')}, function (data) {
            for(let i = 0; i < data.result.length;i++) {
                $('[data-action="showList"]').append('<li class=""><a href="#" data-action="showTasks" data-value="' + data.result[i].id + '">' + data.result[i].name + '</a><b id="removeTodoList" data-action="deleteList">X</b></li>');
            }
        })

    });

    //Delete To Do List
    $('#listTodoList').on('click', '[data-action="deleteList"]', function(){
        debugger;
        localStorage.setItem('currentTodoList', $(this).parent()["0"].children["0"].attributes[2].value);
        $.get("http://192.168.33.10:8000/api/room/list/"+ localStorage.getItem('currentTodoList') + "/delete/",{Authorization: localStorage.getItem('token')}, function (data) {
            alert('Todo List deleted');
        });
        $(this).parent()["0"].remove();


    });

    //Create New To Do List in Current Room
    $('#addTodoList').on('click', function () {
        i = 1;
        z = 0;

        let name = $('[data-use="TodoListName"]')[0].value;
        if (name != ""){

            $.post("http://192.168.33.10:8000/api/room/list",
                {
                    name:name ,
                    Authorization: localStorage.getItem('token'),
                    room_id: localStorage.getItem('currentRoom')
                },function(data){
                    if(data == "failed"){
                        console.log(data);
                    }
                    else{
                        localStorage.setItem('currentTodoList', data.todo_id);

                        //add list name to navbar
                        let todoListName = $('#TodoListName')[0].value;
                        listUl += "<li><a href='#' data-action='showTasks' data-value='" + localStorage.getItem('currentTodoList') + "'>" + todoListName + "</a><b id='removeTodoList' data-action='deleteList'>X</b></li>";
                        $('#listTodoList').html(listUl);

                        //adding title and table tag

                        TableCreation(todoListName);


                        //adding button and the 3 inputs task bar

                        TaskCreationBar();
                    }
                });
        }
        else{
        }
    });

    // One TodoList Table creation
    $('body').on('click', '[data-action="newTodo"]',  function () {
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
                    todo_id: localStorage.getItem('currentTodoList')
                },function(data){
                    if(data == "failed"){
                        console.log(data);
                    }
                    else{
                        debugger;
                        if (z == 0) {
                            RowTableCreationTitle();
                            z++;
                        }
                        i = data.result[0].id;
                        htmlRender += "<tr>";
                        htmlRender += "<td><input type='checkbox' data-checktodo='" + i + "'></td>";
                        htmlRender += "<td>" + taskName + "</td>";
                        htmlRender += "<td>" + taskDescription + "</td>";
                        htmlRender += "<td>" + taskCategory + "</td>";
                        htmlRender += "<td><button name='delete' id='delete-" +  i + " ' data-action='deleteToDo'>Bin</button></td>";
                        htmlRender += "</tr>";
                        $('[data-table="' + localStorage.getItem('currentTodoList') + '"]').html(htmlRender);

                    }
                });
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
            if ($("input[data-checktodo=" + j + "']").prop('checked')) {
                $('tr:nth-child(' + j + ') td').addClass('taskDone')
            } else if ($("input[data-checktodo=" + j + "']").prop('checked') == false){
                $('tr:nth-child(' + j + ') td').removeClass('taskDone')
            }
        }
    });

    // Delete a task
    $('#mytodolist').on('click', '[name="delete"]',function () {
        alert('Are you sure?');
        let firstTr = $('[data-checktodo]')["0"].attributes[1].value; // take the first checkbox id button for initialize "l" in the loop

        $(this).closest('tr').remove();
        htmlRenderBis = htmlRender.split('<tr>'); // put the string into an array to make easier the deleting
        for (let k = 2, l=firstTr; k < htmlRenderBis.length; k++, l++) {
            if($(this).closest('tr')["0"].firstChild.children["0"].attributes[1].value == l){
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

        let $id = firstTr;
        $.get("http://192.168.33.10:8000/api/todo/"+ $id + "/delete/", {Authorization:localStorage.getItem('token')});
        $('[data-table="' + localStorage.getItem('currentTodoList') + '"]').html(htmlRender); // refresh the page
    });

    //Show To do From To Do List
    $('#navbar').on('click', '[data-action="showTasks"]', function(){
        htmlRender = "";
        $('[data-table="' + localStorage.getItem('currentTodoList') + '"]').html(htmlRender);
        localStorage.setItem('currentTodoList', $(this)["0"].attributes[2].nodeValue);
        TableCreation(localStorage.getItem('currentTodoList'));

        $.get("http://192.168.33.10:8000/api/todo", {Authorization:localStorage.getItem('token'), todo_id:localStorage.getItem('currentTodoList')}, function (data) {
            if (data.result.length == 0) {
                alert("There are no tasks in here");
                TaskCreationBar();
            } else {
                TableCreation(data.result["0"].todo_id);
                RowTableCreationTitle();
                for(let i = 0; i < data.result.length ; i++) {
                    RowTableCreation(data.result[i].todo, data.result[i].description, data.result[i].category, data.result[i].id);
                }
                TaskCreationBar();
            }
        })
    });
});