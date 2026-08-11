// Individual doctor profile: reads ?id= from the URL, fetches
// /api/doctors/:id, and renders a trust/credential page with one CTA.
(function () {
  var stateEl = document.getElementById('profile-state');
  var containerEl = document.getElementById('profile-container');
  if (!stateEl || !containerEl) return;

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');

  if (!id) {
    stateEl.textContent = 'No doctor specified.';
    return;
  }

  fetch('/api/doctors/' + encodeURIComponent(id))
    .then(function (r) { return r.json().then(function (data) { return { status: r.status, data: data }; }); })
    .then(function (res) {
      var data = res.data;
      if (!data.configured) {
        stateEl.innerHTML = "This profile isn't available yet while our doctor directory is being finalized. <a href=\"/getInTouch.html\">Get in touch</a> and we'll connect you directly.";
        return;
      }
      var doc = data.doctor;
      if (!doc) {
        stateEl.innerHTML = "We couldn't find that profile. <a href=\"/doctors.html\">Browse our specialists</a> or <a href=\"/getInTouch.html\">get in touch</a>.";
        return;
      }

      var name = doc.name || doc.doctorName || 'Continuia specialist';
      var specialty = doc.specialty || (Array.isArray(doc.specialist) ? doc.specialist.join(', ') : doc.specialist) || '';
      var credentials = doc.credentials || doc.qualification || '';
      var hospital = doc.hospital || doc.affiliation || '';
      var about = doc.about || doc.bio || '';
      var photo = doc.photo || doc.image || '';
      var licensed = Array.isArray(doc.licensed) ? doc.licensed : (doc.licensed ? [doc.licensed] : []);
      var boardCerts = Array.isArray(doc.boardCertifications) ? doc.boardCertifications
        : (Array.isArray(doc.education) ? doc.education.map(function (e) { return (e.title || '') + (e.subtitle ? ' — ' + e.subtitle : ''); }) : []);

      document.title = name + ' - Continuia';

      containerEl.innerHTML = [
        '<div style="display:flex;gap:28px;align-items:center;flex-wrap:wrap">',
        photo
          ? '<img src="' + esc(photo) + '" alt="' + esc(name) + '" style="width:120px;height:120px;border-radius:50%;object-fit:cover;border:3px solid var(--surface);box-shadow:0 8px 24px rgba(var(--ink-rgb),0.12)" />'
          : '<div class="doctor-photo doctor-photo-fallback" style="width:120px;height:120px;font-size:2.2rem">' + esc((name || '?').charAt(0)) + '</div>',
        '<div>',
        specialty ? '<div class="section-label teal">' + esc(specialty) + '</div>' : '',
        '<h1 class="page-title" style="margin-bottom:8px">' + esc(name) + '</h1>',
        hospital ? '<p class="page-subtitle" style="margin-bottom:0">' + esc(hospital) + '</p>' : '',
        '</div>',
        '</div>',
      ].join('');

      var sectionsHtml = [];

      if (about) {
        sectionsHtml.push([
          '<section class="section" style="padding-top:44px">',
          '<div class="container narrow">',
          '<p style="font-size:1.05rem;color:var(--text-muted);line-height:1.75">' + esc(about) + '</p>',
          '</div></section>',
        ].join(''));
      }

      if (credentials || boardCerts.length || licensed.length) {
        sectionsHtml.push([
          '<section class="section section-alt" style="padding-top:44px">',
          '<div class="container">',
          '<div class="trust-grid">',
          credentials ? '<div class="trust-card reveal"><h3>Credentials</h3><p>' + esc(credentials) + '</p></div>' : '',
          boardCerts.length ? '<div class="trust-card reveal"><h3>Board certification</h3><p>' + boardCerts.map(esc).join('<br />') + '</p></div>' : '',
          licensed.length ? '<div class="trust-card reveal"><h3>Licensed in</h3><p>' + licensed.map(esc).join(', ') + '</p></div>' : '',
          '</div></div></section>',
        ].join(''));
      }

      sectionsHtml.push([
        '<section class="section cta-section">',
        '<div class="container cta-inner">',
        '<div class="section-label">Next step</div>',
        '<h2 class="cta-title">Request a consult with ' + esc(name) + '</h2>',
        '<p class="cta-body">Tell us about the case and we\'ll route it for review, no account or portal required.</p>',
        '<div class="cta-actions"><a href="/getInTouch.html" class="btn btn-primary btn-large">Request a consult</a></div>',
        '</div></section>',
      ].join(''));

      document.querySelector('footer#site-footer').insertAdjacentHTML('beforebegin', sectionsHtml.join(''));
      stateEl.remove();
    })
    .catch(function () {
      stateEl.innerHTML = "We couldn't load this profile right now. <a href=\"/getInTouch.html\">Get in touch</a> and we'll help directly.";
    });
})();
