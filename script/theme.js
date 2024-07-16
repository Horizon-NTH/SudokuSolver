document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggleButton = document.getElementById('theme');
    const themeImage = document.getElementById('logo');
    const favicon = document.getElementById('favicon');
    const themeButtonImage = document.getElementById('theme-button-img');
    const githubIcon = document.querySelector('#github img');
    const licenseIcon = document.querySelector('#licence img');

    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            themeImage.src = 'img/logo-dark.svg';
            favicon.href = 'img/logo-dark.svg';
            themeButtonImage.src = 'img/moon.svg';
            licenseIcon.src = 'img/license-dark.svg';
            githubIcon.src = 'img/github-dark.svg';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
            themeImage.src = 'img/logo-light.svg';
            favicon.href = 'img/logo-light.svg';
            themeButtonImage.src = 'img/sun.svg';
            licenseIcon.src = 'img/license-light.svg';
            githubIcon.src = 'img/github-light.svg';
            localStorage.setItem('theme', 'light');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDarkScheme ? 'dark' : 'light');
    }

    themeToggleButton.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });
});
