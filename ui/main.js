console.log("Loaded");
var button=document.getElementById("counter");

button.onclick=function(){
//making request
var request=new XMLHttpRequest();
request.onreadystatechange=function(){
    if(request.readyState===XMLHttpRequest.DONE)
    {
        if(request.status===200){
            var counter=request.responseText;
            var span=document.getElementById("count");
            span.innerHTML=counter.toString();
        }
    }
};
//creating a request
request.open('GET','http://dubeankit07.imad.hasura-app.io/counter',true);
request.send(null);
};
var nameInput=document.getElementById("names");
var name=nameInput.value;
var submit=document.getElementById("submit");
submit.onclick=function(){
  /*var request=new XMLHttpRequest();
request.onreadystatechange=function(){
    if(request.readyState===XMLHttpRequest.DONE)
    {
        if(request.status===200){
            var = request.responseText;
            var list=document.getElementById("unlist");
            list.innerHTML=counter.toString();
        }
    }*/
    var names[];
    var list;
    for(var i=0;i<names.length;i++){
        list='<li>'+names[i]+'</li>';
    }
    var ul=document.getElementById("unlist");
    ul.innerHTML=list;
    
};
