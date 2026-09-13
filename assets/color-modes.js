(() => {
  const preference = matchMedia('(prefers-color-scheme: light)');
  let saved;
  try { saved = localStorage.getItem('piolo-theme'); } catch {}
  const apply = theme => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      const label = 'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' mode';
      button.setAttribute('aria-label', label);
      button.title = label;
    });
  };
  apply(saved === 'light' || saved === 'dark' ? saved : preference.matches ? 'light' : 'dark');
  document.addEventListener('DOMContentLoaded', () => {
    apply(document.documentElement.dataset.theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        saved = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        apply(saved);
        try { localStorage.setItem('piolo-theme', saved); } catch {}
      });
    });
  });
  preference.addEventListener('change', () => { if (!saved) apply(preference.matches ? 'light' : 'dark'); });
})();
