$(document).ready(function () {
	//Get BusinessPartners List from SL
	$.get("/GetBusinessPartners", function (json) {
		displayBusinessPartners(json);
	});
	//Get Environment Variables
	$.get("/GetEnv", function (json) {
		displayEnvironment(json);
	});
	//Get BusinessPartners from Cloud Platform DB
	$.get("/SelectBusinessPartners", function (json) {
		displayBusinessPartnersSQL(json);
	});

	$('#sync').on('click', function () {
		$('#sync i').addClass("fa-spin");
		$('#sync').prop('disabled', true)
		$.post("/Sync", function () {
			setTimeout(function(){
				$('#sync i').removeClass("fa-spin");
				$('#sync').prop('disabled', false);
				location.reload()}, 1500)
		});
	});

});

function displayBusinessPartners(json) {
	var bps = json.value;
	$("#resultTable tbody").empty();
	//Lines	
	for (var i = 0; i < bps.length; i++) {
		$("#resultTable tbody").append(
			"<tr>" +
			"<td>" + (i + 1) + "</td>" +
			"<td>" + bps[i].CardCode + "</td>" +
			"<td>" + bps[i].CardName + "</td>" +
			"<td>" + bps[i].CardType + "</td>" +
			"<td>" + bps[i].CurrentAccountBalance + "</td>" +
			"</tr>")
	}
}

function displayEnvironment(json) {
	$("#env").append(
		"<div>" + "<strong>SL SessionID:</strong> " + json.sl + "</div>" +
		"<div>" + "<strong>Served by server #</strong> " + json.instance + "</div>");
}

function displayBusinessPartnersSQL(bps) {
	$("#resultTableSQL tbody").empty();
	//Lines	
	for (var i = 0; i < bps.length; i++) {
		$("#resultTableSQL tbody").append(
			"<tr>" +
			"<td>" + (i + 1) + "</td>" +
			"<td>" + bps[i].code + "</td>" +
			"<td>" + bps[i].name + "</td>" +
			"<td>" + bps[i].integrated + "</td>" +
			"</tr>");
	}
}