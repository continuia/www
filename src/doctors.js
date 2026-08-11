// Doctor directory: fetches /api/doctors (proxied by functions/api to
// PUBLIC_API_BASE_URL) and renders one card per doctor. If the backend
// isn't configured yet, shows an honest state instead of empty silence.
(function () {
  var stateEl = document.getElementById('doctors-state');
  var gridEl = document.getElementById('doctors-grid');
  if (!stateEl || !gridEl) return;

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  function cardHtml(doc) {
    var id = doc.id != null ? doc.id : '';
    var name = doc.name || doc.doctorName || 'Continuia specialist';
    var specialty = doc.specialty || (Array.isArray(doc.specialist) ? doc.specialist[0] : doc.specialist) || '';
    var credentials = doc.credentials || doc.qualification || '';
    var hospital = doc.hospital || doc.affiliation || '';
    var photo = doc.photo || doc.image || '';

    return [
      '<div class="card reveal doctor-card">',
      photo
        ? '<img class="doctor-photo" src="' + esc(photo) + '" alt="' + esc(name) + '" loading="lazy" />'
        : '<div class="doctor-photo doctor-photo-fallback">' + esc((name || '?').charAt(0)) + '</div>',
      specialty ? '<div class="card-tag teal">' + esc(specialty) + '</div>' : '',
      '<h3>' + esc(name) + '</h3>',
      hospital ? '<p style="margin-bottom:6px;font-weight:600;color:var(--text-dim);font-size:14px">' + esc(hospital) + '</p>' : '',
      credentials ? '<p>' + esc(credentials) + '</p>' : '',
      '<div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap">',
      id !== '' ? '<a href="/doctorProfile.html?id=' + encodeURIComponent(id) + '" class="btn btn-ghost">View profile</a>' : '',
      '<a href="/getInTouch.html" class="btn btn-primary">Request a consult</a>',
      '</div>',
      '</div>',
    ].join('');
  }

  fetch('/api/doctors')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var doctors = data.doctors || [];
      if (!data.configured) {
        stateEl.innerHTML = "Our doctor directory is being finalized. In the meantime, tell us what you need and we'll match you to the right specialist &mdash; <a href=\"/getInTouch.html\">get in touch</a>.";
        return;
      }
      if (!doctors.length) {
        stateEl.textContent = "We're between updates to the directory. Get in touch and we'll match your case directly.";
        return;
      }
      gridEl.innerHTML = doctors.map(cardHtml).join('');
      stateEl.classList.add('hidden');
      gridEl.classList.remove('hidden');
      if (window.IntersectionObserver) {
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
          });
        }, { threshold: 0.12 });
        gridEl.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
      }
    })
    .catch(function () {
      stateEl.textContent = "We couldn't load the directory just now. Get in touch and we'll match your case directly.";
    });
})();
