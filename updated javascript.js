var num_note = 1;
var color = "";

//Make the element div draggagle:
dragElement(document.getElementById("mydiv1"));

function ChangeColor(number) {
    if (number == 0) {
        color = "#ffc";
    } else if (number == 1) {
        color = "plum";
    } else {
        color = "cornflowerblue";
    }
}

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        var style = window.getComputedStyle(elmnt);
        mar_top = parseInt(style.marginTop);
        mar_left = parseInt(style.marginLeft);

        elmnt.style.top = (elmnt.offsetTop - pos2 - mar_top) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1 - mar_left) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}



function createNote() {

    // Counter for Each Note:
    num_note++;

    // Title and Text of the Note
    var title = "Note" + num_note;
    var text = prompt("write your note here...");

    // IDs of Notes and Header
    note_id = "mydiv" + num_note;
    divheader_id = note_id + "header";

    
    var div_1 = document.createElement("div");
    div_1.classList.add("note");
    div_1.id = note_id;

    // Creating HEADER DIV
    var div_2 = document.createElement("div");
    div_2.id = divheader_id;
    div_2.classList.add("note_title")

    // Creating X (CLOSE) img
    var x_img = document.createElement('img');
    x_img.addEventListener("click", deleteCurrentNote);
    x_img.src = "images/x_note.png";
    x_img.classList.add("x_note_img");
    x_img.id = "x_note_img" + num_note;
    div_2.appendChild(x_img);


    var h = document.createElement("h1");
    h.innerText = title;

    var hr = document.createElement("hr");

    var p = document.createElement("p");
    p.innerText = text;
    p.contentEditable = true;


    // Randomizing Color
    var rand = Math.floor(Math.random() * 3);
    ChangeColor(rand);
    console.log(color)
    div_1.style.backgroundColor = color;

    div_2.appendChild(h);
    div_2.appendChild(hr)
    div_1.appendChild(div_2);
    div_1.appendChild(p);


    // Getting Position of Last created Note
    if (num_note - 1 != 0) {
        last_note = document.getElementById("mydiv" + (num_note - 1));
        last_note_top = parseInt(last_note.style.top);
        last_note_left = parseInt(last_note.style.left);

        // Positioning the Current Note
        div_1.style.top = last_note_top;
        div_1.style.left = last_note_left + 300;
    }


    parent_div = document.getElementById("holder")
    parent_div.appendChild(div_1);

    dragElement(document.getElementById(note_id));


}



function deleteCurrentNote() {
    var note = document.getElementById(window.event.target.id);
    header_div = note.parentElement;
    note_div = header_div.parentElement;
    note_div.style.display = "none";
}

// RIGHT CLICK MENU
document.onclick = hideMenu;
document.oncontextmenu = rightClick;

function hideMenu() {
    document.getElementById("contextMenu").style.display = "none"
}

function rightClick(e) {
    e.preventDefault();

    if (document.getElementById("contextMenu").style.display == "block")
        hideMenu();
    else {
        var menu = document.getElementById("contextMenu")

        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
}