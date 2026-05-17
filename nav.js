(function() {
  var nav = document.getElementById('site-nav');
  var links = nav.querySelectorAll('a');

  function update() {
    if (window.scrollY > 80) {
      nav.style.background = '#ffffff';
      nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
      nav.style.padding = '10px 40px';
      links.forEach(function(a) {
        a.style.color = '#2a2a2a';
        a.style.textShadow = 'none';
        if (a.dataset.active) a.style.borderColor = '#2a2a2a';
      });
    } else {
      nav.style.background = 'transparent';
      nav.style.boxShadow = 'none';
      nav.style.padding = '20px 40px';
      links.forEach(function(a) {
        a.style.color = '#ffffff';
        a.style.textShadow = '0 1px 4px rgba(0,0,0,0.7)';
        if (a.dataset.active) a.style.borderColor = '#ffffff';
      });
    }
  }

  window.addEventListener('scroll', update);
  update();
})();
