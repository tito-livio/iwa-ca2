let selectedCarsArray = [];
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

$("#add_car").submit(function () {
  alert("Data inserted successfully");
});

$("#update_car").submit(function (event) {
  event.preventDefault();
  let unindexed_array = $(this).serializeArray();
  let data = {};
  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });
  let request = {
    url: `api/update/${data.id}`,
    method: "PATCH",
    data: data,
  };
  console.log(request);
  $.ajax(request).done((response) => {
    alert("Data Upadated Successfully");
  });
});

if (window.location.pathname == "/edit-car") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");
    var request = {
      url: `http://localhost:4000/api/delete/${id}`,
      method: "DELETE",
    };
    if (confirm("Are you sure you want to delete this record?")) {
      $.ajax(request).done((response) => {
        alert("Data Deleted Successfully");
        location.reload();
      });
    }
  });
}
//Function to select any row via the checkbox of that row
//each checkbox has a number assigned to it -> matches the number of the table row
//and highlights it by adding a class and selectes it

function selectRow(e, n) {
  let totalBill = 0;
  //If the row is selected then remove the selected class
  //otherwise add it
  let carRow = $(`#carTableRow${n}`);
  let checked = e.target.checked;
  //Here first we are getting the selected cars element's text
  //and convert it into number for manipulation
  let selectedCarsNo = parseInt($("#selectedCars").text());
  if (checked == false) {
    let filteredArray = selectedCarsArray.filter(function (car) {
      return car.name != $(`#car${n}name`).text();
    });
    selectedCarsArray = filteredArray;
    carRow.removeClass("selected");
    selectedCarsNo--;
    $(selectedCars).text(selectedCarsNo);
  } else {
    selectedCarsNo++;
    $(selectedCars).text(selectedCarsNo);
    carRow.addClass("selected");
    //Adding selected car into array
    selectedCarsArray.push({
      name: $(`#car${n}name`).text(),
      price: parseInt($(`#car${n}price`).attr("data-price")),
    });
  }
  selectedCarsArray.forEach(function (selectedCar) {
    console.log(selectedCar);
    totalBill += selectedCar.price;
  });
  $("#totalAmount").val(formatter.format(totalBill));
  console.log(selectedCarsArray);
}
//Function to highlight cars if they are eco-friendly
function highlightEco(e) {
  let carTableRows = $(".carTableRow");
  for (let i = 0; i < carTableRows.length; i++) {
    let isEco = carTableRows[i].getAttribute("data-eco");
    if (isEco == "Yes") {
      if (e.target.checked == false) {
        carTableRows[i].classList.remove("eco-highlight");
      } else {
        carTableRows[i].classList.add("eco-highlight");
      }
    }
  }
}
function calculateBill() {
  let totalBill = 0;
  selectedCarsArray.forEach(function (selectedCar) {
    console.log(selectedCar);
    totalBill += selectedCar.price;
  });
  console.log(totalBill);
}
