# 🎨 Quick Style Reference - Bus Schedule App

## 🎯 Color Palette
```css
--primary-red:    #75161C
--dark-navy:      #00062B
--light-gray:     #F9F9FA
--pure-white:     #FFFFFF
--gradient-red:   #a01f27
```

## 📝 Typography
```css
font-family: 'Poppins', sans-serif;
weights: 300, 400, 500, 600, 700, 800
```

## 🎭 Common Patterns

### Button Gradient
```css
background: linear-gradient(135deg, #75161C 0%, #a01f27 100%);
box-shadow: 0 8px 24px rgba(117, 22, 28, 0.3),
            0 3px 10px rgba(117, 22, 28, 0.2);
```

### Card Shadow
```css
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15),
            0 8px 24px rgba(0, 0, 0, 0.1);
```

### Hover Effect
```css
transform: translateY(-3px);
box-shadow: 0 12px 32px rgba(117, 22, 28, 0.4);
transition: all 0.3s ease;
```

### Input Focus
```css
border-color: #75161C;
box-shadow: 0 0 0 3px rgba(117, 22, 28, 0.1);
transform: translateY(-1px);
```

## 📱 Responsive Breakpoints
- **Mobile**: max-width: 480px
- **Small Tablet**: max-width: 576px
- **Tablet**: max-width: 768px
- **Desktop**: max-width: 992px

## ✨ Key Classes

### Buttons
- `.btn` - Primary button with gradient
- `.cancel-btn` - Secondary outlined button
- `.submit-btn` - Form submit button

### Cards
- `.single-bus` - Bus card component
- `.login-box` - Login container
- `.stop-box` - Stop information box

### Layout
- `.custom-navbar` - Navigation bar
- `.custom-footer` - Footer section
- `.page-wrapper` - Main page container

## 🎨 Quick Customization

### Change Primary Color
Find and replace: `#75161C` with your color

### Adjust Shadow Intensity
Modify alpha values in rgba():
- Light: 0.05 - 0.1
- Medium: 0.1 - 0.2
- Strong: 0.2 - 0.4

### Speed Up/Slow Down Animations
Change transition duration:
- Fast: 0.2s
- Normal: 0.3s
- Slow: 0.5s

## 🚀 Quick Tips

1. **3D Effect**: Use translateY(-value) + enhanced shadow
2. **Smooth Hover**: Always add transition: all 0.3s ease
3. **Focus Ring**: Use box-shadow with rgba for glow
4. **Responsive**: Mobile-first, then add media queries
5. **Performance**: Use transform instead of top/left

## 📚 Documentation Files
- `STYLE_ENHANCEMENTS.md` - Full technical details
- `STYLE_CHANGES_SUMMARY.md` - Complete overview
- This file - Quick reference

---

**Need help? Check the full documentation files!** 🎨✨
