$('#banner').mixItUp();


$.ajax({
  type: "GET",
url:"https://ruservis.github.io/test/ajax/data.json",
  mimeType: "application/json",
  success: function(data){
    console.log(data);
    var bookTemplate = $("#bookStore").html();
    var compiledTemplate = Handlebars.compile(bookTemplate);
    var html = compiledTemplate(data);
    $(".banner").append(html);
  }
});
