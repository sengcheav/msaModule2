var pagecontainer = $("#page-container");
var searchbutton = $("#searchbutton");
var news = $('#news');
var sport = $('#sport');
var entertainment = $('#entertainment');
var searchbox = $("#searchbox");
var enter = false ; 
// hello

$.mobile.loading().hide();// to prevent loading message at the end of the page http://stackoverflow.com/questions/10397940/jquery-mobile-loading-message

searchbutton.on("click", function (e) {
    e.preventDefault();   //prevent flickering after click
    alert("You clicked the button with search on " + searchbox.val());     
    search(false , "no");
    enter= false ;
});

news.on("click", function () {   
     
    search(true , "news");
    enter= false ;
});

sport.on("click", function () {   
        
    search(true , "sport");
    enter= false ;
});
entertainment.on("click", function () {   
   
    search(true , "Entertainment");
    enter= false ;
});

function handle(e) {
    if (e.keyCode === 13) {
        //e.preventDefault(); // Ensure it is only this code that rusn
        alert(e.keyCode );
        enter = true;
       // search(); 
        enter = false ; 
    }
}

/*
$(document).ready(function(){
    $('#searchbox').bind('input propertychange', function() {
        if(enter ){
            //alert("already");
        }else {
            
            var text = $('#typein').html($(this).val());
            var t =$(this).val() ;
            if(t == null || t==''){t = 'news'; console.log('nulll');} 
            console.log("hello : "+t +" " +Object.keys(text));
            var params = {
                    "q": t,
                };    
            $.ajaxSetup ({
                cache: false
                });    
            $.ajax({
                    url: "https://api.cognitive.microsoft.com/bing/v5.0/suggestions/?" + $.param(params),
                    beforeSend: function(xhrObj){
                        // Request headers
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","fd08d93596044f29b667ff3f8f895ff9");
                    },
                    type: "GET",
                    data: "{body}",
                })
            .done(function(data) {       
            var suggestList = document.getElementById("suggestionList");
            var fc = suggestList.firstChild;
            while( fc ) {
                console.log("remove");
                suggestList.removeChild( fc );
                fc = suggestList.firstChild;
            }
            var array = data.suggestionGroups[0].searchSuggestions;
            // console.log("data va "+data)
            // console.log("[] ->" + Object.keys(data.suggestionGroups[0]));       
            // console.log("suggestion element " + data.suggestionGroups[0].searchSuggestions[0].displayText); 
            var option ="";
            for( var i=0 ; i< array.length ;i++){
                console.log(array[i].displayText) ;
                 option += '<option value="' + array[i].displayText + '" />';
            }
            $('#suggestionList').append(option);
            })
            .fail(function(error) {
                alert("error" +error);
            });   
        }
    });

});
*/
function search(category: Boolean , topic : String): void {
    var d = searchbox.val();
     alert("searching");
     var params, urllink ;
     if(category){
        alert("topic");
        params = {
            "q": topic,
                "count": "10",
                "offset": "0",
                "mkt": "en-nz",
                "safeSearch": "Moderate",
        };
        urllink = "https://api.cognitive.microsoft.com/bing/v5.0/news/?"+ $.param(params)  ;  
     }
     else {
         alert("no category");
        params = {
                "q": d,
                "count": "10",
                "offset": "0",
                "mkt": "en-nz",
                "safeSearch": "Moderate",
        };
        urllink= "https://api.cognitive.microsoft.com/bing/v5.0/news/search?" + $.param(params); 
     }  
        $.ajaxSetup ({
          cache: false
        });

    $.ajax({
        
        url: urllink,
        beforeSend: function (xhrObj) {            
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "8505b65dea944060b0385b5e5eacce70");
        },
        type: "GET",
        data:"{body}",      
    })
        .done(function(data) {
            var display = document.getElementById("display1");
            var fc = display.firstChild;
            while( fc ) {
                console.log("remove");
                display.removeChild( fc );
                fc = display.firstChild;
            }
            alert("success");
           // console.log(data);
            var displayData = "" ; 
            var array = data.value ; 
            var i = 0 ; 
       $.each(array, function(){
           var obj = data.value[i] ; 
           console.log("object "+ Object.keys(data.value[i]));
           console.log(obj.name +"-"+obj.url+"-"+obj.image+"-"+obj.description+"-"+obj.about+"-"+obj.provider+"-"+obj.datePublished);
           if(obj.image === 'undefined' || obj.image === null || obj.image == null){
                displayData+= 
                                '<div class="row col-md-12" id= "rec">'+
                                        '<div class="col-md-1"> </div>'+
                                        '<div class="col-md-2">'+
                                        //no image here so leave it blank 
                                        '</div>'+
                                        '<a href= "'+obj.url + '" target="_blank">'+
                                            '<h3 class="col-md-9">'+obj.name +'</h3>'+
                                        '</a>'+
                                        '<div class="col-md-1"> </div>'+
                                        '<div class="col-md-2">'+
                                        //no image here so leave it blank 
                                        '</div>'+                                        
                                        '<div class="col-md-9">'+
                                            '<p>'+obj.description +'</p>'+
                                        '</div>'+
                                '</div>'                                                                         
                                
           }else {
                displayData+=           
                                '<div class="row col-md-12" id = "rec">'+
                                    '<div class="col-md-1"> </div>'+
                                    '<div class="col-md-2">'+
                                        '<img src ='+obj.image.thumbnail.contentUrl + '></img>'+
                                    '</div>'+
                                    '<a href= "'+obj.url + '" target="_blank">'+
                                        '<h3 class="col-md-9">'+obj.name +'</h3>'+
                                    '</a>'+
                                    
                                    '<div class="col-md-9">'+
                                        '<p>'+obj.description +'</p>'+
                                    '</div>'+
                                ' </div>'


           }
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