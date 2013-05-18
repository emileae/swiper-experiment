/*
Author: Vladimir Kharlampidi, The iDangero.us
*/

$(function(){
    
    thresh_width = 10
	var swiperN1 = $('.swiper-n1').swiper({
        preventClassNoSwiping:true,
		slidesPerSlide : 1,
        initialSlide: 1,
        moveStartThreshold:thresh_width,
	});
	
})

