// ── Live Location Tracker ── tracker.js ──

let locations = JSON.parse(localStorage.getItem('llt_locations') || '[]');

function save() {
  localStorage.setItem('llt_locations', JSON.stringify(locations));
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

function setGeoStatus(msg, type = '') {
  const el = document.getElementById('geoStatus');
  el.textContent = msg;
  el.className = 'geo-status ' + type;
}

function clearForm() {
  ['city','area','pincode','country','phone','label'].forEach(id => {
    document.getElementById(id).value = '';
  });
  setGeoStatus('');
}

function addLocation() {
  const city    = document.getElementById('city').value.trim();
  const area    = document.getElementById('area').value.trim();
  const pincode = document.getElementById('pincode').value.trim();
  const country = document.getElementById('country').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const label   = document.getElementById('label').value.trim();

  if (!city && !area) {
    showToast('⚠ Please enter at least a City or Area.');
    return;
  }

  const entry = {
    id: Date.now(),
    city, area, pincode, country, phone,
    label: label || 'Unknown',
    timestamp: new Date().toLocaleString(),
    lat: null, lng: null
  };

  locations.unshift(entry);
  save();
  render();
  clearForm();
  showToast('✔ Location added!');
}

function deleteLocation(id) {
  locations = locations.filter(l => l.id !== id);
  save();
  render();
  showToast('🗑 Location removed.');
}

function autoDetect() {
  if (!navigator.geolocation) {
    setGeoStatus('Geolocation not supported by your browser.', 'error');
    return;
  }

  setGeoStatus('⏳ Detecting your location…', 'loading');

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;
      setGeoStatus(`📌 Coordinates: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`, 'loading');

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();
        const addr = data.address || {};

        document.getElementById('city').value    = addr.city || addr.town || addr.village || '';
        document.getElementById('area').value    = addr.suburb || addr.neighbourhood || addr.county || '';
        document.getElementById('pincode').value = addr.postcode || '';
        document.getElementById('country').value = addr.country || '';

        setGeoStatus(`✅ Location detected! Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`);
      } catch {
        setGeoStatus(`✅ GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)} (reverse geocode failed)`);
      }
    },
    (err) => {
      const msgs = {
        1: 'Permission denied. Please allow location access.',
        2: 'Position unavailable. Try again.',
        3: 'Request timed out.'
      };
      setGeoStatus('❌ ' + (msgs[err.code] || 'Unknown error'), 'error');
    },
    { timeout: 10000, maximumAge: 0 }
  );
}

function render() {
  const grid  = document.getElementById('locationGrid');
  const badge = document.getElementById('countBadge');
  const empty = document.getElementById('emptyState');

  badge.textContent = locations.length + (locations.length === 1 ? ' entry' : ' entries');

  if (locations.length === 0) {
    grid.innerHTML = '';
    grid.appendChild(createEmptyState());
    return;
  }

  grid.innerHTML = locations.map(loc => `
    <div class="loc-card">
      <div class="card-pin">📍</div>
      <div class="loc-name">${esc(loc.label)}</div>
      <div class="loc-area">${[loc.area, loc.city].filter(Boolean).join(', ') || '—'}</div>
      <div class="loc-tags">
        ${loc.country  ? `<span class="tag">🌐 ${esc(loc.country)}</span>`  : ''}
        ${loc.pincode  ? `<span class="tag">📮 ${esc(loc.pincode)}</span>`  : ''}
      </div>
      <div class="loc-footer">
        <div class="loc-phone">
          ${loc.phone ? `📞 ${esc(loc.phone)}` : '<span style="color:var(--muted)">No phone</span>'}
        </div>
        <button class="btn-del" onclick="deleteLocation(${loc.id})" title="Delete">🗑</button>
      </div>
      <div class="loc-time">${loc.timestamp}</div>
    </div>
  `).join('');
}

function createEmptyState() {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.id = 'emptyState';
  div.innerHTML = '<div class="icon">🗺️</div><p>No locations tracked yet.<br/>Add one above to get started.</p>';
  return div;
}

function esc(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

// Init
render();