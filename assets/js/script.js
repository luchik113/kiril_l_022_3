// Функционал карусели
let currentIndex = 0;
let autoSlideInterval;

function initCarousel() {
  const slides = document.querySelector(".slides");
  const images = document.querySelectorAll(".slides img");
  const indicators = document.querySelectorAll(".indicator");
  const total = images.length;
  
  if (!slides || total === 0) {
    console.log('Карусель не найдена или нет изображений');
    return;
  }
  
  console.log('Инициализация карусели, найдено изображений:', total);
  
  function updateCarousel() {
    const translateValue = -currentIndex * 100;
    slides.style.transform = `translateX(${translateValue}%)`;
    console.log('Переключение на слайд:', currentIndex, 'translateX:', translateValue + '%');
    
    // Обновление индикаторов
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }
  
  // Кнопки вперед/назад
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      console.log('Клик по кнопке Next');
      currentIndex = (currentIndex + 1) % total;
      updateCarousel();
      resetAutoSlide();
    });
  } else {
    console.log('Кнопка Next не найдена');
  }
  
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      console.log('Клик по кнопке Prev');
      currentIndex = (currentIndex - 1 + total) % total;
      updateCarousel();
      resetAutoSlide();
    });
  } else {
    console.log('Кнопка Prev не найдена');
  }
  
  // Клик по индикаторам
  indicators.forEach(indicator => {
    indicator.addEventListener("click", () => {
      const index = parseInt(indicator.getAttribute("data-index"));
      if (!isNaN(index) && index >= 0 && index < total) {
        console.log('Клик по индикатору:', index);
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
      }
    });
  });
  
  // Автопрокрутка
  function startAutoSlide() {
    console.log('Запуск автопрокрутки');
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % total;
      updateCarousel();
    }, 5000);
  }
  
  function stopAutoSlide() {
    console.log('Остановка автопрокрутки');
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }
  
  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }
  
  // Остановка автопрокрутки при наведении
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", () => {
      console.log('Мышь над каруселью - остановка автопрокрутки');
      stopAutoSlide();
    });
    
    carousel.addEventListener("mouseleave", () => {
      console.log('Мышь покинула карусель - запуск автопрокрутки');
      startAutoSlide();
    });
  }
  
  // Инициализация
  updateCarousel(); // Устанавливаем начальную позицию
  startAutoSlide();
  
  console.log('Карусель успешно инициализирована');
}

// Функционал фильтрации мероприятий
function initEventsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  
  if (filterBtns.length === 0 || eventCards.length === 0) {
    console.log('Фильтры или карточки мероприятий не найдены');
    return;
  }
  
  console.log('Инициализация фильтров мероприятий');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Удаляем активный класс у всех кнопок
      filterBtns.forEach(b => b.classList.remove('active'));
      // Добавляем активный класс текущей кнопке
      this.classList.add('active');
      
      // Фильтрация мероприятий
      const filter = this.textContent.toLowerCase();
      console.log('Применен фильтр:', filter);
      
      eventCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        
        if (filter === 'все' || cardText.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Обработка формы обратной связи
function initContactForm() {
  const contactForm = document.querySelector('.contact-form form');
  
  if (!contactForm) {
    console.log('Форма обратной связи не найдена');
    return;
  }
  
  console.log('Инициализация формы обратной связи');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Простая валидация
    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const message = this.querySelector('textarea').value.trim();
    
    if (!name || !email || !message) {
      alert('Пожалуйста, заполните все поля формы.');
      return;
    }
    
    if (!isValidEmail(email)) {
      alert('Пожалуйста, введите корректный email адрес.');
      return;
    }
    
    // Имитация отправки
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Валидация email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Подсветка активной ссылки в навигации
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav a');
  
  console.log('Текущая страница:', currentPage);
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      console.log('Активная ссылка:', href);
    }
  });
}

// Плавная прокрутка для якорей
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  if (links.length === 0) return;
  
  console.log('Инициализация плавной прокрутки');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Анимация появления элементов при прокрутке
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.card, .event-card, .contact-item, .about-section');
  
  if (animatedElements.length === 0) return;
  
  console.log('Инициализация анимаций прокрутки');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// Инициализация всех функций при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM загружен, инициализация компонентов...');
  
  initCarousel();
  initEventsFilter();
  initContactForm();
  highlightActiveNav();
  initSmoothScroll();
  initScrollAnimations();
  
  // Добавляем год в футер
  const yearElement = document.querySelector('.footer p');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = `&copy; ${currentYear} Воронеж Events. Все права защищены.`;
  }
  
  console.log('Все компоненты инициализированы');
});

// Обработка ошибок загрузки изображений
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('error', function() {
      console.log('Ошибка загрузки изображения:', this.src);
      this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
      this.alt = 'Изображение не найдено';
    });
    
    // Проверка загрузки изображений
    img.addEventListener('load', function() {
      console.log('Изображение загружено:', this.src);
    });
  });
});

// Дополнительные утилиты
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Обработка изменения размера окна
window.addEventListener('resize', debounce(function() {
  console.log('Размер окна изменен:', window.innerWidth, 'x', window.innerHeight);
}, 250));