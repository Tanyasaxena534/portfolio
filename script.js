// ---------- creative gallery (poster images live in the images/ folder) ----------
const WORK = [
  ['images/sky-is-changing.jpg', 'The Sky Is Changing', 'Climate awareness poster. A purple-to-pink gradient sets a calm but urgent mood; the big white headline is read first, and the sun-and-cloud shows the topic at a glance.'],
  ['images/heat-alert.jpg', 'Heat Alert', 'Heatwave safety poster. Warm orange matches the heat, the huge "42°" is the focal point, and three short tips make the action clear.'],
  ['images/rain-flood-safety.jpg', 'Rain & Flood Safety', 'Flood preparedness poster. Cool blues for rain, a bold headline, and short pill-shaped tips that are quick to scan.']
];
const gal = document.getElementById('gal');
gal.innerHTML = WORK.map(([f, t, d]) =>
  `<figure><img src="${f}" alt="${t}"><figcaption><b>${t}</b><span>${d}</span></figcaption></figure>`).join('');

// ---------- click a poster to view it larger ----------
const lb = document.getElementById('lb'), lbImg = lb.querySelector('img');
gal.addEventListener('click', e => { const fg = e.target.closest('figure'), im = fg && fg.querySelector('img'); if (im) { lbImg.src = im.src; lbImg.alt = im.alt; lb.classList.add('on'); } });
lb.onclick = () => lb.classList.remove('on');
addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('on'); });

// ---------- scroll reveal ----------
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.rv').forEach(s => io.observe(s));

// ---------- cursor glow + button glow + 3D tilt ----------
const glow = document.getElementById('glow'), hov = matchMedia('(hover:hover)').matches, calm = matchMedia('(prefers-reduced-motion:reduce)').matches;
document.addEventListener('pointermove', e => {
  glow.style.opacity = hov ? 1 : 0; glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
  const b = e.target.closest && e.target.closest('.btn');
  if (b) { const r = b.getBoundingClientRect(); b.style.setProperty('--mx', e.clientX - r.left + 'px'); b.style.setProperty('--my', e.clientY - r.top + 'px'); }
  const t = e.target.closest && e.target.closest('.tilt');
  document.querySelectorAll('.tilt').forEach(c => { if (c !== t) c.style.transform = ''; });
  if (t && hov && !calm) {
    const r = t.getBoundingClientRect();
    t.style.transform = `perspective(900px) rotateX(${(.5 - (e.clientY - r.top) / r.height) * 7}deg) rotateY(${((e.clientX - r.left) / r.width - .5) * 7}deg)`;
  }
});