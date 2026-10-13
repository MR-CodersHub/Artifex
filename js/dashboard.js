/**
 * Artifex Academy — Student Learning Dashboard Engine
 * Complete interactive logic for:
 * - Tab navigation (Overview, Courses, Modules, Assignments, Feedback, Artwork, Billing, Profile, etc.)
 * - Course video learning player & lesson completion tracking
 * - Assignment submission modal with real image file preview via FileReader
 * - Instructor critique review & resubmission flow
 * - Student artwork visibility toggling
 * - Subscription management & simulated demo billing
 */

(function () {
  let currentUser = null;
  let assignments = [];
  let currentCourse = null;
  let activeLesson = null;

  function initStudentDashboard() {
    currentUser = window.ArtifexStore.getUser();
    assignments = window.ArtifexStore.getAssignments();
    currentCourse = window.ArtifexData.courses.find(c => c.id === "course_digital_mastery") || window.ArtifexData.courses[0];
    
    // Set first active lesson
    if (currentCourse.modules && currentCourse.modules[0] && currentCourse.modules[0].lessons) {
      activeLesson = currentCourse.modules[0].lessons[2] || currentCourse.modules[0].lessons[0];
    }

    renderUserHeader();
    setupTabNavigation();
    renderOverviewStats();
    renderMyCourses();
    setupCoursePlayer();
    renderAssignments();
    renderFeedbacks();
    renderStudentArtwork();
    renderBillingInfo();
    renderNotifications();
    setupProfileForm();
    setupAssignmentSubmissionModal();

    // Listen for cross-component events
    window.addEventListener("artifex:assignments_updated", (e) => {
      assignments = e.detail;
      renderAssignments();
      renderStudentArtwork();
      renderOverviewStats();
    });
  }

  // 1. Render User Header / Sidebar info
  function renderUserHeader() {
    const userNames = document.querySelectorAll(".user-display-name");
    const userAvatars = document.querySelectorAll(".user-display-avatar");
    const userEmails = document.querySelectorAll(".user-display-email");
    const userPlans = document.querySelectorAll(".user-display-plan");

    userNames.forEach(el => el.textContent = currentUser.name);
    userAvatars.forEach(el => {
      if (el.tagName === "IMG") el.src = currentUser.avatar;
    });
    userEmails.forEach(el => el.textContent = currentUser.email);
    userPlans.forEach(el => el.textContent = currentUser.currentPlan);
  }

  // 2. Sidebar Navigation Tabs
  function setupTabNavigation() {
    const navItems = document.querySelectorAll(".sidebar-nav-item[data-tab]");
    const tabPanels = document.querySelectorAll(".dashboard-tab-panel");

    navItems.forEach(item => {
      item.addEventListener("click", () => {
        const targetTab = item.getAttribute("data-tab");
        if (targetTab === "logout") {
          handleLogout();
          return;
        }

        navItems.forEach(n => n.classList.remove("active"));
        tabPanels.forEach(p => p.classList.remove("active"));

        item.classList.add("active");
        const panel = document.getElementById(`tab-${targetTab}`);
        if (panel) {
          panel.classList.add("active");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    });

    // Also support external buttons with data-switch-tab
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-switch-tab]");
      if (btn) {
        const tab = btn.getAttribute("data-switch-tab");
        const navTarget = document.querySelector(`.sidebar-nav-item[data-tab="${tab}"]`);
        if (navTarget) navTarget.click();
      }
    });
  }

  function handleLogout() {
    if (confirm("Are you sure you want to exit your student atelier session?")) {
      window.ArtifexStore.showToast("Signed out. Returning to Academy entrance...", "info");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 700);
    }
  }

  // 3. Render Overview Metrics
  function renderOverviewStats() {
    const activeAssignments = assignments.filter(a => a.status === "In Progress" || a.status === "Submitted" || a.status === "Under Review");
    const unreadFeedbacks = assignments.filter(a => a.status === "Feedback Available" || a.status === "Revision Requested");

    const statProgress = document.getElementById("stat-overall-progress");
    const statPending = document.getElementById("stat-pending-assignments");
    const statFeedback = document.getElementById("stat-unread-feedback");

    if (statProgress) statProgress.textContent = `${currentUser.overallProgress}%`;
    if (statPending) statPending.textContent = activeAssignments.length;
    if (statFeedback) statFeedback.textContent = unreadFeedbacks.length;
  }

  // 4. Render My Courses list
  function renderMyCourses() {
    const container = document.getElementById("my-courses-grid");
    if (!container) return;

    const enrolled = window.ArtifexData.courses.filter(c => c.enrolled);

    container.innerHTML = enrolled.map(course => `
      <div class="course-card my-course-card">
        <div class="course-card-thumb">
          <img src="${course.coverImage}" alt="${course.title}">
          <span class="badge badge-coral course-badge-overlay">${course.medium}</span>
          <span class="course-duration-tag">${course.duration}</span>
          <div class="my-course-progress-ring" style="--p:${course.progress};" role="img" aria-label="${course.progress}% completed">
            <span>${course.progress}%</span>
          </div>
        </div>
        <div class="course-card-content">
          <div class="course-meta-row">
            <span>${course.skillLevel}</span>
            <span>${course.lessonsCount} Lessons</span>
          </div>
          <h4 class="course-title">${course.shortTitle}</h4>
          <div class="course-instructor-row">
            <img class="instructor-tiny-avatar" src="${course.instructorAvatar}" alt="${course.instructorName}">
            <div class="instructor-tiny-info">
              <span class="instructor-tiny-name">${course.instructorName}</span>
              <span class="instructor-tiny-sub">${course.instructorRole}</span>
            </div>
            <button class="btn btn-sm btn-coral" style="margin-left: auto;" data-switch-tab="modules">
              <svg class="ic" viewBox="0 0 24 24" aria-hidden="true" style="width:14px;height:14px;"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>
              <span>Continue</span>
            </button>
          </div>
        </div>
      </div>
    `).join("");

    const setStat = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    const done = enrolled.filter((c) => (c.progress || 0) >= 100).length;
    const avg = enrolled.length
      ? Math.round(enrolled.reduce((s, c) => s + (c.progress || 0), 0) / enrolled.length) + "%"
      : "0%";
    setStat("enrolled-count", enrolled.length);
    setStat("inprogress-count", enrolled.length - done);
    setStat("completed-count", done);
    setStat("avg-progress", avg);
  }

  // 5. Course Player & Modules Navigator
  function setupCoursePlayer() {
    renderModuleNavigator();

    const playBtn = document.getElementById("player-toggle-btn");
    let isPlaying = false;

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        isPlaying = !isPlaying;
        const playSvg = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>';
        const pauseSvg = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/></svg>';
        playBtn.innerHTML = isPlaying ? pauseSvg : playSvg;
        window.ArtifexStore.showToast(isPlaying ? "Playing Lesson Video Stream (HD 1080p)" : "Video Stream Paused", "info");
      });
    }

    const completeBtn = document.getElementById("btn-complete-lesson");
    if (completeBtn) {
      completeBtn.addEventListener("click", () => {
        if (!activeLesson) return;
        activeLesson.completed = !activeLesson.completed;
        completeBtn.textContent = activeLesson.completed ? "✓ Lesson Completed" : "Mark as Completed";
        completeBtn.classList.toggle("btn-primary", !activeLesson.completed);
        completeBtn.classList.toggle("btn-cobalt", activeLesson.completed);

        renderModuleNavigator();
        window.ArtifexStore.showToast(activeLesson.completed ? "Lesson marked complete! Progress updated." : "Lesson marked incomplete.", "success");
      });
    }
  }

  function renderModuleNavigator() {
    const navContainer = document.getElementById("module-navigator-list");
    if (!navContainer || !currentCourse.modules) return;

    navContainer.innerHTML = currentCourse.modules.map(mod => `
      <div class="module-group">
        <div class="module-group-title">
          <span>Module ${mod.number}: ${mod.title}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${mod.duration}</span>
        </div>
        <div>
          ${mod.lessons.map(les => `
            <button class="lesson-item-btn ${les.id === activeLesson?.id ? 'active' : ''} ${les.completed ? 'completed' : ''}" 
                    data-lesson-id="${les.id}">
              <span class="lesson-check-icon">${les.completed ? '✓' : ''}</span>
              <span style="flex: 1; text-align: inherit;">${les.title}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${les.duration}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `).join("");

    navContainer.querySelectorAll(".lesson-item-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const lessonId = btn.getAttribute("data-lesson-id");
        selectLesson(lessonId);
      });
    });
  }

  function selectLesson(lessonId) {
    for (const mod of currentCourse.modules) {
      const found = mod.lessons.find(l => l.id === lessonId);
      if (found) {
        activeLesson = found;
        break;
      }
    }

    // Update player title and description
    const titleEl = document.getElementById("player-active-title");
    const descEl = document.getElementById("player-active-desc");
    const completeBtn = document.getElementById("btn-complete-lesson");

    if (titleEl) titleEl.textContent = activeLesson.title;
    if (descEl) descEl.textContent = `In this deep-dive studio demonstration with Elena Rostova, we break down core principles of ${activeLesson.title}. Watch each brush pass carefully, and prepare your sketchbook for the accompanying practical exercise.`;
    if (completeBtn) {
      completeBtn.textContent = activeLesson.completed ? "✓ Lesson Completed" : "Mark as Completed";
      completeBtn.classList.toggle("btn-primary", !activeLesson.completed);
      completeBtn.classList.toggle("btn-cobalt", activeLesson.completed);
    }

    renderModuleNavigator();
  }

  // 6. Assignments List
  function renderAssignments() {
    const list = document.getElementById("assignments-container");
    if (!list) return;

    list.innerHTML = assignments.map(a => {
      let badgeClass = "status-badge--review";
      if (a.status === "Approved") badgeClass = "status-badge--approved";
      if (a.status === "Feedback Available") badgeClass = "status-badge--feedback";
      if (a.status === "Revision Requested") badgeClass = "status-badge--revision";
      if (a.status === "Not Started") badgeClass = "status-badge--not-started";

      const thumb = a.uploadedArtwork 
        ? `<img src="${a.uploadedArtwork}" alt="${a.title}">` 
        : `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-size:1.5rem;"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:1.5em;height:1.5em;"><circle cx="12" cy="12" r="9"/><circle cx="8.3" cy="10.2" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="7.6" r="1.3" fill="currentColor" stroke="none"/><circle cx="15.7" cy="10.2" r="1.3" fill="currentColor" stroke="none"/></svg></div>`;

      return `
        <div class="assignment-card">
          <div class="assignment-thumb-box">${thumb}</div>
          <div>
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.25rem;">
              <span class="status-badge ${badgeClass}">${a.status}</span>
              <span class="assignment-subtext">${a.courseTitle} • Due: ${a.dueDate}</span>
            </div>
            <h4 class="assignment-meta-title">${a.title}</h4>
            <p style="font-size:0.85rem;color:var(--text-secondary);">${a.module}</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:0.5rem;align-items:flex-end;">
            ${a.status === 'Feedback Available' || a.status === 'Revision Requested' 
              ? `<button class="btn btn-sm btn-cobalt" data-switch-tab="feedback">View Critique</button>` 
              : ''}
            ${a.status === 'Revision Requested' 
              ? `<button class="btn btn-sm btn-coral open-submit-modal" data-assign-id="${a.id}">Resubmit Revision</button>` 
              : `<button class="btn btn-sm btn-outline open-submit-modal" data-assign-id="${a.id}">
                  ${a.uploadedArtwork ? 'Update Artwork' : 'Upload Submission'}
                 </button>`}
          </div>
        </div>
      `;
    }).join("");

    // Attach submit modal triggers
    document.querySelectorAll(".open-submit-modal").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-assign-id");
        openAssignmentModal(id);
      });
    });
  }

  // 7. Assignment Submission Modal & Image Upload (FileReader Base64)
  function setupAssignmentSubmissionModal() {
    const modal = document.getElementById("artifex-submit-modal");
    const closeBtn = document.getElementById("close-submit-modal");
    const fileInput = document.getElementById("assignment-file-input");
    const dropzone = document.getElementById("assignment-dropzone");
    const previewContainer = document.getElementById("assignment-preview-container");
    const previewImg = document.getElementById("assignment-preview-img");
    const form = document.getElementById("assignment-submit-form");

    if (!modal) return;

    if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });

    if (dropzone && fileInput) {
      dropzone.addEventListener("click", () => fileInput.click());
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
      });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length) {
          handleFile(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener("change", () => {
        if (fileInput.files.length) {
          handleFile(fileInput.files[0]);
        }
      });
    }

    function handleFile(file) {
      if (!file.type.startsWith("image/")) {
        window.ArtifexStore.showToast("Please choose an image file (PNG, JPG, TIFF, PSD)", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result;
        previewContainer.style.display = "block";
        dropzone.style.display = "none";
      };
      reader.readAsDataURL(file);
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const assignId = document.getElementById("submit-assignment-id").value;
        const notes = document.getElementById("assignment-notes").value;
        const uploadedSrc = previewImg.src;

        if (!uploadedSrc || uploadedSrc === window.location.href) {
          window.ArtifexStore.showToast("Please attach an artwork file to submit", "error");
          return;
        }

        const assign = assignments.find(a => a.id === assignId);
        if (assign) {
          assign.uploadedArtwork = uploadedSrc;
          assign.studentNotes = notes;
          assign.status = "Under Review";
          assign.submittedDate = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
          window.ArtifexStore.saveAssignment(assign);

          modal.classList.remove("active");
          form.reset();
          previewContainer.style.display = "none";
          dropzone.style.display = "block";
          window.ArtifexStore.showToast("Artwork successfully submitted! Our instructors will review it within 48h.", "success", 5000);
        }
      });
    }
  }

  function openAssignmentModal(assignmentId) {
    const modal = document.getElementById("artifex-submit-modal");
    const target = assignments.find(a => a.id === assignmentId);
    if (!modal || !target) return;

    document.getElementById("submit-assignment-id").value = target.id;
    document.getElementById("submit-assignment-title").textContent = target.title;
    document.getElementById("submit-assignment-module").textContent = `${target.courseTitle} • ${target.module}`;
    document.getElementById("assignment-notes").value = target.studentNotes || "";

    const previewContainer = document.getElementById("assignment-preview-container");
    const previewImg = document.getElementById("assignment-preview-img");
    const dropzone = document.getElementById("assignment-dropzone");

    if (target.uploadedArtwork) {
      previewImg.src = target.uploadedArtwork;
      previewContainer.style.display = "block";
      dropzone.style.display = "none";
    } else {
      previewContainer.style.display = "none";
      dropzone.style.display = "block";
    }

    modal.classList.add("active");
  }

  // 8. Instructor Feedbacks
  function renderFeedbacks() {
    const container = document.getElementById("feedbacks-container");
    if (!container) return;

    const feedbacks = window.ArtifexStore.getFeedbacks();

    container.innerHTML = feedbacks.map(fb => `
      <div class="feedback-card">
        <div class="feedback-header">
          <div class="feedback-instructor-info">
            <img class="instructor-tiny-avatar" src="${fb.instructorAvatar}" alt="${fb.instructorName}">
            <div>
              <h4 style="font-size:1.15rem;margin-bottom:0.15rem;">${fb.instructorName}</h4>
              <p style="font-size:0.85rem;color:var(--text-muted);">${fb.instructorRole} • ${fb.feedbackDate}</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <span class="badge ${fb.revisionRequired ? 'badge-coral' : 'badge-sage'}">
              ${fb.grade}
            </span>
          </div>
        </div>

        <div class="feedback-content-grid">
          <div>
            <h5 style="margin-bottom:0.75rem;font-size:1rem;color:var(--color-coral);">
              Critique on: ${fb.assignmentTitle}
            </h5>
            <p class="feedback-notes">${fb.writtenComments}</p>

            <div class="feedback-suggestions-list">
              <strong style="font-size:0.9rem;display:block;margin-bottom:0.35rem;">Actionable Studio Improvements:</strong>
              <ul>
                ${fb.improvementSuggestions.map(s => `<li>${s}</li>`).join("")}
              </ul>
            </div>

            <div style="display:flex;gap:1rem;margin-top:1rem;">
              ${fb.revisionRequired 
                ? `<button class="btn btn-coral btn-sm open-submit-modal" data-assign-id="${fb.assignmentId}">Resubmit Revised Artwork</button>` 
                : `<button class="btn btn-outline btn-sm" onclick="window.ArtifexStore.showToast('Feedback archived to your permanent atelier record.', 'success')">Archive Critique</button>`}
            </div>
          </div>

          <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;">
            <div style="border-radius:var(--radius-md);overflow:hidden;border:1px solid var(--border-light);max-height:180px;background:var(--bg-secondary);cursor:pointer;" 
                 data-lightbox data-lightbox-src="${fb.artworkThumbnail}" data-lightbox-title="${fb.assignmentTitle}" data-lightbox-meta="Reviewed by ${fb.instructorName}">
              <img src="${fb.artworkThumbnail}" alt="Critiqued Artwork Thumbnail" style="width:100%;height:100%;object-fit:cover;">
            </div>
            <span style="font-size:0.75rem;color:var(--text-muted);">Click to inspect annotated zones</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  // 9. Student Artwork Portfolio & Visibility Toggle
  function renderStudentArtwork() {
    const container = document.getElementById("student-artwork-grid");
    if (!container) return;

    const myArtworks = window.ArtifexData.studentArtworks;

    container.innerHTML = myArtworks.map(art => `
      <div class="card">
        <div class="card-media" data-lightbox data-lightbox-src="${art.image}" data-lightbox-title="${art.title}" data-lightbox-meta="${art.medium} • ${art.creator}">
          <img src="${art.image}" alt="${art.title}">
          <span class="badge badge-coral" style="position:absolute;top:0.75rem;left:0.75rem;">${art.medium}</span>
        </div>
        <div class="card-body">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
            <h4 style="font-size:1.1rem;">${art.title}</h4>
            <span style="font-size:0.75rem;color:var(--text-muted);">${art.date}</span>
          </div>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:1rem;">${art.caption}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:0.75rem;border-top:1px solid var(--border-light);">
            <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.8rem;cursor:pointer;">
              <input type="checkbox" checked onchange="window.ArtifexStore.showToast('Visibility preferences saved', 'info')">
              <span>Public Showcase</span>
            </label>
            <span style="font-size:0.8rem;color:var(--color-coral);font-weight:700;">★ ${art.critiqueScore}</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  // 10. Subscription & Billing Interface
  function renderBillingInfo() {
    const tableBody = document.getElementById("billing-invoices-body");
    if (!tableBody) return;

    tableBody.innerHTML = window.ArtifexData.paymentHistory.map(inv => `
      <tr>
        <td style="font-weight:700;">${inv.invoiceNo}</td>
        <td>${inv.date}</td>
        <td>${inv.plan}</td>
        <td style="font-weight:700;">${inv.amount}</td>
        <td><span class="badge badge-sage">${inv.status}</span></td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="window.ArtifexStore.showToast('Downloading simulated PDF receipt (${inv.invoiceNo})...', 'info')">
            Download PDF
          </button>
        </td>
      </tr>
    `).join("");

    const cancelBtn = document.getElementById("btn-cancel-subscription");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        if (confirm("Are you sure you wish to pause or cancel your Artifex Atelier Membership? Your access will remain active until the end of the current billing cycle.")) {
          currentUser.planStatus = "Cancelled (Active until Dec 14, 2026)";
          window.ArtifexStore.saveUser(currentUser);
          document.getElementById("user-plan-status").textContent = currentUser.planStatus;
          window.ArtifexStore.showToast("Subscription cancelled. No further charges will occur.", "warning");
        }
      });
    }

    const upgradeBtn = document.getElementById("btn-upgrade-subscription");
    if (upgradeBtn) {
      upgradeBtn.addEventListener("click", () => {
        currentUser.currentPlan = "Master Mentorship ($89/mo)";
        window.ArtifexStore.saveUser(currentUser);
        renderUserHeader();
        window.ArtifexStore.showToast("Upgraded to Master Mentorship Plan! Your 1-on-1 advisor has been notified.", "success");
      });
    }
  }

  // 11. Notifications Tab
  function renderNotifications() {
    const container = document.getElementById("notifications-list");
    if (!container) return;

    const notifs = window.ArtifexStore.getNotifications();

    container.innerHTML = notifs.map(n => `
      <div class="metric-card" style="margin-bottom:0.85rem;background:${n.unread ? 'var(--bg-surface)' : 'var(--bg-secondary)'};border-left:4px solid ${n.unread ? 'var(--color-coral)' : 'var(--border-medium)'};">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.25rem;">
          <h5 style="font-size:1.05rem;">${n.title}</h5>
          <span style="font-size:0.75rem;color:var(--text-muted);">${n.time}</span>
        </div>
        <p style="font-size:0.9rem;color:var(--text-secondary);">${n.message}</p>
      </div>
    `).join("");

    const markAllBtn = document.getElementById("btn-mark-all-read");
    if (markAllBtn) {
      markAllBtn.addEventListener("click", () => {
        window.ArtifexStore.markNotificationsRead();
        renderNotifications();
        window.ArtifexStore.showToast("All notifications marked as read", "info");
      });
    }
  }

  // 12. Profile & Settings Form
  function setupProfileForm() {
    const form = document.getElementById("student-profile-form");
    if (!form) return;

    const nameInput = document.getElementById("profile-name");
    const emailInput = document.getElementById("profile-email");
    const mediumInput = document.getElementById("profile-medium");
    const bioInput = document.getElementById("profile-bio");

    if (nameInput) nameInput.value = currentUser.name;
    if (emailInput) emailInput.value = currentUser.email;
    if (mediumInput) mediumInput.value = currentUser.preferredMedium;
    if (bioInput) bioInput.value = currentUser.bio;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      currentUser.name = nameInput.value;
      currentUser.email = emailInput.value;
      currentUser.preferredMedium = mediumInput.value;
      currentUser.bio = bioInput.value;

      window.ArtifexStore.saveUser(currentUser);
      renderUserHeader();
      window.ArtifexStore.showToast("Profile details updated successfully!", "success");
    });
  }

  document.addEventListener("DOMContentLoaded", initStudentDashboard);
})();
