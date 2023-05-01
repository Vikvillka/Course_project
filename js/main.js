// Скрипт дает понимание на каком устройстве открыт сайт
const isMobile ={
  Android: function(){
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function(){
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function (){
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Windows: function(){
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function(){
    return(
      isMobile.Android()||
      isMobile.BlackBerry()||
      isMobile.iOS()||
      isMobile.Windows()); 
  }
};

// Добавление класса в зависимости от типа устройства
if (isMobile.any()){
  document.body.classList.add('_touch');
// Добавление обработчика событий на стрелки в меню, если это мобильное устройство
  let menuArrows = document.querySelectorAll('.menu_arrow');
  if (menuArrows.length>0){
    for(let index=0; index<menuArrows.length; index++){
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click",function(e){
        menuArrow.parentElement.classList.toggle('_active')
    });
  }
} 
}
else{
  document.body.classList.add('_pc');
}

//-------------прелоадер-------------//

window.onload = function() {
  document.querySelector('.preloader_main').classList.add("preloader-remove");
};

//------------бургер меню-----------//

// Выбираем элементы DOM
const burgerMenu = document.querySelector('.menu-btn');
const menuLinks = document.querySelectorAll('.menu-link');
const menu = document.querySelector('.menu_list');

// Добавляем обработчик клика на кнопку меню
burgerMenu.addEventListener('click', (event) => {
  // Останавливаем событие передачи данных
  event.stopPropagation(); 
  menu.classList.toggle('activee');
  // Переключаем класс для изменения иконки кнопки меню
  burgerMenu.classList.toggle('active_span'); 
});
// Добавляем обработчик клика
document.addEventListener('click', (event) => {
  const target = event.target;
  
  if (target.closest('#burger-menu') || target.closest('.menu-link') || target.closest('.li_zone') || target.closest('.menu_arrow')) {
    return;
  }
  // Если клик был в пустой зоне, то скрываем меню
  menu.classList.remove('activee');
});

//------------модальной окно-------------//

// Запускаем функцию, когда DOM-дерево полностью загружено
document.addEventListener("DOMContentLoaded", function(){
  // Вычисляем ширину скроллбара и сохраняем ее в переменную
  var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
  console.log(scrollbar);
  // Добавляем обработчик клика на кнопку 
  document.querySelector('[href="#openModal"]').addEventListener('click',function(){
    document.body.style.overflow = 'hidden';
    document.querySelector('#openModal').style.marginLeft = scrollbar;
  });
  // Добавляем обработчик клика на кнопку 
  document.querySelector('[href="#close"]').addEventListener('click',function(){
    document.body.style.overflow = 'visible';
    document.querySelector('#openModal').style.marginLeft = '0px';
  });
});

//---------------слайдер----------------//

// получаем элемент карусели из DOM дерева
const carousel = document.querySelector(".carousel") 
firstImg = document.querySelectorAll("img")[0];
// получаем иконки для перемещения карусели
arrowIcons = document.querySelectorAll(".wrapper i") 

let isDragStart = false, prevPageX, prevScrollLeft, positionDiff;


arrowIcons.forEach(icon =>{
  icon.addEventListener("click",()=>{
    let firstImgWidth = firstImg.clientWidth + 14;
    // перемещаем карусель в зависимости от того, какая иконка была нажата
    carousel.scrollLeft += icon.id == "left"? - firstImgWidth : firstImgWidth; 
  });
});

const autoSlide = () =>{
  if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth))return; 
   // получаем модуль разницы между текущей позицией и предыдущей позицией
  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  // вычисляем значение разницы
  let valDifference = firstImgWidth - positionDiff;

  if(carousel.scrollLeft > prevScrollLeft){
    // перемещаем карусель вправо с использованием значения разницы
    return carousel.scrollLeft += positionDiff > firstImgWidth / 3? valDifference : -positionDiff;
  }
  // перемещаем карусель влево с использованием значения разницы
  carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference: -positionDiff;
}

const dragStart = (e) => {
  isDragStart = true;
  // получаем начальную позицию курсора или пальца на экране
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if(!isDragStart) return;
  // отключаем действие по умолчанию браузера для события drag
  e.preventDefault();
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  // перемещаем карусель на вычисленное значение
  carousel.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () =>{
  isDragStart = false;
  carousel.classList.remove("dragging");
  autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);

carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
