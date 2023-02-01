
$(document).ready(function() {
    
    //changing the status of project issue i,e pending or resolved
    $("#Pending").click(function(e){
        e.preventDefault();
        
        $.ajax({
            type:"GET",
            url: $("#Pending").attr('href'),
            success:function(data){
                
            $(".statusBtn").removeClass('btn-warning');
            $(".statusBtn").addClass('btn-success');
            $(".statusBtn").html('Resolved');


                new Noty({
                    theme: 'relax',
                    text: "Issue Resolved",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            }
        })
    });
    
    //placeholder for multiple select options
    $(".mul-select1").select2({
        placeholder: "Select Issues",
        tags: true,
    });

    $(".mul-select2").select2({
        placeholder: "Filter Issue",
        tags: true,
    });

    $(".mul-select3").select2({
        placeholder: "Filter Author",
        tags: true,
    });

    //Related to javscript search
    $('#myInput1').on("keyup",function(){
        var value=$(this).val().toLowerCase();
        $("#datadiv1 .divval1").filter(function(){console.log($(this).text());
        
        $(this).toggle($(this).text().toLowerCase().indexOf(value)>-1)
        });
    });
});
