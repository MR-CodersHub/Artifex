/**
 * Artifex Academy — Dynamic Detail Pages
 * blog-details.html?post=<slug> renders the matching journal article.
 * service-details.html?course=<id> renders the matching course.
 * No query param (or unknown value) keeps the static default content.
 */

(function () {
  const qs = new URLSearchParams(window.location.search);

  const esc = (s) => String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const BADGE = {
    'Digital Illustration': 'badge-coral',
    'Watercolor': 'badge-sage',
    'Character Design': 'badge-lavender',
    'Drawing': 'badge-peach',
    'Concept Art': 'badge-cobalt',
    'Mixed Media': 'badge-lavender'
  };

  const CATEGORY_COURSE = {
    'Digital Illustration': 'course_digital_mastery',
    'Watercolor': 'course_watercolor_light',
    'Character Design': 'course_character_story',
    'Drawing': 'course_figure_anatomy',
    'Concept Art': 'course_concept_env',
    'Mixed Media': 'course_mixed_media'
  };

  const PILLAR_BADGES = ['badge-coral', 'badge-cobalt', 'badge-sage', 'badge-lavender', 'badge-peach', 'badge-cobalt'];

  function splitTitle(title) {
    const i = String(title).indexOf(':');
    if (i < 0) return [title, ''];
    return [title.slice(0, i).trim(), title.slice(i + 1).trim()];
  }

  function instructorByName(name) {
    return (window.ArtifexData.instructors || []).find((x) => x.name === name) || null;
  }

  /* ---------------- BLOG DETAILS ---------------- */

  function initBlogDetails() {
    if (!document.getElementById('article-hero')) return;
    const posts = window.ArtifexData.blogArticles || [];
    if (!posts.length) return;
    const slug = qs.get('post');
    const post = posts.find((p) => p.slug === slug);
    // Default (first) post keeps the hand-written static content.
    if (!post || post === posts[0]) return;

    const [t1, t2] = splitTitle(post.title);
    const inst = instructorByName(post.author);
    const role = inst ? inst.specialty : 'Artifex Faculty';
    const badge = BADGE[post.category] || 'badge-coral';
    const courseId = CATEGORY_COURSE[post.category] || 'course_digital_mastery';
    const course = (window.ArtifexData.courses || []).find((c) => c.id === courseId);

    document.title = `${post.title} — Artifex Academy Journal`;

    // 1. Hero
    document.getElementById('article-hero').innerHTML = `
      <div class="container-narrow" style="text-align:center;">
        <div style="display:flex;align-items:center;justify-content:center;gap:0.75rem;margin-bottom:1.5rem;">
          <span class="badge ${badge}">${esc(post.category)}</span>
          <span style="font-size:0.85rem;color:var(--text-muted);">Published ${esc(post.date)} • ${esc(post.readTime)}</span>
        </div>
        <h1 style="font-size:clamp(2.4rem, 4.5vw, 3.8rem);margin-bottom:1.5rem;line-height:1.2;">
          ${esc(t1)}${t2 ? `<br><span class="font-serif">${esc(t2)}</span>` : ''}
        </h1>
        <div style="display:inline-flex;align-items:center;gap:1rem;margin-bottom:2.5rem;padding:0.5rem 1rem;background:var(--bg-surface);border:1px solid var(--border-light);border-radius:var(--radius-full);">
          <img src="${esc(post.authorAvatar)}" style="width:40px;height:40px;border-radius:14px;object-fit:cover;object-position:center top;" alt="${esc(post.author)}">
          <div style="text-align:left;">
            <strong style="font-size:0.9rem;display:block;">${esc(post.author)}</strong>
            <span style="font-size:0.75rem;color:var(--text-muted);">${esc(role)} • Artifex Faculty</span>
          </div>
        </div>
        <div class="hero-image-frame" style="aspect-ratio:16/9;border-radius:var(--radius-xl);max-height:500px;">
          <img src="${esc(post.image)}" alt="${esc(post.title)}">
        </div>
      </div>`;

    // 2. Intro (excerpt-driven, always truthful to data)
    const firstStep = (post.tutorialSteps || [])[0];
    document.getElementById('article-intro').innerHTML = `
      <div class="container-narrow">
        <div class="editorial-article">
          <p class="lead" style="font-weight:600;color:var(--text-primary);font-size:1.35rem;margin-bottom:2rem;line-height:1.6;">
            ${esc(post.excerpt)}
          </p>
          <p>
            In this ${esc(post.readTime)} guide, ${esc(post.author)} breaks the technique into practical studio exercises
            you can try at your easel today — no advanced setup required, just deliberate observation and a willingness to iterate.
          </p>
          ${firstStep ? `
          <div class="editorial-callout">
            <strong style="display:block;font-size:1.1rem;margin-bottom:0.5rem;color:var(--color-lavender);">Key Takeaway:</strong>
            ${esc(firstStep.title)} — ${esc(firstStep.desc)}
          </div>` : ''}
        </div>
      </div>`;

    // 3. Key concepts from tutorial steps
    const steps = post.tutorialSteps || [];
    document.getElementById('article-content').innerHTML = `
      <div class="container-narrow">
        <div class="editorial-article">
          <h2>Key Concepts Covered</h2>
          <p>Core ideas explored across this ${esc(post.readTime)} guide to ${esc(post.category.toLowerCase())}.</p>
          <div class="features-grid" style="grid-template-columns:1fr 1fr;margin-block:2rem;">
            ${steps.map((s, i) => `
              <div class="feature-box">
                <strong style="color:var(--color-coral);display:block;margin-bottom:0.35rem;">${i + 1}. ${esc(s.title)}</strong>
                <p style="font-size:0.9rem;">${esc(s.desc)}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>`;

    // 4. Exercise routine from steps
    document.getElementById('step-by-step-tutorial').innerHTML = `
      <div class="container-narrow">
        <div class="section-header">
          <span class="section-tag section-tag--coral">Studio Exercise</span>
          <h2>Hands-On Exercise Routine</h2>
          <p class="section-subtitle">Follow this exercise on your current work in progress.</p>
        </div>
        <div>
          ${steps.map((s) => `
            <div class="tutorial-step-card">
              <div class="tutorial-step-num">${s.step}</div>
              <div>
                <h3 style="font-size:1.25rem;margin-bottom:0.5rem;">${esc(s.title)}</h3>
                <p style="font-size:0.95rem;color:var(--text-secondary);">${esc(s.desc)}</p>
              </div>
            </div>`).join('')}
        </div>
      </div>`;

    // 5. Related: fetched live from the existing blog listing page
    renderRelatedFromBlogPage(post);

    // 6. Course pairing CTA
    if (course) {
      document.getElementById('course-recommendation-cta').innerHTML = `
        <div class="container" style="text-align:center;max-width:800px;">
          <span class="badge badge-coral" style="margin-bottom:1.5rem;">Recommended Course Pairing</span>
          <h2 style="color:#FFFFFF;margin-bottom:1.25rem;">
            Put ${esc(post.category)} Into Practice with ${esc(post.author)}
          </h2>
          <p style="color:#B8BCCB;font-size:1.15rem;margin-bottom:2.5rem;line-height:1.7;">
            ${esc(course.description)} Enroll now to receive live draw-over feedback on your work.
          </p>
          <div style="display:flex;align-items:center;justify-content:center;gap:1.25rem;flex-wrap:wrap;">
            <a href="service-details.html?course=${esc(course.id)}" class="btn btn-coral btn-lg">
              <span>Explore ${esc(course.shortTitle)}</span>
              <span class="icon-arrow">→</span>
            </a>
            <a href="pricing.html" class="btn btn-outline btn-lg" style="color:#FFFFFF;border-color:rgba(255,255,255,0.25);">
              <span>View All-Access Membership</span>
            </a>
          </div>
        </div>`;
    }
  }

  /* Fetch related guides from the live blog listing page (blog.html).
     Falls back to data.js entries when fetch is unavailable (e.g. file://). */
  async function renderRelatedFromBlogPage(post) {
    const host = document.getElementById('related-articles');
    if (!host) return;
    const posts = window.ArtifexData.blogArticles || [];

    const paint = (items) => {
      host.innerHTML = `
        <div class="container">
          <div class="section-header section-header--center">
            <span class="section-tag section-tag--cobalt">Further Reading</span>
            <h2>Related Masterclass Guides</h2>
          </div>
          <div class="courses-grid">
            ${items.map((r) => `
              <div class="card">
                <div class="card-media">
                  <img src="${esc(r.image)}" alt="${esc(r.title)}" loading="lazy">
                </div>
                <div class="card-body">
                  <span class="badge ${BADGE[r.category] || 'badge-coral'}" style="align-self:flex-start;margin-bottom:0.5rem;">${esc(r.category)}</span>
                  <h4 style="font-size:1.15rem;margin-bottom:0.5rem;">${esc(r.title)}</h4>
                  <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:1rem;">${esc(r.excerpt)}</p>
                  <a href="${esc(r.href)}" class="btn btn-sm btn-outline">Read Guide →</a>
                </div>
              </div>`).join('')}
          </div>
        </div>`;
    };

    const fallback = () => {
      const others = posts.filter((p) => p !== post);
      others.sort((a, b) => (b.category === post.category) - (a.category === post.category));
      paint(others.slice(0, 3).map((r) => ({
        image: r.image, title: r.title, category: r.category,
        excerpt: r.excerpt, href: `blog-details.html?post=${r.slug}`,
      })));
    };

    try {
      const res = await fetch('blog.html', { credentials: 'same-origin' });
      if (!res.ok) throw new Error('blog page unavailable');
      const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
      const cards = [...doc.querySelectorAll('.card')].map((card) => {
        const link = card.querySelector('a[href*="blog-details"]');
        const img = card.querySelector('.card-media img');
        const badge = card.querySelector('.badge');
        const title = card.querySelector('h3, h4');
        const desc = card.querySelector('.card-body p, p');
        if (!link || !title || !img) return null;
        return {
          image: img ? img.getAttribute('src') : '',
          title: title.textContent.trim(),
          category: badge ? badge.textContent.trim() : 'Journal',
          excerpt: desc ? desc.textContent.trim().slice(0, 140) : '',
          href: link.getAttribute('href'),
        };
      }).filter(Boolean).filter((r) => r.href !== `blog-details.html?post=${post.slug}` && !r.href.endsWith('blog-details.html'));
      if (cards.length < 3) throw new Error('not enough cards');
      // Prefer same-category guides first
      cards.sort((a, b) => (b.category === post.category) - (a.category === post.category));
      paint(cards.slice(0, 3));
    } catch (err) {
      console.warn('related fetch skipped, using catalog', err);
      fallback();
    }
  }

  /* ---------------- SERVICE DETAILS ---------------- */

  function lessonStatus(les) {
    if (les.locked) {
      return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="11" width="17" height="10" rx="2"/><path d="M7.5 11V7a4.5 4.5 0 0 1 9 0v4"/></svg> Locked';
    }
    if (les.completed) return '<span style="color:var(--status-success);">Completed</span>';
    if (les.current) return '<span style="color:var(--color-coral);font-weight:700;">In Progress</span>';
    return '<span style="color:var(--text-muted);">Available</span>';
  }

  function initServiceDetails() {
    if (!document.getElementById('course-hero')) return;
    const courses = window.ArtifexData.courses || [];
    if (!courses.length) return;
    const id = qs.get('course');
    const course = courses.find((c) => c.id === id);
    // Default (flagship) course keeps the hand-written static content.
    if (!course || course === courses[0]) return;

    const [t1, t2] = splitTitle(course.title);
    document.title = `${course.shortTitle} — Artifex Academy Courses`;

    // 1. Hero
    document.getElementById('course-hero').innerHTML = `
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="hero-badge-row">
            <span class="badge badge-coral">${esc(course.badge)}</span>
            <span class="badge badge-cobalt">${esc(course.skillLevel)} Track</span>
          </div>
          <h1 class="hero-title" style="font-size:clamp(2.2rem, 4.2vw, 3.5rem);">
            ${esc(t1)}${t2 ? `: <span class="font-serif">${esc(t2)}.</span>` : '.'}
          </h1>
          <p class="hero-desc">${esc(course.description)}</p>
          <div style="display:flex;align-items:center;gap:1.5rem;margin-bottom:2rem;flex-wrap:wrap;">
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <img src="${esc(course.instructorAvatar)}" style="width:48px;height:48px;border-radius:14px;object-fit:cover;object-position:center top;" alt="${esc(course.instructorName)}">
              <div>
                <strong style="font-size:0.95rem;display:block;">${esc(course.instructorName)}</strong>
                <span style="font-size:0.8rem;color:var(--text-muted);">${esc(course.instructorRole)}</span>
              </div>
            </div>
            <div style="border-left:1px solid var(--border-medium);padding-left:1.5rem;">
              <span style="font-size:0.8rem;color:var(--text-muted);display:block;">Duration &amp; Lessons</span>
              <strong style="font-size:0.95rem;">${esc(course.duration)} • ${esc(course.lessonsCount)} Lessons (${esc(course.studentsCount.toLocaleString())} enrolled)</strong>
            </div>
          </div>
          <div class="hero-cta-group">
            <a href="student-dashboard.html" class="btn btn-coral btn-lg">
              <span>Enroll Now — Start Learning</span>
              <span class="icon-arrow">→</span>
            </a>
            <a href="#curriculum" class="btn btn-outline btn-lg">
              <span>View Course Modules</span>
            </a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-image-frame">
            <img src="${esc(course.coverImage)}" alt="${esc(course.shortTitle)}">
          </div>
        </div>
      </div>`;

    // 2. Pillars from learning outcomes
    const outcomes = course.learningOutcomes || [];
    document.getElementById('what-you-learn').innerHTML = `
      <div class="container">
        <div class="section-header section-header--center">
          <span class="section-tag section-tag--coral">Syllabus Highlights</span>
          <h2>What You Will Master in This Course</h2>
          <p class="section-subtitle">
            A deep-dive, no-fluff curriculum crafted to eliminate ambiguity from your ${esc(course.medium.toLowerCase())} workflow.
          </p>
        </div>
        <div class="features-grid">
          ${outcomes.slice(0, 6).map((o, i) => `
            <div class="feature-box">
              <span class="badge ${PILLAR_BADGES[i % PILLAR_BADGES.length]}">Pillar ${i + 1}</span>
              <p style="margin-top:0.75rem;">${esc(o)}</p>
            </div>`).join('')}
        </div>
      </div>`;

    // 3. Curriculum: real modules when present, syllabus outline otherwise
    const mods = Array.isArray(course.modules) ? course.modules : [];
    const curriculumHtml = mods.length
      ? mods.map((mod, i) => `
        <div class="faq-item${i === 0 ? ' open' : ''}">
          <button class="faq-question">
            <span>Module ${mod.number}: ${esc(mod.title)} (${mod.lessons.length} Lessons • ${esc(mod.duration)})</span>
            <span class="faq-toggle-icon">+</span>
          </button>
          <div class="faq-answer">
            <p style="margin-bottom:0.75rem;font-size:0.9rem;color:var(--text-secondary);">${esc(mod.description || '')}</p>
            <ul style="font-size:0.85rem;color:var(--text-muted);display:flex;flex-direction:column;gap:0.4rem;padding-left:1.25rem;">
              ${mod.lessons.map((les) => `<li>${esc(les.title)} (${esc(les.duration)}) • ${lessonStatus(les)}</li>`).join('')}
            </ul>
          </div>
        </div>`).join('')
      : outcomes.map((o, i) => `
        <div class="faq-item${i === 0 ? ' open' : ''}">
          <button class="faq-question">
            <span>Module ${i + 1}: Core ${esc(course.medium)} Milestone</span>
            <span class="faq-toggle-icon">+</span>
          </button>
          <div class="faq-answer">
            <p style="margin-bottom:0.75rem;font-size:0.9rem;color:var(--text-secondary);">${esc(o)}</p>
            <p style="font-size:0.85rem;color:var(--text-muted);">Video lessons, studio demonstrations &amp; a graded assignment included.</p>
          </div>
        </div>`).join('');
    document.getElementById('curriculum').innerHTML = `
      <div class="container">
        <div class="section-header section-header--center">
          <span class="section-tag section-tag--cobalt">Curriculum Breakdown</span>
          <h2>The ${mods.length || outcomes.length} Course Modules</h2>
          <p class="section-subtitle">
            Every module includes video demonstrations, downloadable brushes &amp; references, and a required practical assignment.
          </p>
        </div>
        <div class="faq-accordion">${curriculumHtml}</div>
      </div>`;

    // 3b. Bind accordion toggles for injected curriculum items
    // (pages.js binds on load before this render runs)
    document.querySelectorAll('#curriculum .faq-item').forEach((item) => {
      const btn = item.querySelector('.faq-question');
      if (!btn || btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('#curriculum .faq-item').forEach((o) => o.classList.remove('open'));
        item.classList.toggle('open', !wasOpen);
      });
    });

    // 4. Assignments from modules (or outcomes fallback)
    const assignCards = (mods.length ? mods.slice(0, 3) : []).map((mod, i) => `
      <div class="card" style="padding:2rem;">
        <span class="badge ${PILLAR_BADGES[i % PILLAR_BADGES.length]}" style="margin-bottom:0.75rem;">Assignment 0${i + 1}</span>
        <h3 style="font-size:1.25rem;margin-bottom:0.5rem;">Module ${mod.number} Checkpoint</h3>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:1rem;">${esc(mod.description || '')}</p>
        <span style="font-size:0.8rem;color:var(--text-muted);display:block;">Objective: Complete all ${mod.lessons.length} lessons in this module</span>
      </div>`).join('') || outcomes.slice(0, 3).map((o, i) => `
      <div class="card" style="padding:2rem;">
        <span class="badge ${PILLAR_BADGES[i % PILLAR_BADGES.length]}" style="margin-bottom:0.75rem;">Assignment 0${i + 1}</span>
        <h3 style="font-size:1.25rem;margin-bottom:0.5rem;">Practical ${i + 1}: ${esc(course.medium)} Study</h3>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:1rem;">${esc(o)}</p>
        <span style="font-size:0.8rem;color:var(--text-muted);display:block;">Objective: Submit for instructor critique</span>
      </div>`).join('');
    document.getElementById('assignments-projects').innerHTML = `
      <div class="container">
        <div class="section-header section-header--center">
          <span class="section-tag section-tag--sage">Hands-on Application</span>
          <h2>Assignments &amp; Final Portfolio Project</h2>
          <p class="section-subtitle">
            Theory without practice is forgotten. Each assignment simulates genuine studio creative briefs with submission criteria.
          </p>
        </div>
        <div class="courses-grid">${assignCards}</div>
      </div>`;

    // 5. Outcomes with real instructor bio
    const inst = (window.ArtifexData.instructors || []).find((x) => x.name === course.instructorName);
    document.getElementById('outcomes').innerHTML = `
      <div class="container hero-grid">
        <div class="hero-content">
          <span class="section-tag section-tag--lavender">Mentorship &amp; Results</span>
          <h2 style="font-size:2.5rem;margin-bottom:1rem;">Meet Your Instructor &amp; Expected Outcomes</h2>
          <p style="font-size:1.05rem;color:var(--text-secondary);margin-bottom:1.5rem;">
            ${inst ? esc(inst.bio) : `${esc(course.instructorName)} brings professional studio rigor to every lesson.`}
          </p>
          <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1.5rem;margin-bottom:2rem;">
            <h4 style="font-size:1.1rem;margin-bottom:0.75rem;color:var(--color-coral);">What You Will Graduate With:</h4>
            <ul style="font-size:0.9rem;color:var(--text-secondary);padding-left:1.25rem;display:flex;flex-direction:column;gap:0.5rem;">
              ${outcomes.slice(0, 4).map((o) => `<li>${esc(o)}</li>`).join('')}
            </ul>
          </div>
          <a href="student-dashboard.html" class="btn btn-coral">Enter Learning Environment →</a>
        </div>
        <div class="hero-visual">
          <div class="card" style="overflow:hidden;">
            <div class="card-media" style="aspect-ratio:16/11;">
              <img src="${esc(course.instructorAvatar)}" alt="${esc(course.instructorName)}">
            </div>
            <div class="card-body">
              <span class="badge badge-sage" style="align-self:flex-start;margin-bottom:0.5rem;">Your Mentor</span>
              <h4 style="font-size:1.15rem;margin-bottom:0.25rem;">${esc(course.instructorName)}</h4>
              <p style="font-size:0.85rem;color:var(--text-muted);">${esc(course.instructorRole)}</p>
            </div>
          </div>
        </div>
      </div>`;

    // 6. FAQ: instructor-aware answers
    const faq = document.getElementById('faq-enroll');
    if (faq) {
      const answers = faq.querySelectorAll('.faq-answer');
      if (answers[0]) {
        const tools = Array.isArray(course.materialsNeeded) && course.materialsNeeded.length
          ? ` Any pressure-sensitive tablet and ${esc(course.medium.toLowerCase())} toolkit listed in your course resources (${esc(course.materialsNeeded.join('; '))}).`
          : ` Gather the core ${esc(course.medium.toLowerCase())} toolkit listed in your course resources before Module 1.`;
        answers[0].innerHTML = `This ${esc(course.skillLevel.toLowerCase())}-level ${esc(course.medium.toLowerCase())} course runs ${esc(course.duration)}.${tools} All techniques translate across apps and materials.`;
      }
      if (answers[1]) {
        answers[1].innerHTML = `Students submit assignments directly in the Student Dashboard. ${esc(course.instructorName)} and dedicated studio mentors record visual draw-overs and provide detailed written pointers within 48–72 hours.`;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    try { initBlogDetails(); } catch (err) { console.warn('blog details render skipped', err); }
    try { initServiceDetails(); } catch (err) { console.warn('service details render skipped', err); }
  });
})();
