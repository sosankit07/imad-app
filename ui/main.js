var button = document.getElementById("counter");
button.onclick=function(){
    //create a request
    var request=new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readystate === XMLHttpRequest.DONE){
            if(request.status=== 200){
                var counter = request.responseText;
                var span = document.getElementById("c");
                span.innerHTML=counter.toString();
            }
        }
        
    };
    //make a request
    request.open("GET","http://dubeankit07.imad.hasura-app.io/counter",true);
    request.send(null);
};