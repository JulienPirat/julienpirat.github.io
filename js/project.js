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
  itchio: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.129 1.338C2.084 1.96.021 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.07 2.41 2.4 2.41 1.328 0 2.361-1.102 2.361-2.41 0 1.308 1.137 2.41 2.467 2.41h.024c1.33 0 2.467-1.102 2.467-2.41 0 1.308 1.033 2.41 2.361 2.41 1.33 0 2.4-1.102 2.4-2.41 0 1.308 1.106 2.41 2.436 2.41C22.78 8.43 24 7.282 24 5.98V4.95c-.02-.62-2.083-2.99-3.129-3.612C19.646.67 16.64.37 12 .37c-4.64 0-7.647.3-8.871.97zm6.93 6.623a2.729 2.729 0 01-.467.601c-.5.49-1.188.795-1.947.795a2.783 2.783 0 01-1.951-.796 2.727 2.727 0 01-.446-.59l-.001.003c-.126.222-.302.413-.484.59a2.784 2.784 0 01-1.951.796c-.092 0-.187-.026-.264-.052-.106 1.113-.151 2.177-.167 2.951v.005c-.002.393-.004.717-.006 1.167.02 2.333-.23 7.564 1.028 8.85 1.952.456 5.545.663 9.15.664h.001c3.604-.001 7.198-.208 9.15-.664 1.259-1.286 1.009-6.517 1.028-8.85-.002-.45-.004-.774-.006-1.167v-.005c-.016-.775-.061-1.838-.167-2.951a.596.596 0 01-.264.052 2.784 2.784 0 01-1.951-.796c-.182-.177-.358-.368-.485-.59l-.001-.003a2.73 2.73 0 01-.446.59 2.784 2.784 0 01-1.95.796c-.758 0-1.447-.305-1.948-.795a2.728 2.728 0 01-.467-.6 2.73 2.73 0 01-.463.6 2.784 2.784 0 01-1.951.795c-.027 0-.053-.002-.08-.003h-.001c-.026.001-.052.003-.08.003a2.784 2.784 0 01-1.95-.795 2.73 2.73 0 01-.463-.6zm-2.004 2.59h.002c.793.001 1.498 0 2.372.953.687-.072 1.406-.108 2.124-.107h.001c.718-.001 1.437.035 2.124.107.874-.954 1.58-.952 2.372-.953h.001c.375 0 1.875 0 2.92 2.934l1.123 3.999c.832 2.995-.267 3.068-1.636 3.071-2.03-.075-3.156-1.55-3.156-2.945-1.093.19-2.564.285-3.748.284h-.001c-1.183 0-2.654-.094-3.748-.284 0 1.395-1.125 2.87-3.156 2.945-1.369-.003-2.468-.076-1.636-3.071l1.122-4c1.045-2.933 2.545-2.933 2.92-2.933zm4.498 2.306c-.002.002-2.137 1.963-2.523 2.662l1.4-.056v1.22c0 .057.561.033 1.123.007h.001c.562.026 1.123.05 1.123-.008v-1.22l1.4.057c-.385-.699-2.522-2.661-2.523-2.662z"/></svg>`,
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
