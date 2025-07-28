<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";
  import { writable } from "svelte/store";

  gsap.registerPlugin(ScrollTrigger);
  const activeSection = writable<string>("");

  interface Section {
    id: string;
    element: string;
  }

  const sections: Section[] = [
    { id: "#hero", element: "hero" },
    { id: "#projects", element: "projects" },
    { id: "#about", element: "about" },
    { id: "#contact", element: "contact" },
  ];

  onMount(() => {
    sections.forEach((section) => {
      const { id, element } = section;

      ScrollTrigger.create({
        trigger: id,
        start: "top center",
        onEnter: () => activeSection.set(element),
        onEnterBack: () => activeSection.set(element),
      });
    });
  });
</script>

<div class="text-center fixed z-10 w-full">
  {#if $activeSection === "hero"}
    <h1
      class="text-white mt-4 text-7xl md:text-[8.5rem] font-extrabold font-druk px-4"
    >
      HELLO;
    </h1>
  {:else if $activeSection === "projects"}
    <div
      class="w-full md:w-3/5 flex h-screen justify-center md:justify-end bg-[#68151D] p-4"
    >
      <h1 class="text-outline text-6xl md:text-9xl font-druk text-center">
        PRO<br />JECT
      </h1>
    </div>
  {:else if $activeSection === "about"}
    <div class="flex flex-col md:flex-row mt-4">
      <div class="w-full md:w-3/5 flex"></div>
      <div
        class="w-full md:w-2/5 flex h-screen justify-center md:justify-start p-4"
      >
        <h1 class="text-outline-red text-4xl md:text-7xl font-druk text-center">
          C<br />O<br />D<br />I<br />N<br />G
        </h1>
        <h1 class="text-outline-red text-4xl md:text-7xl font-druk text-center">
          S<br />K<br />I<br />L<br />L<br />S
        </h1>
        <h1 class="text-outline-red text-4xl md:text-7xl font-druk text-center">
          S<br />E<br />T
        </h1>
      </div>
    </div>
  {:else if $activeSection === "contact"}
    <div class="w-full md:w-3/5 flex bg-[#68151D] h-screen justify-center p-4">
      <h1 class="text-outline text-6xl md:text-9xl font-druk text-center">
        L<br />E<br />T<br />S
      </h1>
      <h1 class="text-outline text-6xl md:text-9xl font-druk text-center">
        T<br />A<br />L<br />K
      </h1>
    </div>
  {/if}
</div>
<slot />
