# kcSlider

A lightweight JavaScript slider/carousel with touch support and optional autoplay.

## Description

kcSlider is a minimal, dependency-free JavaScript slider component. It provides touch/swipe support, autoplay (optional), and smooth looping through slides using cloned items.

## Features

- No dependencies (vanilla JS)
- Smooth transitions with looping support
- Touch/swipe support for mobile devices
- Optional autoplay with configurable interval
- Pause on hover
- Fully customizable via CSS
- Simple, modular architecture

## Usage

1. Clone the repository:

```bash
git clone https://github.com/kaisarcode/kc-slider.git
```

2. Include the CSS and JS in your HTML:

```html
<link href="kc-slider.css" rel="stylesheet" />
<script src="kc-slider.js"></script>
```

3. Add the HTML structure:

```html
<div class="kc-slider">
    <div class="kc-slider-wrapper">
        <div class="kc-slider-track">
            <div class="kc-slider-item">Slide 1</div>
            <div class="kc-slider-item">Slide 2</div>
            <div class="kc-slider-item">Slide 3</div>
        </div>
        <div class="kc-slider-prev">‹</div>
        <div class="kc-slider-next">›</div>
    </div>
</div>
```

4. Initialize the slider in JavaScript:

```js
kcSlider({
    autoplay: true,
    interval: 5000
});
```

## Options

| Option    | Type    | Default | Description                          |
|-----------|---------|---------|------------------------------------|
| autoplay  | Boolean | false   | Enables automatic sliding           |
| interval  | Number  | 4000    | Time in milliseconds between slides when autoplay is enabled |

## License

[![GPLv3](https://www.gnu.org/graphics/gplv3-127x51.png)](https://www.gnu.org/licenses/gpl-3.0.html)

This project is licensed under the **GNU General Public License version 3 (GPLv3)**.
