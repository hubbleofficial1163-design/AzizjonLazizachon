// Скрипт для свадебного сайта Азизжон & Лазизахон
document.addEventListener('DOMContentLoaded', function() {
    console.log('Свадебный сайт загружен');
    
    // Таймер
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Инициализация формы RSVP
    initRSVPForm();
    
    // Инициализация календаря
    initCalendar();
    
    // Обработчики кнопок календаря
    const prevBtn = document.getElementById('prevMonthBtn');
    const nextBtn = document.getElementById('nextMonthBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => changeMonth(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeMonth(1));
    
    // Счетчик гостей
    initGuestCounter();
});

// Таймер отсчета до свадьбы
function updateCountdown() {
    const weddingDate = new Date('2026-08-01T17:00:00');
    const now = new Date();
    const diff = weddingDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString();
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
}

// ========== СЧЕТЧИК ГОСТЕЙ ==========
function initGuestCounter() {
    const guestMinus = document.querySelector('#guestMinus');
    const guestPlus = document.querySelector('#guestPlus');
    const guestCountSpan = document.querySelector('#guestCount');
    let guestValue = 1;
    
    if (guestMinus && guestPlus && guestCountSpan) {
        const updateGuestButtons = () => {
            if (guestValue <= 1) {
                guestMinus.disabled = true;
            } else {
                guestMinus.disabled = false;
            }
            
            if (guestValue >= 9) {
                guestPlus.disabled = true;
            } else {
                guestPlus.disabled = false;
            }
        };
        
        guestMinus.addEventListener('click', () => {
            if (guestValue > 1) {
                guestValue--;
                guestCountSpan.textContent = guestValue;
                updateGuestButtons();
            }
        });
        
        guestPlus.addEventListener('click', () => {
            if (guestValue < 9) {
                guestValue++;
                guestCountSpan.textContent = guestValue;
                updateGuestButtons();
            }
        });
        
        updateGuestButtons();
    }
}

// ========== БАЗОВЫЕ СТИЛИ АНИМАЦИЙ ==========
const coreStyles = document.createElement('style');
coreStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(coreStyles);

// ========== УНИВЕРСАЛЬНОЕ МОДАЛЬНОЕ ОКНО ==========
function showModal(title, message, isError = false) {
    const existingModal = document.getElementById('customModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'customModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    const icon = isError ? '✕' : '✓';
    const iconColor = isError ? '#c62828' : '#2e7d32';
    const bgIconColor = isError ? '#ffebee' : '#e8f5e9';
    const borderColor = isError ? '#c62828' : '#2e7d32';

    modal.innerHTML = `
        <div style="
            background: #ffffff;
            border-radius: 16px;
            padding: 32px 40px;
            max-width: 380px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 35px rgba(0, 0, 0, 0.15);
            animation: slideUp 0.3s ease;
            border-top: 3px solid ${borderColor};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        ">
            <div style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: ${bgIconColor};
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px auto;
            ">
                <div style="
                    font-size: 32px;
                    font-weight: 400;
                    color: ${iconColor};
                    line-height: 1;
                ">${icon}</div>
            </div>
            <h3 style="
                font-size: 24px;
                font-weight: 500;
                color: #1a1a1a;
                margin-bottom: 12px;
                letter-spacing: -0.3px;
            ">${title}</h3>
            <p style="
                font-size: 16px;
                color: #555555;
                margin-bottom: 28px;
                line-height: 1.5;
            ">${message}</p>
            <button onclick="this.closest('#customModal').remove()" style="
                background: #f5f5f5;
                color: #333333;
                border: none;
                padding: 12px 32px;
                border-radius: 40px;
                font-family: inherit;
                font-size: 15px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            " onmouseover="this.style.background='#e8e8e8'" onmouseout="this.style.background='#f5f5f5'">
                Закрыть
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    if (!isError) {
        setTimeout(() => {
            if (modal.parentElement) modal.remove();
        }, 4000);
    }
}

// ========== МОДАЛЬНОЕ ОКНО ЗАГРУЗКИ ==========
function showLoadingModal() {
    const existingLoading = document.getElementById('loadingModal');
    if (existingLoading) existingLoading.remove();
    
    const loadingModal = document.createElement('div');
    loadingModal.id = 'loadingModal';
    loadingModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(3px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    loadingModal.innerHTML = `
        <div style="
            background: white;
            border-radius: 16px;
            padding: 32px 40px;
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid #e0e0e0;
                border-top-color: #9c7a5c;
                border-radius: 50%;
                margin: 0 auto 20px;
                animation: spin 1s linear infinite;
            "></div>
            <p style="
                font-size: 15px;
                color: #666;
                margin: 0;
            ">Отправка ответа...</p>
        </div>
    `;
    document.body.appendChild(loadingModal);
    return loadingModal;
}

// ========== GOOGLE SHEETS ==========
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx51vxflcLXQ6P8QxQO5DZgqQ9Y2G_rtXZOxfOuFiaqHR_7_sLfMBXpky6FU7ca4meP/exec'; // ЗАМЕНИТЕ НА ВАШ URL

// Инициализация формы RSVP
function initRSVPForm() {
    const rsvpForm = document.querySelector('.rsvp-form');
    if (!rsvpForm) return;
    
    rsvpForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        
        // Получаем данные
        const nameInput = this.querySelector('input[type="text"]');
        const attendanceRadio = this.querySelector('input[name="attendance"]:checked');
        const guestCountSpan = document.getElementById('guestCount');
        
        const name = nameInput ? nameInput.value.trim() : '';
        const attendance = attendanceRadio ? attendanceRadio.value : null;
        const guests = guestCountSpan ? guestCountSpan.textContent : '1';
        
        // Валидация
        if (!name) {
            showModal('Ошибка', 'Пожалуйста, введите ваше имя', true);
            nameInput.focus();
            return;
        }
        
        if (!attendance) {
            showModal('Ошибка', 'Пожалуйста, выберите вариант присутствия', true);
            return;
        }
        
        // Показываем загрузку
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        const loadingModal = showLoadingModal();
        
        try {
            // Формируем данные для отправки
            const formDataToSend = new URLSearchParams();
            formDataToSend.append('name', name);
            formDataToSend.append('attendance', attendance);
            formDataToSend.append('guests', guests);
            
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formDataToSend.toString()
            });
            
            const result = await response.json();
            
            loadingModal.remove();
            
            if (result.result === 'success') {
                if (attendance === 'yes') {
                    showModal(
                        'Спасибо, ' + name + '!',
                        'Мы будем ждать вас на нашей свадьбе 1 августа 2026 года! 🎉',
                        false
                    );
                } else {
                    showModal(
                        'Спасибо за ответ!',
                        'Очень жаль, что вы не сможете быть с нами в этот день.',
                        false
                    );
                }
                // Очищаем форму
                rsvpForm.reset();
                // Сбрасываем счетчик гостей
                if (guestCountSpan) {
                    guestCountSpan.textContent = '1';
                }
                // Сбрасываем активность счетчика
                const guestMinus = document.getElementById('guestMinus');
                const guestPlus = document.getElementById('guestPlus');
                if (guestMinus) guestMinus.disabled = true;
                if (guestPlus) guestPlus.disabled = false;
            } else {
                throw new Error(result.message || 'Ошибка отправки');
            }
        } catch (error) {
            loadingModal.remove();
            showModal(
                'Ошибка',
                error.message || 'Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.',
                true
            );
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// ========== КАЛЕНДАРЬ ==========
let currentYear = 2026;
let currentMonth = 7; // 7 = август (0-индексация)
const WEDDING_DAY = 1;
const WEDDING_YEAR = 2026;
const WEDDING_MONTH = 7;

function generateWeddingCalendar(year, month, weddingDay = 1, weddingYear = 2026, weddingMonth = 7) {
    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = воскресенье
    let startOffset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const calendarGrid = document.getElementById('weddingCalendar');
    if (!calendarGrid) return;
    
    calendarGrid.innerHTML = '';
    
    // Дни недели
    const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    weekdays.forEach(day => {
        const weekdayDiv = document.createElement('div');
        weekdayDiv.className = 'calendar-weekday';
        weekdayDiv.textContent = day;
        calendarGrid.appendChild(weekdayDiv);
    });
    
    // Заполняем дни предыдущего месяца
    for (let i = startOffset - 1; i >= 0; i--) {
        const dayNum = daysInPrevMonth - i;
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day-cell other-month';
        dayDiv.textContent = dayNum;
        calendarGrid.appendChild(dayDiv);
    }
    
    // Заполняем дни текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day-cell';
        dayDiv.textContent = day;
        
        const isWeddingDay = (year === weddingYear && month === weddingMonth && day === weddingDay);
        if (isWeddingDay) {
            dayDiv.classList.add('wedding-day');
        }
        
        calendarGrid.appendChild(dayDiv);
    }
    
    // Заполняем дни следующего месяца
    const totalCells = 42;
    const currentCells = startOffset + daysInMonth;
    const remainingCells = totalCells - currentCells;
    
    for (let day = 1; day <= remainingCells; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day-cell other-month';
        dayDiv.textContent = day;
        calendarGrid.appendChild(dayDiv);
    }
}

function initCalendar() {
    generateWeddingCalendar(currentYear, currentMonth, WEDDING_DAY, WEDDING_YEAR, WEDDING_MONTH);
    
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const monthYearEl = document.getElementById('calendarMonthYear');
    if (monthYearEl) {
        monthYearEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
}

function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    initCalendar();
}
