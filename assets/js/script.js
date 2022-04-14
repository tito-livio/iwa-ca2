$("#add_car").submit(function() {
    alert("Data inserted successfully");
})

$("#update_car").submit(function(event) {
    event.preventDefault();
    let unindexed_array = $(this).serializeArray();
    let data = {};
    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value'];
    });
    let request = {
        "url": `api/update/${data.id}`,
        "method": "PATCH",
        "data": data
    }
    console.log(request);
    $.ajax(request).done((response) => {
        alert("Data Upadated Successfully");
    })
})

if (window.location.pathname == "/edit-car") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function() {
        var id = $(this).attr("data-id");
        var request = {
            "url": `http://localhost:4000/api/delete/${id}`,
            "method": "DELETE"
        }
        if (confirm("Are you sure you want to delete this record?")) {
            $.ajax(request).done((response) => {
                alert("Data Deleted Successfully");
                location.reload();
            })

        }
    })
}