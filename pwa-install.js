let deferredPrompt;
const installBtn = document.getElementById('pwa-install');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) {
    installBtn.style.display = 'block';
    installBtn.addEventListener('click', async () => {
      installBtn.disabled = true;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        installBtn.textContent = '✅ تم التثبيت';
        setTimeout(() => installBtn.style.display = 'none', 2000);
      } else {
        installBtn.disabled = false;
      }
      deferredPrompt = null;
    }, { once: true });
  }
});

window.addEventListener('appinstalled', () => {
  if (installBtn) {
    installBtn.textContent = '✅ تم التثبيت';
    setTimeout(() => installBtn.style.display = 'none', 2000);
  }
}); 