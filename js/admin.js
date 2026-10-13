/**
 * Artifex Academy — Admin Portal Engine (Role Restricted Platform Administration)
 * Manages courses, lessons, instructors, students, assignment oversight, subscriptions, and platform analytics.
 */

(function () {
  const announcements = [
    { title: "Fall 2026 Admissions Open", message: "All-Access Atelier enrollment is live with early-admission brush bonuses.", time: "Oct 10, 2026" },
    { title: "Live Masterclass with Mateo Silva", message: "Plein Air Pigment Flow demo streams Thursday at 6:00 PM UTC.", time: "Oct 08, 2026" }
  ];

  function initAdminDashboard() {
    const adminData = window.ArtifexData.adminOverview;
    renderAdminMetrics(adminData);
    renderAdminCourses();
    renderAdminStudents();
    renderAdminAssignments();
    renderAdminInstructors();
    renderAdminReviews();
    renderAdminRevenue();
    renderAdminNotifications();
    renderAdminAnnouncements();
    setupTabNavigation();
    setupAnnounceForm();
    setupSettingsForm();

    // Assignment approve simulation
    document.addEventListener("click", (e) => {
      const approveBtn = e.target.closest(".btn-admin-approve");
      if (approveBtn) {
        const row = approveBtn.closest("tr");
        const statusCell = row.querySelector(".admin-assign-status");
        statusCell.innerHTML = '<span class="badge badge-sage">Approved</span>';
        approveBtn.remove();
        window.ArtifexStore.showToast("Assignment approved and student notified!", "success");
      }
    });

    // Course status toggle simulation
    document.addEventListener("click", (e) => {
      const toggleCourseBtn = e.target.closest(".btn-toggle-course-status");
      if (toggleCourseBtn) {
        const badge = toggleCourseBtn.closest("tr").querySelector(".course-status-badge");
        const isLive = badge.textContent.includes("Live");
        badge.className = isLive ? "badge badge-coral course-status-badge" : "badge badge-sage course-status-badge";
        badge.textContent = isLive ? "Draft" : "Live";
        window.ArtifexStore.showToast(`Course status changed to ${badge.textContent}`, "info");
      }
    });
  }

  function renderAdminMetrics(data) {
    const elStudents = document.getElementById("admin-stat-students");
    const elRevenue = document.getElementById("admin-stat-revenue");
    const elPending = document.getElementById("admin-stat-pending");
    const elCompletion = document.getElementById("admin-stat-completion");

    if (elStudents) elStudents.textContent = data.totalStudents.toLocaleString();
    if (elRevenue) elRevenue.textContent = data.monthlyRecurringRevenue;
    if (elPending) elPending.textContent = data.assignmentSubmissionsPending;
    if (elCompletion) elCompletion.textContent = data.courseCompletionAvg;
  }

  function renderAdminCourses() {
    const tbody = document.getElementById("admin-courses-table-body");
    if (!tbody) return;

    tbody.innerHTML = window.ArtifexData.courses.map(c => `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <img src="${c.coverImage}" style="width:44px;height:32px;border-radius:4px;object-fit:cover;">
            <strong>${c.shortTitle}</strong>
          </div>
        </td>
        <td>${c.instructorName}</td>
        <td>${c.medium}</td>
        <td>${c.studentsCount.toLocaleString()}</td>
        <td><span class="badge badge-sage course-status-badge">Live</span></td>
        <td>
          <button class="btn btn-sm btn-outline btn-toggle-course-status">Toggle Status</button>
        </td>
      </tr>
    `).join("");
  }

  function renderAdminStudents() {
    const tbody = document.getElementById("admin-students-table-body");
    if (!tbody) return;

    const mockStudents = [
      { name: "Aurora Sterling", email: "aurora@studio.artifex.com", plan: "All-Access Atelier", courses: 3, status: "Active" },
      { name: "Liam Gallagher", email: "liam.g@artifex.com", plan: "All-Access Atelier", courses: 2, status: "Active" },
      { name: "Kenji Takahashi", email: "kenji.t@atelier.jp", plan: "Master Mentorship", courses: 4, status: "Active" },
      { name: "Amara Okonjo", email: "amara@lagosart.org", plan: "Beginner Studio", courses: 1, status: "Active" },
      { name: "Sophie Moreau", email: "sophie.m@parisart.fr", plan: "All-Access Atelier", courses: 3, status: "Active" }
    ];

    tbody.innerHTML = mockStudents.map(s => `
      <tr>
        <td><strong>${s.name}</strong></td>
        <td>${s.email}</td>
        <td>${s.plan}</td>
        <td>${s.courses} enrolled</td>
        <td><span class="badge badge-sage">${s.status}</span></td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="window.ArtifexStore.showToast('Viewing full learner transcript for ${s.name}...', 'info')">Audit</button>
        </td>
      </tr>
    `).join("");
  }

  function renderAdminAssignments() {
    const tbody = document.getElementById("admin-assignments-table-body");
    if (!tbody) return;

    tbody.innerHTML = window.ArtifexData.assignments.map(a => `
      <tr>
        <td><strong>${a.title}</strong></td>
        <td>Aurora Sterling</td>
        <td>${a.courseTitle}</td>
        <td class="admin-assign-status"><span class="badge ${a.status === 'Approved' ? 'badge-sage' : 'badge-coral'}">${a.status}</span></td>
        <td>${a.dueDate}</td>
        <td>
          ${a.status !== 'Approved' 
            ? `<button class="btn btn-sm btn-cobalt btn-admin-approve">Mark Approved</button>` 
            : `<span style="font-size:0.8rem;color:var(--text-muted);">Complete</span>`}
        </td>
      </tr>
    `).join("");
  }

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
  }

  function handleLogout() {
    if (confirm("Log out of the Platform Administration portal?")) {
      window.ArtifexStore.showToast("Signed out. Returning to Academy entrance...", "info");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 700);
    }
  }

  function renderAdminInstructors() {
    const container = document.getElementById("admin-instructors-grid");
    if (!container) return;

    container.innerHTML = window.ArtifexData.instructors.map(i => `
      <div class="card" style="padding:1.5rem;">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">
          <img src="${i.avatar}" alt="${i.name}" style="width:56px;height:56px;border-radius:50%;object-fit:cover;flex-shrink:0;">
          <div>
            <h4 style="font-size:1.1rem;">${i.name}</h4>
            <p style="font-size:0.8rem;color:var(--text-muted);">${i.specialty}</p>
          </div>
        </div>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:0.5rem;">${i.experience}</p>
        <p style="font-size:0.85rem;color:var(--color-cobalt);font-weight:700;margin-bottom:1rem;">${i.studentArtworkCount} critiques delivered</p>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <button class="btn btn-sm btn-outline" onclick="window.ArtifexStore.showToast('Opening faculty dossier for ${i.name}...', 'info')">View Dossier</button>
          <button class="btn btn-sm btn-cobalt" onclick="window.ArtifexStore.showToast('${i.name} assigned to next mentorship cohort.', 'success')">Assign Cohort</button>
        </div>
      </div>
    `).join("");
  }

  function renderAdminReviews() {
    const container = document.getElementById("admin-reviews-list");
    if (!container) return;

    const feedbacks = window.ArtifexStore.getFeedbacks();

    container.innerHTML = feedbacks.map(fb => `
      <div class="card" style="padding:1.25rem 1.5rem;display:flex;align-items:center;gap:1.25rem;flex-wrap:wrap;">
        <img src="${fb.instructorAvatar}" alt="${fb.instructorName}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0;">
        <div style="flex:1;min-width:220px;">
          <h4 style="font-size:1.05rem;">${fb.assignmentTitle}</h4>
          <p style="font-size:0.85rem;color:var(--text-muted);">Reviewed by ${fb.instructorName} • ${fb.feedbackDate}</p>
        </div>
        <span class="badge ${fb.revisionRequired ? 'badge-coral' : 'badge-sage'}">${fb.grade}</span>
        ${fb.revisionRequired
          ? `<span class="badge badge-peach">Revision Requested</span>`
          : `<span class="badge badge-cobalt">Approved</span>`}
      </div>
    `).join("");
  }

  function renderAdminRevenue() {
    const mrr = document.getElementById("admin-revenue-mrr");
    if (mrr) mrr.textContent = window.ArtifexData.adminOverview.monthlyRecurringRevenue;

    const tbody = document.getElementById("admin-revenue-table-body");
    if (!tbody) return;

    tbody.innerHTML = window.ArtifexData.paymentHistory.map(inv => `
      <tr>
        <td style="font-weight:700;">${inv.invoiceNo}</td>
        <td>${inv.date}</td>
        <td>${inv.plan}</td>
        <td style="font-weight:700;">${inv.amount}</td>
        <td><span class="badge badge-sage">${inv.status}</span></td>
      </tr>
    `).join("");
  }

  function renderAdminNotifications() {
    const container = document.getElementById("admin-notifications-list");
    if (!container) return;

    const notifs = window.ArtifexStore.getNotifications();

    container.innerHTML = notifs.map(n => `
      <div class="metric-card" style="margin-bottom:0;background:${n.unread ? 'var(--bg-surface)' : 'var(--bg-secondary)'};border-left:4px solid ${n.unread ? 'var(--color-coral)' : 'var(--border-medium)'};">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.25rem;">
          <h5 style="font-size:1.05rem;">${n.title}</h5>
          <span style="font-size:0.75rem;color:var(--text-muted);">${n.time}</span>
        </div>
        <p style="font-size:0.9rem;color:var(--text-secondary);">${n.message}</p>
      </div>
    `).join("");

    const markAllBtn = document.getElementById("btn-admin-mark-read");
    if (markAllBtn) {
      markAllBtn.addEventListener("click", () => {
        window.ArtifexStore.markNotificationsRead();
        renderAdminNotifications();
        window.ArtifexStore.showToast("All notifications marked as read", "info");
      }, { once: true });
    }
  }

  function renderAdminAnnouncements() {
    const container = document.getElementById("admin-announce-list");
    if (!container) return;

    container.innerHTML = announcements.map(a => `
      <div class="metric-card" style="margin-bottom:0;border-left:4px solid var(--color-cobalt);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.25rem;">
          <h5 style="font-size:1.05rem;">${a.title}</h5>
          <span style="font-size:0.75rem;color:var(--text-muted);">${a.time}</span>
        </div>
        <p style="font-size:0.9rem;color:var(--text-secondary);">${a.message}</p>
      </div>
    `).join("");
  }

  function setupAnnounceForm() {
    const form = document.getElementById("admin-announce-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("announce-title").value.trim();
      const message = document.getElementById("announce-message").value.trim();
      if (!title || !message) return;

      announcements.unshift({
        title,
        message,
        time: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      });
      renderAdminAnnouncements();
      form.reset();
      window.ArtifexStore.showToast("Announcement published to all learners!", "success");
    });
  }

  function setupSettingsForm() {
    const form = document.getElementById("admin-settings-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      window.ArtifexStore.showToast("Platform settings saved successfully!", "success");
    });
  }

  document.addEventListener("DOMContentLoaded", initAdminDashboard);
})();
