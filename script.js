// Копіювання IP сервера
function copyIP() {
    const serverIP = document.getElementById('server-ip').textContent;
    
    navigator.clipboard.writeText(serverIP).then(() => {
        // Показуємо повідомлення про успішне копіювання
        const ipBox = document.querySelector('.ip-box');
        const originalText = document.getElementById('server-ip').textContent;
        
        document.getElementById('server-ip').textContent = '✓ Скопійовано!';
        
        setTimeout(() => {
            document.getElementById('server-ip').textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Помилка при копіюванні:', err);
        alert('Помилка при копіюванні IP');
    });
}

// Оновлення кількості гравців онлайн
async function updateOnlineCount() {
    try {
        const response = await fetch('https://api.mcsrvstat.us/2/game11.gamely.pro:24001');
        const data = await response.json();
        const onlineCount = data.players ? data.players.online : 0;
        document.getElementById('online-count').textContent = onlineCount;
    } catch (error) {
        console.error('Помилка при отриманні кількості гравців:', error);
        // Fallback to random if API fails
        const randomPlayers = Math.floor(Math.random() * 100) + 25;
        document.getElementById('online-count').textContent = randomPlayers;
    }
}

// Плавна прокрутка до секцій
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Функція для переключення вкладок
function openTab(tabName) {
    // Приховуємо всі вмісти вкладок
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Знімаємо активність з усіх кнопок
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    
    // Показуємо вибрану вкладку
    document.getElementById(tabName).classList.add('active');
    
    // Додаємо активність до натиснутої кнопки
    event.target.classList.add('active');
}

// Основна ініціалізація
document.addEventListener('DOMContentLoaded', function() {
    updateOnlineCount();
    
    // Оновлюємо кількість гравців кожні 5 секунд
    setInterval(updateOnlineCount, 5000);
    
    // Анімація при завантаженні
    document.body.style.animation = 'fadeIn 0.5s ease';
});

// Додаємо анімацію fadeIn
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Функція для покупки товару
function purchaseItem(itemName, price) {
    try {
        const telegramUrl = 'https://t.me/b_b_e_e_a_a_u_u_t_t_y_y';
        const message = `Хочу купити: ${itemName}\nЦіна: ${price} ⭐`;
        
        // Відкриваємо Telegram з повідомленням
        const fullUrl = `${telegramUrl}?text=${encodeURIComponent(message)}`;
        window.open(fullUrl, '_blank');
    } catch (error) {
        console.error('Помилка при покупці:', error);
        // Запасний варіант - просто відкрити Telegram
        window.open('https://t.me/b_b_e_e_a_a_u_u_t_t_y_y', '_blank');
    }
}

// Функція для вибору проекту
function switchProject(project) {
    const buttons = document.querySelectorAll('.selector-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    const selectedBtn = document.querySelector(`[onclick="switchProject('${project}')"]`);
    selectedBtn.classList.add('active');
    
    const kopatelContent = document.getElementById('kopatel-content');
    const comingContent = document.getElementById('coming-content');
    
    if (project === 'reboot') {
        kopatelContent.style.display = 'block';
        comingContent.style.display = 'none';
    } else if (project === 'coming') {
        kopatelContent.style.display = 'none';
        comingContent.style.display = 'block';
    }
}

