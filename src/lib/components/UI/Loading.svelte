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
    class="loading-screen fixed inset-0 bg-black flex items-center justify-center"
    transition:fade={{ duration: 800 }}
    style="z-index: 9999;"
  >
    <div class="loading-content text-center">
      <!-- Logo or Brand -->
      <div class="mb-8">
        <h1 class="loading-title font-druk text-4xl mb-2">NOORMAN</h1>
        <p class="loading-subtitle text-sm">3D Portfolio</p>
      </div>

      <!-- Progress Bar -->
      <div class="progress-container mb-6">
        <div class="progress-bar-bg w-64 h-2 rounded-full overflow-hidden">
          <div
            class="progress-bar h-full transition-all duration-300 ease-out"
            style="width: {progress}%"
          ></div>
        </div>
        <p class="progress-text text-sm mt-2">{Math.round(progress)}%</p>
      </div>

      <!-- Loading Text -->
      <div class="loading-text">
        <p class="loading-message text-lg font-light">
          {loadingText}{dots}
        </p>
      </div>

      <!-- Loading Animation -->
      <div class="mt-8 flex justify-center space-x-2">
        <div
          class="loading-dot w-2 h-2 rounded-full animate-bounce"
          style="animation-delay: 0ms"
        ></div>
        <div
          class="loading-dot w-2 h-2 rounded-full animate-bounce"
          style="animation-delay: 150ms"
        ></div>
        <div
          class="loading-dot w-2 h-2 rounded-full animate-bounce"
          style="animation-delay: 300ms"
        ></div>
      </div>
    </div>
  </div>
{/if}

<style>
  .loading-screen {
    background: linear-gradient(135deg, var(--bg-start) 0%, var(--bg-end) 100%);
    backdrop-filter: blur(10px);
    z-index: 9999 !important;
  }

  .loading-title {
    color: var(--text-color);
  }

  .loading-subtitle {
    color: var(--text-color);
    opacity: 0.6;
  }

  .progress-bar-bg {
    background: rgba(128, 128, 128, 0.3);
  }

  :global(.light-theme) .progress-bar-bg {
    background: rgba(139, 127, 115, 0.2);
  }

  .progress-bar {
    background: linear-gradient(
      90deg,
      var(--primary-color),
      var(--primary-color)
    );
    box-shadow: 0 0 10px rgba(204, 79, 85, 0.5);
  }

  :global(.dark-theme) .progress-bar {
    background: linear-gradient(90deg, #cc4f55, #ff6b6b);
    box-shadow: 0 0 10px rgba(204, 79, 85, 0.5);
  }

  :global(.light-theme) .progress-bar {
    background: linear-gradient(90deg, #f7b500, #ffcc33);
    box-shadow: 0 0 10px rgba(247, 181, 0, 0.5);
  }

  .progress-text {
    color: var(--text-color);
  }

  .loading-message {
    color: var(--text-color);
    opacity: 0.8;
  }

  .loading-dot {
    background: var(--text-color);
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
