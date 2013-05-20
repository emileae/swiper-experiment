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
        onSlideChangeEnd: function(){
            var request = new XMLHttpRequest();
            request.open("GET", "testing.html", true);
            request.onreadystatechange = function(){
                if (request.readyState == 4) {
                    if (request.status == 200 || request.status == 0) {
                        console.log("response " + request.responseText);
                        var response_text = request.responseText;
                        $('.orange-slide').html(response_text);
                    }
                }
            }
            request.send();
        },
	});
	
})

