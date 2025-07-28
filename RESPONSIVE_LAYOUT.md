# Responsive Layout Documentation

## Mobile-First Responsive Design

### Overview
Website sekarang mendukung layout responsive dengan sistem:
- **Mobile**: flex-col (vertical stack)
- **Desktop** (md+): flex-row (horizontal layout)

### Layout Changes

#### 1. Section Layout
```scss
// Mobile (default)
flex flex-col

// Desktop (md breakpoint)
md:flex-row
```

#### 2. Width Adjustments
```scss  
// Mobile
w-full

// Desktop  
md:w-3/5, md:w-2/5, md:w-1/2
```

#### 3. Content Ordering
Menggunakan CSS order untuk mengatur urutan konten:
```scss
order-1 md:order-2  // Content first on mobile, second on desktop
order-2 md:order-1  // Space first on mobile, first on desktop
```

### Camera Configuration System

#### 1. Camera Config Structure
```typescript
interface CameraConfig {
  position: [x, y, z];
  target: [x, y, z];
}

interface SectionCameraConfig {
  desktop: CameraConfig;
  mobile: CameraConfig;
}
```

#### 2. Section-Specific Configurations

##### Hero Section
- **Desktop**: Default position (0, 0, 10) - uses reset()
- **Mobile**: Same as desktop (0, 0, 10) - uses reset() - kept optimal

##### Projects Section  
- **Desktop**: Side angle (-10, 12, 16) → (4, 0.5, -2)
- **Mobile**: Centered and further back (0, 8, 25) → (0, 2, 0) - smaller model

##### About Section
- **Desktop**: Opposite side (5, 10, 20) → (-4, 2, 0)  
- **Mobile**: Centered and further back (0, 6, 25) → (0, 1, 0) - smaller model

##### Contact Section
- **Desktop**: Close up position → (2, 2, -2)
- **Mobile**: Balanced and further back (0, 4, 20) → (0, 1, 0) - smaller model

### Responsive Features

#### 1. Automatic Detection
- Uses `window.innerWidth < 768` untuk deteksi mobile
- Otomatis switch konfigurasi berdasarkan viewport

#### 2. Dynamic Resize Handling
- Event listener untuk window resize
- Auto-update camera position saat orientation change
- Smooth transition antar posisi

#### 3. Background Text Responsive
- Font size scaling: `text-4xl md:text-[8.5rem]`
- Padding adjustments: `px-4 md:px-0`
- Layout flex direction: `flex-col md:flex-row`

### Implementation Details

#### 1. Camera Positioning
```typescript
const cameraConfig = getCameraConfig("projects");
$cameraControls.setPosition(
  cameraConfig.position[0], 
  cameraConfig.position[1], 
  cameraConfig.position[2], 
  true
);
$cameraControls.moveTo(
  cameraConfig.target[0], 
  cameraConfig.target[1], 
  cameraConfig.target[2], 
  true
);
```

#### 2. Responsive Utilities
- `isMobile()` - Deteksi device type
- `getCameraConfig(section)` - Get config berdasarkan section dan device
- `handleResize()` - Update camera saat resize

### Mobile Layout Structure

#### Projects Section (Mobile)
```
┌─────────────────┐
│   Swiper        │ ← order-1 (content first)
│   Component     │
├─────────────────┤
│                 │ ← order-2 (3D space)
│   3D Model      │
│   Space         │
└─────────────────┘
```

#### About Section (Mobile)  
```
┌─────────────────┐
│  ProgressBar    │ ← Content on top
│  Component      │
├─────────────────┤
│                 │ ← 3D space below
│   3D Model      │
│   Space         │
└─────────────────┘
```

#### Contact Section (Mobile)
```
┌─────────────────┐
│  ContactCard    │ ← order-1 (content first)
│  Component      │  
├─────────────────┤
│                 │ ← order-2 (3D space)
│   3D Model      │
│   Space         │
└─────────────────┘
```

### Key Benefits

1. **Better Mobile UX** - Content-first approach
2. **Optimal 3D Viewing** - Camera positioned untuk best view di mobile
3. **Maintained Desktop** - Desktop layout dan positioning tetap optimal
4. **Responsive Typography** - Scaling text untuk readability
5. **Dynamic Adaptation** - Auto-adjust saat device rotation

### Testing
- Test di berbagai device sizes
- Check camera transitions saat resize
- Verify content ordering di mobile
- Ensure 3D model visibility di semua breakpoints
