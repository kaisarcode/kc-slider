/*!
 * kcSlider - Simple JavaScript slider
 * Copyright (c) 2006 - 2025, KaisarCode <kaisar@kaisarcode.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

function kcSlider(options = {}) {
    const {
        autoplay = false,
        interval = 4000
    } = options;

    const sliders = document.querySelectorAll('.kc-slider');

    sliders.forEach((slider) => {
        const container = slider.querySelector('.kc-slider-track');
        const items = slider.querySelectorAll('.kc-slider-item');
        const prev = slider.querySelector('.kc-slider-prev');
        const next = slider.querySelector('.kc-slider-next');
        const total = items.length;

        let currentIndex = 0;
        let isMoving = false;
        let autoplayInterval;
        let startX = 0;
        let deltaX = 0;

        const firstClone = items[0].cloneNode(true);
        const lastClone = items[total - 1].cloneNode(true);
        container.appendChild(firstClone);
        container.insertBefore(lastClone, items[0]);

        const itemWidth = items[0].offsetWidth;
        container.style.transform = `translateX(-${itemWidth}px)`;

        function updatePosition(index) {
            isMoving = true;
            container.style.transition = 'transform 0.3s ease';
            container.style.transform = `translateX(-${(index + 1) * itemWidth}px)`;
            currentIndex = index;
            setTimeout(() => {
                if (index < 0) {
                    container.style.transition = 'none';
                    container.style.transform = `translateX(-${total * itemWidth}px)`;
                    currentIndex = total - 1;
                } else if (index >= total) {
                    container.style.transition = 'none';
                    container.style.transform = `translateX(-${itemWidth}px)`;
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

        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);

        startAutoplay();
    });
}
