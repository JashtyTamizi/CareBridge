"use strict";

document.documentElement.classList.add("has-js");

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
  const mobileViewport = window.matchMedia("(max-width: 640px)");

  const setMenuExpanded = (expanded) => {
    menuToggle.setAttribute("aria-expanded", String(expanded));
    primaryNav.hidden = mobileViewport.matches && !expanded;
  };

  const syncMenuToViewport = () => {
    menuToggle.hidden = !mobileViewport.matches;
    setMenuExpanded(false);
  };

  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuExpanded(!expanded);
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileViewport.matches) {
        setMenuExpanded(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuExpanded(false);
      menuToggle.focus();
    }
  });

  if (typeof mobileViewport.addEventListener === "function") {
    mobileViewport.addEventListener("change", syncMenuToViewport);
  } else {
    mobileViewport.addListener(syncMenuToViewport);
  }

  syncMenuToViewport();
}
