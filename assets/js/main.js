function createCookie(name,value,hours) {
	if (hours) {
		var date = new Date();
		date.setTime(date.getTime()+(hours*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function stateChangedPrd(nodes, nodesJson) {
    var t = nodes[0].text;
    createCookie('prd-list', nodesJson, 1);
}

function stateChangedShop(nodes, nodesJson) {
    var t = nodes[0].text;      
    createCookie('shop-list', nodesJson, 1);
   	//$.post( "shop/menuState",{mode: 'save', val: nodesJson});
}

////////////////////////////////////////////////////////////////////////////////

$(document).ready(function()
{  
	$headerDiv = $('header');
	$rowDiv    = $(window);

	$rowDiv.scroll(function() {
			console.log($rowDiv.scrollLeft());
	    $headerDiv.css({
	        left: -$rowDiv.scrollLeft() + 'px'
	    });	    
	});

	$(window).scroll(function() {
		if ( $(window).scrollTop() < 150) 
		{
			$("a.back2top").css("visibility","hidden");
		} else 
		{
			$("a.back2top").css("visibility","visible");
		}
	});	


  if ($('.prd-list').length>0)
  {
	  var easyTree = $('.prd-list').easytree({
	      data: readCookie('prd-list'),
	      stateChanged: stateChangedPrd
	  });  	
  }	
		
	if ($('.shop-list').length>0)
  { 
	  var easyTree = $('.shop-list').easytree({	      
	      data: readCookie('shop-list'),
	      stateChanged: stateChangedShop
	  });
  }			

////////////////////////////////////////////////////////////////////////////////	

	$('#prdAZ').bind('keydown change',function()
	{
		$.post( "shop/filter", {mode:'alp', val: $(this).val() })
			.done(function(data){
				location.reload(); 
			});
	});	

	$('#prdVol').bind('keydown change',function()
	{
		$.post( "shop/filter", {mode:'vol', val: $(this).val() })
			.done(function(data){
				location.reload(); 
			});
	});		

////////////////////////////////////////////////////////////////////////////////

	if ($('#frm-contact').length > 0)
	{
		var validator = $('#frm-contact').validate({
			ignore: [],
			rules: {
				"hiddenRecaptcha": {
				 required: function() {
					if(grecaptcha.getResponse() == '') {
						return true;
					} else {
					 return false;
					}
				 }
       }
		 },
		 messages: {
			"hiddenRecaptcha": 'Please verify that you are not a robot'
		 }
		});
	}

////////////////////////////////////////////////////////////////////////////////

	$('#news-search button').click(function(e)
	{
		e.preventDefault();
		var $param;
		var $yy = $("select[name=yy]").val();
		var $mm = $("select[name=mm]").val();

		if ($yy=='0' && $mm=='0') return false;

		if ($mm=='0')
		{
			$param = $yy;
		}
		else
		{
			$param = $yy+'/'+$mm;
		}
		window.location.replace('news/search/'+$param);
	});

////////////////////////////////////////////////////////////////////////////////

	if ($('.birth').length>0)
	{
		$('.birth').Zebra_DatePicker({
        default_position: 'below',
				view: 'years',
				direction: false
    });
	}

	if ($('.pdate').length>0)
	{
		$('.pdate').Zebra_DatePicker({
				view: 'date',
				direction: 2,
				disabled_dates: ['* * * 0,6']
    });
	}

	if ($('.paydate').length>0)
	{
		$('.paydate').Zebra_DatePicker({
        default_position: 'below',
				direction: false
    });
	}	

////////////////////////////////////////////////////////////////////// Validator

$.fn.clearValidation = function(){var v = $(this).validate();$('[name]',this).each(function(){v.successList.push(this);v.showErrors();});v.resetForm();v.reset();};

	$.validator.setDefaults({ 
	    ignore: [],
	});

	$('#signup').validate({
		rules: {
			password: "required",
			password2: {
		    equalTo: "#password"
	    },
			email: {
				email: true,
        remote: {
					url: "registration/chk_email",
					type: "post"
				}
      },
			province: {
				required: function(element) {
					return $("input[name=country]").val() === 'ID';
				}
			},
			city: {
				required: function(element) {
					return $("input[name=country]").val() === 'ID';
				}
			},
			district: {
				required: function(element) {
					return $("input[name=country]").val() === 'ID';
				}
			}
		},
		messages: {
			email: {
				remote: jQuery.validator.format("{0} is already registered")
			}
		}
	});


	$('#quest').validate({
  	errorPlacement: function(error, element) {
      error.appendTo(element.closest('label')).css('text-transform','none');
    }
	});


	function passwordRequired() {
	  return $('#password').val().length > 0;
	}

	$('#edit-profile').validate({
		rules: {
			password: {
				required: passwordRequired,
			},
			password2: {
				required: passwordRequired,
		    equalTo: "#password"
	    },
			province: {
				required: function(element) {
					return $("input[name=country]").val() === 'ID';
				}
			},
			city: {
				required: function(element) {
					return $("input[name=country]").val() === 'ID';
				}
			},
			district: {
				required: function(element) {
					return $("input[name=country]").val() === 'ID';
				}
			}
		}
	});


	$('#dv-addr1').validate({
		ignore: ":hidden",
		rules: {
			email: {
				email: true
			},
			pdate: {
				required: function(element) {
					return $("select[name=ship_method]").val() === 'pickup';
				}
			},
			ptime: {
				required: function(element) {
					return $("select[name=ship_method]").val() === 'pickup';
				}
			},
			pdrvname: {
				required: function(element) {
					return $("select[name=ship_method]").val() === 'pickup';
				}
			},
			pcarno: {
				required: function(element) {
					return $("select[name=ship_method]").val() === 'pickup';
				}
			}
		}
	});

	$(".checkout").on('click','#getVoucher',function(){
		var code = $("input[name=voucher_code]").val();
		if (!code) return false;
		$.post( "shop/get_voucher", {code: code })
			.done(function(data){
				$('#summary').html(data);
		});
	});

$("#pay-confirm").validate({
		rules: {
			orderno: {
				required: true,
        remote: {
					url: "confirmation/chk_order",
					type: "post"
				}
      },
			amount: {
				required: true,
        remote: {
					url: "confirmation/chk_amount",
					type: "post",
     			data:
      		{
          	orderno: function()
          		{
              	return $('#pay-confirm input[name=orderno]').val();
          		}
      		}					
				}   
			}	   
		},
		messages: {
			orderno: {
				remote: jQuery.validator.format("Order not found or already confirmed")
			},
			amount: {
				remote: jQuery.validator.format("Amount is different from the Invoice amount")
			}
		}	
	});

////////////////////////////////////////////////////////////////////////////////

	$.expr[':'].nonEmptyValue = function(obj){
		 return $(obj).val() != '';
	};

	$('#region option:nonEmptyValue').remove();

	
	//$.post( "registration/get_province", {country: 'ID' })
	//		.done(function(data){
	//			$('#sel-province').html(data);
	//});

	$('select[name=province]').bind('keydown change',function(){
			$('#sel-district option:nonEmptyValue').remove();
			var country  = 'ID';
			var province = $(this).val();

			$.post( "registration/get_city", {country: country, province: province })
				.done(function(data){
					$('#sel-city').html(data);
				});
	});

	$('select[name=city]').bind('keydown change',function(){
			var country  = 'ID';
			var province = $('select[name=province]').val();
			var city     = $(this).val();

			$.post( "registration/get_district", {country: country, province: province, city: city })
				.done(function(data){
					$('#sel-district').html(data);
				});
	});

	$('select[name=district]').bind('keydown change',function(){
			if ($('#sel-shipmethod').length>0)
			{
				var jne_id  = $(this).val();

				$.post( "shop/get_shipmethod", {jne_id: jne_id })
					.done(function(data){
						$('#sel-shipmethod').removeAttr('disabled');
						$('#sel-shipmethod').html(data);
				});
			}	
	});

	$('select[name=ship_method]').bind('keydown change',function(){
		var ship = $(this).val()
		if (ship && ship=='pickup')
		{
			$('#pickupOpt').slideDown('fast');
			var datepicker = $('.pdate').data('Zebra_DatePicker');
			datepicker.update({
			  direction: 2,
			  disabled_dates: ['* * * 0,6']
			});			
		}
		else
		{
			$('#pickupOpt').hide();	
		}	
	});


	$(".prd-detail dd input[name=qty]").bind('change',function(){
		var qty = $(this).val();
		var pcs = $("#boxQty span").text();
		var tot = qty * pcs;
		$("#totPcs").html('Total '+ tot +' pcs');
	});



	$('.cart table tbody').on('focusout','td.qty input',function(){
		var qty   = $(this).val();
		var rowid = $(this).next().val();
		cart_process('shop/update/'+rowid+'/'+qty);
		return false;
	});


	$('.cart table tbody').on('keydown','td.qty input',function(event){
      if(event.which == 13)
         $(this).blur();
  });


	function cart_process(url)
	{
		$(".loader").css('background','#fff url(assets/images/loading.gif) center no-repeat');
		$.getJSON(url, function(data){
			if (data=='' || data==null)
			{
				location.reload();
			}
			else
			{
				$('.cart table tbody').html(data.cart);
				$(".loader").css('background','none');
			}
		});
	}

////////////////////////////////////////////////////////////////////////////////

	$("#forgotpass").validate({
		rules: {
			email: {
				required: true,
				email: true,
        remote: {
					url: "member/chk_email",
					type: "post"
				}
      }
		},
		messages: {
			email: {
				remote: jQuery.validator.format("Email {0} is not registered.")
			}
		}
	});	

});

