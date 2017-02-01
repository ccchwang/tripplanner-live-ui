let itinerary = [{}];
let currentDay = $(".current-day")[0].innerHTML - 1;
let removeButton = "<button class='btn btn-xs btn-danger remove btn-circle'>x</button>";
let makeSpan = "<span class='title'></span>";
let makeOption = "<option></option>";
let thingsToDo = ['hotel', 'restaurant', 'activity'];

//SET OPTIONS
function setOptions(pair){
  pair[0].forEach(function(instance){
    let name = pair[1];
    let option = $(makeOption).text(instance.name).attr("place-info", instance.place.location.toString());
    $(`#${name}-choices`).append(option);
  });
}

[[hotels, 'hotel'], [restaurants, 'restaurant'], [activities, 'activity']].forEach((pair) => { setOptions(pair); })


//ADD ITINERARY ITEMS
function addItineraryItem(item) {
  var className;
  item === 'activity' ? className = 'activities' : className = item + 's';

  $(`#${className}`).on("click", ".btn", function(){
    let options = [].slice.call($(`#${item}-choices option`));
    let selected = options.filter(function(option){
      return option.selected === true;
    });

    let newItem = $(makeSpan).text(selected[0].innerHTML);
    $(`#itinerary-${item}`).append(newItem).append($(removeButton));

    if (itinerary[currentDay][item] ) { itinerary[currentDay][item].push(newItem) }
    else { itinerary[currentDay][item] = [newItem] }

    coordinates = $(selected[0]).attr("place-info").split(",");
    drawMap(`${item}`, [coordinates[0], coordinates[1]]);
  });
}

thingsToDo.forEach((item) => { addItineraryItem(item) });


//REMOVE ITINERARY ITEMS
function removeItineraryItem(item) {
  $(`#itinerary-${item}`).on("click", ".btn", function(){
    let prevSibling = $(this)[0].previousSibling;
    itinerary[currentDay][item] = itinerary[currentDay][item].filter((instance) => {
      return instance[0].innerHTML !== prevSibling.innerHTML;
    })
    prevSibling.remove();
    this.remove();
    marker.pop().setMap(null)
  })
}

thingsToDo.forEach((item) => { removeItineraryItem(item) });


//ADD NEW DAYS
$("#day-add").on("click", function(){
  let newDayNum = Number($("#day-add")[0].previousElementSibling.innerHTML) + 1;
  let newDay = $(`<button class='btn btn-circle day-btn'>${newDayNum}</button>`)
  $("#day-add").before(newDay);
})


//RESET FOR DIFFERENT DAYS AND REMOVE DAYS
function reset(item){
  $(`#itinerary-${item}`).empty();

  if ( itinerary[currentDay][item] ) {
    itinerary[currentDay][item].forEach(function(dayItem) {
      let name = dayItem[0].innerHTML;
      var dayItem = $(makeSpan).text(name);

      $(`#itinerary-${item}`).append(dayItem).append($(removeButton));
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

    thingsToDo.forEach((item) => { reset(item) })
  }
})

$(".remove").on("click", function() {
  if (currentDay !== 0) { itinerary[currentDay] = {};

    let prevSibling = $(".current-day")[0].previousElementSibling;
    $(".current-day").remove();
    prevSibling.className = "btn btn-circle day-btn current-day";

    currentDay = $(".current-day")[0].innerHTML - 1;
    $("#day-title span").text(`Day ${currentDay+1}`);

    thingsToDo.forEach((item) => { reset(item) })
  }
})
