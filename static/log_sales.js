let workout = false

function save_sale(salesperson, client, reams){

    let data_to_save = {"salesperson": salesperson, "client": client, "reams": reams}         
    $.ajax({
        type: "POST",
        url: "save_sale",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            let all_data = result["data"]
            sales = all_data["sales"]
            console.log(all_data["clients"])
            update_clients(all_data["clients"])
            //console.log(sales)
            display_sales_list(sales)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function delete_sale(id){
    //let salesperson = "Sai Satwik Vaddi"
    //let client = $("#Enter_Client").val()
    //let reams = $("#Reams").val()
    //let data_to_delete = {"salesperson": salesperson, "client": client, "reams": reams}     
    console.log(id)
    let data_to_delete = {"id": id}    
    $.ajax({
        type: "POST",
        url: "delete_sale",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_delete),
        success: function(result){
            let all_data = result["data"]
            sales = all_data
            console.log(sales)
            display_sales_list(sales)
            
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function update_clients(c_list){
    clients = c_list
    $( "#Enter_Client" ).autocomplete({
        source: clients
      });
}

function log_data(id, person, client, Reams, count) {

    let newbutton = $('<button class="btn btn-warning">')
    console.log("Delete1")
    $(newbutton).addClass("Delete1")
    $(newbutton).html("<a href='javascript:void(0);' class='Delete1'>&times;</a>")

    $(".Updates").append('<div class="row"><div class="col-md-2"><div id="Update1">'+person+'</div><br></div><div class="col-md-5"><div id="Update2">'+client+'</div><br></div>    <div class="col-md-2"><div id="Update3">'+Reams+'</div><br></div> <div class="col-md-1">'+$(newbutton).html()+'<br></div> <div class="col-md-2"></div></div>')

    $(".Delete1").click(function() {
        if(workout==false){
            console.log("CLicking")
            delete_sale(id+1)
        }
        workout = true
    })
}

function display_sales_list(sales){
    //During Addition/Deletion, this will run
    $(".Updates").empty()
    let count = 1
    console.log(sales)
    //for(let i=0; i<sales.length; i++){
        $.each(sales,function(i,sale){
            log_data(i,sale.salesperson, sale.client, sale.reams,count)
            count = count+1
        })
        workout = false
    }





$(document).ready(function(){
    
        /*This will be executed first */
        display_sales_list(sales)
        $( "#Enter_Client" ).focus()
    
        $( "#Enter_Client" ).autocomplete({
            source: clients
          });

        $("#Submit").click(function(){
            let person = "Streak"
            let client = $("#Enter_Client").val()
            let reams = $("#Reams").val()
            if(($.trim(reams)).length !=0 && isNaN(reams)==1){
                $(".Warning_reams").css("color","red")
                $(".Warning_reams").html("Enter a Valid Number for Reams")
                $("#Reams").focus()
            }
            else{
            if(!(($.trim(client)).length == 0 || ($.trim(reams)).length==0)){
                save_sale(person, client, reams)
        
                $("#Enter_Client").val("")
                $("#Reams").val("")

                $(".Warning_reams").html("")
                $(".Warning_client").html("")
                $( "#Enter_Client" ).focus()
            }
            else{
                console.log("Here, I am: ",($.trim(client)).length,($.trim(reams)).length)
                if(($.trim(client)).length==0){
                    $("#Enter_Client").focus()
                }
                if(($.trim(client)).length==0){	
                    $(".Warning_client").css("color","red")
                    $(".Warning_client").html("Fill Client")
                }
                else{
                    $(".Warning_client").html("")
                    if(($.trim(reams)).length==0 && $("#Enter_Client").is(":focus")){
                        $("#Reams").focus()
                    }
                }
                if(($.trim(reams)).length==0){
                    
                    $(".Warning_reams").css("color","red")
                    $(".Warning_reams").html("Fill Reams")
                }
                else{
                    $(".Warning_reams").html("")
                    if(($.trim(client)).length==0 && $("#Reams").is(":focus")){
                        $("#Enter_Client").focus()
                    }
                }
            }
            }
        })
    
        $(document).keyup(function (e) {
            let saved=false
            let person = "Sai Satwik Vaddi"
            let client = $("#Enter_Client").val()
            let reams = $("#Reams").val()
            if(e.keyCode == 13 && ($.trim(reams)).length !=0 && isNaN(reams)==1){
                $(".Warning_reams").css("color","red")
                $(".Warning_reams").html("Enter a Valid Number for Reams")
                $("#Reams").focus()
            }
            else{
            if(e.keyCode == 13){
                if(($.trim(client)).length==0){
                    $("#Enter_Client").focus()
                }
                if(($.trim(client)).length==0){
                        
                    $(".Warning_client").css("color","red")
                    $(".Warning_client").html("Fill Client")
                }
                else{
                    $(".Warning_client").html("")
                }
                if(($.trim(reams)).length==0){
                    
                    $(".Warning_reams").css("color","red")
                    $(".Warning_reams").html("Fill Reams")
                }
                else{
                    $(".Warning_reams").html("")
                    if(($.trim(client)).length==0 && $("#Reams").is(":focus")){
                        $("#Enter_Client").focus()
                    }
                }
            }
            if ($("#Reams").is(":focus") && (e.keyCode == 13)) {
    
                if(!(($.trim(client)).length == 0 || ($.trim(reams)).length==0)){
                    save_sale(person, client, reams)
                    saved = true
                    $("#Enter_Client").val("")
                    $("#Reams").val("")
  
                    $(".Warning_reams").html("")
                    $(".Warning_client").html("")
                    $( "#Enter_Client" ).focus()
                }
                else{
                    console.log("Here, I am: ",client.length,($.trim(reams)).length)
                    if(($.trim(client)).length==0){
                        
                        $(".Warning_client").css("color","red")
                        $(".Warning_client").html("Fill Client")
                    }
                    else{
                        $(".Warning_client").html("")
                    }
                    if(($.trim(reams)).length==0){
                        
                        $(".Warning_reams").css("color","red")
                        $(".Warning_reams").html("Fill Reams")
                    }
                    else{
                        $(".Warning_reams").html("")
                    }
                }
            }
            if($("#Enter_Client").is(":focus") &&  (e.keyCode == 13) 
                    && ($.trim(client)).length!=0 && saved==false){
                $("#Reams").focus()
            }
            }
        });
})
