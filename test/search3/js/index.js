
var storesURL  =  "//phpmvc.herokuapp.com/db";
var storeData;

  init = function (){
      $.ajax({
                 url: storesURL,
                 type: "GET",
                 accept :"application/json",
                 dataType: "json",
                 crossDomain: true
       })
      .done(function(data){
        
        storeData = data;
        
        /** Temp : data need to b sorted **/
        storeData =  filter({value:''});
        
        initLetters();
        initCategories();

        
        renderList (storeData);
        renderQuickLinks (storeData);
               
      });
     
};





filter = function (param) {
    
  var config = {
    property: "name, categories",
    wrapper: true,
    value: '',
    checkContains: true,
    startsWith: false,
    matchCase: false,
    avoidDuplicates: true,
    sort: true,
   /* sortOrder: "desc" */
  };
  $.extend (config, param);
      
  console.log("Config: ", config);
     
   var o = $.fn.filterJSON(storeData, config).toArray();
  //console.log(o);
  
	return o;
  
  
};




renderList = function (data){
  
  var source   = $("#store-template").html();
  var template = Handlebars.compile(source);
  var html     = template(data);
  
  $('#list').html(html);

  //console.log(html);
  
};

function unique(value, index, self) { 
    return self.indexOf(value) === index;
}

var letters = [];

initLetters = function () {
  $.each(storeData, function(k,v){
    if(typeof v.name != 'undefined'){
       letters.push(v.name[0].toUpperCase());
    }
  });
  
  letters = letters.filter(unique);
  letters.sort();
  console.log(letters);
};
  
var categories = [];

initCategories = function () {
  $.each(storeData, function(k,v){
    if(typeof v.categories != 'undefined'){
      
      $.each(v.categories, function (k1, v1) {
       categories.push(v1.toUpperCase());
      });
      
    }
  });
  
  categories = categories.filter(unique);
  categories.sort();
  console.log(categories);
};


renderQuickLinks = function (data) {
 
  var source   = $("#quicklinks-template").html();
  var template = Handlebars.compile(source);
  var html     = template(letters);
  
  $('#quicklinks').html(html);
  
};


$(function(){
  
  init();
  
  
  $('#search').on("keydown", function(){
    
   var val =  $(this).val();
   var result =  filter( {value: val});
 	 renderList (result);
    
  });
  
   $('#quicklinks').on("click", "a", function(){
    
     var val =  $(this).data('key');
     var result =  filter( {value: val, startsWith: true});

     console.log(result);
     renderList (result);

  });
  
  
     $('.filter').on("click", "a", function(){
    
     var key =  $(this).data('key');
     var result =  filter( { property: key });

     renderList (result);

  });
  
  
});
