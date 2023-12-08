$.getPage = function( href ) {
	var URL = new RegExp('#(.*)').exec(href);
	if (URL== null){
		DOC = "ABOUT";
	}
	else{
		DOC = URL[1];
	}
	var converter = new showdown.Converter();
	$.ajax({
		url: "markdown/" + DOC + ".md",
		success: function( result ) {
			$("#content").html(converter.makeHtml(result));
			$("#content a").bind("click", function () {
				$.getPage($(this).attr('href'));
			});
			$("div#content h1").hide();
			var HEADERs = new RegExp('(.+)@(.+)').exec($("div#content h1").html());
			if (HEADERs == null) {
				TITLE = $("div#content h1").html() 
			}
			else {
				TITLE = HEADERs[1]
				$("#content").addClass(HEADERs[2])
			}
			$("span#header").html(TITLE);
		}
	});
}

$( document ).ready(function() {
	$.getPage(window.location.href);
	$("div.menubar a").bind("click", function () {
		$.getPage($(this).attr('href'));
	});
});
