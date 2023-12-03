/* 
File: script.js
GUI Assignment: Creating an Interactive Dynamic Table
Michael Chagnon, UMass Lowell Computer Science,
michael_chagnon@student.uml.edu
Copyright (c) 2021 by Michael. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
Created by MC on November 20, 2023
Description: A website that will dynamicallly create a multiplication table 
with row and column values between -50 and 50 using jquery sliders and validation.
Website also has tabs to store previous tables created and deletion of them.
*/
    
$("#minColSlider").slider({ // Creates jquery slider and defines characteristics of it.
    min: -50,               // Also makes it so slider dynamically creates table by submitting when
    max: 50,                // a change is made. Also handles double binding for text box.
    slide: function (event, ui) {
    $("#minCol").val(ui.value);
    $("#formValidation").first().trigger("submit")
    },

});

$("#maxColSlider").slider({
    min: -50,
    max: 50,
    slide: function (event, ui) {
    $("#maxCol").val(ui.value);
    $("#formValidation").first().trigger("submit")
    },
});

$("#minRowSlider").slider({
    min: -50,
    max: 50,
    slide: function (event, ui) {
    $("#minRow").val(ui.value);
    $("#formValidation").first().trigger("submit")
    },
});

$("#maxRowSlider").slider({
    min: -50,
    max: 50,
    slide: function (event, ui) {
    $("#maxRow").val(ui.value);
    $("#formValidation").first().trigger("submit")
    },
});

$("#minCol").on("keyup", function(){    // Handles text boxes and binding them to the jquery slide to display the same numbers.
   $( "#minColSlider" ).slider( "option", "value", parseInt($(this).val()) );
   if($("#formValidation").valid() == true){
   $("#formValidation").first().trigger("submit")
   }
 });

 $("#maxCol").on("keyup", function(){       
    $( "#maxColSlider" ).slider( "option", "value", parseInt($(this).val()) );
    if($("#formValidation").valid() == true){
    $("#formValidation").first().trigger("submit")
    }
  });

  $("#minRow").on("keyup", function(){       
    $( "#minRowSlider" ).slider( "option", "value", parseInt($(this).val()) );
    if($("#formValidation").valid() == true){
    $("#formValidation").first().trigger("submit")
    }
  });

  $("#maxRow").on("keyup", function(){       
    $( "#maxRowSlider" ).slider( "option", "value", parseInt($(this).val()) );
    if($("#formValidation").valid() == true){
    $("#formValidation").first().trigger("submit")
    }
  });

$(document).ready(function() {
    $("div#tabs").tabs();
});

var num_tabs = 1;
var tabs = $("#tabs").tabs();


$("button#add-tab").click(function() { // Function derived from https://stackoverflow.com/questions/14702631/in-jquery-ui-1-9-how-do-you-create-new-tabs-dynamically
    const elements = document.querySelectorAll('#tabs ul li');
    const count = elements.length; // Keeps count of all current tabs
    var minCol = Number(document.getElementById("minCol").value); // takes inputs from text box in HTML and
    var maxCol = Number(document.getElementById("maxCol").value); // assigns it to a JS variable as a Number
    var minRow = Number(document.getElementById("minRow").value);
    var maxRow = Number(document.getElementById("maxRow").value); 
    if (minCol <= maxCol && minRow <= maxRow) {
    $("#formValidation").first().trigger("submit");
    $("div#tabs ul").append("<li><input type='checkbox'><a href='#tab" + num_tabs + "'>#" + minCol + ',' + maxCol + ',' + minRow + ',' + maxRow +"</a><span class='ui-icon ui-icon-close'></li>");
    $("div#tabs").append("<div id='tab" + num_tabs + "'>" + "</div>");
    $("#tabs").tabs("refresh");
    $("#tabs").tabs({    // Makes newly created tab the active one.
        active: count - 1
    });
    copytable(num_tabs);
    num_tabs++;
    }
});

function copytable(var1) {  // Function derived from https://stackoverflow.com/questions/32730261/copy-the-content-of-one-html-table-into-another-using-javascript-revisited
    var source = document.getElementById('table');
    var destination = document.getElementById('tab' + var1);
    var copy = source.cloneNode(true);
    copy.setAttribute('id', ('tab' + var1));
    destination.parentNode.replaceChild(copy, destination);
  }

  tabs.delegate("span.ui-icon-close", "click", function () { // Function used to allow for deletion of individual tabs with x in corner.
    var panelId = $(this).closest("li").remove().attr("aria-controls"); // Function derived from https://codepen.io/lalawork513/details/xRparL
    $("#" + panelId).remove();
    tabs.tabs("refresh");
  });

  $("#remove").on("click", function() { // Function derived from https://stackoverflow.com/questions/26730986/delete-checked-checkboxes-in-jquery
    $("input:checkbox").each(function() {
        if ($(this).is(":checked")) {
            $(this).parent().remove();
            var panelId = $(this).closest("li").remove().attr("aria-controls");
            $("#" + panelId).remove();
            tabs.tabs("refresh");
        }
    });
    tabs.tabs("refresh");
  });


$.validator.addMethod("greaterThan", function (value, element, param) { // Function derived from https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
    var $otherElement = $(param);
    return parseInt(value, 10) >= parseInt($otherElement.val(), 10);
});

$.validator.addMethod("noDecimal", function(value, element) { // Function derived from https://code-cocktail.in/ultimate-tweets/decimal-numbers-jquery-validation/
    return !(value % 1);
});


$("#formValidation").validate({ // Validation for inputs for the multiplication table. Makes the fields 
                                // required, in the range of -50 to 50, not a decimal, and be proper amount
    rules:{                     // compared to other input fields.
    minCol:{
        required: true,
        range: [-50, 50],
        noDecimal: true
    },
    maxCol:{
        required: true,
        range: [-50, 50],
        greaterThan: "#minCol"
    },
    minRow:{
        required: true,
        range: [-50, 50]
    },
    maxRow:{
        required: true,
        range: [-50, 50],
        greaterThan: "#minRow"
    },

    },
    messages: { // Error messages for each corresponding error type.
        minCol:{
            required: "Field has been left blank. Enter an integer value.",
            range: "Input must be between -50 and 50",
            noDecimal: "Input needs to be an integer not a decimal.",
        },
        maxCol:{
            required: "Field has been left blank. Enter an integer value.",
            range: "Input must be between -50 and 50",
            greaterThan: "Max column must be greater than minimum column.  To fix make it greater than minimum column",
            noDecimal: "Input needs to be an integer not a decimal.",
        },
        minRow:{
            required: "Field has been left blank. Enter an integer value.",
            range: "Input must be between -50 and 50",
            noDecimal: "Input needs to be an integer not a decimal.",
        },
        maxRow:{
            required: "Field has been left blank. Enter an integer value.",
            range: "Input must be between -50 and 50",
            greaterThan: "Max row must be greater than minimum row.  To fix make it greater than minimum row.",
            noDecimal: "Input needs to be an integer not a decimal.",
        },
    },

    submitHandler: function(form) {
    // Responsible for creating table after all validation is passed.
        
    var minCol = Number(document.getElementById("minCol").value); // takes inputs from text box in HTML and
    var maxCol = Number(document.getElementById("maxCol").value); // assigns it to a JS variable as a Number
    var minRow = Number(document.getElementById("minRow").value);
    var maxRow = Number(document.getElementById("maxRow").value);    


    const tblBody = document.getElementById("table");

        tblBody.innerHTML = ""; // clears table
        for (let i = minRow; i < maxRow + 2; i++) {
            const row = document.createElement("tr");

            if (i === minRow) { // if we are creating the first row the first element will be a 'x'
                const cell = document.createElement("th");
                const cellText = document.createTextNode('x');
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else { // otherwise we start by writing the first appropriate column digit
                const cell = document.createElement("th");
                const cellText = document.createTextNode(i - 1);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            for (let j = minCol; j < maxCol + 1; j++) { // creates the rows
                if (i === minRow) { // if we are writing the first row use th and write just the row values
                    const cell = document.createElement("th");
                    const cellText = document.createTextNode(j);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                } else { // otherwise write row with column digit multiplied by row
                    const cell = document.createElement("td");
                    const cellText = document.createTextNode((i - 1) * j);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
            }

            tblBody.appendChild(row);
        }

        document.getElementById("display").appendChild(tblBody);
    }
});