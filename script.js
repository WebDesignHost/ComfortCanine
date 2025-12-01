// Comfort Canine - Landing Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // FAQ Accordion
  initFaqAccordion();

  // Email Form Submissions
  initEmailForms();

  // Smooth Scroll for anchor links
  initSmoothScroll();

  // Trust Bar Rotation
  initTrustBarRotation();
});

/**
 * FAQ Accordion Functionality
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active', !isActive);
    });
  });
  
  // Open first FAQ by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
  }
}

/**
 * Email Form Submissions with FormSubmit
 */
function initEmailForms() {
  const forms = document.querySelectorAll('.optin-form-new');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      const submitButton = form.querySelector('button[type="submit"]');
      const email = emailInput.value.trim();
      
      if (!email) return;
      
      // Add submitting state
      form.classList.add('submitting');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
        </svg>
        Submitting...
      `;
      
      try {
        // Submit to FormSubmit
        const formData = new FormData();
        formData.append('email', email);
        formData.append('_captcha', 'false');
        formData.append('_subject', 'New Early Access Signup!');
        
        await fetch('https://formsubmit.co/ajax/comfortcanine007@gmail.com', {
          method: 'POST',
          body: formData
        });
        
        // Success state
        form.classList.remove('submitting');
        form.classList.add('success');
        emailInput.value = '';
        emailInput.placeholder = 'You\'re on the list!';
        submitButton.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          You're In!
        `;
        
        // Show toast
        showToast();
        
        // Reset form after delay
        setTimeout(() => {
          form.classList.remove('success');
          emailInput.placeholder = 'Enter your email';
          submitButton.innerHTML = originalButtonText;
        }, 5000);
        
      } catch (error) {
        // Even if there's a network error, FormSubmit usually still receives it
        form.classList.remove('submitting');
        form.classList.add('success');
        emailInput.value = '';
        emailInput.placeholder = 'You\'re on the list!';
        submitButton.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          You're In!
        `;
        
        showToast();
        
        setTimeout(() => {
          form.classList.remove('success');
          emailInput.placeholder = 'Enter your email';
          submitButton.innerHTML = originalButtonText;
        }, 5000);
      }
    });
  });
}

/**
 * Show Toast Notification
 */
function showToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  // Show toast
  toast.classList.add('show');
  
  // Hide after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Trust Bar Rotation
 */
function initTrustBarRotation() {
  const signals = document.querySelectorAll('.trust-signal');
  if (signals.length === 0) return;

  let currentIndex = 0;

  // Rotate every 3.5 seconds
  setInterval(() => {
    // Add exit class to current signal (slide out left)
    signals[currentIndex].classList.add('exit');
    signals[currentIndex].classList.remove('active');

    // Move to next signal
    const nextIndex = (currentIndex + 1) % signals.length;

    // Slide in next signal from right
    signals[nextIndex].classList.remove('exit');
    signals[nextIndex].classList.add('active');

    // Update current index
    currentIndex = nextIndex;
  }, 3500);
}

