'use strict';

angular.module('sko.photoswipe', [
    'sko.jquery',
  ])
  .factory('PhotoSwipe', function ($window) {
    return $window.PhotoSwipe;
  })
  .directive('photoswipe', function ($timeout, $, PhotoSwipe) {
    return {
      scope: {
        photoswipe: '=',
      },
      link: function postLink(scope, element) {
        
        var items = [],
            $pswp = $('.pswp');

        if ( !$pswp.length ) {
          // Inject the default template.
          $pswp = $('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><button class="pswp__button pswp__button--share" title="Share"></button><button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button><button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div> </div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>');
          $('body').append($pswp);
        }
        
        $('a', element).each(function() {
          var $a = $(this),
              $img = $('img', $a),
              width = $a.attr('width'),
              height = $a.attr('height');

          if ( !width || !height ) {
            console.warn('missing dimensions', width, height);
            return;
          }

          items.push({
            src:   $a.attr('href'),
            w:     width,
            h:     height,
            msrc:  $img.attr('src'),
            title: $img.attr('alt') ? $img.attr('alt') : '',
          });
        });

        $('a', element).on('click', function(evt) {
          evt.preventDefault();

          var $img = $('img', this),
              currentIndex = $('img', element).index( $img ),
              options = {
	              index: currentIndex,
	              getThumbBoundsFn: function(index) {
	              	var $img = $('img', element).eq(index);
	                return {
	                  x: $img.offset().left, 
	                  y: $img.offset().top, 
	                  w: $img.width(),
	                  h: $img.height(),
	                };
	              },
	            };

          // Initializes and opens PhotoSwipe
          var gallery = new PhotoSwipe( $pswp.get()[0], PhotoSwipeUI_Default, items, options);
          gallery.init();
        });
      },
    };
  });
