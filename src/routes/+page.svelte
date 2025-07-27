<script lang="ts">
  import "../app.css";
  import App from "$lib/components/3D/App.svelte";
  import BehindBackground from "$lib/components/UI/BehindBackground.svelte";
  import LoadingScreen from "$lib/components/UI/LoadingScreen.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { loadingStore, resetLoading } from "$lib/stores/loadingStore";

  let pageLoaded = false;
  let isContentReady = false;

  // Handle loading events from App/Scene
  const handleLoadProgress = (event: any) => {
    // Progress is handled by the loading store
  };

  const handleLoadComplete = () => {
    // Add small delay for smooth transition
    setTimeout(() => {
      isContentReady = true;
    }, 800);
  };

  onMount(() => {
    // Reset loading state
    resetLoading();

    // Ensure DOM is ready
    pageLoaded = true;
  });
</script>

<svelte:head>
  <title>I'm Noorman</title>
  <meta name="description" content="portofolio" />

  <!-- Preload critical assets -->
  <link
    rel="preload"
    href="/models/Mecha.glb"
    as="fetch"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="/fonts/DrukWideBold.ttf"
    as="font"
    type="font/ttf"
    crossorigin="anonymous"
  />
</svelte:head>

<!-- Loading Screen -->
<LoadingScreen
  isLoading={$loadingStore.isLoading}
  progress={$loadingStore.progress}
/>

<!-- Main Content -->
{#if pageLoaded}
  {#if isContentReady}
    <div transition:fade={{ duration: 1000 }}>
      <BehindBackground>
        <App
          on:loadProgress={handleLoadProgress}
          on:loadComplete={handleLoadComplete}
        />
      </BehindBackground>
    </div>
  {:else}
    <!-- Preload content in background -->
    <div class="opacity-0 pointer-events-none">
      <BehindBackground>
        <App
          on:loadProgress={handleLoadProgress}
          on:loadComplete={handleLoadComplete}
        />
      </BehindBackground>
    </div>
  {/if}
{/if}
