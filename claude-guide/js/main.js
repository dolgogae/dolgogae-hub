// ===== 사이드바 토글 (모바일) =====
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const hamburger = document.getElementById('hamburger-btn');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
}
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}
if (hamburger) hamburger.addEventListener('click', openSidebar);
if (overlay) overlay.addEventListener('click', closeSidebar);

// ===== 챕터 내부 스크롤 진행 표시줄 =====
const progressBar = document.getElementById('progress-bar');
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.transform = `scaleX(${total > 0 ? scrolled / total : 0})`;
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', scrolled > 300);
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== 코드 복사 버튼 =====
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const pre = btn.closest('.code-block')?.querySelector('pre');
    if (!pre) return;
    navigator.clipboard.writeText(pre.textContent).then(() => {
      btn.textContent = '복사됨!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = '복사'; btn.classList.remove('copied'); }, 2000);
    });
  });
});

// ===== 챕터 네비게이션 =====
const CHAPTERS = Array.from(
  document.querySelectorAll('.chapter-section[id]'),
  el => el.id
);

function getChapterName(id) {
  const link = document.querySelector(`.nav-item[href="#${id}"]`);
  if (!link) return id;
  const numEl = link.querySelector('.chapter-num');
  const fullText = link.textContent.trim();
  return numEl ? fullText.slice(numEl.textContent.length).trim() : fullText;
}

function showChapter(id) {
  const target = document.getElementById(id);
  if (!target) return;

  // 히어로 섹션 숨기기
  const hero = document.querySelector('.hero-section');
  if (hero) hero.style.display = 'none';

  // 이전 챕터 숨기기
  document.querySelectorAll('.chapter-section.active').forEach(el => el.classList.remove('active'));

  // 새 챕터 표시
  target.classList.add('active');

  // 페이지 최상단으로
  window.scrollTo({ top: 0, behavior: 'instant' });

  // 사이드바 활성 항목 업데이트
  document.querySelectorAll('.nav-item[href]').forEach(item => {
    item.classList.toggle('active', item.getAttribute('href') === '#' + id);
  });

  // 하단 prev/next 업데이트
  const idx = CHAPTERS.indexOf(id);
  const prevId = idx > 0 ? CHAPTERS[idx - 1] : null;
  const nextId = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;

  const prevBtn = document.getElementById('prev-chapter-btn');
  const nextBtn = document.getElementById('next-chapter-btn');
  const counter = document.getElementById('chapter-counter');

  const arrowLeft = `<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3L5 8l5 5"/></svg>`;
  const arrowRight = `<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l5 5-5 5"/></svg>`;

  if (prevBtn) {
    prevBtn.disabled = !prevId;
    prevBtn.innerHTML = prevId ? `${arrowLeft}<span>${getChapterName(prevId)}</span>` : '';
    if (prevId) prevBtn.onclick = () => showChapter(prevId);
  }
  if (nextBtn) {
    nextBtn.disabled = !nextId;
    nextBtn.innerHTML = nextId ? `<span>${getChapterName(nextId)}</span>${arrowRight}` : '';
    if (nextId) nextBtn.onclick = () => showChapter(nextId);
  }
  if (counter) counter.textContent = `${idx + 1}  /  ${CHAPTERS.length}`;

  // URL 해시 업데이트
  history.replaceState(null, '', '#' + id);

  // 모바일 사이드바 닫기
  if (window.innerWidth < 1024) closeSidebar();
}

// 사이드바 링크 클릭
document.querySelectorAll('.nav-item[href^="#"]').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    showChapter(item.getAttribute('href').slice(1));
  });
});

// 개요 카드 클릭
document.querySelectorAll('.overview-card[href]').forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    showChapter(card.getAttribute('href').replace('#', ''));
  });
});

// 브라우저 뒤로/앞으로
window.addEventListener('popstate', () => {
  const hash = location.hash.slice(1);
  if (CHAPTERS.includes(hash)) showChapter(hash);
  else showHome();
});

// ===== 홈(Hero) 표시 =====
const heroSection = document.querySelector('.hero-section');

function showHome() {
  document.querySelectorAll('.chapter-section.active').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  if (heroSection) heroSection.style.display = '';
  const prevBtn = document.getElementById('prev-chapter-btn');
  const nextBtn = document.getElementById('next-chapter-btn');
  const counter = document.getElementById('chapter-counter');
  if (prevBtn) { prevBtn.disabled = true; prevBtn.innerHTML = ''; }
  if (nextBtn) { nextBtn.disabled = true; nextBtn.innerHTML = ''; }
  if (counter) counter.textContent = '';
  window.scrollTo({ top: 0, behavior: 'instant' });
  history.replaceState(null, '', location.pathname);
  if (window.innerWidth < 1024) closeSidebar();
}

// 사이드바 로고 클릭 → 홈으로
const sidebarLogo = document.querySelector('.sidebar-logo');
if (sidebarLogo) {
  sidebarLogo.style.cursor = 'pointer';
  sidebarLogo.addEventListener('click', showHome);
}

// 초기 챕터 결정 (URL 해시 있으면 해당 챕터, 없으면 홈)
const initHash = location.hash.slice(1);
if (CHAPTERS.includes(initHash)) {
  showChapter(initHash);
} else {
  // 홈 상태: 히어로 표시, 챕터 숨김
  if (heroSection) heroSection.style.display = '';
}

// ===== 코드 그룹 탭 =====
function getTabLabel(langText) {
  if (!langText) return '파일';
  const dash = langText.indexOf(' — ');
  if (dash === -1) return langText;
  const desc = langText.substring(dash + 3).trim();
  const cmd = desc.match(/^(\/[\w-]+)/);
  if (cmd) return cmd[1];
  const clean = desc.replace(/\s*\([^)]*\)/, '').trim();
  return clean.length > 22 ? clean.substring(0, 20) + '…' : clean;
}

document.querySelectorAll('.code-group').forEach(group => {
  let panels = Array.from(group.querySelectorAll(':scope > .code-tab-panel'));
  if (panels.length < 2) {
    const blocks = Array.from(group.querySelectorAll(':scope > .code-block'));
    if (blocks.length < 2) return;
    panels = [];
    blocks.forEach(block => {
      const panel = document.createElement('div');
      panel.className = 'code-tab-panel';
      block.parentNode.insertBefore(panel, block);
      panel.appendChild(block);
      panels.push(panel);
    });
  }
  if (panels.length < 2) return;

  const nav = document.createElement('div');
  nav.className = 'code-group-tabs';

  panels.forEach((panel, i) => {
    const label = getTabLabel(panel.querySelector('.code-lang')?.textContent || '') || `파일 ${i + 1}`;
    const tab = document.createElement('button');
    tab.className = 'code-group-tab' + (i === 0 ? ' active' : '');
    tab.textContent = label;
    panel.classList.add('code-group-panel');
    if (i === 0) panel.classList.add('active');
    tab.addEventListener('click', () => {
      nav.querySelectorAll('.code-group-tab').forEach(t => t.classList.remove('active'));
      group.querySelectorAll(':scope > .code-group-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      panel.classList.add('active');
    });
    nav.appendChild(tab);
  });

  group.insertBefore(nav, group.firstChild);
});

// ===== 코드 전체화면 모달 =====
const codeModal = document.getElementById('code-modal');
const codeModalLang = document.getElementById('code-modal-lang');
const codeModalPre = document.getElementById('code-modal-pre');
const codeModalCopy = document.getElementById('code-modal-copy');
const codeModalClose = document.getElementById('code-modal-close');

function openCodeModal(block) {
  codeModalLang.textContent = block.querySelector('.code-lang')?.textContent || '';
  codeModalPre.textContent = block.querySelector('pre')?.textContent || '';
  codeModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  codeModalClose?.focus();
}
function closeCodeModal() {
  codeModal.classList.remove('open');
  document.body.style.overflow = '';
}

if (codeModalClose) codeModalClose.addEventListener('click', closeCodeModal);
if (codeModal) codeModal.addEventListener('click', e => { if (e.target === codeModal) closeCodeModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && codeModal?.classList.contains('open')) closeCodeModal();
});
if (codeModalCopy) {
  codeModalCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(codeModalPre.textContent).then(() => {
      codeModalCopy.textContent = '복사됨!';
      codeModalCopy.classList.add('copied');
      setTimeout(() => { codeModalCopy.textContent = '복사'; codeModalCopy.classList.remove('copied'); }, 2000);
    });
  });
}

// 모든 코드 블록에 확장 버튼 주입
const expandIcon = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6V1h5M10 1h5v5M15 10v5h-5M6 15H1v-5"/></svg>`;
document.querySelectorAll('.code-block').forEach(block => {
  const header = block.querySelector('.code-header');
  if (!header) return;
  const btn = document.createElement('button');
  btn.className = 'code-expand-btn';
  btn.title = '전체화면으로 보기';
  btn.setAttribute('aria-label', '전체화면으로 보기');
  btn.innerHTML = expandIcon;
  btn.addEventListener('click', () => openCodeModal(block));
  const copyBtn = header.querySelector('.copy-btn');
  if (copyBtn) header.insertBefore(btn, copyBtn);
  else header.appendChild(btn);
});
