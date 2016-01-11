(function ($) {
	var nominatim = Nominatim($)

	$(document).ready(function () {
		addCountries()
		hideLoadingRing()
		$("#countryAddBtn").click(function (event) {
			var countrySelect = $("#countrySelect")
			addCountry()
		})

		$("#submitBtn").click(function (event) {
			event.preventDefault()
			showLoadingRing()
			$("#locationData").empty()
			var postCodeInput = $("#postCodeInput").val()
			if (!(postCodeInput.trim())) {
				hideLoadingRing()
				Materialize.toast("Sorry! But you didn't enter any code!", 2000)
				return;
			}
			nominatim.getData({"postalcode": postCodeInput})
				.then(function (data) {
					hideLoadingRing()
					displayCollection(data)
				},
				function (error) {
					hideLoadingRing()
					Materialize.toast("Sorry! There was an error while getting location data for you!", 4000)
				})
		})
	})

	function getMap(latitude, longitude, zoomLevel) {
		var mapUrl = "http://www.openstreetmap.org/#"
		if (!latitude || !longitude) {
			throw new Error("No latitude or longitude provided in order to display a map")
		}
		var zoomLevel = zoomLevel || 15
		mapUrl += "map=" + zoomLevel
		mapUrl += "/" + latitude + "/" + longitude
		// a link to the map
		return mapUrl 

	}

	function notFound() {
		$("#locationData").hide()
		Materialize.toast("Sorry! No results found for this post code! :'(", 3000)
	}

	function displayCollection (data) {
		if (!data[0]) {
			notFound()
			return
		}
		var collectionArray = data.map(function (value, index, array) {
			console.log(value)
			var collectionItem = $("<li class='collection-item avatar'></li>")
			collectionItem.append($("<span class='title'>").text(value.display_name))
			collectionItem.append($("<p></p>").append("Latitude: " + value.lat + "<br/>").append("Longitude: " + value.lon))
			// collectionArray.append($("<a href='#!' class='secondary-content'><i class='material-icons'>place</i></a>/"))
			
			// mapLink
			collectionItem.append(
				$("<a></a>")
					.attr("href", getMap(value.lat, value.lon))
					.attr("target", "_blank")
					.addClass("green-text")
					.addClass("secondary-content")
					.addClass("tooltipped")
					.html("<i class='material-icons'>place</i>")
					.attr("data-tooltip", "Open map in new window")
					.attr("data-position", "top")
					.attr("data-delay", "50")
				)
			return collectionItem
		})

		$("#locationData").empty()
		$("#locationData").append(collectionArray)
		$("#locationData").show()
		$(".tooltipped"	).tooltip({delay: 50})
	}


	function showLoadingRing() {
		$("#locationLoading").show()
	}

	function hideLoadingRing() {
		$("#locationLoading").hide()
	}

	// add countries to the select
	function addCountries() {
		var countrySelect = $("#countrySelect")
		$.get("data/countrycodes.json")
			.then(function (data) {
				data.forEach(function (value, index) {
					countrySelect.append("<option value='" + value.Code.toLowerCase() + "'>" + value.Name + "</option>" )
				})
				$('select').material_select();
			})
	} 

	function addCountry() {
		var countrySelect = $("#countrySelect")

		if (nominatim.addCountryCode(countrySelect.val())) {
			addCountryBadge(countrySelect.val())
		}
		else {
			Materialize.toast("The country has already been added", 2000)
		}
	}

	// addds a country badge and attaches an event to the close button too
	function addCountryBadge(country) {
		var closeIcon = $("<i class='material-icons'>close</i>")
		closeIcon.data("country", country)
		var countryElement = $("<div class='chip'>" + country.toUpperCase() + "</div>")
		countryElement.append(closeIcon)
		countryElement.prepend("<img src='icons/flags-iso/shiny/64/" + country.toUpperCase() + ".png' />")

		// adding animations
		countryElement.addClass("animated fadeIn")

		closeIcon.on("click", function (event) {
			removeCountryBadge(event, this)
		})

		$(".countryChips").append(countryElement)
	}
 
	function removeCountryBadge(event, elem) {
		nominatim.removeCountryCode($(elem).data("country"))
		Materialize.toast("The country " + $(elem).data("country").toUpperCase() + " has been removed", 2000 )
	}



	// nominatim module
	function Nominatim($, limit, format) {
		var baseUrl = "//nominatim.openstreetmap.org/search"
		
		var countryCodes = []
		var format = format || "json"
		var limit = limit || undefined

		// sends a get request to the the nominatim api in order to get the data
		function getData(obj) {
			var queryData = formatQueryData(obj)
			return $.ajax({
				type: "GET",
				url: baseUrl,
				data: queryData
			})
		}

		// formats the query data in order to send the api enpoint
		function formatQueryData(obj) {
			var queryData = {}
			var limit = obj.limit
			if (obj.q) {
				queryData.q = obj.q
			} else {
				queryData = obj
			}

			queryData.format = obj.format || format
			queryData.countrycodes = countryCodes.join(",")

			return queryData
		}

		// adds a country to the country codes list
		function addCountryCode(country) {
			var found = false;
			if (country) {
				countryCodes.forEach(function (value) {
					if (value == country) {
						found = true
					}
				})
				if (!found) {
					countryCodes.push(country)
					return true
				}
				else {
					return false
				}
			}

		}

		/*
		 * removes a country from the country code list
		 * if no country present removes all the countries
		 */
		function removeCountryCode(country) {
			if (!country) {
				countryCodes = []
				return ;
			}

			countryCodes = countryCodes.filter(function (value) {
				return value != country
			})
		}

		// getter for the countryCodes array
		function getCountryCodes(country) {
			return countryCodes
		}

		// methods to be returned for the userToAccess
		return {
			removeCountryCode: removeCountryCode,
			addCountryCode: addCountryCode,
			getCountryCodes: getCountryCodes,
			getData: getData
		}
	}
})(jQuery)