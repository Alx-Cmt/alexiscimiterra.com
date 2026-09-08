if (!window.location.hash) window.location.hash = "#alexis";

const carousel = document.querySelector('.carousel');
const carte = document.querySelector('.carte');

function getScrollAmount() {
  const style = getComputedStyle(carousel);
  const gap = parseFloat(style.gap) || 0;
  return carte.offsetWidth + gap;
}

document.getElementById('next').addEventListener('click', () => {
  carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
});

document.getElementById('prev').addEventListener('click', () => {
  carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
});

function submitContact() {
  const msg = document.getElementById('msg').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!msg || !email) return;

  emailjs.send("service_dwcnca9", "template_xhjaufq", {
    from_name:  document.getElementById('name').value,
    reply_to:   email,
    subject:    document.getElementById('subject').value,
    message:    msg,
  })
  .then(() => {
    document.getElementById('ok').style.display = 'block';
    ['name','email','subject','msg'].forEach(id => document.getElementById(id).value = '');
  })
  .catch((err) => {
    console.error('Erreur :', err);
    alert('Erreur lors de l\'envoi, réessayer.');
  });
}
