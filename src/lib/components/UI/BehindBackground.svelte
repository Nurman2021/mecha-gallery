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
    <h1 class="text-white text-[8.5rem] font-extrabold font-druk">HELLO;</h1>
  {:else if $activeSection === "projects"}
    <div class="w-3/5 flex h-screen justify-end bg-[#68151D] p-4">
      <h1 class="text-outline text-9xl font-druk">PRO<br />JECT</h1>
    </div>
  {:else if $activeSection === "about"}
    <div class="flex mt-4">
      <div class="w-3/5 flex"></div>
      <div class="w-2/5 flex h-screen p-4">
        <h1 class="text-outline-red text-7xl font-druk">
          C<br />O<br />D<br />I<br />N<br />G
        </h1>
        <h1 class="text-outline-red text-7xl font-druk">
          S<br />K<br />I<br />L<br />L<br />S
        </h1>
        <h1 class="text-outline-red text-7xl font-druk">S<br />E<br />T</h1>
      </div>
    </div>
  {:else if $activeSection === "contact"}
    <div class="w-3/5 flex bg-[#68151D] h-screen justify-center p-4">
      <h1 class="text-outline text-9xl font-druk">
        L<br />E<br />T<br />S
      </h1>
      <h1 class="text-outline text-9xl font-druk">
        T<br />A<br />L<br />K
      </h1>
    </div>
  {/if}
</div>
<slot />
