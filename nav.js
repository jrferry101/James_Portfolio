(function() {
  var nav = document.getElementById('site-nav');
  var links = nav.querySelectorAll('.nav-desktop-links a');
  var hamburger = nav.querySelector('.site-hamburger');

  function update() {
    if (window.scrollY > 80) {
      nav.style.background = '#ffffff';
      nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
      nav.style.padding = '10px 40px';
      nav.classList.add('scrolled');
      links.forEach(function(a) {
        a.style.color = '#2a2a2a';
        a.style.textShadow = 'none';
        if (a.dataset.active) a.style.borderColor = '#2a2a2a';
      });
    } else {
      nav.style.background = 'transparent';
      nav.style.boxShadow = 'none';
      nav.style.padding = '20px 40px';
      nav.classList.remove('scrolled');
      links.forEach(function(a) {
        a.style.color = '#ffffff';
        a.style.textShadow = '0 1px 4px rgba(0,0,0,0.7)';
        if (a.dataset.active) a.style.borderColor = '#ffffff';
      });
    }
  }

  window.addEventListener('scroll', update);
  update();

  // Toggle mobile nav open/closed
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.classList.toggle('nav-open');
    });
  }

  // Close mobile nav via the X button inside #navMobile
  var mobileClose = document.querySelector('#navMobile .hamburger');
  if (mobileClose) {
    mobileClose.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.classList.remove('nav-open');
    });
  }

  // Close mobile nav when a link is tapped
  var mobileLinks = document.querySelectorAll('#navMobile .wsite-menu-item');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      document.body.classList.remove('nav-open');
    });
  });
})();
