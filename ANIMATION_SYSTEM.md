# Animation System Documentation

## Contact Section Animation Flow

### Overview
Untuk section contact, telah dibuat sistem animasi khusus yang terdiri dari:
1. **Respawn** - Animasi mendarat (play once)
2. **IdleReady** - Animasi transisi siap (play once)
3. **Idle** - Animasi idle yang loop setelah sequence selesai

### Animation Flow
```
Contact Section Enter → Respawn (one-time) → IdleReady (one-time) → Idle (loop)
```

### Technical Implementation

#### 1. Animation States (animationState.ts)
- `respawn` - Trigger animasi respawn
- `idleReady` - Trigger animasi idle ready (transisi)
- `idle` - Final idle animation yang loop

#### 2. Animation Logic (Mecha.svelte)
- Ketika `respawn` state aktif → memainkan animasi "Respawn"
- Animasi "Respawn" diset ke `LoopOnce` (tidak berulang)
- Setelah "Respawn" selesai → otomatis beralih ke "IdleReady"
- Animasi "IdleReady" diset ke `LoopOnce` (tidak berulang)
- Setelah "IdleReady" selesai → otomatis beralih ke "Idle"
- Animasi "Idle" akan loop terus menerus

#### 3. Event Flow
1. User scroll ke contact section
2. App.svelte memanggil `setActiveAnimation("respawn")`
3. Mecha.svelte memainkan animasi "Respawn" (sekali saja)
4. Setelah selesai, otomatis beralih ke `setActiveAnimation("idleReady")`
5. Animasi "IdleReady" dimainkan (sekali saja)
6. Setelah selesai, otomatis beralih ke `setActiveAnimation("idle")`
7. Animasi "Idle" mulai loop terus menerus

### Key Features
- ✅ Respawn hanya dimainkan sekali saat masuk contact section
- ✅ IdleReady sebagai animasi transisi (sekali saja)
- ✅ Otomatis transisi ke Idle setelah sequence selesai
- ✅ Idle loop terus menerus selama di contact section
- ✅ Smooth crossfade transition antar animasi
- ✅ Event-driven system menggunakan Three.js AnimationMixer

### Debug Console
- Console akan menampilkan "Respawn animation active" saat respawn
- Console akan menampilkan "IdleReady animation active" saat idle ready
- Console akan menampilkan "Idle animation active" saat final idle
- Console akan menampilkan "Entered contact section" saat masuk contact

### Animation Names in Model
- `"Respawn"` - Animasi mendarat
- `"IdleReady"` - Animasi transisi siap
- `"Idle_Base"` - Animasi idle final yang loop

### Usage
Sistem ini bekerja otomatis. Ketika user scroll ke contact section:
```typescript
setActiveAnimation("respawn"); // Triggered dari App.svelte
// Otomatis sequence: respawn → idleReady → idle (loop)
```

### Smooth Animation Flow
Sequence ini memberikan transisi yang lebih smooth:
1. **Landing** (Respawn) - Character mendarat dengan dramatis
2. **Ready** (IdleReady) - Character bersiap dalam posisi siaga
3. **Calm** (Idle) - Character dalam posisi santai yang loop kontinyu
