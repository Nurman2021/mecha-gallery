<script>
  // @ts-ignore
  import { Navigation, Pagination, A11y } from "swiper";
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import { MoveUpRight } from "lucide-svelte";

  import "swiper/css";
  import "swiper/css/navigation";
</script>

<Swiper
  modules={[Navigation, Pagination, A11y]}
  spaceBetween={1}
  slidesPerView={2}
  navigation
  pagination={{ clickable: true }}
>
  <SwiperSlide>
    <div class="p-4 text-left text-white">
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
    <div class="p-4 text-left text-white">
      <div class="flex gap-3 mb-4">
        <i class="devicon-supabase-plain"></i>
        <i class="devicon-tailwindcss-original"></i>
        <i class="devicon-svelte-plain"></i>
        <i class="devicon-vercel-original"></i>
      </div>
      <p class="text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
        deleniti? Sunt fugit doloribus eius repudiandae
      </p>
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
    <div class="p-4 text-left text-white">
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
    <div class="p-4 text-white text-left">
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
<svg xmlns="http://www.w3.org/2000/svg"
  ><filter id="svgGradientMap"
    ><fecolormatrix type="saturate" values="0" /><feComponentTransfer
      color-interpolation-filters="sRGB"
      ><feFuncR
        type="table"
        tableValues="0.16,0.17,0.18,0.18,0.19,0.2,0.2,0.21,0.22,0.22,0.23,0.23,0.24,0.25,0.25,0.26,0.27,0.27,0.28,0.29,0.29,0.3,0.3,0.31,0.32,0.32,0.33,0.34,0.34,0.35,0.36,0.36,0.37,0.37,0.38,0.39,0.39,0.4,0.41,0.41,0.42,0.43,0.43,0.44,0.44,0.45,0.46,0.46,0.47,0.48,0.48,0.49,0.5,0.5,0.51,0.51,0.52,0.53,0.53,0.54,0.55,0.55,0.56,0.56,0.57,0.58,0.58,0.59,0.6,0.6,0.61,0.62,0.62,0.63,0.63,0.64,0.65,0.65,0.66,0.67,0.67,0.68,0.69,0.69,0.7,0.7,0.71,0.72,0.72,0.73,0.74,0.74,0.75,0.76,0.76,0.77,0.77,0.78,0.79,0.79,204"
      /><feFuncG
        type="table"
        tableValues="0.04,0.04,0.04,0.05,0.05,0.05,0.06,0.06,0.06,0.06,0.07,0.07,0.07,0.07,0.08,0.08,0.08,0.09,0.09,0.09,0.09,0.1,0.1,0.1,0.1,0.11,0.11,0.11,0.11,0.12,0.12,0.12,0.13,0.13,0.13,0.13,0.14,0.14,0.14,0.14,0.15,0.15,0.15,0.16,0.16,0.16,0.16,0.17,0.17,0.17,0.17,0.18,0.18,0.18,0.19,0.19,0.19,0.19,0.2,0.2,0.2,0.2,0.21,0.21,0.21,0.22,0.22,0.22,0.22,0.23,0.23,0.23,0.23,0.24,0.24,0.24,0.24,0.25,0.25,0.25,0.26,0.26,0.26,0.26,0.27,0.27,0.27,0.27,0.28,0.28,0.28,0.29,0.29,0.29,0.29,0.3,0.3,0.3,0.3,0.31,79"
      /><feFuncB
        type="table"
        tableValues="0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.35,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.34,0.33,0.33,0.33,0.33,0.33,0.33,0.33,0.33,0.33,0.33,85"
      /></feComponentTransfer
    ></filter
  ></svg
>

<style>
  img {
    filter: url(#svgGradientMap) contrast(120%) brightness(85%);
    width: 20rem;
    height: 23rem;
    opacity: 0.3;
  }
</style>
