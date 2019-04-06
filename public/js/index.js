
// Report Button
var reportButton = $("#report-btn");

// Lookup Button
var lookupButton = $("#lookup-btn");

// Contents of top five end up in here
var div = $("#trending-report");
<<<<<<< HEAD
var company = $("#lookup-company").val()

$(document).ready(function(){
  // Click event to capture the searched company
  lookupButton.click(function() {
    company = $("#lookup-company").val()
  });
  $('.modal').modal({
    // Declaring a function to run before the modal opens
    onOpenStart: function() {
      if (company === "") {
        $("#companyName").append("Please enter a company name.")
        $("#report-searched").hide();
      } else {
        $("#report-searched").show();
=======

// This wrapper initializes the modal
$(document).ready(function(){
  $('.modal').modal({
    // Declaring a function to run before the modal opens
    onOpenStart: function() {
      var lookupCompany = {
        company_name: $("#lookup-company").val()
      };
>>>>>>> parent of c19c4e1... Merge branch 'master' into sequelize_query_updates
      $.ajax({
        method: "POST",
        url: "/api/lookup",
        data: lookupCompany
      })
<<<<<<< HEAD
<<<<<<< HEAD
      .then(function (data) {
        console.log(data);
      
        $("#companyName").append(company)

        // If the company is found in the database, we perform an ajax call to get the total number of times
        // the company has been reported, and display this in the modal.
        if (data.found == true) {
          $.ajax({
            method: "GET",
            url: "/api/ghostedCount/" + data.info.company_id
          }).then(function(count) {
            console.log(count[0]);
            $("#timesReported").append("This company has been reported " + count[0].ghostedCounts[0].count + " time(s).")
          })

          // If the company is not in the database, we display a generic message.
        } else {
          $("#timesReported").append("This company has not yet been reported.")
        }
        // $("#report-searched").click(function() {
        //   reportCompany(companyResult)
        // })
      });
      }
      
=======
        .then(function (data) {
          var company = data.company_name;
          $("#companyName").append(company)

          // If there is no data for the ghosted count, the modal displays a generic message
          if (!data.ghosted_count) {
            $("#timesReported").append("This company has not been reported yet.")

            // If there is data on the company, the modal will display the number of times this comoany has been reported
          } else {
            $("#timesReported").append("Ghosted " + data.ghosted_count + " people")
          }
        });
=======
      .then(function (data) {
        var company = data.company_name;
        $("#companyName").append(company)

        // If there is no data for the ghosted count, the modal displays a generic message
        if (!data.ghosted_count) {
          $("#timesReported").append("This company has not been reported yet.")
        
        // If there is data on the company, the modal will display the number of times this comoany has been reported
        } else {
          $("#timesReported").append("Ghosted " + data.ghosted_count + " people")
        }
      });
>>>>>>> parent of b037a87... update

>>>>>>> parent of c19c4e1... Merge branch 'master' into sequelize_query_updates
    },
    onCloseEnd: function() {
      $("#companyName").empty();
      $("#timesReported").empty();
      $("#lookup-company").val("");
    }
  });
});

function reportCompany(company) {
  $.ajax({
    method: "POST",
    url: "/api/report",
    data: company
  })
    .then(function (data) {
      // Clear textfield
      $("#report-company").val('');
<<<<<<< HEAD
    });
}

// Event listeners that allow user to swich information being displayed
$("#lifetime").on("click", getLifetimeReport);
$("#30day").on("click", get30DayReport);
$("#7day").on("click", get7DayReport);
   
$("#report-searched").on("click", function() {
=======
      console.log(data)
    });
}

      // Clear teetfield
      $("#lookup-company").val('');
      // Data is the company info
      console.log(data)
    });
<<<<<<< HEAD
}

$(reportButton).on("click", function () {
>>>>>>> parent of c19c4e1... Merge branch 'master' into sequelize_query_updates
=======
$(reportButton).on("click", function() {
>>>>>>> parent of b037a87... update
  reportCompany(companyResult);
  $("#report-company").val("");
});

var autocompleteReport;
var autocompleteLookup;

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

var companyResult = {};

function initAutocomplete() {

  console.log("initAutocomplete()")

  // Create the autocomplete object
  autocompleteReport = new google.maps.places.Autocomplete(
    document.getElementById('report-company'), { types: ['establishment'] });

  autocompleteLookup = new google.maps.places.Autocomplete(
    document.getElementById('lookup-company'), { types: ['establishment'] });

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocompleteReport.setFields('address_components');
  autocompleteLookup.setFields('address_components');

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocompleteReport.addListener('place_changed', getCompanyReportedName);
  autocompleteLookup.addListener('place_changed', getCompanyLookupName);
}

function getCompanyReportedName() {

  var place = autocompleteReport.getPlace();

  document.getElementById("report-company").value = '';
  document.getElementById("report-company").value = place.name;

  fillInAddress(place)
}

function getCompanyLookupName() {

  var place = autocompleteLookup.getPlace();

  document.getElementById("lookup-company").value = '';
  document.getElementById("lookup-company").value = place.name;

  fillInAddress(place)
}

function fillInAddress(place) {
  // Get the place details from the autocomplete object.
  //var place = autocomplete.getPlace();

  //console.log("place:", place);
  companyResult['company_name'] = place.name;

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];

    //console.log("addressType:", addressType);

    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];

      companyResult[addressType] = val;
    }
  }
  //console.log("companyResult", companyResult);
}
