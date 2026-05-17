window.wSlideshow = {
  render: function(config) {
    var el = document.getElementById(config.elementID + '-slideshow');
    if (!el) return;
    var images = config.images;
    var current = 0;
    var total = images.length;
    var autoplayMs = (parseInt(config.speed) || 5) * 1000;
    var timer;

    function imgSrc(url) {
      return '/uploads/' + url.replace(/\\\//g, '/');
    }

    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:relative;width:100%;background:#000;';

    // Number nav (top)
    var nav = document.createElement('div');
    nav.style.cssText = 'text-align:center;padding:8px 0;background:#f5f5f5;';
    for (var i = 0; i < total; i++) {
      (function(idx) {
        var btn = document.createElement('button');
        btn.textContent = idx + 1;
        btn.style.cssText = 'margin:0 3px;padding:4px 9px;border:1px solid #ccc;background:#fff;cursor:pointer;font-family:Roboto,sans-serif;font-size:13px;';
        btn.dataset.idx = idx;
        btn.addEventListener('click', function() { go(idx); });
        nav.appendChild(btn);
      })(i);
    }
    wrapper.appendChild(nav);

    // Slide container
    var container = document.createElement('div');
    container.style.cssText = 'position:relative;width:100%;overflow:hidden;';
    var slides = [];
    images.forEach(function(img, idx) {
      var slide = document.createElement('div');
      slide.style.cssText = 'position:' + (idx === 0 ? 'relative' : 'absolute') + ';top:0;left:0;width:100%;opacity:' + (idx === 0 ? '1' : '0') + ';transition:opacity 0.6s ease;';
      var image = document.createElement('img');
      image.src = imgSrc(img.url);
      image.style.cssText = 'width:100%;display:block;';
      slide.appendChild(image);
      container.appendChild(slide);
      slides.push(slide);
    });
    wrapper.appendChild(container);

    // Prev/Next controls
    var btnStyle = 'position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.4);color:#fff;border:none;font-size:24px;padding:10px 16px;cursor:pointer;z-index:10;';
    var prev = document.createElement('button');
    prev.innerHTML = '&#8249;';
    prev.style.cssText = btnStyle + 'left:0;';
    prev.addEventListener('click', function() { go(current - 1); });
    wrapper.appendChild(prev);

    var next = document.createElement('button');
    next.innerHTML = '&#8250;';
    next.style.cssText = btnStyle + 'right:0;';
    next.addEventListener('click', function() { go(current + 1); });
    wrapper.appendChild(next);

    el.appendChild(wrapper);

    function updateNav() {
      nav.querySelectorAll('button').forEach(function(btn, i) {
        btn.style.background = i === current ? '#555' : '#fff';
        btn.style.color = i === current ? '#fff' : '#333';
      });
    }

    function go(idx) {
      if (idx < 0) idx = total - 1;
      if (idx >= total) idx = 0;
      slides[current].style.opacity = '0';
      slides[current].style.position = 'absolute';
      current = idx;
      slides[current].style.position = 'relative';
      slides[current].style.opacity = '1';
      updateNav();
      resetTimer();
    }

    function resetTimer() {
      clearInterval(timer);
      if (config.autoplay === '1') {
        timer = setInterval(function() { go(current + 1); }, autoplayMs);
      }
    }

    updateNav();
    resetTimer();
  }
};
