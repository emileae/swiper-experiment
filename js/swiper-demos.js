/*
Author: Vladimir Kharlampidi, The iDangero.us
*/

$(function(){
    
    //Clickable pagination
    $('.pagination1 .swiper-pagination-switch').click(function(){
    	swiper.swipeTo($(this).index())
    })
    
    thresh_width = 10;
    number_of_slides = 11;//set number of slides and make sure that html in index.html corresponds
    slide_indexes_nested = [];//slide indexes containing vertical swipers

	/* Nested Swipers. Vertical Swiper inside of horizontal: */	
	var swiperN1 = $('.swiper-n1').swiper({
        speed: 200,
        preventClassNoSwiping:true,
		slidesPerSlide : 1,
        initialSlide: 0,
        moveStartThreshold:thresh_width,
        onSlideChangeEnd: load_Slide,
	});
    
    /* START LOAD INITIAL SLIDES */
    
    var number_of_initial_slides = 3;
    
    for (var i = 0; i < number_of_initial_slides; i++) {
        var response_html_pg = req(i);
        load_slide_init = swiperN1.getSlide(i);
        load_slide_init.html(response_html_pg);
        //load_Swiper_n(i);//this is to load all the initial swipers that may be present on initial slides
    };
    /* END LOAD INITIAL SLIDES */
    
/* callback onSlideChangeEnd */
function load_Slide(){

    var active_index = swiperN1.activeIndex;
    var slide_to_load = "";
    
    var pp = active_index-2;
        load_buffer_slides(pp);
        load_Swiper_pp(pp);
    var p = active_index-1;
        //load_buffer_slides(p);
        //load_Swiper_p(p)
    var c = active_index;
        //load_buffer_slides(c);//this slide is already loaded
    var n = active_index+1;
        //load_buffer_slides(n);
        //load_Swiper_n(n)
    var nn = active_index+2;
        load_buffer_slides(nn);
        load_Swiper_nn(nn);
    
    $('#pg_'+nn).find('.generic_img').css('visibility', 'hidden');//hide generic images on loaded slides
    $('#pg_'+pp).find('.generic_img').css('visibility', 'hidden');//hide generic images on loaded slides
    $('#pg_'+p).find('.generic_img').css('visibility', 'visible');//show images that are on active slide-1
    $('#pg_'+c).find('.generic_img').css('visibility', 'visible');//show images that are on active slide
    $('#pg_'+n).find('.generic_img').css('visibility', 'visible');//show images that are on active slide+1
    
    
    function load_buffer_slides(slide_index){
        if (0 <= slide_index && slide_index <= (number_of_slides-1)){
            slide_to_load = swiperN1.getSlide(slide_index);
            var response_html = req(slide_index);
            slide_to_load.html(response_html);
        };
    };

    if ($.inArray(pp, slide_indexes_nested) != -1){
        swiper_p = $('.swiper-nest'+pp).swiper({
            slidesPerSlide : 1,
            moveStartThreshold:10,
            mode: 'vertical',
        });
    };
    
    
    //unload_rest_slides(c); // unload slides function...........
    function unload_rest_slides(active_index){
        var slide_clear_list = [];
        
        var start_slide = 0;
        var top_left_side = active_index-2//not inclusive
        var bottom_right_side = active_index+2//not inclusive
        var end_slide = number_of_slides-1;
        
        //set lists containing the slide indexes of slides to be cleared
        for (i=start_slide; i<top_left_side; i++){
            slide_clear_list.push(i);
        };
        for (i=(bottom_right_side+1); i<=end_slide; i++){
            slide_clear_list.push(i);
        };
        
        //clear slides with indexes in list
        for (i=0; i<slide_clear_list.length; i++){
            var slide_to_clear = swiperN1.getSlide(slide_clear_list[i]);
            slide_to_clear.html("");
        };
        //console.log("slide_clear_list"+slide_clear_list);
    };
    
};/*end function load_Slide*/
    
});

/* START SWIPER LOADING FUNCTIONS */
function load_Swiper_n(slide){
    if ($.inArray(slide, slide_indexes_nested) != -1){
        swiper_n = $('.swiper-nest'+slide).swiper({
            slidesPerSlide : 1,
            moveStartThreshold:10,
            mode: 'vertical',
            //scrollContainer: true,
        });
    };
};
function load_Swiper_p(slide){
    if ($.inArray(slide, slide_indexes_nested) != -1){
        swiper_p = $('.swiper-nest'+slide).swiper({
            slidesPerSlide : 1,
            moveStartThreshold:10,
            mode: 'vertical',
            //scrollContainer: true,
        });
    };
};
function load_Swiper_nn(slide){
    if ($.inArray(slide, slide_indexes_nested) != -1){
        swiper_nn = $('.swiper-nest'+slide).swiper({
            slidesPerSlide : 1,
            moveStartThreshold:10,
            mode: 'vertical',
            //scrollContainer: true,
        });
    };
};
function load_Swiper_pp(slide){
    if ($.inArray(slide, slide_indexes_nested) != -1){
        swiper_pp = $('.swiper-nest'+slide).swiper({
            slidesPerSlide : 1,
            moveStartThreshold:10,
            mode: 'vertical',
            //scrollContainer: true,
        });
    };
};
/* END SWIPER LOADING FUNCTIONS */

function req(active_index){
    var request = new XMLHttpRequest();
    
    var response_html = 'error'
    
    request.open("GET", active_index+".html", false);/* changed to async = false */
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                //console.log("response " + request.responseText);
                response_html = request.responseText;
            }
        }
    };
    if (active_index <= (number_of_slides-1) && active_index >= 0){
        request.send();
        return response_html
    }
};




