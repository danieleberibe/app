//slideshow style interval
var autoSwap = 0; //setInterval(swap, 3500);

//pause slideshow and reinstantiate on mouseout
/*
$('ul, span').hover(
    function(){
        clearInterval(autoSwap);
},
    function(){
        autoSwap = setInterval(swap, 3500);
});
*/

//global variables
var items = [];
var startItem = 1;
var position = 0;
var itemCount = $('.portfolio-slideshow-wrapper .carousel li.items').length;
var leftpos = itemCount;
var resetCount = itemCount;

//unused: gather text inside items class
$('li.items').each(function(index) {
    items[index] = $(this).text();
});

// get position of image (for moving to forward)
function portfolio_ss_pos(positionvalue)
{
    if(positionvalue != 'leftposition')
    {
        //increment image list id
        position++;

        //if final result is greater than image count, reset position.
        if((startItem+position) > resetCount)
        {
            position = 1-startItem;
        }
    }

    //setting the left positioned item
    if(positionvalue == 'leftposition')
    {
        //left positioned image should always be one left than main positioned image.
        position = startItem - 1;

        //reset last image in list to left position if first image is in main position
        if(position < 1)
        {
            position = itemCount;
        }
    }

    return position;
}

//swap images function
function portfolio_ss_swap(action, box)
{
    var direction         = action;
    var slideshow_wrapper = box;

    //moving carousel backwards
    if(direction == 'counter-clockwise')
    {
        var leftitem = slideshow_wrapper.find('.left-pos').attr('data-id') - 1;
        if(leftitem == 0)
        {
            leftitem = itemCount;
        }

        slideshow_wrapper.find('li.right-pos').removeClass('right-pos').addClass('back-pos');
        slideshow_wrapper.find('li.main-pos').removeClass('main-pos').addClass('right-pos');
        slideshow_wrapper.find('li.left-pos').removeClass('left-pos').addClass('main-pos');
        slideshow_wrapper.find('li.items[data-id='+leftitem+']').removeClass('back-pos').addClass('left-pos');

        startItem--;
        if(startItem < 1)
        {
            startItem = itemCount;
        }
    }

    //moving carousel forward
    if(direction == 'clockwise' || direction == '' || direction == null )
    {
        slideshow_wrapper.find('li.items[data-id='+ startItem +']').removeClass('main-pos').addClass('left-pos');
        slideshow_wrapper.find('li.items[data-id='+ (startItem+portfolio_ss_pos()) +']').removeClass('right-pos').addClass('main-pos');
        slideshow_wrapper.find('li.items[data-id='+ (startItem+portfolio_ss_pos()) +']').removeClass('back-pos').addClass('right-pos');
        slideshow_wrapper.find('li.items[data-id='+ portfolio_ss_pos('leftposition') +']').removeClass('left-pos').addClass('back-pos');

        startItem++;
        position=0;
        if(startItem > itemCount)
        {
            startItem = 1;
        }
    }
}

//next button click function
$('.portfolio-slideshow-wrapper .next').click(function() {
    portfolio_ss_swap('clockwise', $(this).parent().parent());
});

//prev button click function
$('.portfolio-slideshow-wrapper .prev').click(function() {
    portfolio_ss_swap('counter-clockwise', $(this).parent().parent());
});

//if any visible items are clicked
$('.portfolio-slideshow-wrapper li.items').click(function() {
    if($(this).attr('class') == 'items left-pos')
    {
        portfolio_ss_swap('counter-clockwise', $(this).parent().parent());
    }
    else if($(this).attr('class') == 'items right-pos')
    {
        portfolio_ss_swap('clockwise', $(this).parent().parent());
    }
});
