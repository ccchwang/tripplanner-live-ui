var days = [];
var currentDay = $(".current-day")[0].innerHTML - 1;



  hotels.forEach(function(hotel){
    let option = $("<option></option>").text(hotel.name).attr("placeObj", hotel.place.location.toString())

    $("#hotel-choices").append(option);

  });

  restaurants.forEach(function(restaurant){
    let option = $("<option></option>").text(restaurant.name).attr("placeObj", restaurant.place.location.toString())
    $("#restaurant-choices").append(option);
  });

  activities.forEach(function(activity){
    let option = $("<option></option>").text(activity.name).attr("placeObj", activity.place.location.toString())
    $("#activity-choices").append(option);
  });


  $("#hotels button").on("click", function(){
    let options = [].slice.call($("#hotel-choices option"));
    let selected = options.filter(function(option){
      return option.selected === true;
    });
    selected = [].slice.call(selected);
    var text = selected[0].innerHTML;
    var something = $("<span class='title'></span>").text(text);
    var button = $("<button class='btn btn-xs btn-danger remove btn-circle'>x</button>")

    if (days[currentDay]) { //day[0]
      days[currentDay].push(something)
    } else {
      days[currentDay] = [something]
    }
    $("#selectedHotel").append(something);
    $("#selectedHotel").append(button);
    console.log(days)
    var coordinates = selected[0].attributes.placeobj.nodeValue;
    coordinates = coordinates.split(",");
    drawMap('hotel', [coordinates[0], coordinates[1]]);
  });

   $("#restaurants button").on("click", function(){
    let options = [].slice.call($("#restaurant-choices option"));
    let selected = options.filter(function(option){
      return option.selected === true;
    });
    selected = [].slice.call(selected);
    var text = selected[0].innerHTML;
    var something = $("<span class='title'></span>").text(text);
    var button = $("<button class='btn btn-xs btn-danger remove btn-circle'>x</button>")

    $("#selectedRestaurant").append(something);
    $("#selectedRestaurant").append(button);

    var coordinates = selected[0].attributes.placeobj.nodeValue;
    coordinates = coordinates.split(",");
    drawMap('restaurant', [coordinates[0], coordinates[1]]);
  });

   $("#activities button").on("click", function(){
    let options = [].slice.call($("#activity-choices option"));
    let selected = options.filter(function(option){
      return option.selected === true;
    });
    selected = [].slice.call(selected);
    var text = selected[0].innerHTML;
    var something = $("<span class='title'></span>").text(text);
    var button = $("<button class='btn btn-xs btn-danger remove btn-circle'>x</button>")

    $("#selectedActivities").append(something);
    $("#selectedActivities").append(button);

    var coordinates = selected[0].attributes.placeobj.nodeValue;
    coordinates = coordinates.split(",");
    drawMap('activity', [coordinates[0], coordinates[1]]);
  });

$("#selectedHotel").on("click", ".btn", function(){
  var prevSibling = $("this").prevObject[0].activeElement.previousSibling;
  prevSibling.remove();
  this.remove();
  marker.pop().setMap(null)
})

$("#selectedRestaurant").on("click", ".btn", function(){
  var prevSibling = $("this").prevObject[0].activeElement.previousSibling;
  prevSibling.remove();
  this.remove();
  marker.pop().setMap(null)
})

$("#selectedActivities").on("click", ".btn", function(){
  var prevSibling = $("this").prevObject[0].activeElement.previousSibling;
  prevSibling.remove();
  this.remove();
  marker.pop().setMap(null)
})

$("#day-add").on("click", function(){
  var newDay = $(".day-buttons").children().length
  var btn = $(`<button class='btn btn-circle day-btn'>${newDay}</button>`)
  $("#day-add").before(btn)
})


function setHotel(){
  $("#selectedHotel").empty();


  var dayNumber = this.innerHTML - 1;

  days[dayNumber].forEach(function(item) {
    var name = item[0].innerHTML;

    var something = $("<span class='title'></span>").text(name);
    var button = $("<button class='btn btn-xs btn-danger remove btn-circle'>x</button>")

    $("#selectedHotel").append(something);
    $("#selectedHotel").append(button);
  })

  // $("#hotels button").on("click", function(){
  //   let options = [].slice.call($("#hotel-choices option"));
  //   let selected = options.filter(function(option){
  //     return option.selected === true;
  //   });
  //   selected = [].slice.call(selected);
  //   var text = selected[0].innerHTML;


  //   var coordinates = selected[0].attributes.placeobj.nodeValue;
  //   coordinates = coordinates.split(",");
  //   drawMap('hotel', [coordinates[0], coordinates[1]]);
  // });

}

$(".day-buttons").on("click", ".day-btn", function(){

  if ($("this").prevObject[0].activeElement.innerHTML !== "+") {
    $("button.current-day").removeClass(".current-day")
    $("this").prevObject[0].activeElement.className += " current-day";
  setHotel.call(this)
  }
})
