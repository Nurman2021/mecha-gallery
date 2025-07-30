<script lang="ts">
  // @ts-nocheck

  import { onMount } from "svelte";
  // @ts-ignore
  import { Navigation, Pagination, A11y } from "swiper";
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import { MoveUpRight } from "lucide-svelte";

  import "swiper/css";
  import "swiper/css/navigation";

  // @ts-ignore
  let swiperInstance;
  // @ts-ignore
  let swiperContainer;
  let isScrolling = false;
  let currentIndex = 0;
  const totalSlides = 5;
  let scrollTimeout;
  let lastScrollTime = 0;

  onMount(() => {
    // Handle wheel scroll dengan debouncing yang lebih baik
    const handleWheel = (e) => {
      if (!swiperInstance || isScrolling) return;

      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime < 300) return; // Throttle scroll events

      lastScrollTime = now;
      isScrolling = true;

      if (e.deltaY > 0) {
        swiperInstance.slideNext();
      } else {
        swiperInstance.slidePrev();
      }

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 800); // Increased delay to prevent rapid scrolling
    };

    // Handle custom scroll event from ScrollTrigger dengan improvement
    const handleSwiperScroll = (e) => {
      if (!swiperInstance) return;

      const progress = e.detail.progress;

      // Buat threshold zones untuk setiap slide
      const slideThresholds = [
        { min: 0, max: 0.25, index: 0 },
        { min: 0.25, max: 0.5, index: 1 },
        { min: 0.5, max: 0.75, index: 2 },
        { min: 0.75, max: 1, index: 3 },
      ];

      // Cari slide yang sesuai dengan progress
      const targetSlide = slideThresholds.find(
        (threshold) => progress >= threshold.min && progress < threshold.max
      );

      if (targetSlide && targetSlide.index !== currentIndex) {
        // Hanya pindah slide jika benar-benar melewati threshold
        const shouldTransition =
          Math.abs(progress - targetSlide.index / (totalSlides - 1)) > 0.1;

        if (shouldTransition) {
          currentIndex = targetSlide.index;
          swiperInstance.slideTo(currentIndex, 800); // Slower transition
        }
      }
    };

    // Alternative: Discrete scroll handling untuk section stability
    const handleDiscreteScroll = (e) => {
      if (!swiperInstance) return;

      const progress = e.detail.progress;
      const section = e.detail.section;

      // Hanya handle jika berada di section projects
      if (section !== "projects") return;

      // Discrete zones berdasarkan scroll progress
      let targetIndex;
      if (progress < 0.2) {
        targetIndex = 0;
      } else if (progress < 0.4) {
        targetIndex = 1;
      } else if (progress < 0.7) {
        targetIndex = 2;
      } else {
        targetIndex = 3;
      }

      // Hanya slide jika index berubah dan tidak sedang scrolling
      if (targetIndex !== currentIndex && !isScrolling) {
        isScrolling = true;
        currentIndex = targetIndex;
        swiperInstance.slideTo(currentIndex, 600);

        setTimeout(() => {
          isScrolling = false;
        }, 700);
      }
    };

    // Add event listeners
    if (swiperContainer) {
      swiperContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    // Use discrete scroll handling instead of continuous
    window.addEventListener("swiperScroll", handleDiscreteScroll);

    return () => {
      if (swiperContainer) {
        swiperContainer.removeEventListener("wheel", handleWheel);
      }
      window.removeEventListener("swiperScroll", handleDiscreteScroll);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  });
</script>

<div bind:this={swiperContainer} class="w-full">
  <!-- <h2 class="text-white font-druk text-2xl mb-8 text-center">MY PROJECTS</h2> -->
  <Swiper
    modules={[Navigation, Pagination, A11y]}
    spaceBetween={1}
    slidesPerView={1}
    slidesPerViewMobile={1}
    slidesPerViewTablet={3}
    centeredSlides={true}
    pagination={{ clickable: true }}
    allowTouchMove={true}
    speed={600}
    longSwipesRatio={0.1}
    threshold={10}
    breakpoints={{
      768: {
        slidesPerView: 3,
        centeredSlides: true,
      },
    }}
    on:swiper={(e) => {
      swiperInstance = e.detail[0];
    }}
    on:slideChange={(e) => {
      // Update currentIndex when slide changes manually
      const newIndex = e.detail[0].activeIndex;
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
      }
    }}
  >
    <SwiperSlide>
      <div
        class="p-4 text-left text-white bg-black rounded-2xl border-2 border-[#68151D]"
      >
        <div class="flex gap-3 mb-4">
          <i class="devicon-css3-plain"></i>
          <i class="devicon-threejs-original"></i>
          <i class="devicon-javascript-plain"></i>
          <i class="devicon-photoshop-plain"></i>
        </div>
        <p class="text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
          deleniti? Sunt fugit doloribus eius repudiandae
        </p>
        <img src="/images/porto/starwars.png" alt="project" />
        <h1 class="font-druk text-white text-sm text-left">Starwars Helmet</h1>
        <a
          href="https://starwars-helmet.vercel.app/"
          target="_blank"
          class="flex gap-2 items-center"><MoveUpRight size={12} />Live site</a
        >
        <a
          href="https://github.com/Nurman2021/starwars-helmet"
          target="_blank"
          class="flex gap-2 items-center"><MoveUpRight size={12} />Repository</a
        >
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div
        class="p-4 text-left text-white bg-black rounded-2xl border-2 border-[#68151D]"
      >
        <div class="flex gap-3 mb-4">
          <i class="devicon-supabase-plain"></i>
          <i class="devicon-tailwindcss-original"></i>
          <i class="devicon-svelte-plain"></i>
          <i class="devicon-vercel-original"></i>
        </div>

        <img src="/images/porto/derma.png" alt="project" />
        <h1 class="font-druk text-sm">Dermasense</h1>
        <a
          href="https://www.dermasense.skin"
          target="_blank"
          class="flex items-center gap-2"
        >
          <MoveUpRight size={12} />
          Live site</a
        >
        <a
          href="https://github.com/Nurman2021/dermasense_web_app"
          target="_blank"
          class="flex gap-2 items-center"><MoveUpRight size={12} />Repository</a
        >
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div
        class="p-4 text-left text-white bg-black rounded-2xl border-2 border-[#68151D]"
      >
        <div class="flex gap-3 mb-4">
          <i class="devicon-tailwindcss-original"></i>
          <i class="devicon-svelte-plain"></i>
          <i class="devicon-threejs-original"></i>
        </div>
        <p class="text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
          deleniti? Sunt fugit doloribus eius repudiandae
        </p>
        <img src="/images/porto/algo.png" alt="project" />
        <h1 class="font-druk text-sm">Algo Coffee</h1>
        <a
          href=" https://algo-coffee.vercel.app/"
          target="_blank"
          class="flex gap-2 items-center"><MoveUpRight size={12} />Live site</a
        >
        <a
          href="https://github.com/Nurman2021/algoCoffee"
          target="_blank"
          class="flex gap-2 items-center"><MoveUpRight size={12} />Repository</a
        >
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div
        class="p-4 text-white text-left bg-black rounded-2xl border-2 border-[#68151D]"
      >
        <div class="flex gap-3 mb-4">
          <i class="devicon-tailwindcss-original"></i>
          <i class="devicon-antdesign-plain"></i>
          <i class="devicon-nextjs-plain"></i>
        </div>
        <p class="text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
          deleniti? Sunt fugit doloribus eius repudiandae
        </p>
        <img src="/images/porto/zafa.png" alt="project" />
        <h1 class="font-druk text-sm">Zafa Clone</h1>
        <a
          href="https://algo-coffee.vercel.app/"
          target="_blank"
          class="flex gap-2 items-center"><MoveUpRight size={12} />Live site</a
        >
        <a
          href="https://github.com/Nurman2021/zafatrans-clone"
          target="_blank"
          class="flex gap-2 items-center"><MoveUpRight size={12} />Repository</a
        >
      </div>
    </SwiperSlide>
  </Swiper>
</div>

<style>
  img {
    filter: url(#svgGradientMap) contrast(120%) brightness(85%);
    width: 20rem;
    height: 23rem;
    opacity: 0.3;
  }

  /* Mobile centered slide styling */
  @media (max-width: 767px) {
    :global(.swiper-slide) {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }

    :global(.swiper-wrapper) {
      align-items: center !important;
    }
  }
</style>
