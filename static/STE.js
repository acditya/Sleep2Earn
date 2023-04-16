$(function(){
    let username = "";
    let email = "";
    let password = "";

    $("#input-reg-4").trigger("click",function(){
        username = $("#input-reg-1").val()
        email = $("#input-reg-2").val()
        password = $("#input-reg-3").val()
    })
})