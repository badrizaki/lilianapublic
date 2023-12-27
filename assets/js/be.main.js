var loader = '<div style="color: #053966;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Loading...</span></div>';
var errorMessage = 'Sorry an error occurred';
var totalList = 1;
var formatDate = "DD MMM YYYY";
var formatDateTime = "DD MMM YYYY HH:mm";
if ($('#totalList').length) totalList = $('#totalList').val();

if (totalList == 1)
{
    listManager = {
        retrieve    : true,
        responsive  : true,
        processing  : true,
        serverSide  : true,
        bLengthChange   : false,
        bSortable   : false,
        searching   : true,
        ordering    : false,
        updatePoly  : false,
        idTable     : "dataTables",
        token       : "",
        customSearch    : "",
        searchJson  : "",
        listUrl     : "",
        deleteUrl   : "",
        deleteTypeId: "",
        dataTable   : [""],
        oTable      : "",
        param       : "",
        sorting     : [ [0,'desc'] ],
        order       : [],
        ready : function()
        {
            $.fn.dataTable.ext.errMode = 'none';
            this.listTable();

            $('.dataTables_filter input').bind('keyup', function(e) {
                if (e.which == 13) {
                    this.oTable;
                }
            });
        },
        listTable : function()
        {
            oTable = $('#'+this.idTable)
            .on( 'error.dt', function ( e, settings, techNote, message ) {
                alert("Sory error, please retry");
            })
            .DataTable({
                "retrieve": this.retrieve,
                "responsive": this.responsive,
                "processing": this.processing,
                "serverSide": this.serverSide,
                "bLengthChange": this.bLengthChange,
                'bSortable': this.bSortable,
                "searching": this.searching,
                "aaSorting": this.sorting,
                "ordering": this.ordering,
                "order": this.order,
                'aTargets': [ 0 ],
                "ajax": {
                    "url": this.listUrl,
                    "data": {
                     _token: this.token,
                     customSearch: this.customSearch,
                     searchJson: this.searchJson,
                 },
                 "type": "POST",
             },
             initComplete: function() {
                $('div.dataTables_filter input').unbind();
                $('div.dataTables_filter input').bind('keyup', function(e) {
                    if(e.keyCode == 13) {
                        oTable.search( this.value ).draw();
                        // oTable.search( this.value ).draw();
                    }
                });
                if (listManager.updatePoly)
                    $('body').updatePolyfill();
            },
            "columns": this.dataTable
        });
        },
        destroy : function()
        {
            if ( $.fn.DataTable.isDataTable('#'+this.idTable) ) {
                $('#'+this.idTable).DataTable().destroy();
            }
        },
        delete : function(id)
        {
            console.log(this.deleteUrl+'/'+id);
            var yes = confirm('Are you sure ?');
            if (yes)
            {
                $.ajax({
                    type:"DELETE",
                    url:this.deleteUrl+'/'+id,
                    dataType:"JSON",
                    data: {
                        method: '_DELETE',
                        submit: true,
                        _token: this.token
                    },
                    success:function(resp){
                        try {
                            if(resp.statusCode == "200") {
                                location.reload();
                            } else {
                                location.reload();
                                // alert(errorMessage);
                            }
                        } catch(e) {
                            location.reload();
                            // alert(errorMessage + e);
                        }
                    },
                    error: function(xhr, status, error) {
                        alert("Maaf telah terjadi kesalahan, coba lagi atau hubungi Administrator");
                    }
              });
            }
        }
    }
}
else if(totalList > 1) {
    listManager = [];
    for (var i = 0; i < totalList; i++)
    {
        listManager.push({
            retrieve    : true,
            responsive  : true,
            processing  : true,
            serverSide  : true,
            bLengthChange   : false,
            bSortable   : false,
            searching   : true,
            ordering    : false,
            idTable     : "dataTables",
            token       : "",
            customSearch    : "",
            listUrl     : "",
            deleteUrl   : "",
            deleteTypeId: "",
            dataTable   : [""],
            oTable      : "",
            param       : "",
            sorting     : [ [0,'desc'] ],
            order       : [],
            ready : function()
            {
                $.fn.dataTable.ext.errMode = 'none';
                this.listTable();

                $('.dataTables_filter input').bind('keyup', function(e) {
                    if (e.which == 13) {
                        this.listTable();
                    }
                });
            },
            listTable : function()
            {
                oTable = $('#'+this.idTable)
                .on( 'error.dt', function ( e, settings, techNote, message ) {
                    alert("Sory error, please retry");
                })
                .DataTable({
                    "retrieve": this.retrieve,
                    "responsive": this.responsive,
                    "processing": this.processing,
                    "serverSide": this.serverSide,
                    "bLengthChange": this.bLengthChange,
                    'bSortable': this.bSortable,
                    "searching": this.searching,
                    "aaSorting": this.sorting,
                    "ordering": this.ordering,
                    "order": this.order,
                    'aTargets': [ 0 ],
                    "ajax": {
                        "url": this.listUrl,
                        "data": {
                         _token: this.token,
                         customSearch: this.customSearch,
                     },
                     "type": "POST",
                 },
                 initComplete: function() {
                            // console.log('#'+this.idTable+'_filter \n');
                            $('div.dataTables_filter#'+this.idTable+'_filter input').unbind();
                            $('div.dataTables_filter#'+this.idTable+'_filter input').bind('keyup', function(e) {
                                if(e.keyCode == 13) {
                                    oTable.search( this.value ).draw();
                                }
                            });
                        },
                        "columns": this.dataTable
                    });
            },
            delete : function(id)
            {
                var yes = confirm('Are you sure ?');
                if (yes)
                {
                    $.ajax({
                        type:"DELETE",
                        url:this.deleteUrl+'/'+id,
                        dataType:"JSON",
                        data: {
                            method: '_DELETE',
                            submit: true,
                            _token: this.token
                        },
                        success:function(resp){
                            try {
                                if(resp.statusCode == "200") {
                                    location.reload();
                                } else {
                                    location.reload();
                                    // alert(errorMessage);
                                }
                            } catch(e) {
                                location.reload();
                                // alert(errorMessage + e);
                            }
                        },
                        error:function(){
                            location.reload();
                            // alert(errorMessage);
                        }
                    });
                }
            }
        });
}
}

popupManager = {
    urlAdd : "",
    urlUpdate : "",
    token : "",
    add : function()
    {
        $.ajax({
            url: this.urlAdd,
            type: "post",
            async: true,
            data: {
                _token: this.token,
            },
            success: function (data) {
                $('#popup').html(data);
                $('#popup').modal('show');
            }
        });
    },
    update : function(id)
    {
        $.ajax({
            url: this.urlUpdate,
            type: "put",
            async: true,
            data: {
                _token: this.token,
                id: id,
            },
            success: function (data) {
                $('#popup').html(data);
                $('#popup').modal('show');
            }
        });
    }
}

saveManager = {
    urlRedirect : "",
    submit : function(formId, url)
    {
        $('#'+formId).on('submit',(function(e)
        {
            e.preventDefault();
            var dataString = $("#"+formId).serialize();
            $.LoadingOverlay("show");
            $.ajax({
                url : url,
                type: "POST",
                data : dataString,
                dataType: 'JSON',
                success:function(resp)
                {
                    alert('asd');
                    // $("#alert").html('<div class="alert alert-success">'+resp.message+'</div>');
                    location.reload();
                    $.LoadingOverlay("hide");
                },
                error:function(resp)
                {
                    if (resp.status == 200) {
                        location.reload();
                        $.LoadingOverlay("hide");
                        return false;
                    }
                    try{
                        var obj = jQuery.parseJSON(resp.responseText);
                        var errorsArr = [];
                        for (error in obj.errors)
                        {
                            // errorsArr.push(obj.errors[error][0]);
                            // $("#alert").html('<div class="alert alert-danger">'+errorsArr+'</div>');
                            $("#alert").html('<div class="alert alert-danger">'+obj.errors[error][0]+'</div>');
                            $.LoadingOverlay("hide");
                            return false;
                        }
                        $("#alert").html('<div class="alert alert-danger">'+errorMessage+'</div>');
                        $.LoadingOverlay("hide");
                        return false;
                    }
                    catch(e) {
                        $("#alert").html('<div class="alert alert-danger">'+errorMessage+'</div>');
                        $.LoadingOverlay("hide");
                        return false;
                    }
                },
                complete: function(xhr, textStatus) {
                    if (xhr.status == 200) {
                        location.reload();
                        $.LoadingOverlay("hide");
                    }
                }
            });
            return false;
        }));
    }
}

select = {
    urlRedirect : "",
    load : function(self, url, divId)
    {
        $('#'+divId).html(loader);
        var _token = $(self).data('token');
        var val = $(self).val();
        var selectedid = $(self).data('selectedid');
        $.ajax({
            url : url,
            type: "POST",
            data : {
                "id": val,
                "selectedId": selectedid,
            },
            headers: {
                'X-CSRF-TOKEN': _token
            },
            success:function(resp)
            {
                $('#'+divId).html(resp);
            },
            error:function(resp)
            {
                // functions.ShowDialogBox('Warning', errorMessage);
            }
        });
    },
    loadMultiple : function(self, url, id)
    {
        $.each(id, function(index, divId)
        {
            $('#container-'+divId).show();
            $('#'+divId).html(loader);
        });
        var _token = $(self).data('token');
        var val = $(self).val();
        var selectedid = $(self).data('selectedid');
        $.ajax({
            url : url,
            type: "POST",
            data : {
                "id": val,
                "selectedId": selectedid,
            },
            headers: {
                'X-CSRF-TOKEN': _token
            },
            success:function(resp)
            {
                $.each(id, function(index, divId)
                {
                    $('#'+divId).html(resp);
                });
            },
            error:function(resp)
            {
                // functions.ShowDialogBox('Warning', errorMessage);
            }
        });
    }

}

functions = {
    url : "",
    urlRedirect : "",

    removeDiv : function(id)
    {
        $("#"+id).remove();
    },
    ShowDialogBox : function(title, content)
    {
        var elem = $(this).closest('.item');
        
        $.confirm({
            'title'     : title,
            'message'   : content,
            'buttons'   : {
                OK   : {
                    'class' : 'blue',
                    'action': function(){
                        // elem.slideUp();
                    }
                }
            }
        });
    },
    loader : function(type)
    {
        if (type == 'show') {
            $("body").append('<div class="modalLoader"></div>');
            $("body").addClass("loading");
        } else {
            if ($(".modalLoader").length) $(".modalLoader").remove();
            $("body").removeClass("loading");
        }
    }
}

$(".onlyNumeric").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         // Allow: Ctrl+A, Command+A
         (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
         // Allow: home, end, left, right, down, up
         (e.keyCode >= 35 && e.keyCode <= 40)) {
             // let it happen, don't do anything
         return;
     }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

function changeFormatDate(date, time, plusTime)
{
    var calcDate = new Date(date+' '+time);
    calcDate.setMinutes(calcDate.getMinutes() + plusTime);
    
    var yr      = calcDate.getFullYear();
    var month   = (calcDate.getMonth()+1) < 10 ? '0' + (calcDate.getMonth()+1) : (calcDate.getMonth()+1);
    var day     = calcDate.getDate()  < 10 ? '0' + calcDate.getDate()  : calcDate.getDate();
    var hours   = calcDate.getHours() < 10 ? '0' + calcDate.getHours() : calcDate.getHours();
    var minutes = calcDate.getMinutes() < 10 ? '0' + calcDate.getMinutes() : calcDate.getMinutes();
    var seconds = calcDate.getSeconds() < 10 ? '0' + calcDate.getSeconds() : calcDate.getSeconds();

    var dateResult = yr+'-'+month+'-'+day;
    // var timeResult = hours+':'+minutes+':'+seconds;
    var timeResult = hours+':'+minutes;
    var result = {  
        dateResult: dateResult,                                
        timeResult: timeResult
    }
    return result;
}

function dateNow(format)
{
    var d = new Date();
    var monthNow = d.getMonth()+1;
    var dayNow = d.getDate();
    var output = "";
    var day = (dayNow<10 ? '0' : '') + dayNow;
    var month = (monthNow<10 ? '0' : '') + monthNow;
    var year = d.getFullYear();
    var hour = (d.getHours()<10 ? '0' : '') + d.getHours();
    var minute = (d.getMinutes()<10 ? '0' : '') + d.getMinutes();
    var second = (d.getSeconds()<10 ? '0' : '') + d.getSeconds();
    if (format == 'Y/m/d')
    {
        output = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    }
    else if (format == 'd/m/Y')
    {
        output = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
    }
    else {
        output = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }

    return output;
}

function onlyNumeric(e)
{
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         // Allow: Ctrl+A, Command+A
         (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
         // Allow: home, end, left, right, down, up
         (e.keyCode >= 35 && e.keyCode <= 40)) {
             // let it happen, don't do anything
         return;
     }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}

function tandaPemisahTitik(b)
{
    var _minus = false;
    if (b<0) _minus = true;
    b = b.toString();
    b=b.replace(".","");
    b=b.replace("-","");
    c = "";
    panjang = b.length;
    j = 0;
    for (i = panjang; i > 0; i--){
        j = j + 1;
        if (((j % 3) == 1) && (j != 1)){
            c = b.substr(i-1,1) + "." + c;
        } else {
            c = b.substr(i-1,1) + c;
        }
    }
    if (_minus) c = "-" + c ;
    return c;
}

function numbersonly(ini, e)
{
    if (e.keyCode>=49)
    {
        if(e.keyCode<=57)
        {
            a = ini.value.toString().replace(".","");
            b = a.replace(/[^\d]/g,"");
            b = (b=="0")?String.fromCharCode(e.keyCode):b + String.fromCharCode(e.keyCode);
            ini.value = tandaPemisahTitik(b);
            return false;
        }
        else if(e.keyCode<=105)
        {
            if(e.keyCode>=96)
            {
                a = ini.value.toString().replace(".","");
                b = a.replace(/[^\d]/g,"");
                b = (b=="0")?String.fromCharCode(e.keyCode-48):b + String.fromCharCode(e.keyCode-48);
                ini.value = tandaPemisahTitik(b);
                return false;
            }
            else { return false; }
        }
        else { return false; }
    } else if (e.keyCode==48) {
        a = ini.value.replace(".","") + String.fromCharCode(e.keyCode);
        b = a.replace(/[^\d]/g,"");
        if (parseFloat(b)!=0){
            ini.value = tandaPemisahTitik(b);
            return false;
        } else {
            return false;
        }
    } else if (e.keyCode==95) {
        a = ini.value.replace(".","") + String.fromCharCode(e.keyCode-48);
        b = a.replace(/[^\d]/g,"");
        if (parseFloat(b)!=0){
            ini.value = tandaPemisahTitik(b);
            return false;
        } else {
            return false;
        }
    }
    else if (e.keyCode==8 || e.keycode==46)
    {
        a = ini.value.replace(".","");
        b = a.replace(/[^\d]/g,"");
        b = b.substr(0,b.length -1);
        if (tandaPemisahTitik(b)!=""){
            ini.value = tandaPemisahTitik(b);
        } else {
            ini.value = "";
        }
        return false;
    } else if (e.keyCode==9){
        return true;
    } else if (e.keyCode==17){
        return true;
    } else {
        return false;
    }
}

function formatNumber(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}