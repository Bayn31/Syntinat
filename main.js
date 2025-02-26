document.addEventListener('DOMContentLoaded', () => {
  // Initialize ScrollReveal
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '20px',
    duration: 1000,
    delay: 200,
    easing: 'ease'
  });

  // Apply animations to elements
  sr.reveal('.hero', {
    origin: 'left',
    distance: '50px',
  });
  sr.reveal('.hero-image', { 
    origin: 'right',
    distance: '50px',
    delay: 300 
  });
  sr.reveal('.stat-item', { 
    interval: 200,
    origin: 'bottom',
    distance: '30px'
  });
  sr.reveal('.tech-badge', { 
    interval: 100,
    origin: 'bottom',
    distance: '20px'
  });
  sr.reveal('.scroll-indicator', { 
    delay: 1000,
    origin: 'bottom',
    distance: '30px'
  });
  sr.reveal('.service-card', { interval: 200 });
  sr.reveal('.project-card', { interval: 200 });
  sr.reveal('.contact-info', { origin: 'left' });
  sr.reveal('.contact-form-container', { origin: 'right' });
  sr.reveal('.decoration-circle, .decoration-square, .decoration-dots, .decoration-line', { 
    interval: 100, 
    origin: 'top',
    distance: '30px'
  });
  sr.reveal('.projects-filter', { 
    origin: 'top',
    distance: '20px' 
  });
  sr.reveal('.projects-pagination', { 
    delay: 300,
    origin: 'bottom',
    distance: '20px' 
  });
  sr.reveal('.contact-method', { 
    interval: 200,
    origin: 'left',
    distance: '30px'
  });
  sr.reveal('.contact-social', { 
    delay: 400,
    origin: 'bottom'
  });

  // Mobile menu functionality with enhanced animation
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');
  
  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Highlight active nav item based on scroll
  const sections = document.querySelectorAll('section, header');
  const navItems = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 300)) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(navItem => {
      navItem.classList.remove('active');
      if (navItem.getAttribute('href') === `#${current}`) {
        navItem.classList.add('active');
      }
    });
    
    // Add scrolled class to nav for background change
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
          burgerMenu.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Website illustration animation
  const websiteIllustration = document.querySelector('.placeholder-image');
  if (websiteIllustration) {
    websiteIllustration.addEventListener('mousemove', (e) => {
      const rect = websiteIllustration.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / websiteIllustration.clientWidth - 0.5) * 10;
      const y = ((e.clientY - rect.top) / websiteIllustration.clientHeight - 0.5) * 10;
      
      websiteIllustration.style.transform = `perspective(1000px) rotateY(${-x}deg) rotateX(${y}deg)`;
    });
    
    websiteIllustration.addEventListener('mouseleave', () => {
      websiteIllustration.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(0deg)';
    });
  }

  // Form handling with improved validation and feedback
  const contactForm = document.getElementById('contact-form');
  
  // Function to show error
  const showError = (input, message) => {
    input.style.borderColor = '#e74c3c';
    const formGroup = input.parentElement;
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.5rem';
    errorElement.style.position = 'absolute';
    errorElement.style.bottom = '-1.5rem';
    errorElement.style.left = '0';
    
    // Remove existing error messages
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
      formGroup.removeChild(existingError);
    }
    
    formGroup.appendChild(errorElement);
  };
  
  // Function to clear error
  const clearError = (input) => {
    input.style.borderColor = '#ddd';
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
      formGroup.removeChild(errorElement);
    }
  };

  // Input focus and blur styling
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      clearError(input);
    });
    
    input.addEventListener('blur', () => {
      if (input.value.trim() !== '') {
        input.classList.add('has-content');
      } else {
        input.classList.remove('has-content');
      }
    });
  });
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Get form values
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const privacy = document.getElementById('privacy');

    // Validate name
    if (name.value.trim() === '') {
      showError(name, 'Veuillez entrer votre nom');
      isValid = false;
    } else {
      clearError(name);
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
      showError(email, 'Veuillez entrer votre email');
      isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      showError(email, 'Veuillez entrer un email valide');
      isValid = false;
    } else {
      clearError(email);
    }

    // Validate subject
    if (subject.value === '') {
      showError(subject, 'Veuillez sélectionner un sujet');
      isValid = false;
    } else {
      clearError(subject);
    }

    // Validate message
    if (message.value.trim() === '') {
      showError(message, 'Veuillez entrer votre message');
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showError(message, 'Votre message doit contenir au moins 10 caractères');
      isValid = false;
    } else {
      clearError(message);
    }

    // Validate privacy checkbox
    if (!privacy.checked) {
      const formGroup = privacy.parentElement;
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = 'Vous devez accepter la politique de confidentialité';
      errorElement.style.color = '#e74c3c';
      errorElement.style.fontSize = '0.8rem';
      errorElement.style.marginTop = '0.5rem';
      
      // Remove existing error messages
      const existingError = formGroup.querySelector('.error-message');
      if (existingError) {
        formGroup.removeChild(existingError);
      }
      
      formGroup.appendChild(errorElement);
      isValid = false;
    } else {
      const formGroup = privacy.parentElement;
      const existingError = formGroup.querySelector('.error-message');
      if (existingError) {
        formGroup.removeChild(existingError);
      }
    }

    // If form is valid, submit the form
    if (isValid) {
      // Show sending feedback
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnContent = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Envoi en cours...</span>';
      submitBtn.disabled = true;
      
      // Simulate form submission with a timeout
      setTimeout(() => {
        // Here you would typically send the form data to a server
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Merci pour votre message ! Nous vous recontacterons bientôt.';
        successMessage.style.color = '#2ecc71';
        successMessage.style.padding = '1rem';
        successMessage.style.marginTop = '1rem';
        successMessage.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
        successMessage.style.borderRadius = '10px';
        successMessage.style.textAlign = 'center';
        successMessage.style.fontWeight = '500';
        
        contactForm.appendChild(successMessage);
        contactForm.reset();
        
        // Restore button state
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          contactForm.removeChild(successMessage);
        }, 5000);
      }, 2000);
    }
  });

  // Intersection Observer for navbar background
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');

  const headerObserver = new IntersectionObserver(
    ([entry]) => {
      nav.style.background = entry.isIntersecting
        ? 'rgba(255, 255, 255, 0.95)'
        : 'rgba(255, 255, 255, 0.98)';
    },
    { threshold: 0.9 }
  );

  headerObserver.observe(header);

  // Animation for service icons on hover
  document.querySelectorAll('.service-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });
  
  // Add subtle animation to the website illustration
  const websiteIllustrationSvg = document.querySelector('.placeholder-image svg');
  if (websiteIllustrationSvg) {
    websiteIllustrationSvg.addEventListener('mouseenter', () => {
      websiteIllustrationSvg.style.transform = 'translateY(-5px)';
      websiteIllustrationSvg.style.transition = 'transform 0.3s ease';
    });
    
    websiteIllustrationSvg.addEventListener('mouseleave', () => {
      websiteIllustrationSvg.style.transform = 'translateY(0)';
    });
  }

  // Service card interactive features
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const features = card.querySelector('.service-features');
      features.style.transform = 'translateY(0)';
      features.style.opacity = '1';
    });
  });
  
  // Animate service decoration elements
  const servicesSection = document.getElementById('services');
  
  // Parallax effect on decoration elements
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const servicesSectionTop = servicesSection.offsetTop;
    const servicesSectionHeight = servicesSection.offsetHeight;
    
    if (scrollPosition > servicesSectionTop - window.innerHeight && 
        scrollPosition < servicesSectionTop + servicesSectionHeight) {
      
      const relativeScroll = (scrollPosition - (servicesSectionTop - window.innerHeight)) / 
                            (servicesSectionHeight + window.innerHeight);
      
      document.querySelectorAll('.decoration-circle').forEach(circle => {
        circle.style.transform = `translateY(${relativeScroll * 30}px) rotate(${relativeScroll * 360}deg)`;
      });
      
      document.querySelectorAll('.decoration-square').forEach(square => {
        square.style.transform = `translateY(${relativeScroll * -20}px) rotate(${45 + relativeScroll * 30}deg)`;
      });
    }
  });

  // Projects Filter Functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filterValue = button.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Projects card hover effects
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const projectLink = card.querySelector('.project-link');
      if (projectLink) {
        projectLink.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const projectLink = card.querySelector('.project-link');
      if (projectLink) {
        projectLink.style.color = '';
      }
    });
  });
  
  // Pagination functionality
  const paginationButtons = document.querySelectorAll('.pagination-btn');
  
  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      paginationButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Here you would typically load new projects or paginate
      // For now, we'll just scroll to top of projects section
      document.getElementById('projets').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  
  // Enhanced hover effects for contact methods
  document.querySelectorAll('.contact-method').forEach(method => {
    method.addEventListener('mouseenter', () => {
      const icon = method.querySelector('.contact-icon');
      icon.style.transform = 'scale(1.1)';
      icon.style.background = 'rgba(52, 152, 219, 0.2)';
    });
    
    method.addEventListener('mouseleave', () => {
      const icon = method.querySelector('.contact-icon');
      icon.style.transform = '';
      icon.style.background = 'rgba(52, 152, 219, 0.1)';
    });
  });

  // Footer animations
  sr.reveal('.footer-section', {
    origin: 'bottom',
    distance: '20px',
    interval: 200,
    delay: 200
  });
  
  sr.reveal('.footer-bottom', {
    origin: 'bottom',
    distance: '20px',
    delay: 400
  });
  
  // Footer social icons hover effect
  document.querySelectorAll('.footer-social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'translateY(-5px)';
      icon.style.background = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = '';
      icon.style.background = 'rgba(255, 255, 255, 0.1)';
    });
  });
  
  // Footer links hover animation
  document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.paddingLeft = '20px';
      link.style.color = 'white';
      const dot = link.querySelector('::before');
      if (dot) {
        dot.style.opacity = '1';
        dot.style.left = '5px';
      }
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.paddingLeft = '15px';
      link.style.color = 'rgba(255, 255, 255, 0.7)';
      const dot = link.querySelector('::before');
      if (dot) {
        dot.style.opacity = '0.7';
        dot.style.left = '0';
      }
    });
  });
});