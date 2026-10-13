/**
 * Artifex Academy — State Store & LocalStorage Persistence
 * Manages theme, RTL, authentication, assignment submissions, course progress, and toast notifications.
 */

(function () {
  const STORAGE_KEYS = {
    THEME: "artifex_theme",
    DIR: "artifex_dir",
    USER: "artifex_user",
    ASSIGNMENTS: "artifex_assignments",
    COURSES_PROGRESS: "artifex_courses_progress",
    NOTIFICATIONS: "artifex_notifications",
    FEEDBACKS: "artifex_feedbacks"
  };

  const Store = {
    // Initialize state from LocalStorage or ArtifexData defaults
    init() {
      // 1. Theme
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);

      // 2. Direction (LTR / RTL)
      const savedDir = localStorage.getItem(STORAGE_KEYS.DIR) || "ltr";
      document.documentElement.setAttribute("dir", savedDir);

      // 3. Current User
      if (!localStorage.getItem(STORAGE_KEYS.USER)) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(window.ArtifexData.currentUser));
      }

      // 4. Assignments
      if (!localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS)) {
        localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(window.ArtifexData.assignments));
      }

      // 5. Feedbacks
      if (!localStorage.getItem(STORAGE_KEYS.FEEDBACKS)) {
        localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(window.ArtifexData.feedbacks));
      }

      // 6. Notifications
      if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(window.ArtifexData.notifications));
      }
    },

    // Theme toggler
    getTheme() {
      return document.documentElement.getAttribute("data-theme") || "light";
    },

    setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      Store.triggerEvent("artifex:theme_change", { theme });
    },

    toggleTheme() {
      const current = Store.getTheme();
      const next = current === "dark" ? "light" : "dark";
      Store.setTheme(next);
      return next;
    },

    // RTL toggler
    getDirection() {
      return document.documentElement.getAttribute("dir") || "ltr";
    },

    setDirection(dir) {
      document.documentElement.setAttribute("dir", dir);
      localStorage.setItem(STORAGE_KEYS.DIR, dir);
      Store.triggerEvent("artifex:dir_change", { dir });
    },

    toggleDirection() {
      const current = Store.getDirection();
      const next = current === "rtl" ? "ltr" : "rtl";
      Store.setDirection(next);
      return next;
    },

    // User session
    getUser() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || window.ArtifexData.currentUser;
      } catch (e) {
        return window.ArtifexData.currentUser;
      }
    },

    saveUser(userData) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      Store.triggerEvent("artifex:user_change", userData);
    },

    // Assignments
    getAssignments() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS)) || window.ArtifexData.assignments;
      } catch (e) {
        return window.ArtifexData.assignments;
      }
    },

    saveAssignment(assignment) {
      const assignments = Store.getAssignments();
      const existingIdx = assignments.findIndex(a => a.id === assignment.id);
      if (existingIdx >= 0) {
        assignments[existingIdx] = assignment;
      } else {
        assignments.unshift(assignment);
      }
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
      Store.triggerEvent("artifex:assignments_updated", assignments);
    },

    // Feedbacks
    getFeedbacks() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACKS)) || window.ArtifexData.feedbacks;
      } catch (e) {
        return window.ArtifexData.feedbacks;
      }
    },

    // Notifications
    getNotifications() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) || window.ArtifexData.notifications;
      } catch (e) {
        return window.ArtifexData.notifications;
      }
    },

    markNotificationsRead() {
      const notifs = Store.getNotifications().map(n => ({ ...n, unread: false }));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
      Store.triggerEvent("artifex:notifs_updated", notifs);
    },

    // Events dispatcher
    triggerEvent(eventName, detail) {
      window.dispatchEvent(new CustomEvent(eventName, { detail }));
    },

    // Global Toast Notification Helper
    showToast(message, type = "info", duration = 3500) {
      let toastContainer = document.getElementById("artifex-toast-container");
      if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "artifex-toast-container";
        toastContainer.className = "artifex-toast-container";
        document.body.appendChild(toastContainer);
      }

      const toast = document.createElement("div");
      toast.className = `artifex-toast artifex-toast--${type}`;
      
      const svgOpen = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:18px;height:18px;">';
      const icon = type === "success" ? "✓"
        : type === "error" ? svgOpen + '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>'
        : svgOpen + '<circle cx="12" cy="12" r="9.5"/><path d="M12 16v-4M12 8h.01"/></svg>';
      toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close">&times;</button>
      `;

      toast.querySelector(".toast-close").addEventListener("click", () => {
        toast.classList.add("artifex-toast--hiding");
        setTimeout(() => toast.remove(), 250);
      });

      toastContainer.appendChild(toast);

      // Trigger animation
      requestAnimationFrame(() => toast.classList.add("artifex-toast--visible"));

      setTimeout(() => {
        if (toast.isConnected) {
          toast.classList.add("artifex-toast--hiding");
          setTimeout(() => toast.remove(), 250);
        }
      }, duration);
    }
  };

  // Run on load
  document.addEventListener("DOMContentLoaded", () => Store.init());

  window.ArtifexStore = Store;
})();
