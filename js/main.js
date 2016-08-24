var pagecontainer = $("#page-container");
var searchbutton = $("#searchbutton");
var searchbox = $("#searchbox");

searchbutton.on("click", function () {
    // Load random song based on mood
    alert("You clicked the button with search on " + searchbox.val()); //can demo with sweetAlert plugin
    
    search();
});

function display(data){
        var displayData = "" ; 
        //var info = JSON.parse(data) ;
        var array = data.value ; 
        var i = 0 ; 
       $.each(array, function(){
           var obj = data.value[i] ; 
           console.log("object "+ Object.keys(data.value[i]));
           console.log(obj.name +"-"+obj.url+"-"+obj.image+"-"+obj.description+"-"+obj.about+"-"+obj.provider+"-"+obj.datePublished);
           displayData+= '<p>'+obj.name +'</p>'+
                        '<a href= "'+obj.url + '">'+ 
                       // '<img src ='+obj.image.thumbnail.contentUrl + '></img>'+
                        '<p>'+obj.description +'</p>'+
                        '</a>'

           i++ ; 
       }); 
       console.log(displayData);
     $('#display1').append(displayData);

}

function search() {
    var d = searchbox.val();
     alert("searching");
     var params = {
             "q": "news",
            "count": "10",
            "offset": "0",
            "mkt": "en-nz",
            "safeSearch": "Moderate",
        };
      

    $.ajax({
        
            url: "https://api.cognitive.microsoft.com/bing/v5.0/news/search?" + $.param(params),
        beforeSend: function (xhrObj) {
            // Request headers
            //xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "8505b65dea944060b0385b5e5eacce70");
        },
        type: "GET",
        data:"{body}",
       
    })
        .done(function(data) {
            alert("success");
            //console.log(data);
             var displayData = "" ; 
        //var info = JSON.parse(data) ;
        var array = data.value ; 
        var i = 0 ; 
       $.each(array, function(){
           var obj = data.value[i] ; 
           console.log("object "+ Object.keys(data.value[i]));
           console.log(obj.name +"-"+obj.url+"-"+obj.image+"-"+obj.description+"-"+obj.about+"-"+obj.provider+"-"+obj.datePublished);
           displayData+= '<p>'+obj.name +'</p>'+
                        '<a href= "'+obj.url + '">'+ 
                       // '<img src ='+obj.image.thumbnail.contentUrl + '></img>'+
                        '<p>'+obj.description +'</p>'+
                        '</a>'

           i++ ; 
       }); 
       console.log(displayData);
     $('#display1').append(displayData);






        })
        .fail(function (error) {
        console.log(error);
        alert( "error is "  + error) ;

    });
}