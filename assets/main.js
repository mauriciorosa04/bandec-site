// BANDEC, site institucional (20/10/2026). Só o essencial: menu do celular, entrada suave das seções e formulário por e-mail.
(function () {
  var botao = document.querySelector('.menu-botao');
  var menu = document.querySelector('.menu');
  if (botao && menu) {
    botao.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { menu.classList.remove('aberto'); botao.setAttribute('aria-expanded', 'false'); }
    });
  }

  var blocos = document.querySelectorAll('.entra');
  if ('IntersectionObserver' in window && blocos.length) {
    blocos.forEach(function (b) { b.classList.add('aguardando'); });
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove('aguardando'); obs.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    blocos.forEach(function (b) { obs.observe(b); });
    // Garantia: nada fica escondido se o observador não disparar.
    setTimeout(function () { blocos.forEach(function (b) { b.classList.remove('aguardando'); }); }, 1500);
  }

  // Formulário: monta a mensagem e abre o programa de e-mail (o site é estático, sem servidor).
  var form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var assunto = 'Contato pelo site: ' + v('assunto');
      var corpo = ['Nome: ' + v('nome'), 'Empresa ou instituição: ' + (v('empresa') || 'não informada'), 'E-mail: ' + v('email'), 'Telefone: ' + (v('telefone') || 'não informado'), '', v('mensagem')].join('\n');
      var destino = form.getAttribute('data-destino');
      window.location.href = 'mailto:' + destino + '?subject=' + encodeURIComponent(assunto) + '&body=' + encodeURIComponent(corpo);
    });
  }
})();
