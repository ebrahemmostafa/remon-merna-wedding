import re

html_file = 'index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

replacements = [
    (r'<p class="small">The grand celebration of</p>', r'<p class="small" data-i18n="The grand celebration of">The grand celebration of</p>'),
    (r'<h3>Remon <em>&amp;</em> Merna</h3>', r'<h3 data-i18n="Remon <em>&amp;</em> Merna">Remon <em>&amp;</em> Merna</h3>'),
    (r'<span class="tap">Tap to open</span>', r'<span class="tap" data-i18n="Tap to open">Tap to open</span>'),
    (r'<span class="audio-toggle__label" id="audio-label">music</span>', r'<span class="audio-toggle__label" id="audio-label" data-i18n="music">music</span>'),
    (r'<p class="hero__eyebrow reveal" data-delay="2600">✦  Save the date  ✦</p>', r'<p class="hero__eyebrow reveal" data-delay="2600" data-i18n="✦  Save the date  ✦">✦  Save the date  ✦</p>'),
    (r'<p class="hero__subtitle reveal" data-delay="3600\">we are getting married</p>', r'<p class="hero__subtitle reveal" data-delay="3600" data-i18n="we are getting married">we are getting married</p>'),
    (r'<span class="hero__small">Sunday</span>', r'<span class="hero__small" data-i18n="Sunday">Sunday</span>'),
    (r'<span class="hero__small">Aug 2026</span>', r'<span class="hero__small" data-i18n="Aug 2026">Aug 2026</span>'),
    (r'<span class="hero__small\">Ceremony</span>', r'<span class="hero__small" data-i18n="Ceremony">Ceremony</span>'),
    (r'<span class="hero__small">in the evening</span>', r'<span class="hero__small" data-i18n="in the evening">in the evening</span>'),
    (r'<span class="hero__small">Locations</span>', r'<span class="hero__small" data-i18n="Locations">Locations</span>'),
    (r'<span class="hero__big hero__big--sm">Giza &amp; Zamalek</span>', r'<span class="hero__big hero__big--sm" data-i18n="Giza &amp; Zamalek">Giza &amp; Zamalek</span>'),
    (r'<span class="hero__small">Cairo · Egypt</span>', r'<span class="hero__small" data-i18n="Cairo · Egypt">Cairo · Egypt</span>'),
    (r'<p class="eyebrow">Two souls</p>', r'<p class="eyebrow" data-i18n="Two souls">Two souls</p>'),
    (r'<h2 class="display-h2">one journey</h2>', r'<h2 class="display-h2" data-i18n="one journey">one journey</h2>'),
    (r'<p class="eyebrow">Our story</p>', r'<p class="eyebrow" data-i18n="Our story">Our story</p>'),
    (r'<h2 class="display-h2"><span class="doodle-underline">how it began</span></h2>', r'<h2 class="display-h2"><span class="doodle-underline" data-i18n="how it began">how it began</span></h2>'),
    (r'<h3 class="display-h3" style="font-size: 2rem; line-height: 1.4;">I’ve loved you for a lifetime in my dreams, today it becomes reality</h3>', r'<h3 class="display-h3" style="font-size: 2rem; line-height: 1.4;" data-i18n="story1">I’ve loved you for a lifetime in my dreams, today it becomes reality</h3>'),
    (r'<h3 class="display-h3" style="font-size: 2rem; line-height: 1.4;">My heart had been searching for yours, long before our paths ever crossed</h3>', r'<h3 class="display-h3" style="font-size: 2rem; line-height: 1.4;" data-i18n="story2">My heart had been searching for yours, long before our paths ever crossed</h3>'),
    (r'<h3 class="display-h3" style="font-size: 2rem; line-height: 1.4;">We are choosing each other, today and every day after</h3>', r'<h3 class="display-h3" style="font-size: 2rem; line-height: 1.4;" data-i18n="story3">We are choosing each other, today and every day after</h3>'),
    (r'<p class="eyebrow eyebrow--light fade-in-up">counting every moment</p>', r'<p class="eyebrow eyebrow--light fade-in-up" data-i18n="counting every moment">counting every moment</p>'),
    (r'<h2 class="display-h2 display-h2--light fade-in-up">until forever</h2>', r'<h2 class="display-h2 display-h2--light fade-in-up" data-i18n="until forever">until forever</h2>'),
    (r'<div class="countdown__label">days</div>', r'<div class="countdown__label" data-i18n="days">days</div>'),
    (r'<div class="countdown__label">hours</div>', r'<div class="countdown__label" data-i18n="hours">hours</div>'),
    (r'<div class="countdown__label">minutes</div>', r'<div class="countdown__label" data-i18n="minutes">minutes</div>'),
    (r'<div class="countdown__label">seconds</div>', r'<div class="countdown__label" data-i18n="seconds">seconds</div>'),
    (r'<p class="eyebrow">save the date</p>', r'<p class="eyebrow" data-i18n="save the date">save the date</p>'),
    (r'<h2 class="display-h2">August 2026</h2>', r'<h2 class="display-h2" data-i18n="August 2026">August 2026</h2>'),
    (r'<div class="calendar__footer">✦ Sunday · 6:00 pm ✦</div>', r'<div class="calendar__footer" data-i18n="✦ Sunday · 6:00 pm ✦">✦ Sunday · 6:00 pm ✦</div>'),
    (r'<p class="eyebrow eyebrow--light fade-in-up">where it happens</p>', r'<p class="eyebrow eyebrow--light fade-in-up" data-i18n="where it happens">where it happens</p>'),
    (r'<h3 class="display-h3 display-h3--light">The Church</h3>', r'<h3 class="display-h3 display-h3--light" data-i18n="The Church">The Church</h3>'),
    (r'<p class="location-time">6:00 PM — 7:00 PM</p>', r'<p class="location-time" data-i18n="6:00 PM — 7:00 PM">6:00 PM — 7:00 PM</p>'),
    (r'<a href="https://goo.gl/maps/Qw4KXQR7ynRgTdPt6\?g_st=ac" target="_blank" rel="noopener noreferrer" class="btn btn--ghost">open in maps →</a>', r'<a href="https://goo.gl/maps/Qw4KXQR7ynRgTdPt6?g_st=ac" target="_blank" rel="noopener noreferrer" class="btn btn--ghost" data-i18n="open in maps →">open in maps →</a>'),
    (r'<h3 class="display-h3 display-h3--light">Wedding Hall</h3>', r'<h3 class="display-h3 display-h3--light" data-i18n="Wedding Hall">Wedding Hall</h3>'),
    (r'<p class="location-time">8:00 PM — 12:00 AM</p>', r'<p class="location-time" data-i18n="8:00 PM — 12:00 AM">8:00 PM — 12:00 AM</p>'),
    (r'<a href="https://maps.app.goo.gl/Xvzy98qbDVQPbin78\?g_st=ac" target="_blank" rel="noopener noreferrer" class="btn btn--ghost">open in maps →</a>', r'<a href="https://maps.app.goo.gl/Xvzy98qbDVQPbin78?g_st=ac" target="_blank" rel="noopener noreferrer" class="btn btn--ghost" data-i18n="open in maps →">open in maps →</a>'),
    (r'<p class="eyebrow">moments</p>', r'<p class="eyebrow" data-i18n="moments">moments</p>'),
    (r'<h2 class="display-h2">Frozen in time</h2>', r'<h2 class="display-h2" data-i18n="Frozen in time">Frozen in time</h2>'),
    (r'<p class="gallery__hint">← drag to explore →</p>', r'<p class="gallery__hint" data-i18n="← drag to explore →">← drag to explore →</p>'),
    (r'<p class="eyebrow">be with us</p>', r'<p class="eyebrow" data-i18n="be with us">be with us</p>'),
    (r'<h2 class="display-h2">Kindly reply</h2>', r'<h2 class="display-h2" data-i18n="Kindly reply">Kindly reply</h2>'),
    (r'<label>Your name</label>', r'<label data-i18n="Your name">Your name</label>'),
    (r'<label>Email</label>', r'<label data-i18n="Email">Email</label>'),
    (r'<label>Will you attend\?</label>', r'<label data-i18n="Will you attend?">Will you attend?</label>'),
    (r'<span>Joyfully accept</span>', r'<span data-i18n="Joyfully accept">Joyfully accept</span>'),
    (r'<span>Regretfully decline</span>', r'<span data-i18n="Regretfully decline">Regretfully decline</span>'),
    (r'<label>Number of guests</label>', r'<label data-i18n="Number of guests">Number of guests</label>'),
    (r'<label>A note for us</label>', r'<label data-i18n="A note for us">A note for us</label>'),
    (r'<span id="rsvp-submit-label">send rsvp</span>', r'<span id="rsvp-submit-label" data-i18n="send rsvp">send rsvp</span>'),
    (r'<h3 class="display-h3">Thank you, beautifully received\.</h3>', r'<h3 class="display-h3" data-i18n="Thank you, beautifully received.">Thank you, beautifully received.</h3>'),
    (r'<p>We can\'t wait to see you in December\.</p>', r'<p data-i18n="We can\'t wait to see you in August.">We can\'t wait to see you in August.</p>'),
    (r'<p class="eyebrow">with all our love</p>', r'<p class="eyebrow" data-i18n="with all our love">with all our love</p>'),
    (r'<h2 class="final__title">We can\'t wait<br /><span class="text-gradient-rose">to celebrate with you\.</span></h2>', r'<h2 class="final__title" data-i18n="We can\'t wait<br /><span class=\&quot;text-gradient-rose\&quot;>to celebrate with you.</span>">We can\'t wait<br /><span class="text-gradient-rose">to celebrate with you.</span></h2>'),
    (r'<p class="final__signature">Remon &amp; Merna</p>', r'<p class="final__signature" data-i18n="Remon &amp; Merna">Remon &amp; Merna</p>'),
    (r'<div class="footer__col">remon &amp; merna</div>', r'<div class="footer__col" data-i18n="remon &amp; merna">remon &amp; merna</div>'),
    (r'<div class="footer__col footer__col--center">forever, beginning august thirty</div>', r'<div class="footer__col footer__col--center" data-i18n="forever, beginning august thirty">forever, beginning august thirty</div>'),
    (r'<div class="footer__col">cairo · 2026</div>', r'<div class="footer__col" data-i18n="cairo · 2026">cairo · 2026</div>')
]

for old, new in replacements:
    html = re.sub(old, new, html)

# Also add the script file before closing body
html = html.replace('<script src="js/script.js"></script>', '<script src="js/script.js"></script>\n  <script src="js/lang.js"></script>')

# Add the language toggle button at the start of body
toggle_html = '<button id="lang-toggle-btn" class="lang-toggle-btn">العربية</button>\n  <!-- Envelope Intro -->'
html = html.replace('<!-- Envelope Intro -->', toggle_html)

# Remove the bad script at the end
html = html.replace('<script src="../invitation-language-switch.js"></script>\n', '')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Replaced successfully")
