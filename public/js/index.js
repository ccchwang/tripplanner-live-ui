let itinerary = [{}];
let currentDay = $(".current-day")[0].innerHTML - 1;
let removeButton = "<button class='btn btn-xs btn-danger remove btn-circle'>x</button>";
let makeSpan = "<span class='title'></span>";
let makeOption = "<option></option>";

hotels.forEach(function(hotel){
  let option = $(makeOption).text(hotel.name).attr("place-info", hotel.place.location.toString());
  $("#hotel-choices").append(option);
});

restaurants.forEach(function(restaurant){
  let option = $(makeOption).text(restaurant.name).attr("place-info", restaurant.place.location.toString());
  $("#restaurant-choices").append(option);
});

activities.forEach(function(activity){
  let option = $(makeOption).text(activity.name).attr("place-info", activity.place.location.toString());
  $("#activity-choices").append(option);
});


$("#hotels").on("click", ".btn", function(){
  let options = [].slice.call($("#hotel-choices option"));
  let selected = options.filter(function(option){
    return option.selected === true;
  });

  let newItem = $(makeSpan).text(selected[0].innerHTML);
  $("#itinerary-hotel").append(newItem).append($(removeButton));

  if (itinerary[currentDay].hotel ) { itinerary[currentDay].hotel.push(newItem) }
  else { itinerary[currentDay].hotel = [newItem] }

  coordinates = $(selected[0]).attr("place-info").split(",");
  drawMap('hotel', [coordinates[0], coordinates[1]]);
});

$("#restaurants").on("click", ".btn", function(){
  let options = [].slice.call($("#restaurant-choices option"));
  let selected = options.filter(function(option){
    return option.selected === true;
  });

  let newItem = $(makeSpan).text(selected[0].innerHTML);
  $("#itinerary-restaurant").append(newItem).append($(removeButton));

  if (itinerary[currentDay].restaurant ) { itinerary[currentDay].restaurant.push(newItem) }
  else { itinerary[currentDay].restaurant = [newItem] }

  coordinates = $(selected[0]).attr("place-info").split(",");
  drawMap('restaurant', [coordinates[0], coordinates[1]]);
});

$("#activities").on("click", ".btn", function(){
  let options = [].slice.call($("#activity-choices option"));
  let selected = options.filter(function(option){
    return option.selected === true;
  });

  let newItem = $(makeSpan).text(selected[0].innerHTML);
  $("#itinerary-activity").append(newItem).append($(removeButton));

  if (itinerary[currentDay].activity ) { itinerary[currentDay].activity.push(newItem) }
  else { itinerary[currentDay].activity = [newItem] }

  coordinates = $(selected[0]).attr("place-info").split(",");
  drawMap('activity', [coordinates[0], coordinates[1]]);
});

$("#itinerary-hotel").on("click", ".btn", function(){
  let prevSibling = $(this)[0].previousSibling;
  itinerary[currentDay].hotel = itinerary[currentDay].hotel.filter((hotel) => {
    return hotel[0].innerHTML !== prevSibling.innerHTML;
  })
  prevSibling.remove();
  this.remove();
  marker.pop().setMap(null)
})

$("#itinerary-restaurant").on("click", ".btn", function(){
  let prevSibling = $(this)[0].previousSibling;
  itinerary[currentDay].restaurant = itinerary[currentDay].restaurant.filter((restaurant) => {
    return restaurant[0].innerHTML !== prevSibling.innerHTML;
  })
  prevSibling.remove();
  this.remove();
  marker.pop().setMap(null)
})

$("#itinerary-activity").on("click", ".btn", function(){
  let prevSibling = $(this)[0].previousSibling;
  itinerary[currentDay].activity = itinerary[currentDay].activity.filter((activity) => {
    return activity[0].innerHTML !== prevSibling.innerHTML;
  })
  prevSibling.remove();
  this.remove();
  marker.pop().setMap(null)
})

$("#day-add").on("click", function(){
  let newDayNum = Number($("#day-add")[0].previousElementSibling.innerHTML) + 1;
  let newDay = $(`<button class='btn btn-circle day-btn'>${newDayNum}</button>`)
  $("#day-add").before(newDay);
})


function setHotel(){
  $("#itinerary-hotel").empty();

  if ( itinerary[currentDay].hotel ) {
    itinerary[currentDay].hotel.forEach(function(dayItem) {
      let name = dayItem[0].innerHTML;
      var dayItem = $(makeSpan).text(name);

      $("#itinerary-hotel").append(dayItem).append($(removeButton));
    })
  }
}

function setRestaurant(){
  $("#itinerary-restaurant").empty();

  if ( itinerary[currentDay].restaurant ) {
    itinerary[currentDay].restaurant.forEach(function(dayItem) {
      let name = dayItem[0].innerHTML;
      var dayItem = $(makeSpan).text(name);

      $("#itinerary-restaurant").append(dayItem).append($(removeButton));
    })
  }
}

function setActivity(){
  $("#itinerary-activity").empty();

  if ( itinerary[currentDay].activity ) {
    itinerary[currentDay].activity.forEach(function(dayItem) {
      let name = dayItem[0].innerHTML;
      var dayItem = $(makeSpan).text(name);

      $("#itinerary-activity").append(dayItem).append($(removeButton));
    })
  }
}


$(".day-buttons").on("click", ".day-btn", function(){

  if ($(this)[0].innerHTML !== "+") {
    $(".current-day")[0].className = "btn btn-circle day-btn";

    $(this).addClass("current-day");

    currentDay = $(this)[0].innerHTML - 1;
    $("#day-title span").text(`Day ${currentDay+1}`);

    if(!itinerary[currentDay]) {itinerary[currentDay] = {}};

    setHotel.call(this);
    setRestaurant.call(this);
    setActivity.call(this);
  }
})

$(".remove").on("click", function() {
  if (currentDay !== 0) { itinerary[currentDay] = {};

    let prevSibling = $(".current-day")[0].previousElementSibling;
    $(".current-day").remove();
    prevSibling.className = "btn btn-circle day-btn current-day";

    currentDay = $(".current-day")[0].innerHTML - 1;
    $("#day-title span").text(`Day ${currentDay+1}`);

    setHotel.call(this);
    setRestaurant.call(this);
    setActivity.call(this);
  }
})
