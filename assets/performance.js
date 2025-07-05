// Performance-optimized JavaScript for Creamy Fabrics
// This file contains essential functionality with performance best practices

(function() {
  'use strict';
  
  // Performance monitoring
  const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
      }
      if (entry.entryType === 'first-input') {
        console.log('FID:', entry.processingStart - entry.startTime);
      }
    }
  });
  
  performanceObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
  
  // Optimized image loading
  function optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px'
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }
  
  // Optimized lazy loading for iframes
  function optimizeIframes() {
    const iframes = document.querySelectorAll('iframe[data-src]');
    
    if ('IntersectionObserver' in window) {
      const iframeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            iframe.src = iframe.dataset.src;
            iframe.removeAttribute('data-src');
            observer.unobserve(iframe);
          }
        });
      }, {
        rootMargin: '100px 0px'
      });
      
      iframes.forEach(iframe => iframeObserver.observe(iframe));
    }
  }
  
  // Optimized event delegation
  function setupEventDelegation() {
    document.addEventListener('click', function(e) {
      // Handle product quick view
      if (e.target.matches('[data-quick-view]')) {
        e.preventDefault();
        const productId = e.target.dataset.productId;
        openQuickView(productId);
      }
      
      // Handle add to cart
      if (e.target.matches('[data-add-to-cart]')) {
        e.preventDefault();
        const form = e.target.closest('form');
        if (form) {
          addToCart(form);
        }
      }
    });
  }
  
  // Optimized quick view
  function openQuickView(productId) {
    // Implementation for quick view modal
    console.log('Opening quick view for product:', productId);
  }
  
  // Optimized add to cart
  async function addToCart(form) {
    try {
      const formData = new FormData(form);
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        updateCartCount();
        showNotification('Product added to cart!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
  
  // Optimized cart count update
  function updateCartCount() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const cartCountElements = document.querySelectorAll('[data-cart-count]');
        cartCountElements.forEach(element => {
          element.textContent = cart.item_count;
        });
      })
      .catch(error => console.error('Error updating cart count:', error));
  }
  
  // Optimized notification system
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  
  // Optimized search functionality
  function setupSearch() {
    const searchInput = document.querySelector('[data-search-input]');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function(e) {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length < 2) return;
      
      searchTimeout = setTimeout(() => {
        performSearch(query);
      }, 300);
    });
  }
  
  // Optimized search performance
  async function performSearch(query) {
    try {
      const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}`);
      const suggestions = await response.json();
      displaySearchResults(suggestions);
    } catch (error) {
      console.error('Search error:', error);
    }
  }
  
  function displaySearchResults(results) {
    const resultsContainer = document.querySelector('[data-search-results]');
    if (!resultsContainer) return;
    
    // Implementation for displaying search results
    console.log('Search results:', results);
  }
  
  // Optimized scroll performance
  function setupScrollOptimizations() {
    let ticking = false;
    
    function updateOnScroll() {
      // Handle scroll-based animations
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
  }
  
  // Optimized resize handling
  function setupResizeOptimizations() {
    let resizeTimeout;
    
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Handle resize-based updates
        console.log('Window resized');
      }, 250);
    }
    
    window.addEventListener('resize', handleResize, { passive: true });
  }
  
  // Optimized form handling
  function setupFormOptimizations() {
    const forms = document.querySelectorAll('form[data-optimized]');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        const submitButton = form.querySelector('[type="submit"]');
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Processing...';
        }
      });
    });
  }
  
  // Initialize all optimizations
  function init() {
    // Run immediately
    optimizeImages();
    optimizeIframes();
    setupEventDelegation();
    setupSearch();
    setupScrollOptimizations();
    setupResizeOptimizations();
    setupFormOptimizations();
    
    // Run after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        // Additional DOM-dependent optimizations
      });
    }
  }
  
  // Start optimizations
  init();
  
})(); 