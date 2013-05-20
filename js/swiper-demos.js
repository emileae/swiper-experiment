/*
Author: Vladimir Kharlampidi, The iDangero.us
*/

$(function(){
    
    //Clickable pagination
    $('.pagination1 .swiper-pagination-switch').click(function(){
    	swiper.swipeTo($(this).index())
    })
    
    thresh_width = 10;
    number_of_slides = 9;

	/* Nested Swipers. Vertical Swiper inside of horizontal: */	
	var swiperN1 = $('.swiper-n1').swiper({
		//pagination : '.pagination-n1',
        /*loop: true,*/
        preventClassNoSwiping:true,
		slidesPerSlide : 1,
        initialSlide: 0,
        moveStartThreshold:thresh_width,
        onSlideChangeEnd: load_Slide,
	});
	
/* callback onSlideChangeEnd */
function load_Slide(){
    
    /*alert(swiperN1.activeIndex);*/
    var prev_index = swiperN1.previousIndex;
    var active_index = swiperN1.activeIndex;
    var slide_to_load = "";
    var slide_to_unload = "";
    
    
    
    var load_yes_no = false;
    var unload_yes_no = false;
    
    if (prev_index<active_index){
        if (active_index < (number_of_slides-1)){
            console.log('moved right, load slide-1:'+active_index);
            slide_to_load = swiperN1.getSlide(active_index+1);
            if ((active_index-2) > 0){
                slide_to_unload = swiperN1.getSlide(active_index-2);
                unload_yes_no = true;
            };
            var index_request = active_index+1;
            load_yes_no = true
            };
    }else if (prev_index>active_index){
        if (active_index > 0){
            console.log('moved left load slide+1:'+active_index);
            slide_to_load = swiperN1.getSlide(active_index-1);
            if ((active_index+2) < number_of_slides-1){
                slide_to_unload = swiperN1.getSlide(active_index+2);
                unload_yes_no = true;
            }
            var index_request = active_index-1;
            load_yes_no = true
        };
    };
    
    var response_html = req(index_request);
    if (load_yes_no){
        slide_to_load.html(response_html);
        /*console.log("response_html: "+response_html);*/
    };
    if (unload_yes_no){
        slide_to_unload.html("");
    };
    
    /*activating the swiperN2*/
    if ((swiperN1.activeIndex) == 4){
        var swiperN2 = $('.swiper-n2').swiper({
            //pagination : '.pagination-n2',
            slidesPerSlide : 1,
            moveStartThreshold:10,
            mode: 'vertical',
        });
    };

};
    
});

function req(active_index){
    var request = new XMLHttpRequest();
    
    var response_html = 'error'
    
    request.open("GET", active_index+".html", false);/* changed to async = false */
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                console.log("response " + request.responseText);
                response_html = request.responseText;
            }
        }
    };
    if (active_index <= (number_of_slides-1)){
        request.send();
    }
    return response_html
};










