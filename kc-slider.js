function kcSlider() {
    var sliders = document.querySelectorAll('.kc-slider');
    sliders.forEach(function(slider){
        
        var move = true;
        var prev = slider.querySelector('.kc-slider-prev');
        var next = slider.querySelector('.kc-slider-next');
        var itms = slider.querySelectorAll('.kc-slider-item');
        
        prev.removeEventListener('click', slidePrev);
        next.removeEventListener('click', slideNext);
        prev.addEventListener('click', slidePrev);
        next.addEventListener('click', slideNext);
        
        function resetSlide() {
            itms.forEach(function(item){
                item.classList.remove('kc-slider-anim');
                item.classList.remove('kc-slider-back');
            });
        }
        
        function slidePrev() {
            if (move) {
                move = false;
                itms[0].insertAdjacentElement('beforebegin', itms[itms.length-1]);
                itms = slider.querySelectorAll('.kc-slider-item');
                itms.forEach(function(item){
                    item.classList.add('kc-slider-back');
                });
                setTimeout(function(){
                    itms.forEach(function(item){
                        item.classList.add('kc-slider-anim');
                        item.classList.remove('kc-slider-back');
                    });
                },1);
                setTimeout(function(){
                    move = true;
                    resetSlide();
                },250);
            }
        }
        
        function slideNext() {
            if (move) {
                move = false;
                itms.forEach(function(item){
                    item.classList.add('kc-slider-anim');
                    item.classList.add('kc-slider-back');
                });
                setTimeout(function(){
                    itms[itms.length-1].insertAdjacentElement('afterend', itms[0]);
                    itms = slider.querySelectorAll('.kc-slider-item');
                    move = true;
                    resetSlide();
                },250);
            }
        }
    });
}
