/**
 * Artifex Academy — Global Interactive Core
 * Controls theme toggles, RTL switches, Quick 16-Page Switcher Modal,
 * Lightbox viewer, mobile navigation drawer, and back-to-top button.
 */

(function () {
  const PAGES_CATALOG = [
    { num: 1, name: "Home 1 – General Services", path: "index.html", sections: 6, group: "Main Pages" },
    { num: 2, name: "Home 2 – Niche-Specific", path: "pages/home-2.html", sections: 6, group: "Main Pages" },
    { num: 3, name: "About Us", path: "pages/about.html", sections: 6, group: "Main Pages" },
    { num: 4, name: "Services", path: "pages/services.html", sections: 6, group: "Main Pages" },
    { num: 5, name: "Service Details", path: "pages/service-details.html", sections: 6, group: "Main Pages" },
    { num: 6, name: "Blog", path: "pages/blog.html", sections: 6, group: "Main Pages" },
    { num: 7, name: "Blog Details", path: "pages/blog-details.html", sections: 6, group: "Main Pages" },
    { num: 8, name: "Contact Us", path: "pages/contact.html", sections: 6, group: "Main Pages" },
    { num: 9, name: "Admin Dashboard", path: "pages/admin-dashboard.html", sections: "Portal App", group: "Portals" },
    { num: 10, name: "Student Dashboard", path: "pages/student-dashboard.html", sections: "Primary Portal", group: "Portals" },
    { num: 11, name: "Pricing", path: "pages/pricing.html", sections: 6, group: "Additional Pages" },
    { num: 12, name: "Login", path: "pages/login.html", sections: 6, group: "Additional Pages" },
    { num: 13, name: "Signup", path: "pages/signup.html", sections: 6, group: "Additional Pages" },
    { num: 14, name: "404 Not Found", path: "pages/404.html", sections: 6, group: "Additional Pages" },
    { num: 15, name: "Maintenance", path: "pages/maintenance.html", sections: 6, group: "Additional Pages" },
    { num: 16, name: "Sitemap", path: "pages/sitemap.html", sections: 6, group: "Additional Pages" },
    { num: 17, name: "Privacy Policy", path: "pages/privacy.html", sections: "Legal Policy", group: "Legal & Policy" },
    { num: 18, name: "Terms & Conditions", path: "pages/terms.html", sections: "Atelier Terms", group: "Legal & Policy" }
  ];

  function isInPagesDir() {
    return window.location.pathname.includes("/pages/");
  }

  function resolvePagePath(p) {
    if (p === "index.html") return isInPagesDir() ? "../index.html" : "index.html";
    // p is like "pages/xxx.html" — strip prefix when already inside pages/
    return isInPagesDir() ? p.replace("pages/", "") : p;
  }

  function getCurrentFilename() {
    const path = window.location.pathname;
    const filename = path.split("/").pop() || "index.html";
    return filename === "" ? "index.html" : filename;
  }

  function initGlobalControls() {
    const currentFile = getCurrentFilename();

    // 1. Theme Toggle (SVG icons, no emoji)
    const themeBtns = document.querySelectorAll(".btn-toggle-theme");
    const svgOpen = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:20px;height:20px;">';
    const SUN_SVG = svgOpen + '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>';
    const MOON_SVG = svgOpen + '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    const updateThemeIcon = (theme) => {
      themeBtns.forEach(btn => {
        const label = btn.querySelector(".toggle-label");
        btn.innerHTML = (theme === "dark" ? SUN_SVG : MOON_SVG) + (label ? '<span class="toggle-label">Theme</span>' : "");
        btn.setAttribute("title", theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
      });
    };

    updateThemeIcon(window.ArtifexStore.getTheme());

    themeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const newTheme = window.ArtifexStore.toggleTheme();
        updateThemeIcon(newTheme);
        window.ArtifexStore.showToast(`Switched to ${newTheme.toUpperCase()} theme`, "info");
      });
    });

    // 2. RTL Toggle
    const dirBtns = document.querySelectorAll(".btn-toggle-dir");
    const updateDirIcon = (dir) => {
      dirBtns.forEach(btn => {
        const icon = btn.querySelector("svg");
        const showText = !btn.classList.contains("toggle-icon-only");
        btn.innerHTML = (icon ? icon.outerHTML : "") + (showText ? `<span>${dir.toUpperCase()}</span>` : "");
        btn.setAttribute("title", dir === "rtl" ? "Switch to LTR Layout" : "Switch to RTL Layout");
      });
    };

    updateDirIcon(window.ArtifexStore.getDirection());

    dirBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const newDir = window.ArtifexStore.toggleDirection();
        updateDirIcon(newDir);
        window.ArtifexStore.showToast(`Layout switched to ${newDir.toUpperCase()}`, "info");
      });
    });

    // 3. Quick 16-Page Switcher Modal
    buildPagesModal(currentFile);

    // 4. Lightbox Setup
    initLightbox();

    // 5. Mobile Navigation
    initMobileNav();

    // 6. Back-to-Top Button
    initBackToTop();

    // 7. Profile Dropdown
    initProfileDropdown();
  }

  function initProfileDropdown() {
    const dropdowns = document.querySelectorAll(".profile-dropdown");
    if (!dropdowns.length) return;

    const closeAll = () => {
      document.querySelectorAll(".profile-dropdown.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector("button")?.setAttribute("aria-expanded", "false");
      });
    };

    dropdowns.forEach((dd) => {
      const btn = dd.querySelector("button");
      const menu = dd.querySelector(".profile-dropdown-menu");
      if (!btn || !menu) return;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const willOpen = !dd.classList.contains("open");
        closeAll();
        dd.classList.toggle("open", willOpen);
        btn.setAttribute("aria-expanded", String(willOpen));
      });
    });

    document.addEventListener("click", closeAll);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAll();
    });
  }

  function buildPagesModal(currentFile) {
    // Check if modal exists
    let modal = document.getElementById("artifex-pages-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "artifex-pages-modal";
      modal.className = "pages-modal-backdrop";
      
      const mainPages = PAGES_CATALOG.filter(p => p.group === "Main Pages");
      const portals = PAGES_CATALOG.filter(p => p.group === "Portals");
      const additional = PAGES_CATALOG.filter(p => p.group === "Additional Pages");
      const legal = PAGES_CATALOG.filter(p => p.group === "Legal & Policy");

      const renderChips = (list) => list.map(page => `
        <a href="${resolvePagePath(page.path)}" class="page-chip ${currentFile === page.path.split("/").pop() ? 'current' : ''}">
          <span class="page-chip-number">#${page.num}</span>
          <span class="page-chip-name">${page.name}</span>
          <span class="page-chip-meta">${typeof page.sections === 'number' ? page.sections + ' Sections' : page.sections}</span>
        </a>
      `).join("");

      modal.innerHTML = `
        <div class="pages-modal">
          <div class="pages-modal-header">
            <h3 class="pages-modal-title">
              <span><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:1.15em;height:1.15em;vertical-align:-0.2em;"><circle cx="12" cy="12" r="9"/><circle cx="8.3" cy="10.2" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="7.6" r="1.3" fill="currentColor" stroke="none"/><circle cx="15.7" cy="10.2" r="1.3" fill="currentColor" stroke="none"/></svg></span> Artifex Academy — Complete Platform Pages
            </h3>
            <button class="action-icon-btn close-pages-modal" aria-label="Close">&times;</button>
          </div>
          <div class="pages-modal-body">
            <div>
              <div class="pages-group-title">Main Public Pages</div>
              <div class="pages-grid">${renderChips(mainPages)}</div>
            </div>
            <div>
              <div class="pages-group-title">Application Portals</div>
              <div class="pages-grid">${renderChips(portals)}</div>
            </div>
            <div>
              <div class="pages-group-title">Additional Pages</div>
              <div class="pages-grid">${renderChips(additional)}</div>
            </div>
            <div>
              <div class="pages-group-title">Legal &amp; Policy Pages</div>
              <div class="pages-grid">${renderChips(legal)}</div>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      modal.querySelector(".close-pages-modal").addEventListener("click", () => {
        modal.classList.remove("active");
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
      });
    }

    // Attach to all switcher triggers
    document.querySelectorAll(".btn-pages-switcher").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("active");
      });
    });

    // Keyboard shortcut (Alt + P or Ctrl + K)
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey && e.key === "k") || (e.altKey && e.key.toLowerCase() === "p")) {
        e.preventDefault();
        modal.classList.toggle("active");
      }
      if (e.key === "Escape" && modal.classList.contains("active")) {
        modal.classList.remove("active");
      }
    });
  }

  function initLightbox() {
    let lightbox = document.getElementById("artifex-lightbox");
    if (!lightbox) {
      lightbox = document.createElement("div");
      lightbox.id = "artifex-lightbox";
      lightbox.className = "artifex-lightbox";
      lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <div class="lightbox-content">
          <div class="lightbox-img-wrapper">
            <img id="lightbox-target-img" src="" alt="Artwork High Resolution Zoom">
          </div>
          <div class="lightbox-caption">
            <h4 id="lightbox-title" class="lightbox-title">Artwork Title</h4>
            <p id="lightbox-meta" class="lightbox-meta">Medium • Artist</p>
          </div>
        </div>
      `;
      document.body.appendChild(lightbox);

      lightbox.querySelector(".lightbox-close").addEventListener("click", () => {
        lightbox.classList.remove("active");
      });

      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.remove("active");
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("active")) {
          lightbox.classList.remove("active");
        }
      });
    }

    // Delegate click on zoomable artwork elements
    document.addEventListener("click", (e) => {
      const target = e.target.closest("[data-lightbox]");
      if (target) {
        e.preventDefault();
        const imgUrl = target.getAttribute("data-lightbox-src") || target.querySelector("img")?.src;
        const title = target.getAttribute("data-lightbox-title") || target.querySelector(".artwork-card-title")?.textContent || "Artifex Student Work";
        const meta = target.getAttribute("data-lightbox-meta") || target.querySelector(".artwork-card-author")?.textContent || "Student Showcase";

        if (imgUrl) {
          document.getElementById("lightbox-target-img").src = imgUrl;
          document.getElementById("lightbox-title").textContent = title;
          document.getElementById("lightbox-meta").textContent = meta;
          lightbox.classList.add("active");
        }
      }
    });
  }

  function initMobileNav() {
    const toggleBtn = document.querySelector(".btn-mobile-toggle");
    const drawer = document.querySelector(".mobile-nav-drawer");
    const closeBtn = document.querySelector(".btn-close-mobile");

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener("click", () => drawer.classList.add("open"));
    }
    if (closeBtn && drawer) {
      closeBtn.addEventListener("click", () => drawer.classList.remove("open"));
    }
  }

  function initBackToTop() {
    let btn = document.querySelector(".back-to-top");
    if (!btn) {
      btn = document.createElement("button");
      btn.className = "back-to-top";
      btn.setAttribute("aria-label", "Back to top");
      btn.innerHTML = "↑";
      document.body.appendChild(btn);
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", initGlobalControls);
})();
