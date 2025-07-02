function kcSlider(sliderElement, options = {}) {
  const {
    autoplay = false,
    interval = 4000,
    visibleItems = 1
  } = options;

  const container = sliderElement.querySelector('.kc-slider-track');
  const items = sliderElement.querySelectorAll('.kc-slider-item');
  const prev = sliderElement.querySelector('.kc-slider-prev');
  const next = sliderElement.querySelector('.kc-slider-next');
  const total = items.length;

  // Calculate item width based on visibleItems and container width
  const sliderWrapper = sliderElement.querySelector('.kc-slider-wrapper');
  const wrapperWidth = sliderWrapper.offsetWidth;
  const itemWidth = wrapperWidth / visibleItems;

  items.forEach(item => {
    item.style.flex = `0 0 ${itemWidth}px`;
  });

  // Clone first and last items for infinite scroll effect
  const firstClones = [];
  const lastClones = [];
  for(let i = 0; i < visibleItems; i++) {
    const firstClone = items[i].cloneNode(true);
    const lastClone = items[total - 1 - i].cloneNode(true);
    container.appendChild(firstClone);
    container.insertBefore(lastClone, items[0]);
    firstClones.push(firstClone);
    lastClones.push(lastClone);
  }

  let currentIndex = 0;
  let isMoving = false;
  let autoplayInterval;
  let startX = 0;
  let deltaX = 0;

  // Initial position: move left by visibleItems * itemWidth (to show first "real" slide)
  container.style.transform = `translateX(-${visibleItems * itemWidth}px)`;

  function updatePosition(index) {
    isMoving = true;
    container.style.transition = 'transform 0.3s ease';
    container.style.transform = `translateX(-${(index + visibleItems) * itemWidth}px)`;
    currentIndex = index;
    setTimeout(() => {
      if (index < 0) {
        container.style.transition = 'none';
        container.style.transform = `translateX(-${total * itemWidth}px)`;
        currentIndex = total - 1;
      } else if (index >= total) {
        container.style.transition = 'none';
        container.style.transform = `translateX(-${visibleItems * itemWidth}px)`;
        currentIndex = 0;
      }
      isMoving = false;
    }, 300);
  }

  function slideNext() {
    if (!isMoving) updatePosition(currentIndex + 1);
  }

  function slidePrev() {
    if (!isMoving) updatePosition(currentIndex - 1);
  }

  function startAutoplay() {
    if (autoplay) autoplayInterval = setInterval(slideNext, interval);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  function handleTouchStart(e) {
    stopAutoplay();
    startX = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    deltaX = e.touches[0].clientX - startX;
  }

  function handleTouchEnd() {
    if (Math.abs(deltaX) > 50) {
      deltaX < 0 ? slideNext() : slidePrev();
    }
    deltaX = 0;
    startAutoplay();
  }

  prev.addEventListener('click', slidePrev);
  next.addEventListener('click', slideNext);

  container.addEventListener('touchstart', handleTouchStart, { passive: true });
  container.addEventListener('touchmove', handleTouchMove, { passive: true });
  container.addEventListener('touchend', handleTouchEnd);

  sliderElement.addEventListener('mouseenter', stopAutoplay);
  sliderElement.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}
