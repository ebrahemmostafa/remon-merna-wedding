/* ===== Supabase RSVP integration ===== */
(function () {
  'use strict';

  var cfg = window.RSVP_SUPABASE || {};
  var tableName = cfg.table || 'rsvp_responses';
  var isConfigured = Boolean(
    cfg.url &&
    cfg.anonKey &&
    cfg.url.indexOf('YOUR_SUPABASE') === -1 &&
    cfg.anonKey.indexOf('YOUR_SUPABASE') === -1
  );
  var client = null;

  function getClient() {
    if (!isConfigured || !window.supabase) return null;
    if (!client) client = window.supabase.createClient(cfg.url, cfg.anonKey);
    return client;
  }

  function setMessage(host, text, type) {
    if (!host) return;
    host.textContent = text;
    host.className = 'form-message form-message--' + (type || 'info');
    host.hidden = false;
  }

  function getFormPayload(form) {
    var data = new FormData(form);
    var guests = parseInt(data.get('guests'), 10);
    return {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      attend: data.get('attend') === 'yes',
      guests: Number.isFinite(guests) ? guests : 1,
      note: String(data.get('note') || '').trim()
    };
  }

  function lockSubmit(btn, label, locked) {
    if (!btn || !label) return;
    btn.disabled = locked;
    label.innerHTML = locked ? '<span class="spinner"></span>sending' : 'send rsvp';
  }

  function showSuccess(form, success) {
    form.style.display = 'none';
    if (success) {
      success.hidden = false;
      requestAnimationFrame(function () { success.classList.add('show'); });
    }
  }

  function setupRsvpForm() {
    var form = document.getElementById('rsvp-form');
    var success = document.getElementById('rsvp-success');
    var btn = document.getElementById('rsvp-submit');
    var label = document.getElementById('rsvp-submit-label');
    var message = document.getElementById('rsvp-message');
    if (!form) return;

    if (!isConfigured) {
      setMessage(message, 'RSVP database is not configured yet. Add your Supabase URL and anon key in js/supabase-config.js.', 'error');
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var supabaseClient = getClient();

      if (!supabaseClient) {
        setMessage(message, 'Cannot send yet: Supabase settings are missing.', 'error');
        return;
      }

      lockSubmit(btn, label, true);
      setMessage(message, 'Sending your RSVP...', 'info');

      var payload = getFormPayload(form);
      var result = await supabaseClient.from(tableName).insert(payload);

      if (result.error) {
        lockSubmit(btn, label, false);
        setMessage(message, result.error.message || 'Could not send RSVP. Please try again.', 'error');
        return;
      }

      setMessage(message, 'RSVP received.', 'success');
      showSuccess(form, success);
    });
  }

  function formatDate(value) {
    if (!value) return '';
    return new Intl.DateTimeFormat('en', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(value));
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderRows(rows) {
    var tbody = document.getElementById('responses-body');
    var empty = document.getElementById('responses-empty');
    if (!tbody) return;

    if (!rows.length) {
      tbody.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }

    if (empty) empty.hidden = true;
    tbody.innerHTML = rows.map(function (row) {
      return '<tr>' +
        '<td>' + escapeHtml(row.name) + '</td>' +
        '<td>' + escapeHtml(row.email) + '</td>' +
        '<td><span class="status-pill status-pill--' + (row.attend ? 'yes' : 'no') + '">' + (row.attend ? 'Yes' : 'No') + '</span></td>' +
        '<td>' + escapeHtml(row.guests) + '</td>' +
        '<td>' + escapeHtml(row.note) + '</td>' +
        '<td>' + escapeHtml(formatDate(row.created_at)) + '</td>' +
      '</tr>';
    }).join('');
  }

  function renderStats(rows) {
    var total = rows.length;
    var attending = rows.filter(function (row) { return row.attend; }).length;
    var declined = rows.filter(function (row) { return !row.attend; }).length;
    var guests = rows.reduce(function (sum, row) {
      return sum + (row.attend ? Number(row.guests || 0) : 0);
    }, 0);

    var map = {
      'stat-total': total,
      'stat-attending': attending,
      'stat-declined': declined,
      'stat-guests': guests
    };

    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = map[id];
    });
  }

  function downloadCsv(rows) {
    var headers = ['name', 'email', 'attend', 'guests', 'note', 'created_at'];
    var csv = [
      headers.join(','),
      rows.map(function (row) {
        return headers.map(function (key) {
          return '"' + String(row[key] == null ? '' : row[key]).replace(/"/g, '""') + '"';
        }).join(',');
      }).join('\n')
    ].join('\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'rsvp-responses.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function setupResponsesPage() {
    var page = document.getElementById('responses-page');
    if (!page) return;

    var refresh = document.getElementById('refresh-responses');
    var exportBtn = document.getElementById('export-responses');
    var message = document.getElementById('responses-message');
    var rows = [];

    async function loadResponses() {
      var supabaseClient = getClient();
      if (!supabaseClient) {
        setMessage(message, 'Add your Supabase URL and anon key in js/supabase-config.js, then enable SELECT for this page.', 'error');
        return;
      }

      setMessage(message, 'Loading responses...', 'info');
      var result = await supabaseClient
        .from(tableName)
        .select('name,email,attend,guests,note,created_at')
        .order('created_at', { ascending: false });

      if (result.error) {
        setMessage(message, result.error.message || 'Could not load responses.', 'error');
        return;
      }

      rows = result.data || [];
      renderStats(rows);
      renderRows(rows);
      setMessage(message, 'Responses loaded.', 'success');
    }

    if (refresh) refresh.addEventListener('click', loadResponses);
    if (exportBtn) exportBtn.addEventListener('click', function () { downloadCsv(rows); });
    loadResponses();
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupRsvpForm();
    setupResponsesPage();
  });
})();
