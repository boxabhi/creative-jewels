(function( $ ) {
	'use strict';

	$(document).ready(function(){

	 	/*Coupon popup*/
	 	// $(document).on('click', '.mwb-coupon-view-btn', function(){
	 	// 	$('.mwb-coupon-popup-wrapper').toggleClass('show');
	 	// });
	 	$(document).on('click', '.mwb-coupon-popup-wrapper', function(){
	 		$(this).toggleClass('show');
	 	});
	 	$(document).on('click', '.mwb-coupon-popup-content', function(e){
	 		e.stopPropagation();
	 	});
	 	$(document).on('click', '.mwb-coupon-close-btn', function(){
	 		$('.mwb-coupon-popup-wrapper').toggleClass('show');
	 	});
	 	/*End Coupon popup*/

		/** Make draggable **/
		$( "#mwb-cpr-drag" ).draggable({
			containment: "window",
			start: function( event, ui ) {
	            $(this).addClass('mwb-cpr-dragged'); 
	        }
		});
		/** Make show-hide popup **/
  		$("#mwb-cpr-mobile-close-popup").hide();

  		/* Check if the animation is enabled then add it*/
  		var mwb_crp_animation = mwb_crp.mwb_crp_animation;
  		if(mwb_crp_animation == 'yes'){

	  		$("#mwb-cpr-drag").addClass("fadeInDownBig");
	  		setTimeout(function () { 
	  			$("#mwb-cpr-drag").removeClass("fadeInDownBig");
	  			$("#mwb-cpr-drag").addClass("rubberBand");
	  		}, 1000);
	  		setTimeout(function () { 
	  			$("#mwb-cpr-drag").removeClass("rubberBand");
	  		}, 2000);

  		}
  		/* End of Animation Section */

  		/** For desktops **/
		$(document).on('click','#notify_user_gain_tab',function(){
			$('#notify_user_gain_tab').addClass('active');
			$('#notify_user_redeem').removeClass('active');
			$('#notify_user_earn_more_section').css('display','block');
			$('#notify_user_redeem_section').css('display','none');
		});
		$(document).on('click','#notify_user_redeem',function(){
			$('#notify_user_gain_tab').removeClass('active');
			$('#notify_user_redeem').addClass('active');
			$('#notify_user_earn_more_section').css('display','none');
			$('#notify_user_redeem_section').css('display','block');
		});

		/** Copy the referral Link via clipboard js **/
		var btns = document.querySelectorAll('button');
	    var clipboard = new Clipboard(btns);

	    $(".mwb_cpr_btn_copy").click(function(){
	    	$(".mwb_cpr_btn_copy").addClass("mwb_copied");
	    });
	    $(".mwb-crp-coupon-btn-copy").click(function(){
	    	$(".mwb-crp-coupon-btn-copy").removeClass("mwb_copied");
	    	$(this).addClass("mwb_copied");
	    });
	    /** Data Table for the Referral Coupons  **/
	    if (mwb_crp.is_account_page) {
	    	$('#mwb-crp-referral-table').DataTable( {
	    		"lengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]],
	    		"language": {
	    			"lengthMenu": mwb_crp.display_record,
	    			"zeroRecords": mwb_crp.nothing_found,
	    			"info": mwb_crp.Showing_page,
	    			"infoEmpty": mwb_crp.no_record,
	    			"infoFiltered":mwb_crp.filtered_info,
	    			"search": mwb_crp.search,
	    			"paginate": {
	    				"previous": mwb_crp.previous,
	    				"next"	  : mwb_crp.next
	    			}
	    		}
	    	});
	    }
 	});
 	/*Display popup in the coupon referral program*/
 	$(document).on('click','.mwb_crp_default',function(e) {
 		var subscription_id = $(this).data('id');
 		var data = {
 			action:'mwb_crp_coupons_popup',
 			subscription_id:subscription_id,
 			mwb_nonce:mwb_crp.mwb_crp_nonce,				
 		};
 		$('#mwb_crp_loader').show();
 		$('.mwb-coupon-popup-column').remove();
 		$.ajax({
 			url: mwb_crp.ajaxurl, 
 			type: "POST",  
 			data: data,
 			dataType :'json',
 			success: function(response) 
 			{
 				$('.mwb-coupon-popup-row').html(response.html);
 			},
 			complete: function(){
 				$('#mwb_crp_loader').hide();
 				//$('.mwb-coupon-popup-wrapper').toggleClass('show');
 				$('.mwb-coupon-popup-wrapper').show();
 				$('.mwb-coupon-popup-wrapper').addClass('show');
 			}
 		});
 	});
 	/*Apply button after clicking on the apply button*/
 	$(document).on('click','.mwb_crp_apply_button',function(e) {
 		e.preventDefault();
 		var subscription_id = $(this).data('subscription');
 		var coupon_id = $(this).data('id');
 		var text = $('#'+coupon_id).text();
 		var data = {
 			action:'mwb_crp_coupon_apply',
 			subscription_id:subscription_id,
 			coupon_id:coupon_id,
 			mwb_nonce:mwb_crp.mwb_crp_nonce,				
 		};
 		$('#mwb_crp_loader').show();
 		$.ajax({
 			url: mwb_crp.ajaxurl, 
 			type: "POST",  
 			data: data,
 			dataType :'json',
 			success: function(response) 
 			{
 				$('#'+coupon_id).removeClass('mwb_crp_apply_button');
 				$('#'+coupon_id).addClass('mwb_crp_remove_button');
 				$('#'+coupon_id).text(mwb_crp.remove_text);
 			},
 			complete: function() {
 				$('#mwb_crp_loader').hide();
 				$('#'+coupon_id).removeClass('mwb_crp_apply_button');
 				$('#'+coupon_id).addClass('mwb_crp_remove_button');
 				$('#'+coupon_id).text(mwb_crp.remove_text);
 			}
 		});
 	});
 	/*Remove coupons from the subscription*/
 	$(document).on('click','.mwb_crp_remove_button',function(e) {
 		e.preventDefault();
 		var subscription_id = $(this).data('subscription');
 		var coupon_id = $(this).data('id');
 		var text = $('#'+coupon_id).text();
 		var data = {
 			action:'mwb_crp_coupon_remove',
 			subscription_id:subscription_id,
 			coupon_id:coupon_id,
 			mwb_nonce:mwb_crp.mwb_crp_nonce,				
 		};
 		$('#mwb_crp_loader').show();
 		$.ajax({
 			url: mwb_crp.ajaxurl, 
 			type: "POST",  
 			data: data,
 			dataType :'json',
 			success: function(response) 
 			{
 				$('#'+coupon_id).text(mwb_crp.apply);
 				$('#'+coupon_id).removeClass('mwb_crp_remove_button');
 				$('#'+coupon_id).addClass('mwb_crp_apply_button');
 			},
 			complete: function() {
 				$('#mwb_crp_loader').hide();
 				
 			}
 		});
 	});
})( jQuery );
