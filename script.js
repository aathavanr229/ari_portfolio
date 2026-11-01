// Arisudhan P — Portfolio JavaScript Engine

// Project Data
const projects = [
  {
    id: "auracraft",
    title: "AuraCraft — AI Design System Studio",
    tagline: "Figma Token Synchronizer & React Component Studio",
    category: "design",
    categoryLabel: "Design & UI/UX",
    featured: true,
    badges: ["Figma Tokens", "UI/UX Design", "React", "Tailwind CSS"],
    imageGradient: "from-indigo-600 via-purple-600 to-pink-500",
    description: "An advanced design-to-code workspace bridging Figma auto-layout and design tokens with production-ready Tailwind CSS and React components. Designed from scratch in Figma with high WCAG AA contrast standards.",
    features: [
      "Real-time design token sync for colors, typography, spacing, and border radiuses",
      "Interactive 30+ glassmorphic UI component library with copy-to-clipboard code",
      "Built-in dark/light contrast ratio accessibility checker with live preview",
      "One-click export to Tailwind config and CSS variables"
    ],
    techStack: ["Figma", "UI/UX Design", "React 19", "Tailwind CSS", "JavaScript ES6+", "Vite"],
    githubUrl: "https://github.com/aathavanr229/ari_portfolio",
    liveUrl: "#"
  },
  {
    id: "campuspulse",
    title: "CampusPulse — Academic & Placement Ecosystem",
    tagline: "University Placement & Collaborative CSE Portal",
    category: "web",
    categoryLabel: "Full-Stack Web",
    featured: true,
    badges: ["React", "Node.js", "Express", "MongoDB"],
    imageGradient: "from-blue-600 via-cyan-600 to-teal-500",
    description: "An end-to-end web portal engineered for Computer Science undergraduates at Kongu Engineering College to streamline placement drive notifications, mock assessments, resume optimization, and peer notes sharing.",
    features: [
      "Company-wise interview experience archive with filterable tags",
      "Interactive coding mock assessments with instant problem scoring",
      "Peer-to-peer verified course notes repository with upvoting",
      "Automated deadline alerts and notification hub"
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "RESTful APIs"],
    githubUrl: "https://github.com/aathavanr229/ari_portfolio",
    liveUrl: "#"
  },
  {
    id: "algopulse",
    title: "AlgoPulse — Interactive Algorithm Visualizer",
    tagline: "Visual Data Structures & Algorithmic Playground",
    category: "core",
    categoryLabel: "Core CS",
    featured: false,
    badges: ["Data Structures", "Algorithms", "Canvas API", "OOP"],
    imageGradient: "from-emerald-600 via-teal-600 to-cyan-500",
    description: "An interactive educational platform visualizing complex graph traversals (Dijkstra, BFS, DFS), sorting algorithms, and binary search trees with dynamic speed controls and step-by-step memory explanations.",
    features: [
      "Step-by-step playback with reverse debugging and speed sliders",
      "Worst, average, and best-case time and space complexity breakdown",
      "Custom test array generator with real-time collision detection",
      "Live pseudocode highlighter mapped to active call stacks"
    ],
    techStack: ["Data Structures & Algorithms", "JavaScript", "HTML5 Canvas", "Tailwind CSS", "OOP"],
    githubUrl: "https://github.com/aathavanr229/ari_portfolio",
    liveUrl: "#"
  },
  {
    id: "devvault",
    title: "DevVault — Cloud Code Snippet & Resource Organizer",
    tagline: "Minimalist Developer Knowledge Base",
    category: "tools",
    categoryLabel: "Dev Tools",
    featured: false,
    badges: ["Developer Tools", "Tailwind CSS", "IndexedDB", "Markdown"],
    imageGradient: "from-amber-500 via-orange-600 to-rose-500",
    description: "A lightning-fast, keyboard-driven code snippet repository and technical bookmark manager engineered for developer productivity with offline capability and tag filtering.",
    features: [
      "Instant fuzzy search across code blocks, tags, and languages",
      "Full Markdown preview with syntax highlighting and LaTeX equation support",
      "Offline-first storage with local encryption and instant clipboard copy",
      "Quick import/export to JSON and Gist synchronization"
    ],
    techStack: ["JavaScript", "Tailwind CSS", "IndexedDB", "Lucide Icons", "Markdown"],
    githubUrl: "https://github.com/aathavanr229/ari_portfolio",
    liveUrl: "#"
  }
];

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Toggle Theme
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Copy Email with Toast Feedback
function copyEmail(event) {
  if (event) event.preventDefault();
  const email = "arisudhanp.24cse@kongu.edu";
  
  navigator.clipboard.writeText(email).then(() => {
    showToast("Email copied to clipboard!", "success");
    triggerConfetti(0.3);
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = email;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showToast("Email copied to clipboard!", "success");
  });
}

// Toast Notification
function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");
  const toastIcon = document.getElementById("toastIcon");
  
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  
  if (type === "success") {
    toastIcon.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i>`;
  } else {
    toastIcon.innerHTML = `<i data-lucide="info" class="w-5 h-5 text-indigo-400"></i>`;
  }

  if (window.lucide) window.lucide.createIcons();
  
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// Render Projects
function renderProjects(filter = "all") {
  const container = document.getElementById("projectsGrid");
  if (!container) return;

  const filtered = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter);

  container.innerHTML = filtered.map(p => `
    <div class="interactive-card group relative flex flex-col rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300">
      
      <!-- Top Header & Category Tag -->
      <div class="flex items-center justify-between gap-3 mb-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
          p.category === 'design' 
            ? 'bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60'
            : p.category === 'core'
            ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
            : 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60'
        }">
          <span class="w-1.5 h-1.5 rounded-full ${p.category === 'design' ? 'bg-purple-500' : p.category === 'core' ? 'bg-emerald-500' : 'bg-indigo-500'}"></span>
          ${p.categoryLabel}
        </span>
        
        <div class="flex items-center gap-2">
          <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition" title="View Source on GitHub">
            <i data-lucide="github" class="w-4 h-4"></i>
          </a>
          <button onclick="openProjectModal('${p.id}')" class="p-2 rounded-lg text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition" title="Project Details">
            <i data-lucide="maximize-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <!-- Project Visual Header -->
      <div class="relative w-full h-40 rounded-xl overflow-hidden mb-5 bg-gradient-to-br ${p.imageGradient} flex items-center justify-center p-5 text-white shadow-inner">
        <div class="absolute inset-0 bg-black/15 backdrop-blur-[1px]"></div>
        <div class="relative z-10 text-center">
          <div class="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
            <i data-lucide="${p.category === 'design' ? 'figma' : p.category === 'core' ? 'cpu' : 'layout'}" class="w-6 h-6 text-white"></i>
          </div>
          <p class="font-heading font-bold text-lg tracking-tight">${p.title.split('—')[0]}</p>
          <p class="text-xs text-white/80 font-medium">${p.tagline}</p>
        </div>
      </div>

      <!-- Title & Description -->
      <h3 class="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        ${p.title}
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-5 leading-relaxed">
        ${p.description}
      </p>

      <!-- Tech Stack Badges -->
      <div class="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <div class="flex flex-wrap gap-1.5 mb-5">
          ${p.badges.map(b => `
            <span class="px-2.5 py-0.8 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono-code">
              ${b}
            </span>
          `).join('')}
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-3">
          <button onclick="openProjectModal('${p.id}')" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition">
            View Details
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
          <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <i data-lucide="github" class="w-3.5 h-3.5"></i>
            Code
          </a>
        </div>
      </div>

    </div>
  `).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Filter Projects
function filterProjects(category, btnElement) {
  // Update button active states
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.classList.remove("bg-indigo-600", "text-white", "shadow-sm");
    btn.classList.add("text-slate-600", "dark:text-slate-400", "hover:bg-slate-100", "dark:hover:bg-slate-800");
  });

  if (btnElement) {
    btnElement.classList.add("bg-indigo-600", "text-white", "shadow-sm");
    btnElement.classList.remove("text-slate-600", "dark:text-slate-400", "hover:bg-slate-100", "dark:hover:bg-slate-800");
  }

  renderProjects(category);
}

// Project Modal Details
function openProjectModal(id) {
  const p = projects.find(item => item.id === id);
  if (!p) return;

  const modal = document.getElementById("projectModal");
  const modalContent = document.getElementById("modalContent");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-gradient-to-br ${p.imageGradient} flex items-center justify-center p-6 text-white mb-6">
      <div class="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
      <div class="relative z-10 text-center">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md mb-2 border border-white/30">
          ${p.categoryLabel}
        </span>
        <h3 class="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">${p.title}</h3>
        <p class="text-sm text-white/90 mt-1">${p.tagline}</p>
      </div>
    </div>

    <div class="space-y-6">
      <div>
        <h4 class="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-2 font-mono-code">Overview</h4>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed">${p.description}</p>
      </div>

      <div>
        <h4 class="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-2 font-mono-code">Key Features & Architecture</h4>
        <ul class="space-y-2">
          ${p.features.map(f => `
            <li class="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
              <i data-lucide="check" class="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"></i>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div>
        <h4 class="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-2 font-mono-code">Technologies & Tools</h4>
        <div class="flex flex-wrap gap-2">
          ${p.techStack.map(t => `
            <span class="px-3 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-mono-code">
              ${t}
            </span>
          `).join('')}
        </div>
      </div>

      <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-semibold text-sm transition">
          <i data-lucide="github" class="w-4 h-4"></i>
          View Source Repository
        </a>
        <button onclick="closeProjectModal()" class="px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition">
          Close
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.remove("opacity-0");
    document.getElementById("modalDialog").classList.remove("scale-95");
    document.getElementById("modalDialog").classList.add("scale-100");
  }, 20);

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;
  modal.classList.add("opacity-0");
  document.getElementById("modalDialog").classList.remove("scale-100");
  document.getElementById("modalDialog").classList.add("scale-95");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 250);
}

// Confetti effect helper
function triggerConfetti(ratio = 1) {
  // Simple custom visual particle burst if canvas-confetti library isn't loaded
  if (window.confetti) {
    window.confetti({
      particleCount: Math.floor(70 * ratio),
      spread: 60,
      origin: { y: 0.7 }
    });
  }
}

// Contact Form Handler
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("senderName").value.trim();
  const email = document.getElementById("senderEmail").value.trim();
  const subject = document.getElementById("senderSubject").value.trim() || "Portfolio Inquiry for Arisudhan P";
  const message = document.getElementById("senderMessage").value.trim();

  if (!name || !email || !message) {
    showToast("Please fill out all required fields.", "info");
    return;
  }

  // Generate mailto link
  const mailtoBody = encodeURIComponent(
    `Hello Arisudhan,\n\n${message}\n\nFrom: ${name} (${email})`
  );
  const mailtoUrl = `mailto:arisudhanp.24cse@kongu.edu?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

  // Trigger feedback
  showToast("Opening email client... Thank you for reaching out!", "success");
  triggerConfetti();

  // Reset form
  document.getElementById("contactForm").reset();

  // Open default mail client
  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 600);
}

// Smooth scrolling and active link highlighting
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("text-indigo-600", "dark:text-indigo-400", "font-semibold");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("text-indigo-600", "dark:text-indigo-400", "font-semibold");
      }
    });
  });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  if (!menu) return;
  menu.classList.toggle("hidden");
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderProjects("all");
  initScrollSpy();
  
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Close modal when clicking outside
  const modal = document.getElementById("projectModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });
});
