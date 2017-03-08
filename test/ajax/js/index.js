$('#banner').mixItUp();

$.ajax({
  type: "GET",
url:"https://raw.githubusercontent.com/MeTushar/jsonfiles/master/json4/json4.json",
  mimeType: "application/json",
  success: function(data){
    console.log(data);
    var bookTemplate = $("#bookStore").html();
    var compiledTemplate = Handlebars.compile(bookTemplate);
    var html = compiledTemplate(data);
    $(".banner").append(html);
  }
});