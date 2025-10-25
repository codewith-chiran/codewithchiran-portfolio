const popupModal = document.getElementById('popupModal');
const popupClose = document.getElementById('popupClose');

// Show popup after 2.5 seconds
window.addEventListener('load', () => {
    setTimeout(() => {
        popupModal.style.display = 'flex';
    }, 2500);
});

popupClose.addEventListener('click', () => {
    popupModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === popupModal) {
        popupModal.style.display = 'none';
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const messageInput = document.getElementById('message');
const charCount = document.getElementById('charCount');

messageInput.addEventListener('input', () => {
    charCount.textContent = `${messageInput.value.length} / 300`;
});

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const submitButton = this.querySelector('.btn-text');
    const loadingText = this.querySelector('.btn-loading');
    submitButton.style.display = 'none';
    loadingText.style.display = 'inline-block';

    const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        access_key: '772333d5-fc3b-452d-9e1f-e9bd40c2314e'
    };

    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await res.json();
        const formMessage = document.getElementById('formMessage');
        if (result.success) {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.style.color = '#00E5FF';
            this.reset();
            charCount.textContent = '0 / 300';
        } else {
            formMessage.textContent = 'Failed to send message.';
            formMessage.style.color = 'red';
        }
    } catch (err) {
        console.error(err);
    } finally {
        submitButton.style.display = 'inline-block';
        loadingText.style.display = 'none';
    }
});
