//counter code
var button= document.getElementById('counter');

button.onclick= function(){
    
    //create the request
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange= function(){
        if(request.readyState === XMLHttpRequest.DONE){
            // some action
            if(request.status === 200){
                var counter = request.responseText;
                 var span= document.getElementById('count');
                 span.innerHTML= counter.toString();
            }
            
        }
    };

// make the request
    request.open('GET', 'http://jaidev246.imad.hasura-app.io/counter', true);
    request.send(null);
};

//submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick =function(){
    //make rqst to server
    var names=['name1','name2','name3','name4'];
    //capture a list of names and render it as a list
    var list= '';
    for(var i=0;i<names.length;i++){
        list += '<li>' + name[i] + '</li>';
        
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML =list;
    
};