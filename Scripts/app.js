
function toggleTheme() {
  const body = document.body;
  const themeToggleButton = document.getElementById('theme-toggle');
  const sunIcon = themeToggleButton.querySelector('.fa-sun');
  const moonIcon = themeToggleButton.querySelector('.fa-moon');

  // Toggle the dark-theme class on the body
  body.classList.toggle('dark-theme');

  // Toggle icon visibility
  sunIcon.style.display = body.classList.contains('dark-theme')
    ? 'none'
    : 'inline';
  moonIcon.style.display = body.classList.contains('dark-theme')
    ? 'inline'
    : 'none';

  // Save theme preference to localStorage (optional)
  localStorage.setItem(
    'theme',
    body.classList.contains('dark-theme') ? 'dark' : 'light'
  );
}

// Apply theme on page load based on saved preference
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    document
      .getElementById('theme-toggle')
      .querySelector('.fa-sun').style.display = 'none';
  } else {
    document
      .getElementById('theme-toggle')
      .querySelector('.fa-moon').style.display = 'none';
  }
});

