window.wSlideshow = {
  render: function(config) {
    var el = document.getElementById(config.elementID + '-slideshow');
    if (!el) return;
    var images = config.images;
    var current = 0;
    var total = images.length;
    var autoplayMs = (parseInt(config.speed) || 5) * 1000;
    var timer;
    var playing = config.autoplay === '1';
    var fixedHeight = config.fixedHeight ? parseInt(config.fixedHeight) : null;

    function imgSrc(url) {
      return '/uploads/' + url.replace(/\\\//g, '/');
    }

    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:relative;width:100%;';

    // Number nav — top-left, above image
    var nav = document.createElement('div');
    nav.style.cssText = 'text-align:left;padding:6px 0 6px 0;';
    for (var i = 0; i < total; i++) {
      (function(idx) {
        var btn = document.createElement('button');
        btn.textContent = idx + 1;
        btn.style.cssText = 'margin:0 3px 0 0;padding:4px 9px;border:1px solid #ccc;background:#fff;cursor:pointer;font-family:Roboto,sans-serif;font-size:13px;';
        btn.addEventListener('click', function() { go(idx); });
        nav.appendChild(btn);
      })(i);
    }
    wrapper.appendChild(nav);

    // Slide container
    var container = document.createElement('div');
    container.style.cssText = 'position:relative;width:100%;overflow:hidden;background:#000;' +
      (fixedHeight ? 'height:' + fixedHeight + 'px;' : '');
    var slides = [];
    images.forEach(function(img, idx) {
      var slide = document.createElement('div');
      slide.style.cssText = 'position:' + (idx === 0 ? 'relative' : 'absolute') +
        ';top:0;left:0;width:100%;opacity:' + (idx === 0 ? '1' : '0') +
        ';transition:opacity 0.6s ease;' +
        (fixedHeight ? 'height:' + fixedHeight + 'px;' : '');
      var image = document.createElement('img');
      image.src = imgSrc(img.url);
      if (fixedHeight) {
        image.style.cssText = 'width:100%;height:' + fixedHeight + 'px;object-fit:contain;display:block;';
      } else {
        image.style.cssText = 'width:100%;display:block;';
      }
      slide.appendChild(image);
      container.appendChild(slide);
      slides.push(slide);
    });

    // Prev/Next arrows — hidden by default, shown on hover
    var arrowStyle = 'position:absolute;top:50%;transform:translateY(-50%);' +
      'background:rgba(0,0,0,0.45);color:#fff;border:none;font-size:28px;' +
      'padding:10px 16px;cursor:pointer;z-index:10;opacity:0;' +
      'transition:opacity 0.2s ease;';
    var prev = document.createElement('button');
    prev.innerHTML = '&#8249;';
    prev.style.cssText = arrowStyle + 'left:0;';
    prev.addEventListener('click', function() { go(current - 1); });
    container.appendChild(prev);

    var next = document.createElement('button');
    next.innerHTML = '&#8250;';
    next.style.cssText = arrowStyle + 'right:0;';
    next.addEventListener('click', function() { go(current + 1); });
    container.appendChild(next);

    // Pause/Play button — hidden by default, shown on hover
    var pp = document.createElement('button');
    var pauseSvg = '<svg width="12" height="14" viewBox="0 0 12 14" fill="white"><rect x="0" y="0" width="4" height="14"/><rect x="8" y="0" width="4" height="14"/></svg>';
    var playSvg  = '<svg width="12" height="14" viewBox="0 0 12 14" fill="white"><polygon points="0,0 12,7 0,14"/></svg>';
    var pauseIcon = '<span style="font-family:Roboto,sans-serif;font-size:12px;margin-right:6px;">Pause</span>' + pauseSvg;
    var playIcon  = '<span style="font-family:Roboto,sans-serif;font-size:12px;margin-right:6px;">Play</span>'  + playSvg;
    pp.innerHTML = pauseIcon;
    pp.style.cssText = 'position:absolute;top:10px;left:10px;' +
      'background:rgba(0,0,0,0.45);color:#fff;border:none;' +
      'padding:0 10px;height:32px;display:flex;align-items:center;justify-content:center;' +
      'cursor:pointer;z-index:10;opacity:0;transition:opacity 0.2s ease;border-radius:3px;';
    pp.addEventListener('click', function() {
      playing = !playing;
      pp.innerHTML = playing ? pauseIcon : playIcon;
      playing ? startTimer() : clearInterval(timer);
    });
    container.appendChild(pp);

    // Show/hide controls on hover
    container.addEventListener('mouseenter', function() {
      prev.style.opacity = '1';
      next.style.opacity = '1';
      pp.style.opacity = '1';
    });
    container.addEventListener('mouseleave', function() {
      prev.style.opacity = '0';
      next.style.opacity = '0';
      pp.style.opacity = '0';
    });

    wrapper.appendChild(container);
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
      if (playing) startTimer();
    }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(function() { go(current + 1); }, autoplayMs);
    }

    updateNav();
    if (playing) startTimer();
  }
};
