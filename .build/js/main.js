$(document).ready(function(){
	$('.removeBook').click(function(e){
		deleteId = $(this).data('id');
		if (confirm("Do you want to delete this Travel Package?") == true) {
 			   txt = "You pressed OK!";
				} else {
    			return;
				}
		$.ajax({
			url:'/manage/books/delete/' +deleteId,
			type: 'DELETE',
			success: function(){

			}
		});
		window.location = '/manage/books';
	});

	$('.removeCategory').click(function(e){
		deleteId = $(this).data('id');
		if (confirm("Do you want to delete this category?") == true) {
 			   txt = "You pressed OK!";
				} else {
    			return;
				}
		$.ajax({
			url:'/manage/categories/delete/' +deleteId,
			type: 'DELETE',
			success: function(){

			}
		});
		window.location = '/manage/categories';
	});

	$('.removeMombasa').click(function(e){
		deleteId = $(this).data('id');
		if (confirm("Do you want to delete this Mombasa Package?") == true) {
 			   txt = "You pressed OK!";
				} else {
    			return;
				}
		$.ajax({
			url:'/manage/mombasas/delete/' +deleteId,
			type: 'DELETE',
			success: function(){

			}
		});
		window.location = '/manage/mombasas';
	});

	$('.removeCustomers').click(function(e){
		deleteId = $(this).data('id');
		if (confirm("Do you want to delete this Request?") == true) {
 			   txt = "You pressed OK!";
				} else {
    			return;
				}
		$.ajax({
			url:'/manage/customers/delete/' +deleteId,
			type: 'DELETE',
			success: function(){

			}
		});
		window.location = '/manage/customers';
	});
});


