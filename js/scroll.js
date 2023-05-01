//--------------скролл-------------//

// Получаем все элементы, которые нужно анимировать, с помощью класса '_animate-items'
const animItems = document.querySelectorAll('._animate-items');

// Проверяем, есть ли элементы для анимации, и если есть, устанавливаем слушатель события 'scroll' на объекте window
if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    // Функция, которая вызывается при скролле страницы
    function animOnScroll(params) {
        // Проходимся по каждому элементу и вычисляем его высоту и отступ от верха страницы
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            // Коэффициент, который определяет, на какой высоте начинается анимация элемента
            const animStart = 4;
             // Вычисляем точку, на которой начинается анимация
            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            // Если элемент выше, чем видимая область, устанавливаем точку анимации равной 1/4 видимой области
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            } 
              // Если точка анимации находится в видимой области, добавляем класс '_activeScroll'
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_activeScroll');
            } else {
                // Если элемент за пределами видимой области, удаляем класс '_activeScroll'
                animItem.classList.remove('_activeScroll');
            }
        }
    }
    // Функция для вычисления отступов элементов
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    // Задержка перед первым вызовом функции анимации
    setTimeout(() => {
        animOnScroll();
    }, 300);
} 

