// ============================================
// TELEGRAM BOT INTEGRATION (message.js)
// ============================================

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // ⚠️ MA'LUMOTLARINGIZNI SHU YERGA KIRITING:
    const TOKEN = "8478732238:AAHjcQ5-BrR3Aqs37m5qowY7rqGx_W7A-XA"; 
    const CHAT_ID = "7321457976"; 
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Xabar ko'rinishini shakllantirish
    const message = `<b>🚀 Yangi xabar: zimi.dev</b>\n\n` +
                    `<b>👤 Ism:</b> ${data.name}\n` +
                    `<b>📧 Email:</b> ${data.email}\n` +
                    `<b>📝 Mavzu:</b> ${data.subject}\n` +
                    `<b>💬 Xabar:</b> ${data.message}`;

    // Holatni ko'rsatish (Cyberpunk style)
    formStatus.style.display = 'block';
    formStatus.classList.remove('error');
    formStatus.textContent = 'TRANSMITTING DATA...';

    try {
        const response = await fetch(URL_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                parse_mode: 'html',
                text: message
            })
        });

        if (response.ok) {
            formStatus.textContent = '✓ XABAR MUVAFFAQIYATLI YUBORILDI!';
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        } else {
            throw new Error();
        }
    } catch (error) {
        formStatus.classList.add('error');
        formStatus.textContent = '❌ XATOLIK! TIZIMGA ULANIB BO\'LMADI.';
    }
});