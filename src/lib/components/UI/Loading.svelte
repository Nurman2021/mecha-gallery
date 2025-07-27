<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let isLoading = true;
  export let progress = 0;

  let loadingText = "Loading";
  let dots = "";

  onMount(() => {
    const interval = setInterval(() => {
      dots = dots.length >= 3 ? "" : dots + ".";
    }, 500);

    return () => clearInterval(interval);
  });
</script>

{#if isLoading}
  <div
    class="loading-screen fixed inset-0 z-50 bg-black flex items-center justify-center"
    transition:fade={{ duration: 800 }}
  >
    <div class="loading-content text-center">
      <!-- Logo or Brand -->
      <div class="mb-8">
        <h1 class="text-white font-druk text-4xl mb-2">NOORMAN</h1>
        <p class="text-gray-400 text-sm">3D Portfolio</p>
      </div>

      <!-- Progress Bar -->
      <div class="progress-container mb-6">
        <div
          class="progress-bar-bg w-64 h-2 bg-gray-800 rounded-full overflow-hidden"
        >
          <div
            class="progress-bar h-full bg-gradient-to-r from-[#cc4f55] to-red-400 transition-all duration-300 ease-out"
            style="width: {progress}%"
          ></div>
        </div>
        <p class="text-white text-sm mt-2">{Math.round(progress)}%</p>
      </div>

      <!-- Loading Text -->
      <div class="loading-text">
        <p class="text-gray-300 text-lg font-light">
          {loadingText}{dots}
        </p>
      </div>

      <!-- Loading Animation -->
      <div class="mt-8 flex justify-center space-x-2">
        <div
          class="loading-dot w-2 h-2 bg-white rounded-full animate-bounce"
          style="animation-delay: 0ms"
        ></div>
        <div
          class="loading-dot w-2 h-2 bg-white rounded-full animate-bounce"
          style="animation-delay: 150ms"
        ></div>
        <div
          class="loading-dot w-2 h-2 bg-white rounded-full animate-bounce"
          style="animation-delay: 300ms"
        ></div>
      </div>
    </div>
  </div>
{/if}

<style>
  .loading-screen {
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
    backdrop-filter: blur(10px);
  }

  .progress-bar {
    box-shadow: 0 0 10px rgba(204, 79, 85, 0.5);
  }

  .loading-dot {
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .loading-content {
    animation: pulse 2s ease-in-out infinite;
  }
</style>
