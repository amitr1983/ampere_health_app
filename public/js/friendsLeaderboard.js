$( document ).ready(function() {

$.ajax({
    url: '/friend',
    type: "get",
    dataType: "json",
   
    success: function(data, textStatus, jqXHR) {
        // since we are using jQuery, you don't need to parse response
        drawTable(data);
    }
});


});

function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
        console.log.data[i]
    }
}

function drawRow(rowData) {
    var row = $("<tr />")
    $("#friend123").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.user.age + "</td>"));
}