import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'dark' | 'light';

const getInitialTheme = (): Theme => {
    if (!browser) return 'dark';
    return (localStorage.getItem('theme') as Theme) || 'dark';
};

export const theme = writable<Theme>(getInitialTheme());

// Apply theme to document
const applyTheme = (themeValue: Theme) => {
    if (!browser) return;

    const root = document.documentElement;

    if (themeValue === 'light') {
        root.classList.add('light-theme');
        root.classList.remove('dark-theme');

        // Set CSS variables for light theme
        root.style.setProperty('--primary-color', '#f7b500');
        root.style.setProperty('--primary-dark', '#d19900');
        root.style.setProperty('--text-color', '#2d2d2d');
        root.style.setProperty('--bg-start', 'rgb(245, 241, 235)');
        root.style.setProperty('--bg-end', 'rgb(232, 224, 214)');
    } else {
        root.classList.add('dark-theme');
        root.classList.remove('light-theme');

        // Set CSS variables for dark theme
        root.style.setProperty('--primary-color', '#cc4f55');
        root.style.setProperty('--primary-dark', '#68151D');
        root.style.setProperty('--text-color', 'white');
        root.style.setProperty('--bg-start', 'rgb(13, 19, 32)');
        root.style.setProperty('--bg-end', 'rgb(8, 12, 21)');
    }
};

// Subscribe to theme changes
if (browser) {
    theme.subscribe((value) => {
        localStorage.setItem('theme', value);
        applyTheme(value);
    });

    // Apply initial theme on load
    applyTheme(getInitialTheme());
}

export const toggleTheme = () => {
    theme.update(t => t === 'dark' ? 'light' : 'dark');
};
