<script lang="ts">
  import { Instagram, Github, Linkedin, Mail, Briefcase } from "lucide-svelte";
  import { onMount } from "svelte";

  let form: HTMLFormElement;
  let isSubmitting = false;
  let submitMessage = "";

  onMount(() => {
    // Initialize EmailJS
    if (typeof window !== "undefined") {
      import("@emailjs/browser").then((emailjs) => {
        emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
      });
    }
  });

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isSubmitting = true;
    submitMessage = "";

    try {
      const emailjs = await import("@emailjs/browser");

      await emailjs.sendForm(
        "service_n9efrj6", // Replace with your EmailJS service ID
        "template_rax8qpj", // Replace with your EmailJS template ID
        form,
        "poy2f3j34ZDCQza4v" // Replace with your EmailJS user ID
      );

      submitMessage = "Message sent successfully!";
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      submitMessage = "Failed to send message. Please try again.";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="text-center">
  <h2 class="contact-title font-druk text-2xl mb-8 invisible md:visible">
    GET IN TOUCH
  </h2>

  <div
    class="profile-card rounded-2xl p-4 border-2 mb-4 flex gap-4 invisible md:visible"
  >
    <div class="text-left my-8">
      <h1 class="profile-name font-bold text-4xl">Hi, I'm Nurman 👋</h1>
      <h4 class="profile-description">
        Frontend Developer. I love building things that make difference.
      </h4>
    </div>

    <img
      src="https://ik.imagekit.io/nurman/Portofolio/nurman-profile-portofolio.png?updatedAt=1727346483705"
      alt="nurman"
      class=" h-24 w-24 rounded-full"
    />
  </div>

  <!-- Contact Form -->
  <div class="contact-form p-6 border-2 rounded-2xl">
    <form bind:this={form} on:submit={handleSubmit} class="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name :"
          required
          class="form-input w-full p-4 border-none rounded-lg focus:outline-none focus:ring-2"
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email :"
          required
          class="form-input w-full p-4 border-none rounded-lg focus:outline-none focus:ring-2"
        />
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Message :"
          required
          rows="6"
          class="form-input w-full p-4 border-none rounded-lg resize-none focus:outline-none focus:ring-2"
        ></textarea>
      </div>

      <div class="flex justify-between items-center pt-4">
        <div class="flex gap-4">
          <a
            href="https://github.com/Nurman2021"
            class="social-link"
            target="_blank"
          >
            <Github class="w-6 h-6" />
          </a>
          <a
            href="www.linkedin.com/in/nurman-awaluddin-368a74353"
            target="_blank"
            class="social-link"
          >
            <Linkedin class="w-6 h-6" />
          </a>
          <a
            href="mailto:nurman.awaluddin2017@gmail.com"
            class="social-link"
            target="_blank"
          >
            <Mail class="w-6 h-6" />
          </a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          class="submit-button px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </div>

      {#if submitMessage}
        <div class="text-center mt-4">
          <p
            class={submitMessage.includes("success")
              ? "submit-success"
              : "submit-error"}
          >
            {submitMessage}
          </p>
        </div>
      {/if}
    </form>
  </div>
</div>

<style>
  .contact-title {
    color: var(--text-color);
  }

  .profile-card {
    background: rgba(0, 0, 0, 0.8);
    border-color: #68151d;
    backdrop-filter: blur(10px);
  }

  :global(.light-theme) .profile-card {
    background: rgba(245, 241, 235, 0.9);
    border-color: rgba(139, 127, 115, 0.3);
  }

  .profile-name {
    color: var(--text-color);
  }

  .profile-description {
    color: var(--text-color);
    opacity: 0.9;
  }

  .contact-form {
    background: rgba(0, 0, 0, 0.8);
    border-color: #68151d;
    backdrop-filter: blur(10px);
  }

  :global(.light-theme) .contact-form {
    background: rgba(245, 241, 235, 0.9);
    border-color: rgba(139, 127, 115, 0.3);
  }

  .form-input {
    background: rgba(64, 64, 64, 0.8);
    color: var(--text-color);
    transition: all 0.3s ease;
  }

  :global(.light-theme) .form-input {
    background: rgba(139, 127, 115, 0.1);
  }

  .form-input::placeholder {
    color: var(--text-color);
    opacity: 0.7;
  }

  .form-input:focus {
    box-shadow: 0 0 0 2px var(--primary-color);
  }

  .social-link {
    color: var(--text-color);
    transition: all 0.3s ease;
  }

  .social-link:hover {
    color: var(--primary-color);
    transform: translateY(-2px);
  }

  .submit-button {
    background: #68151d;
    color: white;
    transition: all 0.3s ease;
  }

  :global(.light-theme) .submit-button {
    background: #f7b500;
  }

  .submit-button:hover {
    background: var(--primary-color);
    transform: translateY(-2px);
  }

  .submit-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .submit-success {
    color: #10b981;
  }

  .submit-error {
    color: var(--primary-color);
  }
</style>
