/**
 * Artifex Academy — Public Pages Interactive Handlers
 * Gallery medium filters, FAQ accordions, pricing plan switches,
 * contact form validation, countdown timers, and demo auth.
 */

(function () {
  function initPageInteractions() {
    // 1. Student Showcase Gallery Filtering
    const filterButtons = document.querySelectorAll(".gallery-filter-bar .filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-grid .artwork-card");

    if (filterButtons.length && galleryItems.length) {
      filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          filterButtons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");

          const filterCategory = btn.getAttribute("data-filter");

          galleryItems.forEach(item => {
            const itemCat = item.getAttribute("data-category");
            if (filterCategory === "all" || itemCat === filterCategory) {
              item.style.display = "block";
              requestAnimationFrame(() => item.style.opacity = "1");
            } else {
              item.style.opacity = "0";
              setTimeout(() => {
                if (btn.getAttribute("data-filter") !== "all" && itemCat !== btn.getAttribute("data-filter")) {
                  item.style.display = "none";
                }
              }, 200);
            }
          });
        });
      });
    }

    // 2. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll(".faq-accordion .faq-item");
    if (faqItems.length) {
      faqItems.forEach(item => {
        const questionBtn = item.querySelector(".faq-question");
        if (questionBtn) {
          questionBtn.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");
            // Close other items
            faqItems.forEach(other => {
              if (other !== item) other.classList.remove("open");
            });
            // Toggle current
            item.classList.toggle("open", !isOpen);
          });
        }
      });
    }

    // 3. Pricing Period Toggle (Monthly vs Annual)
    const pricingSwitch = document.querySelector(".pricing-billing-switch .switch-control");
    if (pricingSwitch) {
      pricingSwitch.addEventListener("click", () => {
        const isYearly = pricingSwitch.classList.toggle("yearly");
        const priceAmounts = document.querySelectorAll("[data-price-monthly]");
        
        priceAmounts.forEach(el => {
          const m = el.getAttribute("data-price-monthly");
          const y = el.getAttribute("data-price-yearly");
          el.textContent = isYearly ? y : m;
        });

        const periodLabels = document.querySelectorAll(".pricing-period");
        periodLabels.forEach(p => {
          p.textContent = isYearly ? "/ year" : "/ month";
        });

        window.ArtifexStore.showToast(isYearly ? "Showing Annual Pricing (Save up to 20%)" : "Showing Monthly Billing", "info");
      });
    }

    // 4. Contact Us Form Submission
    const contactForm = document.getElementById("artifex-contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector("button[type='submit']");
        const origText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "Transmitting to Admissions...";

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = origText;
          contactForm.reset();
          window.ArtifexStore.showToast("Message sent! An Artifex mentor will reply within 24 hours.", "success", 5000);
        }, 1200);
      });
    }

    // 5. Newsletter Signups
    document.querySelectorAll(".newsletter-form").forEach(form => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector("input[type='email']");
        if (input && input.value) {
          window.ArtifexStore.showToast(`Subscribed ${input.value} to Artifex Weekly Studio Dispatch!`, "success");
          form.reset();
        }
      });
    });

    // 6. Maintenance Countdown Timer
    const countdownContainer = document.getElementById("artifex-countdown");
    if (countdownContainer) {
      // Set launch date to 48 days from now
      const launchDate = new Date();
      launchDate.setDate(launchDate.getDate() + 48);

      function updateClock() {
        const now = new Date();
        const diff = launchDate - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const mins = Math.floor((diff / 1000 / 60) % 60);
          const secs = Math.floor((diff / 1000) % 60);

          const daysEl = document.getElementById("cd-days");
          const hoursEl = document.getElementById("cd-hours");
          const minsEl = document.getElementById("cd-mins");
          const secsEl = document.getElementById("cd-secs");

          if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
          if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
          if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
          if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
        }
      }

      updateClock();
      setInterval(updateClock, 1000);
    }

    // 7. Auth Pages (Login & Signup Forms)
    const authTabs = document.querySelectorAll(".auth-tab-btn");
    const authForms = document.querySelectorAll(".auth-form-panel");

    if (authTabs.length && authForms.length) {
      authTabs.forEach(tab => {
        tab.addEventListener("click", () => {
          authTabs.forEach(t => t.classList.remove("active"));
          authForms.forEach(f => f.classList.remove("active"));

          tab.classList.add("active");
          const targetId = tab.getAttribute("data-target");
          const panel = document.getElementById(targetId);
          if (panel) panel.classList.add("active");
        });
      });
    }

    const loginForm = document.getElementById("form-login");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = loginForm.querySelector("#login-email").value;
        const submitBtn = loginForm.querySelector("button[type='submit']");
        submitBtn.disabled = true;
        submitBtn.textContent = "Authenticating Atelier Session...";

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = "Sign In to Studio";
          window.ArtifexStore.showToast(`Welcome back, ${email.split('@')[0]}! Taking you to the home page...`, "success");
          setTimeout(() => {
            window.location.href = "../index.html";
          }, 800);
        }, 1000);
      });
    }

    const regForm = document.getElementById("form-register");
    if (regForm) {
      regForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = regForm.querySelector("#reg-name").value;
        const email = regForm.querySelector("#reg-email").value;
        const medium = regForm.querySelector("#reg-medium").value;
        const level = regForm.querySelector("#reg-level").value;

        const updatedUser = {
          ...window.ArtifexData.currentUser,
          name: name,
          email: email,
          preferredMedium: medium,
          skillLevel: level
        };

        window.ArtifexStore.saveUser(updatedUser);
        window.ArtifexStore.showToast("Account created successfully! Taking you to the home page...", "success");

        setTimeout(() => {
          window.location.href = "../index.html";
        }, 900);
      });
    }

    // Password reset simulation
    const resetForm = document.getElementById("form-reset-password");
    if (resetForm) {
      resetForm.addEventListener("submit", (e) => {
        e.preventDefault();
        window.ArtifexStore.showToast("Reset link dispatched to your email address.", "success");
        resetForm.reset();
      });
    }
  }

  document.addEventListener("DOMContentLoaded", initPageInteractions);
})();
