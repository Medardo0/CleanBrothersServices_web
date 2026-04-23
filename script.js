const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const body = document.body;

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open");
    body.classList.toggle("menu-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
      body.classList.remove("menu-open");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));
}


const form = document.querySelector("#quote-form");
const submitButton = document.querySelector("#submit-button");
const statusMessage = document.querySelector("#form-status");

if (form && submitButton && statusMessage) {
  emailjs.init({
    publicKey: "jItjSvJQK07ON26IW",
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    statusMessage.textContent = "";
    statusMessage.className = "form-status";

    submitButton.disabled = true;
    submitButton.textContent = "Envoi en cours...";

    try {
      await emailjs.sendForm(
        "service_hnqc2fg",
        "template_welzyph",
        form
      );

      statusMessage.textContent =
        "Votre demande a bien été envoyée. Nous vous répondrons rapidement.";
      statusMessage.classList.add("success");
      form.reset();

    } catch (error) {
      console.error("EmailJS error:", error);
      statusMessage.textContent =
        "Une erreur est survenue pendant l'envoi. Veuillez réessayer.";
      statusMessage.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Envoyer la demande";
    }
  });
}