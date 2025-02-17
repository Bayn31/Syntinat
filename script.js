document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init({
    duration: 1200,
    once: true,
    offset: 100
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Contact button click handler
  const contactButton = document.querySelector('.cta-button');
  contactButton.addEventListener('click', () => {
    window.location.href = 'mailto:contact@example.com';
  });

  // Intersection Observer for nav highlighting
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('nav a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.id;
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.style.color = '#FFD700';
          } else {
            link.style.color = '#000000';
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Enhanced portfolio interaction
  document.querySelectorAll('.view-site').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      // Add your portfolio item click handling here
      alert('Démo du site en cours de développement');
    });
  });

  // Enhanced portfolio animations
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  const animatePortfolio = () => {
    portfolioItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      const itemBottom = item.getBoundingClientRect().bottom;
      
      if (itemTop < window.innerHeight - 100 && itemBottom > 0) {
        item.classList.add('animate');
      } else {
        item.classList.remove('animate');
      }
    });
  };

  // Initial animation check
  animatePortfolio();

  // Animate on scroll
  window.addEventListener('scroll', () => {
    animatePortfolio();
  });

  // Portfolio item hover effects
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      const btn = item.querySelector('.view-site');
      if (btn) {
        btn.style.transform = 'translateY(0) scale(1.1)';
      }
    });

    item.addEventListener('mouseleave', (e) => {
      const btn = item.querySelector('.view-site');
      if (btn) {
        btn.style.transform = 'translateY(0) scale(1)';
      }
    });
  });

  // Smooth reveal animation for portfolio section
  const portfolioSection = document.querySelector('#realisations');
  const observerPortfolio = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        portfolioItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate');
          }, index * 200);
        });
      }
    });
  }, { threshold: 0.2 });

  if (portfolioSection) {
    observerPortfolio.observe(portfolioSection);
  }

  // Add animations for About section
  const aboutSection = document.querySelector('#apropos');
  const highlightText = document.querySelector('.highlight-text');
  const advantageItems = document.querySelectorAll('.advantage-item');

  const observerAbout = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate highlight text
        if (highlightText) {
          highlightText.classList.add('animate');
        }
        
        // Animate advantage items with delay
        advantageItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate');
          }, index * 200);
        });
      }
    });
  }, { threshold: 0.2 });

  if (aboutSection) {
    observerAbout.observe(aboutSection);
  }

  // Contact section animations
  const contactSection = document.querySelector('#contact');
  const contactElements = contactSection.querySelectorAll('h2, p, .cta-button');

  const observerContact = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contactElements.forEach((element, index) => {
          setTimeout(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
          }, index * 200);
        });
      }
    });
  }, { threshold: 0.5 });

  contactElements.forEach(element => {
    element.style.transform = 'translateY(30px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  observerContact.observe(contactSection);

  // Add hover effect for contact button
  const contactButtonForHover = contactSection.querySelector('.cta-button');
  if (contactButtonForHover) {
    contactButtonForHover.addEventListener('mouseenter', () => {
      contactButtonForHover.style.transform = 'scale(1.1) translateY(-10px)';
      document.querySelectorAll('#contact p').forEach(p => {
        p.style.transform = 'translateY(-5px)';
        p.style.color = 'var(--primary)';
      });
    });

    contactButtonForHover.addEventListener('mouseleave', () => {
      contactButtonForHover.style.transform = 'scale(1) translateY(0)';
      document.querySelectorAll('#contact p').forEach(p => {
        p.style.transform = 'translateY(0)';
        p.style.color = 'initial';
      });
    });
  }

  // Enhanced hover interactions
  document.querySelectorAll('.service-card, .portfolio-item, .advantage-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      item.appendChild(ripple);
      
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
      
      // Add floating animation
      item.style.transform = 'translateY(-15px) scale(1.05)';
      item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    item.addEventListener('mouseleave', (e) => {
      item.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add magnetic effect to buttons
  document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      button.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px) scale(1.1)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0) scale(1)';
    });
  });

  // Add particle effect on hover for section headings
  document.querySelectorAll('h2').forEach(heading => {
    heading.addEventListener('mouseenter', () => {
      // Create and animate particles
      for(let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        heading.appendChild(particle);
        
        const size = Math.random() * 8 + 4;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 2 + 1;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = 'var(--primary)';
        particle.style.position = 'absolute';
        particle.style.borderRadius = '50%';
        
        const animation = particle.animate([
          {
            transform: 'translate(0, 0)',
            opacity: 1
          },
          {
            transform: `translate(${Math.cos(angle) * 100 * velocity}px, ${Math.sin(angle) * 100 * velocity}px)`,
            opacity: 0
          }
        ], {
          duration: 1000,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => particle.remove();
      }
    });
  });
});

// Initialize all animations
window.addEventListener('load', () => {
  // Existing AOS initialization remains
});