$(document).ready(function(){

	/*if ($("#actmenu").length>0 && ($("#actmenu").attr('class')))
	{
		var act = ($("#actmenu").attr('class').substr(1))-1;
		$('.sections li:has(a):eq('+(act)+')').addClass('act').children('a').css('font-weight','bold');
	}*/

	$(".success").animate({opacity: 1},'slow',function(){
		$(this).fadeOut(5000);
	});

	$(".delete, .del-normal").click(function(){
		if (!confirm( 'Continue deleting ?')) {
			return false;
		}
		else{
			return true;
		}
	});

	$(".del").click(function(){
		var alt = $(this).attr('title');
		var href = $(this).attr('href');
		if (!confirm(alt + ' ?')) {
			return false;
		}
		else
		{
			$(this).parents('tr').children('td').css({"background":"#F7B0B0"}).fadeOut('slow');
			$(this).parents('li:eq(0)').fadeOut('slow');
			$.get(href);
		}
		return false;
	});

	if ($("a[rel^='prettyPhoto']").length>0)
	{
		$("a[rel^='prettyPhoto']").prettyPhoto();
	}

	$(".btnback").click(function(){
		var rel = $(this).attr('rel');
		if (rel!=null || rel=='')
		{
			location.replace(rel);
		}
		else
		{
			window.history.back();
		}
		return false;
	});

	$('.multi-upload .fi_text, .multi-upload button').click(function(){
		$(this).parent().next().next().find('input:last').trigger('click');
		return false;
	});

	$('.img-album .del_img').bind('click',function(){
		$(this).parent('li').find('img:first').css('border-color','red');
		if (confirm("Delete Image ?"))
		{
			var href = $(this).attr('href');
			$(this).parent('li').fadeOut('slow',function(){
				$.get(href);
				$(this).remove();
			});

		}
		$(this).parent('li').find('img:first').css('border-color','#ddd');
		return false;
	});

	/*$('.img-album,.topbanner').sortable({
		placeholder: 'ui-sortable-placeholder',
		forcePlaceholderSize: true,
		helper : 'clone',
		update: function( event, ui ) {
			var arr = new Array;
			$(this).find('li').each(function(index){
				arr[index] = $(this).find('input[name*=order_id]').val();
			});
			$.post('/admin/admhome/banner_sort', {'sort_id': arr.join()});
		}
	});*/

	var fixHelper = function(e, ui) {
		ui.children().each(function() {
			$(this).width($(this).width());
		});
		return ui;
	};

	/*$('#arSorter tbody').sortable({
		placeholder: 'ui-sortable-placeholder',
		start: function (event, ui) {
			ui.placeholder.html('<td colspan="3">&nbsp;</td>')},
			helper: fixHelper,
			update: function( event, ui ) {
				var arr = new Array;
				$(this).find('tr').each(function(index){
					arr[index] = $(this).find('input[name*=order_id]').val();
				});
				$.post('/admin/admhome/article_sort', {'sort_id': arr.join() });
			}
		}).disableSelection();*/


	/*$('#catSorter tbody').sortable({
		placeholder: 'ui-sortable-placeholder',
		start: function (event, ui) {
			ui.placeholder.html('<td colspan="3">&nbsp;</td>')},
			helper: fixHelper,
			update: function( event, ui ) {
				var arr = new Array;
				$(this).find('tr').each(function(index){
					arr[index] = $(this).find('input[name*=order_id]').val();
				});
				$.post('/admin/admhome/category_sort', {'sort_id': arr.join() });
			}
		}).disableSelection();*/


	if ($('.date-pick').length>0)
	{
		$('.date-pick').calendarsPicker({dateFormat: 'yyyy-mm-dd'});
	}

	if ($('.date-pick-news').length>0)
	{
		var d = new Date();
		var end = d.getFullYear();
		var start = end - 2;
		$('.date-pick-news').calendarsPicker({yearRange: start+':'+end, dateFormat: 'yyyy-mm-dd'});
	}

	$('#dtTable').dataTable({
		"aaSorting": [],
		"aoColumnDefs": [
		{
			bSortable: false,
			aTargets: [ -1 ]
		}],
		"iDisplayLength": 100,
		"bStateSave": true
	});
	$('#dtTableDesc').dataTable({
		"aaSorting": [[ 0, "desc" ]],
		"aoColumnDefs": [
		{
			bSortable: false,
			aTargets: [ -1 ]
		}],
		"iDisplayLength": 100,
		"bStateSave": true
	});
	$('#dtTableNoSort').dataTable({
		"bSort": false,
		"iDisplayLength": 100,
		"bStateSave": true
	});

});
