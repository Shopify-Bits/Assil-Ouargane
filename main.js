document.addEventListener("DOMContentLoaded", function () {
  // Plan button clicks
  const buttons = document.querySelectorAll(".cta-button");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      const planName = this.getAttribute("data-plan");
      const planPrice = this.getAttribute("data-price");

      let message = `السلام عليكم، أريد الاستفسار عن ${planName} (${planPrice})`;

      const whatsappNumber = "212669111392";
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappURL, "_blank");
    });
  });

  // Contact Form Logic
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value.trim();
      }

      // Validate required fields
      let isValid = true;
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "selectedPlan",
      ];

      requiredFields.forEach((field) => {
        const input = document.getElementById(field);

        if (!data[field]) {
          input.style.borderColor = "#e53e3e";
          isValid = false;
        } else {
          input.style.borderColor = "#e2e8f0";
        }
      });

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (data.email && !emailRegex.test(data.email)) {
        document.getElementById("email").style.borderColor = "#e53e3e";
        isValid = false;
      }

      if (!isValid) {
        alert("يرجى ملء جميع الحقول المطلوبة بشكل صحيح");
        return;
      }

      // Format SHORT WhatsApp message for Arabic
      let message = `🌿 طلب جديد من الموقع:\n`;
      message += `الاسم: ${data.firstName} ${data.lastName}\n`;
      message += `الإيميل: ${data.email}\n`;
      message += `الهاتف: ${data.phone}\n`;
      message += `الباقة: ${data.selectedPlan}`;

      if (data.company) {
        message += `\nالشركة: ${data.company}`;
      }

      if (data.message) {
        message += `\nالتفاصيل: ${data.message}`;
      }

      // WhatsApp URL (Moroccan number)
      const whatsappNumber = "212669111392";
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      // Add loading state
      const submitBtn = this.querySelector(".form-submit-btn");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = "<span>جاري الفتح...</span>";
      submitBtn.disabled = true;

      // Open WhatsApp
      window.open(whatsappURL, "_blank");

      // Reset button after delay
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        alert("تم فتح واتساب! يرجى إرسال الرسالة لإكمال طلبك.");
        this.reset();
      }, 2000);
    });

    // Remove error styling on input
    const inputs = contactForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        this.style.borderColor = "#e2e8f0";
      });
    });
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll(".feature-card, .pricing-card").forEach((el) => {
    observer.observe(el);
  });
});
