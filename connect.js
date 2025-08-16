// Connect Page JavaScript

// GSAP Animations
gsap.from('.connect-title', {
    duration: 1.2,
    y: -50,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.connect-subtitle', {
    duration: 1.2,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.3
});

gsap.from('.contact-form-container', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.6
});

gsap.from('.info-item', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.9,
    stagger: 0.2
});

// Form Handling
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // For local testing, show success modal
        // In production, this would send to your email service
        await sendEmail(formData);
        
        // Show success modal
        document.getElementById('successModal').style.display = 'block';
        
        // Reset form
        this.reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        alert('There was an error sending your message. Please try again or contact me directly at rampyaaryan17@gmail.com');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Email sending function using Formspree
async function sendEmail(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject') || 'Portfolio Contact';
    const message = formData.get('message');
    
    try {
        // Formspree will handle the email sending automatically
        // We just need to submit the form to Formspree's endpoint
        const form = document.getElementById('contactForm');
        
        // Create a new FormData with the correct field names for Formspree
        const formspreeData = new FormData();
        formspreeData.append('name', name);
        formspreeData.append('email', email);
        formspreeData.append('subject', subject);
        formspreeData.append('message', message);
        
        // Submit to Formspree
        const response = await fetch('https://formspree.io/f/myzegbok', {
            method: 'POST',
            body: formspreeData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            console.log('Email sent successfully via Formspree');
            return { status: 'success' };
        } else {
            throw new Error('Formspree submission failed');
        }
        
    } catch (error) {
        console.error('Formspree Error:', error);
        throw new Error('Failed to send email. Please try again or contact me directly.');
    }
}

// Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Close modal when clicking outside
document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeSuccessModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSuccessModal();
    }
});

// Form validation and enhancement
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Add paint splash effect on input
    input.addEventListener('input', function() {
        if (this.value.length > 0) {
            this.style.borderColor = '#000';
        }
    });
});

// Add some interactive effects
document.querySelectorAll('.info-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add loading animation to form submission
function showLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
}

function hideLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    submitBtn.disabled = false;
}

// Enhanced form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name.length < 2) {
        alert('Please enter a valid name (at least 2 characters)');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (message.length < 10) {
        alert('Please enter a message (at least 10 characters)');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add form validation to submit
document.getElementById('contactForm').addEventListener('submit', function(e) {
    if (!validateForm()) {
        e.preventDefault();
        return false;
    }
});
