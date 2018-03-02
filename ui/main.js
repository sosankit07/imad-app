var button = document.getElementById("counter");
var counter = 0;
button.click=function(){
    counter = counter + 1;
    var span=document.getElementById("c");
    span.innerHTML = counter.toString();
};