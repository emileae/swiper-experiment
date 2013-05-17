/*
Author: Vladimir Kharlampidi, The iDangero.us
*/

$(function(){
	
    

    //Clickable pagination
    $('.pagination1 .swiper-pagination-switch').click(function(){
    	swiper.swipeTo($(this).index())
    })
    
    thresh_width = 10

	/* Nested Swipers. Vertical Swiper inside of horizontal: */	
	var swiperN1 = $('.swiper-n1').swiper({
		pagination : '.pagination-n1',
        preventClassNoSwiping:true,
		slidesPerSlide : 1,
        initialSlide: 1,
        moveStartThreshold:thresh_width,
	});
	var swiperN2 = $('.swiper-n2').swiper({
		pagination : '.pagination-n2',
		slidesPerSlide : 1,
        moveStartThreshold:10,
		mode: 'vertical',
        onSlideChangeEnd: function() {
                var swiperN1 = $('.swiper-n1').swiper({
                pagination : '.pagination-n1',
                preventClassNoSwiping:true,
                slidesPerSlide : 1,
                initialSlide: 1,
                moveStartThreshold:thresh_width,
                });
        },
	});
    var swiperN3 = $('.swiper-n3').swiper({
		pagination : '.pagination-n3',
		slidesPerSlide : 1,
        moveStartThreshold:10,
		mode: 'horizontal',
        onTouchStart : function() {
            swiperN1.destroy();
        },
        onTouchEnd : function() {
            /*swiperN1.reInit();*/
            var swiperN1 = $('.swiper-n1').swiper({
            pagination : '.pagination-n1',
            preventClassNoSwiping:true,
            slidesPerSlide : 1,
            initialSlide: 1,
            moveStartThreshold:thresh_width,
            });
            /*alert('go!go!');*/
        },
	});
	
})

