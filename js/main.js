/**
 * JULIEN PIRAT - PORTFOLIO
 * Main JavaScript Module
 * Handles: Data loading, card generation, filtering, modal interactions
 */

// ========== GLOBAL STATE ==========
let portfolioData = null;
let currentFilter = 'all';
let allItems = [];

// ========== DOM ELEMENTS ==========
const DOM = {
  projectsGrid: null,
  systemsGrid: null,
  filterContainer: null,
  modal: null,
  modalOverlay: null,
  modalContent: null,
  scrollTopBtn: null,
  loadingEl: null
};

// ========== ICONS ==========
const ICONS = {
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  rocket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  graduationCap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  cog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  gamepad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  arrowUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
  itchio: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.07 2.41 2.4 2.41 1.328 0 2.362-1.102 2.362-2.41 0 1.308 1.137 2.41 2.466 2.41h.024c1.33 0 2.466-1.102 2.466-2.41 0 1.308 1.034 2.41 2.363 2.41 1.33 0 2.4-1.102 2.4-2.41 0 1.308 1.106 2.41 2.435 2.41C22.78 8.43 24 7.282 24 5.98V4.95c-.02-.62-2.082-2.99-3.13-3.612-1.224-.67-4.23-.97-8.87-.97-4.64 0-7.647.3-8.87.97zm12.04 7.162c-.463.463-.97.752-1.637.89-1.26.27-2.387-.076-3.166-.674a4.083 4.083 0 01-1.178.674 3.527 3.527 0 01-1.988.188 4.197 4.197 0 01-1.652-.864c-.474.4-.994.702-1.647.864a3.55 3.55 0 01-1.988-.188c-.32-.126-.605-.29-.867-.476-.13.094-.265.18-.407.26-.16.63-.295 1.48-.36 2.57-.016.27-.058 2.463-.058 2.963v1.85c-.02 2.174 2.38 5.472 4.52 5.97 2.42.563 4.12.04 5.37-.5 1.25.54 2.95 1.063 5.37.5 2.14-.5 4.54-3.796 4.52-5.97v-1.85c0-.5-.042-2.694-.057-2.963-.066-1.09-.2-1.94-.362-2.57a4.007 4.007 0 01-.406-.26c-.262.187-.547.35-.867.476a3.55 3.55 0 01-1.988.188c-.652-.162-1.173-.465-1.647-.864a4.2 4.2 0 01-1.652.864c-.683.143-1.35.076-1.988-.188a4.083 4.083 0 01-1.178-.674c-.318.257-.67.476-1.048.635.26.147.454.394.534.698.117.452.115 1.24-.178 1.98-.297.752-.792 1.236-1.275 1.432-.78.316-1.508-.04-1.887-.423-.4-.405-.535-.9-.535-1.303 0-.68.445-1.25.92-1.594.35-.253.74-.413 1.168-.478a4.397 4.397 0 00-.178-.106c-.45-.24-.862-.378-1.29-.417-.18.04-.37.055-.564.043-.38-.03-.65-.203-.98-.44-.02.01-.038.02-.057.03-.18.1-.35.188-.512.266.014.01.028.018.042.028.57.416 1.19 1.175 1.19 2.312 0 .612-.207 1.282-.77 1.853-.54.546-1.358.88-2.283.88-.927 0-1.745-.334-2.285-.88-.563-.57-.77-1.24-.77-1.853 0-1.137.62-1.896 1.19-2.312l.044-.03c-.16-.077-.33-.164-.51-.264a1.85 1.85 0 01-.06-.032c-.33.238-.6.41-.98.44-.194.013-.384-.002-.563-.042-.428.04-.84.176-1.29.417-.064.034-.123.07-.18.106.43.066.82.226 1.168.48.476.343.92.912.92 1.593 0 .404-.135.898-.535 1.303-.38.384-1.108.74-1.887.424-.484-.197-.978-.68-1.276-1.432-.293-.74-.295-1.527-.178-1.98.08-.303.275-.55.534-.697a4.098 4.098 0 01-1.047-.634c-.638.36-1.306.578-1.988.76a6.24 6.24 0 00-.406 2.283v.01c.024 1.726 1.022 3.085 2.55 3.69 1.058.42 2.37.564 4.004.437.043-.003.085-.006.127-.01 1.398-.104 2.87-.522 4.076-1.163a9.63 9.63 0 004.076 1.164c.043.003.085.006.128.01 1.633.126 2.945-.018 4.004-.437 1.527-.605 2.525-1.964 2.55-3.69v-.01a6.24 6.24 0 00-.407-2.282z"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  externalLink: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  brain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54"/></svg>`,
  wrench: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
};

// ========== CATEGORY ICON MAPPING ==========
const categoryIcons = {
  'grid': ICONS.grid,
  'rocket': ICONS.rocket,
  'trophy': ICONS.trophy,
  'award': ICONS.award,
  'graduation-cap': ICONS.graduationCap,
  'code': ICONS.code,
  'cog': ICONS.cog
};

// ========== SYSTEM ICON MAPPING ==========
const systemIcons = {
  'AI Systems': ICONS.brain,
  'Performance': ICONS.cpu,
  'Debug Tools': ICONS.wrench
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', init);

async function init() {
  cacheDOM();
  await loadData();
  generateFilters();
  generateCards();
  setupEventListeners();
  setupScrollEffects();
  hideLoading();
}

function cacheDOM() {
  DOM.projectsGrid = document.getElementById('projects-grid');
  DOM.systemsGrid = document.getElementById('systems-grid');
  DOM.filterContainer = document.getElementById('filter-container');
  DOM.modal = document.getElementById('modal');
  DOM.modalOverlay = document.getElementById('modal-overlay');
  DOM.modalContent = document.getElementById('modal-content');
  DOM.scrollTopBtn = document.getElementById('scroll-top');
  DOM.loadingEl = document.getElementById('loading');
}

// ========== DATA LOADING ==========
async function loadData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Failed to load data');
    portfolioData = await response.json();

    // Combine projects and systems for unified filtering
    allItems = [
      ...portfolioData.projects.map(p => ({ ...p, type: 'project' })),
      ...portfolioData.systems.map(s => ({ ...s, type: 'system' }))
    ];
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    showError('Failed to load portfolio data. Please refresh the page.');
  }
}

function hideLoading() {
  if (DOM.loadingEl) {
    DOM.loadingEl.style.display = 'none';
  }
}

function showError(message) {
  const errorEl = document.createElement('div');
  errorEl.className = 'error-message';
  errorEl.textContent = message;
  document.body.appendChild(errorEl);
}

// ========== FILTER GENERATION ==========
function generateFilters() {
  if (!DOM.filterContainer || !portfolioData) return;

  const filters = portfolioData.categories.map(cat => {
    const icon = categoryIcons[cat.icon] || ICONS.grid;
    return `
      <button class="filter-btn ${cat.id === 'all' ? 'active' : ''}"
              data-filter="${cat.id}"
              aria-label="Filter by ${cat.name}">
        ${icon}
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');

  DOM.filterContainer.innerHTML = filters;
}

// ========== CARD GENERATION ==========
function generateCards() {
  generateProjectCards();
  generateSystemCards();
}

function generateProjectCards() {
  if (!DOM.projectsGrid || !portfolioData) return;

  const cards = portfolioData.projects.map((project, index) => {
    const imageHtml = project.images && project.images.length > 0
      ? `<img src="${project.images[0]}" alt="${project.name}" loading="lazy">`
      : `<div class="project-card-placeholder">${ICONS.gamepad}</div>`;

    const awardHtml = project.award
      ? `<span class="project-card-award">${ICONS.trophy} ${project.award}</span>`
      : '';

    const tagsHtml = project.tags.slice(0, 4).map(tag =>
      `<span class="project-tag">${tag}</span>`
    ).join('');

    return `
      <article class="project-card animate-fade-in-up animate-delay-${(index % 4) + 1}"
               data-id="${project.id}"
               data-category="${project.category.toLowerCase().replace(/\s+/g, '-')}"
               data-type="project"
               role="button"
               tabindex="0"
               aria-label="View ${project.name} details">
        <div class="project-card-image">
          ${imageHtml}
          <span class="project-card-badge">${project.category}</span>
          ${awardHtml}
        </div>
        <div class="project-card-content">
          <h3 class="project-card-title">${project.name}</h3>
          <p class="project-card-description">${project.shortDescription}</p>
          <div class="project-card-tags">${tagsHtml}</div>
          <div class="project-card-footer">
            <div class="project-card-meta">
              ${ICONS.calendar}
              <span>${project.date}</span>
            </div>
            <span class="project-card-action">
              View Details ${ICONS.arrowRight}
            </span>
          </div>
        </div>
      </article>
    `;
  }).join('');

  DOM.projectsGrid.innerHTML = cards;
}

function generateSystemCards() {
  if (!DOM.systemsGrid || !portfolioData) return;

  const cards = portfolioData.systems.map((system, index) => {
    const icon = systemIcons[system.category] || ICONS.cog;

    return `
      <article class="system-card animate-fade-in-up animate-delay-${(index % 4) + 1}"
               data-id="${system.id}"
               data-category="systems"
               data-type="system"
               role="button"
               tabindex="0"
               aria-label="View ${system.name} details">
        <div class="system-card-icon">${icon}</div>
        <h3 class="system-card-title">${system.name}</h3>
        <p class="system-card-description">${system.shortDescription}</p>
        <span class="system-card-context">
          ${ICONS.rocket} ${system.context}
        </span>
      </article>
    `;
  }).join('');

  DOM.systemsGrid.innerHTML = cards;
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
  // Filter buttons
  DOM.filterContainer?.addEventListener('click', handleFilterClick);

  // Project cards
  DOM.projectsGrid?.addEventListener('click', handleCardClick);
  DOM.projectsGrid?.addEventListener('keydown', handleCardKeydown);

  // System cards
  DOM.systemsGrid?.addEventListener('click', handleCardClick);
  DOM.systemsGrid?.addEventListener('keydown', handleCardKeydown);

  // Modal
  DOM.modalOverlay?.addEventListener('click', closeModal);
  DOM.modal?.querySelector('.modal-close')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', handleEscapeKey);

  // Scroll to top
  DOM.scrollTopBtn?.addEventListener('click', scrollToTop);

  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleSmoothScroll);
  });
}

function handleFilterClick(e) {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  const filter = btn.dataset.filter;
  currentFilter = filter;

  // Update active state
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Filter cards
  filterCards(filter);
}

function filterCards(filter) {
  const projectCards = DOM.projectsGrid?.querySelectorAll('.project-card') || [];
  const systemCards = DOM.systemsGrid?.querySelectorAll('.system-card') || [];
  const systemsSection = document.getElementById('systems');
  const projectsSection = document.getElementById('projects');

  // Show/hide systems section
  if (filter === 'systems') {
    systemsSection?.style.setProperty('display', 'block');
    projectsSection?.style.setProperty('display', 'none');
    return;
  } else if (filter === 'all') {
    systemsSection?.style.setProperty('display', 'block');
    projectsSection?.style.setProperty('display', 'block');
  } else {
    systemsSection?.style.setProperty('display', 'none');
    projectsSection?.style.setProperty('display', 'block');
  }

  // Filter project cards
  projectCards.forEach(card => {
    const category = card.dataset.category;
    const shouldShow = filter === 'all' || category === filter;

    if (shouldShow) {
      card.style.display = 'block';
      card.style.animation = 'fadeInUp 0.5s ease forwards';
    } else {
      card.style.display = 'none';
    }
  });

  // Show all system cards when filter is 'all'
  systemCards.forEach(card => {
    card.style.display = filter === 'all' || filter === 'systems' ? 'block' : 'none';
  });
}

function handleCardClick(e) {
  const card = e.target.closest('.project-card, .system-card');
  if (!card) return;

  const id = card.dataset.id;
  const type = card.dataset.type;
  openModal(id, type);
}

function handleCardKeydown(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleCardClick(e);
  }
}

function handleEscapeKey(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

function handleSmoothScroll(e) {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href');
  const targetEl = document.querySelector(targetId);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth' });
  }
}

// ========== MODAL FUNCTIONS ==========
function openModal(id, type) {
  const item = type === 'project'
    ? portfolioData.projects.find(p => p.id === id)
    : portfolioData.systems.find(s => s.id === id);

  if (!item) return;

  const content = type === 'project'
    ? generateProjectModalContent(item)
    : generateSystemModalContent(item);

  DOM.modalContent.innerHTML = content;
  DOM.modal.classList.add('active');
  DOM.modalOverlay.classList.add('active');
  document.body.classList.add('modal-open');

  // Focus trap
  DOM.modal.querySelector('.modal-close')?.focus();
}

function closeModal() {
  DOM.modal?.classList.remove('active');
  DOM.modalOverlay?.classList.remove('active');
  document.body.classList.remove('modal-open');

  // Stop any playing videos
  const iframe = DOM.modalContent?.querySelector('iframe');
  if (iframe) {
    iframe.src = iframe.src;
  }
}

function generateProjectModalContent(project) {
  // Media section
  let mediaHtml = '';
  if (project.videoUrl) {
    mediaHtml = `
      <div class="modal-media">
        <iframe src="${project.videoUrl}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
        </iframe>
      </div>
    `;
  } else if (project.images && project.images.length > 0) {
    mediaHtml = `
      <div class="modal-media">
        <img src="${project.images[0]}" alt="${project.name}">
      </div>
    `;
  } else {
    mediaHtml = `
      <div class="modal-media">
        <div class="modal-media-placeholder">${ICONS.gamepad}</div>
      </div>
    `;
  }

  // Award section
  const awardHtml = project.award
    ? `<div class="modal-award">${ICONS.trophy} ${project.award}</div>`
    : '';

  // Contributions list
  const contributionsHtml = project.contributions
    ? project.contributions.map(c => `
        <div class="modal-contribution"><span>${c}</span></div>
      `).join('')
    : '';

  // Tags
  const tagsHtml = project.tags.map(tag =>
    `<span class="modal-tag">${tag}</span>`
  ).join('');

  // Links
  let linksHtml = '';
  if (project.links) {
    const linkItems = [];
    if (project.links.itch) {
      linkItems.push(`
        <a href="${project.links.itch}" target="_blank" rel="noopener noreferrer" class="modal-link">
          ${ICONS.itchio} Play on itch.io
        </a>
      `);
    }
    if (project.links.github) {
      linkItems.push(`
        <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="modal-link">
          ${ICONS.github} View on GitHub
        </a>
      `);
    }
    linksHtml = linkItems.length > 0
      ? `<div class="modal-section">
           <h4 class="modal-section-title">Links</h4>
           <div class="modal-links">${linkItems.join('')}</div>
         </div>`
      : '';
  }

  return `
    <button class="modal-close" aria-label="Close modal">${ICONS.close}</button>
    ${mediaHtml}
    <div class="modal-body">
      <div class="modal-header">
        <span class="modal-badge">${project.category}</span>
        <h2 class="modal-title">${project.name}</h2>
        <p class="modal-subtitle">${project.role} | ${project.team}</p>
        ${awardHtml}
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Description</h4>
        <p class="modal-description">${project.fullDescription}</p>
      </div>

      ${contributionsHtml ? `
        <div class="modal-section">
          <h4 class="modal-section-title">My Contributions</h4>
          <div class="modal-contributions">${contributionsHtml}</div>
        </div>
      ` : ''}

      <div class="modal-section">
        <h4 class="modal-section-title">Project Details</h4>
        <div class="modal-meta-grid">
          <div class="modal-meta-item">
            <div class="modal-meta-label">Date</div>
            <div class="modal-meta-value">${project.date}</div>
          </div>
          <div class="modal-meta-item">
            <div class="modal-meta-label">Team</div>
            <div class="modal-meta-value">${project.team}</div>
          </div>
          <div class="modal-meta-item">
            <div class="modal-meta-label">Role</div>
            <div class="modal-meta-value">${project.role}</div>
          </div>
          <div class="modal-meta-item">
            <div class="modal-meta-label">Technologies</div>
            <div class="modal-meta-value">${project.technologies}</div>
          </div>
        </div>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Technologies</h4>
        <div class="modal-tags">${tagsHtml}</div>
      </div>

      ${linksHtml}
    </div>
  `;
}

function generateSystemModalContent(system) {
  const icon = systemIcons[system.category] || ICONS.cog;

  // Media section
  let mediaHtml = '';
  if (system.images && system.images.length > 0) {
    const isGif = system.images[0].endsWith('.gif');
    mediaHtml = `
      <div class="modal-media">
        <img src="${system.images[0]}" alt="${system.name}" ${isGif ? 'style="object-fit: contain; background: #000;"' : ''}>
      </div>
    `;
  } else {
    mediaHtml = `
      <div class="modal-media">
        <div class="modal-media-placeholder">${icon}</div>
      </div>
    `;
  }

  // Technical details
  const technicalHtml = system.technicalDetails
    ? system.technicalDetails.map(t => `
        <div class="modal-contribution"><span>${t}</span></div>
      `).join('')
    : '';

  // Tags
  const tagsHtml = system.tags.map(tag =>
    `<span class="modal-tag">${tag}</span>`
  ).join('');

  return `
    <button class="modal-close" aria-label="Close modal">${ICONS.close}</button>
    ${mediaHtml}
    <div class="modal-body">
      <div class="modal-header">
        <span class="modal-badge">${system.category}</span>
        <h2 class="modal-title">${system.name}</h2>
        <p class="modal-subtitle">Developed for ${system.context}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Overview</h4>
        <p class="modal-description">${system.fullDescription}</p>
      </div>

      ${technicalHtml ? `
        <div class="modal-section">
          <h4 class="modal-section-title">Technical Details</h4>
          <div class="modal-contributions">${technicalHtml}</div>
        </div>
      ` : ''}

      <div class="modal-section">
        <h4 class="modal-section-title">Technologies</h4>
        <div class="modal-tags">${tagsHtml}</div>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">Implementation Details</h4>
        <div class="modal-meta-grid">
          <div class="modal-meta-item">
            <div class="modal-meta-label">Technologies</div>
            <div class="modal-meta-value">${system.technologies}</div>
          </div>
          <div class="modal-meta-item">
            <div class="modal-meta-label">Project Context</div>
            <div class="modal-meta-value">${system.context}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ========== SCROLL EFFECTS ==========
function setupScrollEffects() {
  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all animated elements
  document.querySelectorAll('.animate-fade-in-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });

  // Scroll to top button visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      DOM.scrollTopBtn?.classList.add('visible');
    } else {
      DOM.scrollTopBtn?.classList.remove('visible');
    }
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ========== UTILITY FUNCTIONS ==========
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
