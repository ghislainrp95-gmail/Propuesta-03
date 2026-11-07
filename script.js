(function () {
  'use strict';

  // Portada tipo sobre
  var sobre = document.getElementById('sobre');
  document.getElementById('abrir').addEventListener('click', function () {
    sobre.classList.add('abierto');
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    setTimeout(function () { sobre.style.display = 'none'; }, 1000);
  });

  // Aparición al hacer scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Cuenta regresiva: 24 de abril de 2027, 5:30 pm (hora del centro de México, UTC-6)
  var meta = new Date('2027-04-24T17:30:00-06:00').getTime();
  var ids = { d: 'c-d', h: 'c-h', m: 'c-m', s: 'c-s' };
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    var diff = Math.max(0, meta - Date.now());
    var s = Math.floor(diff / 1000);
    document.getElementById(ids.d).textContent = Math.floor(s / 86400);
    document.getElementById(ids.h).textContent = pad(Math.floor(s % 86400 / 3600));
    document.getElementById(ids.m).textContent = pad(Math.floor(s % 3600 / 60));
    document.getElementById(ids.s).textContent = pad(s % 60);
  }
  tick();
  setInterval(tick, 1000);

  // Confirmación por WhatsApp
  var WHATSAPP = '5215583072029';
  var form = document.getElementById('form');
  var error = document.getElementById('error');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var nombre = document.getElementById('nombre').value.trim();
    var boletos = document.getElementById('boletos').value;
    if (!nombre || boletos === '') {
      error.textContent = 'Por favor escribe tu nombre y selecciona el número de boletos.';
      return;
    }
    error.textContent = '';
    var texto = boletos === '0'
      ? 'Hola, soy ' + nombre + '. Lamentablemente no podré asistir a la boda de Nayeli y Christian. ¡Les deseo lo mejor!'
      : 'Hola, soy ' + nombre + '. Confirmo mi asistencia a la boda de Nayeli y Christian (24 de abril de 2027) con ' +
        boletos + (boletos === '1' ? ' boleto.' : ' boletos.');
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
  });
})();
