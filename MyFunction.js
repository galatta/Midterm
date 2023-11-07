"use strict";
const $ = selector => document.querySelector(selector);
let message="";
let flag=0;
let TotalOrder=0;
const lineItem=[];
//let isValid=true;

const displayErrorMsgs = msgs => {
    // create a new ul element
    const ul = document.createElement("ul");
    ul.classList.add("messages");

    // create a new li element for each error message, add to ul
    for (let msg of msgs) {
        const li = document.createElement("li");
        const text = document.createTextNode(msg);
        li.appendChild(text);
        ul.appendChild(li);
    }

    // if ul node isn't in document yet, add it
    const node = $("ul");
    if (node == null) {
        // get the form element 
        const form = $("h1");

        // add ul to parent of form, before the form
        form.parentNode.insertBefore(ul, form);
    } else {
        // replace existing ul node
        node.parentNode.replaceChild(ul, node);
    }  
}

const ClearFields = () =>
{
    $("#name").value="";
    $("#email").value="";
    $("#delivery").value="";
    $("#quantity").value="1";
    $("#orders").value="";
    const node = $("ul");
    if (node != null) {
        $("ul").remove();
    }
}

const StartOrder = evt => {
    const email1=$("#name");
    const email2=$("#email");
    const address1=$("#delivery");
    const msgs = [];
if (document.querySelector("#name").value == "") { 
    msgs[msgs.length] = "Name is required";
    flag+=1; 
    $("#name").focus();
    } 
if (document.querySelector("#email").value == "")
    {
        msgs[msgs.length] = "Email is required";
        flag+=1;
    }
if (document.querySelector("#delivery").value == "")
    {
        msgs[msgs.length] = "Delivery Date is required";
        flag+=1;
    }
if(flag>0)
{
    displayErrorMsgs(msgs);
    flag=0;
    evt.preventDefault();

}
else{
    const node = $("ul");
    if (node != null) {
        $("ul").remove();
    }
        // First Panel
        $("#name").disabled=true;
        $("#email").disabled=true;
        $("#delivery").disabled=true;
        $("#order").disabled=true;
        $("#clear").disabled=true;
        // Second and third panel
        $("#quantity").disabled=false;
        $("#Large").disabled=false;
        $("#Medium").disabled=false;
        $("#Small").disabled=false;
        $("#add").disabled=false;
     
        $("#place").disabled=false;
        $("#neworder").disabled=false;
       
        evt.preventDefault();
        
    }
};

const displayEntries = () => {
    var price=parseFloat($("#quantity").value);
    if($("#Large").checked==true)
    {
        var m="Large";
        var p=35.00*price;
    }
    if($("#Medium").checked==true)
    {
        var m="Mediun";
        var p=25.00*price;;
    }
    if($("#Small").checked==true)
    {
        var m="Small"
        var p=15.00*price;
    }
    TotalOrder+=p;
    lineItem[lineItem.length]=$("#quantity").value+"  "+m+" $ "+p.toFixed(2)+"\n";
   	$("#orders").value += $("#quantity").value+"  "+m+" $ "+p.toFixed(2)+"\n";
}

const NewOrder = () => {
    ClearFields();
    // Panel 1
    $("#name").disabled=false;
    $("#email").disabled=false;
    $("#delivery").disabled=false;
    $("#order").disabled=false;
    $("#clear").disabled=false;
    // Panel 2 and 3
    $("#quantity").disabled=true;
    $("#Large").disabled=true;
    $("#Large").checked=true;
    $("#Medium").disabled=true;
    $("#Small").disabled=true;
    $("#add").disabled=true;
    $("#place").disabled=true;
    $("#neworder").disabled=true;
    $("#name").focus();
    message="";
}

const PlaceOrder = () => {
    message+=$("#name").value+"\nHere your Order\n";
    for(let i=0; i<lineItem.length; i++)
    {
        message+=lineItem[i];
    }
    message+="Total Order: $ "+TotalOrder.toFixed(2)+"\n";
    alert(message);
    NewOrder();

}

document.addEventListener("DOMContentLoaded", () => {
document.querySelector("#order").addEventListener("click", StartOrder);
document.querySelector("#add").addEventListener("click", displayEntries);
document.querySelector("#clear").addEventListener("click", ClearFields);
document.querySelector("#neworder").addEventListener("click", NewOrder);
document.querySelector("#place").addEventListener("click", PlaceOrder);
    const mainImage=$("#main_image");
    const links=$("#image_list").querySelectorAll("a");
    const imageCache=[];
    let image=null;
    for(let link of links){
        image=new Image();
        image.src=link.href;
        image.alt=link.title;
        image.title=link.title;
        imageCache[imageCache.length]=image;
    }
    let imageCounter=0;
    setInterval(()=>{
        imageCounter=(imageCounter+1)%imageCache.length;
        image=imageCache[imageCounter];
        mainImage.src=image.src;
        mainImage.alt=image.title;
        mainImage.title=image.title;
      },3000)  
});