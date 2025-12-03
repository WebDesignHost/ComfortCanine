// Announcement Bar Rotation
(function() {
  const messages = document.querySelectorAll('.announcement-message');
  let currentIndex = 0;

  function rotateMessages() {
    messages.forEach((msg, index) => {
      msg.classList.remove('active');
    });
    currentIndex = (currentIndex + 1) % messages.length;
    messages[currentIndex].classList.add('active');
  }

  setInterval(rotateMessages, 3000);
})();

// Pricing Option Selection
const pricingOptions = document.querySelectorAll('.pricing-option');
const selectedPriceEl = document.getElementById('selectedPrice');
const mobileCtaLabel = document.getElementById('mobileCtaLabel');
const mobileCtaPrice = document.getElementById('mobileCtaPrice');

pricingOptions.forEach(option => {
  option.addEventListener('click', function() {
    // Remove selected from all
    pricingOptions.forEach(opt => {
      opt.classList.remove('selected');
      opt.setAttribute('aria-checked', 'false');
    });
    
    // Add selected to clicked
    this.classList.add('selected');
    this.setAttribute('aria-checked', 'true');
    
    // Update prices
    const price = this.dataset.price;
    const label = this.dataset.label;
    
    selectedPriceEl.textContent = price;
    mobileCtaLabel.textContent = label;
    mobileCtaPrice.textContent = price;
  });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', function() {
    const isOpen = item.classList.contains('open');
    
    // Close all other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      }
    });
    
    // Toggle current item
    if (isOpen) {
      item.classList.remove('open');
      this.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('open');
      this.setAttribute('aria-expanded', 'true');
    }
  });
});

// Modal Functions
const modalOverlay = document.getElementById('modalOverlay');
const modalForm = document.getElementById('modalForm');
const modalSuccess = document.getElementById('modalSuccess');
const emailForm = document.getElementById('emailForm');
const mainGetButton = document.getElementById('mainGetButton');

function openModal() {
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  // Reset to form view
  modalForm.style.display = 'block';
  modalSuccess.style.display = 'none';
  
  // Focus on email input
  setTimeout(() => {
    const emailInput = document.querySelector('.modal-input');
    if (emailInput) emailInput.focus();
  }, 100);
}

function closeModal(event) {
  if (event && event.target !== modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
    closeModal();
  }
});

// Main Get Button
mainGetButton.addEventListener('click', openModal);

// Form submission handling
emailForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent page redirect
  
  const email = this.querySelector('input[name="email"]').value;
  const formData = new FormData(this);
  
  // Submit via fetch to avoid redirect
  fetch(this.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    console.log('Email submitted:', email);
  }).catch(error => {
    console.log('Form submitted (offline or blocked):', email);
  });
  
  // Show success state immediately
  modalForm.style.display = 'none';
  modalSuccess.style.display = 'block';
  
  // Close modal after delay
  setTimeout(() => {
    closeModal();
    // Reset form
    emailForm.reset();
    modalForm.style.display = 'block';
    modalSuccess.style.display = 'none';
  }, 3000);
});

// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add intersection observer for scroll animations (optional enhancement)
if ('IntersectionObserver' in window) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe sections for fade-in effect
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '1'; // Ensure visible by default
  });
}

