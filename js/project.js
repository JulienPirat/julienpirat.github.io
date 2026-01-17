/**
 * JULIEN PIRAT - PROJECT PAGE
 * Handles individual project page rendering
 */

// ========== GLOBAL STATE ==========
let portfolioData = null;
let currentProject = null;
let currentLang = 'fr';

// ========== ICONS ==========
const ICONS = {
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  itchio: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.07 2.41 2.4 2.41 1.328 0 2.362-1.102 2.362-2.41 0 1.308 1.137 2.41 2.466 2.41h.024c1.33 0 2.466-1.102 2.466-2.41 0 1.308 1.034 2.41 2.363 2.41 1.33 0 2.4-1.102 2.4-2.41 0 1.308 1.106 2.41 2.435 2.41C22.78 8.43 24 7.282 24 5.98V4.95c-.02-.62-2.082-2.99-3.13-3.612-1.224-.67-4.23-.97-8.87-.97-4.64 0-7.647.3-8.87.97z"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', init);

async function init() {
  currentLang = localStorage.getItem('portfolioLang') || 'fr';

  const projectId = getProjectIdFromUrl();
  if (!projectId) {
    window.location.href = '../index.html#projects';
    return;
  }

  await loadData();

  currentProject = portfolioData.projects.find(p => p.id === projectId);
  if (!currentProject) {
    window.location.href = '../index.html#projects';
    return;
  }

  renderProject();
  setupLanguageToggle();
  updateUILanguage();
}

function getProjectIdFromUrl() {
  const path = window.location.pathname;
  const filename = path.split('/').pop();
  return filename.replace('.html', '');
}

// ========== DATA LOADING ==========
async function loadData() {
  try {
    const response = await fetch('../data.json');
    if (!response.ok) throw new Error('Failed to load data');
    portfolioData = await response.json();
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    window.location.href = '../index.html#projects';
  }
}

// ========== LANGUAGE FUNCTIONS ==========
function getText(obj) {
  if (typeof obj === 'string') return obj;
  if (obj && typeof obj === 'object') {
    return obj[currentLang] || obj['fr'] || obj['en'] || '';
  }
  return '';
}

function getUI(key) {
  if (portfolioData && portfolioData.ui && portfolioData.ui[currentLang]) {
    return portfolioData.ui[currentLang][key] || key;
  }
  return key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('portfolioLang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  renderProject();
  updateUILanguage();
}

function updateUILanguage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = getUI(key);
  });
  document.documentElement.lang = currentLang;
}

function setupLanguageToggle() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

// ========== RENDER PROJECT ==========
function renderProject() {
  if (!currentProject) return;

  // Update page title
  document.title = `${currentProject.name} | Julien PIRAT`;

  // Video/Media section
  const videoContainer = document.getElementById('project-video');
  if (currentProject.videoId) {
    videoContainer.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${currentProject.videoId}?rel=0&modestbranding=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
      </iframe>
    `;
  } else if (currentProject.images && currentProject.images.length > 0) {
    videoContainer.innerHTML = `<img src="../${currentProject.images[0]}" alt="${currentProject.name}">`;
  }

  // Title
  document.getElementById('project-title').textContent = currentProject.name;

  // Description
  const fullDesc = getText(currentProject.fullDescription);
  document.getElementById('project-description').innerHTML = fullDesc.split('\n\n').map(p => `<p>${p}</p>`).join('');

  // Info card
  renderInfoCard();

  // Contributions
  renderContributions();

  // Tags
  renderTags();

  // Navigation
  renderNavigation();
}

function renderInfoCard() {
  const role = getText(currentProject.role);
  const team = getText(currentProject.team);
  const duration = getText(currentProject.duration);
  const award = getText(currentProject.award);

  let infoHtml = `
    <div class="project-info-item">
      <span class="project-info-icon">${ICONS.users}</span>
      <div class="project-info-content">
        <span class="project-info-label">${getUI('team')}</span>
        <span class="project-info-value">${team}</span>
      </div>
    </div>
    <div class="project-info-item">
      <span class="project-info-icon">${ICONS.clock}</span>
      <div class="project-info-content">
        <span class="project-info-label">${getUI('duration') || (currentLang === 'fr' ? 'Duree' : 'Duration')}</span>
        <span class="project-info-value">${duration}</span>
      </div>
    </div>
    <div class="project-info-item">
      <span class="project-info-icon">${ICONS.code}</span>
      <div class="project-info-content">
        <span class="project-info-label">${getUI('technologies')}</span>
        <span class="project-info-value">${currentProject.technologies}</span>
      </div>
    </div>
    <div class="project-info-item">
      <span class="project-info-icon">${ICONS.user}</span>
      <div class="project-info-content">
        <span class="project-info-label">${getUI('role')}</span>
        <span class="project-info-value">${role}</span>
      </div>
    </div>
  `;

  if (award) {
    infoHtml += `
      <div class="project-info-item" style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; padding: 12px; margin-top: 8px;">
        <span class="project-info-icon" style="color: #f59e0b;">${ICONS.trophy}</span>
        <div class="project-info-content">
          <span class="project-info-label">${getUI('award')}</span>
          <span class="project-info-value" style="color: #f59e0b;">${award}</span>
        </div>
      </div>
    `;
  }

  // Links
  let linksHtml = '<div class="project-links">';
  if (currentProject.links) {
    if (currentProject.links.github) {
      linksHtml += `
        <a href="${currentProject.links.github}" target="_blank" rel="noopener noreferrer"
           class="project-link-btn project-link-btn--github">
          ${ICONS.github} ${getUI('viewOnGitHub')}
        </a>
      `;
    }
    if (currentProject.links.itch) {
      linksHtml += `
        <a href="${currentProject.links.itch}" target="_blank" rel="noopener noreferrer"
           class="project-link-btn project-link-btn--itch">
          ${ICONS.itchio} ${getUI('playOnItch')}
        </a>
      `;
    }
  }
  linksHtml += '</div>';

  document.getElementById('project-info').innerHTML = infoHtml + linksHtml;
}

function renderContributions() {
  const contributions = currentProject.contributions ? getText(currentProject.contributions) : [];
  const container = document.getElementById('project-contributions');

  if (Array.isArray(contributions) && contributions.length > 0) {
    container.innerHTML = `
      <h2>${getUI('contributions')}</h2>
      <div class="contributions-list">
        ${contributions.map(c => `<div class="contribution-item"><span>${c}</span></div>`).join('')}
      </div>
    `;
  } else {
    container.innerHTML = '';
  }
}

function renderTags() {
  const container = document.getElementById('project-tags');
  container.innerHTML = `
    <h2>${getUI('technologies')}</h2>
    <div class="project-tags">
      ${currentProject.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
    </div>
  `;
}

function renderNavigation() {
  const projects = portfolioData.projects;
  const currentIndex = projects.findIndex(p => p.id === currentProject.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const navContainer = document.getElementById('project-nav');

  let navHtml = `
    <a href="../index.html#projects" class="back-to-projects">
      ${ICONS.arrowLeft} ${currentLang === 'fr' ? 'Tous les projets' : 'All Projects'}
    </a>
    <div style="display: flex; gap: 1rem;">
  `;

  if (prevProject) {
    navHtml += `
      <a href="${prevProject.id}.html" class="project-nav-link">
        ${ICONS.arrowLeft} ${prevProject.name}
      </a>
    `;
  }

  if (nextProject) {
    navHtml += `
      <a href="${nextProject.id}.html" class="project-nav-link">
        ${nextProject.name} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    `;
  }

  navHtml += '</div>';
  navContainer.innerHTML = navHtml;
}
