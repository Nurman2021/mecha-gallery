<script lang="ts">
  import { theme, toggleTheme } from "$lib/stores/themeStore";
  import { Sun, Moon } from "lucide-svelte";
</script>

<button
  on:click={toggleTheme}
  class="fixed top-4 right-4 z-50 p-3 rounded-full backdrop-blur-sm transition-all duration-300 theme-toggle"
  aria-label="Toggle theme"
>
  {#if $theme === "dark"}
    <Sun size={20} class="text-yellow-400" />
  {:else}
    <Moon size={20} class="text-gray-700" />
  {/if}
</button>

<style>
  .theme-toggle {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  :global(.light-theme) .theme-toggle {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(139, 127, 115, 0.3);
    box-shadow: 0 4px 12px rgba(139, 127, 115, 0.15);
  }

  .theme-toggle:hover {
    transform: scale(1.05);
  }

  :global(.dark-theme) .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  :global(.light-theme) .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.9);
  }
</style>
