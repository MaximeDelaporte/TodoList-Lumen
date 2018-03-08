$(document).ready(function () {
    let htmlRender = "";
    let htmlRenderBis = "";
    let htmlRenderTer = "";
    let htmlRender2;
    let i;
    let z;
    let todoListNumber = 0;

    // Create a new todoList
    $('#addTodoList').on('click',function () {
        i = 1;
        todoListNumber += 1;
        htmlRender = "";
        htmlRender2 = "";
        z = 0;

        htmlRender += "<h3></h3>";
        htmlRender += "<table data-todolist='" + todoListNumber + "'>";
        htmlRender += "</table>";
        $('[data-action="createTable"]').html(htmlRender);
        htmlRender2 += "<button data-use='create-todo-list'>+</button><input type='text' name='Task-Name' id='taskName' placeholder='Type your task name'><input type='text' name='Task-Description' id='taskDescription' placeholder='Type the description'><input type='text' name='Task-Category' id='taskCategory' placeholder='Type the category'>";
        $('#typingTask').html(htmlRender2);
    });

    // One TodoList Table creation
    $('body').on('click', '[data-use="create-todo-list"]', function () {
        if (document.querySelector('#taskName').value != "" && document.querySelector('#taskDescription').value != "" && document.querySelector('#taskCategory').value != "") {
            let taskName = document.querySelector('#taskName').value;
            let taskDescription = document.querySelector('#taskDescription').value;
            let taskCategory = document.querySelector('#taskCategory').value;
            /*localStorage.setItem("1",taskName);
            localStorage.setItem("2",taskDescription);
            localStorage.setItem("3",taskCategory);*/

            /*$.ajax({
                type: "POST",
                url: "",
                data : {taskName, taskDescription, taskCategory}
            });*/
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
            htmlRender += "<td><button name='delete' id='delete-" +  i + "'>Bin</button></td>";
            htmlRender += "</tr>";
            i++;
            $('[data-todolist="' + todoListNumber + '"]').html(htmlRender);
        } if (document.querySelector('#taskName').value == "") {
                    alert("Task Name is required");
        } if (document.querySelector('#taskDescription').value == "") {
                    alert("Task Description is required");
        } if (document.querySelector('#taskCategory').value == "") {
                    alert("Task Category is required");
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
    })
});