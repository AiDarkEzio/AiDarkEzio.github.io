(function() { // Use an IIFE to avoid polluting global scope
    function getPageNameFromPath() {
      let path = window.location.pathname;
  
      // Remove leading slash if present
      if (path.startsWith('/')) {
        path = path.substring(1);
      }
  
      // Remove trailing slash if present
      if (path.endsWith('/')) {
        path = path.slice(0, -1);
      }
  
      // Remove .html extension if present (common for static sites)
      if (path.endsWith('.html')) {
        path = path.slice(0, -5); // Remove last 5 characters (.html)
      }
  
      // If path is now empty (e.g., just on the homepage / or index.html), use "home"
      if (!path) {
        return 'aidarkezio-github-web-portfolio-home-page';
      }

      path = path.split('/').pop(); // Get the last part of the path
  
      return `aidarkezio-github-web-portfolio-${path}-page`;
    }
  
    document.addEventListener('DOMContentLoaded', function() {
      const pageName = getPageNameFromPath();
      fetch(`https://aidarkezio.vercel.app/api/page-view?name=${pageName}`, { // Use dynamic pageName
        method: 'GET',
        mode: 'cors'
      })
      .then(async response => {
        if (!response.ok) {
          console.error('Error recording page view:', response.status, response.statusText, `for page: ${pageName}`);
        } // else {
        //   console.log(`Page view recorded successfully for page: ${pageName}`);
        //   console.log('Response:', (await response.json()));
        // }
      })
      .catch(error => {
        console.error('Error recording page view:', error, `for page: ${pageName}`);
      });
    });
  })();