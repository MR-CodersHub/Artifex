// Simulate detail.js rendering with minimal DOM stubs
const fs = require('fs');
const courseId = process.argv[2] || 'course_watercolor_light';
const postSlug = process.argv[3] || 'anatomy-without-memorization';

function makeDom(search, htmlFile) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const store = {};
  // preload elements by id found in static html
  for (const m of html.matchAll(/id="([^"]+)"/g)) store[m[1]] = { innerHTML: '' };
  const listeners = {};
  const documentStub = {
    title: '',
    getElementById: (id) => store[id] || null,
    querySelectorAll: () => [],
    addEventListener: (ev, fn) => { (listeners[ev] = listeners[ev] || []).push(fn); },
  };
  return { documentStub, store, listeners };
}

function run(search, htmlFile) {
  const { documentStub, store, listeners } = makeDom(search, htmlFile);
  const windowStub = {
    location: { search },
    ArtifexData: global.D,
  };
  global.window = windowStub;
  global.document = documentStub;
  const code = fs.readFileSync('js/detail.js', 'utf8');
  eval(code);
  (listeners['DOMContentLoaded'] || []).forEach((fn) => fn());
  return { store, title: documentStub.title };
}

// load data once
{
  const src = fs.readFileSync('js/data.js', 'utf8');
  global.window = {};
  eval(src.replace('window.ArtifexData =', 'global.D ='));
}

console.log('=== SERVICE: ' + courseId + ' ===');
try {
  const { store, title } = run('?course=' + courseId, 'pages/service-details.html');
  const hero = store['course-hero'] ? store['course-hero'].innerHTML : '';
  const h1 = (hero.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || 'NO H1';
  console.log('title: ' + title);
  console.log('hero h1: ' + h1.replace(/\s+/g, ' ').slice(0, 100));
  console.log('curriculum items: ' + ((store['curriculum'] ? store['curriculum'].innerHTML : '').match(/faq-item/g) || []).length);
  console.log('has instructor: ' + ((store['outcomes'] || { innerHTML: '' }).innerHTML.includes('Mateo Silva') || (store['outcomes'] || { innerHTML: '' }).innerHTML.includes('Elena')));
} catch (e) { console.log('SERVICE RENDER ERROR: ' + e.message); }

console.log('=== BLOG: ' + postSlug + ' ===');
try {
  const { store, title } = run('?post=' + postSlug, 'pages/blog-details.html');
  const hero = store['article-hero'] ? store['article-hero'].innerHTML : '';
  const h1 = (hero.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || 'NO H1';
  console.log('title: ' + title);
  console.log('hero h1: ' + h1.replace(/\s+/g, ' ').slice(0, 100));
  const steps = store['step-by-step-tutorial'] ? store['step-by-step-tutorial'].innerHTML : '';
  console.log('steps rendered: ' + ((steps.match(/tutorial-step-card/g) || []).length));
} catch (e) { console.log('BLOG RENDER ERROR: ' + e.message); }
