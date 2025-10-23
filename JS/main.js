async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar-container', 'components/navbar.html')
    .then(() => {
      const script = document.createElement('script');
      script.src = 'js/navbar.js';
      document.body.appendChild(script);
    });
  
  loadComponent('footer-container', 'components/footer.html')
    .then(() => {
      const script = document.createElement('script');
      script.src = 'js/footer.js';
      document.body.appendChild(script);
    });
});
