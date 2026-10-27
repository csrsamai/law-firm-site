
/* =========================================
   ADVOCATE SEARCH
========================================= */

var ps = document.getElementById("ps");

var ppl = Array.prototype.slice.call(
  document.querySelectorAll(".person")
);

var none = document.getElementById("none");

function filt(t) {
  t = t.toLowerCase().trim();

  var n = 0;

  ppl.forEach(function (p) {
    var m = (p.dataset.s || "").toLowerCase().indexOf(t) > -1;

    p.hidden = !m;

    if (m) n++;
  });

  if (none) {
    none.hidden = n > 0;
  }
}

if (ps) {
  ps.addEventListener("input", function () {
    filt(ps.value);
  });
}


/* =========================================
   MAIN SEARCH FORM
========================================= */

var findForm = document.getElementById("find");

if (findForm) {
  findForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var q = document.getElementById("q");
    var pa = document.getElementById("pa");

    var nameValue = q ? q.value.trim() : "";
    var practiceValue = pa ? pa.value.trim() : "";

    // Use the advocate name if entered.
    // Otherwise, use the selected practice area.
    var value = nameValue || practiceValue;

    if (ps) {
      ps.value = value;
      filt(value);
    }

    var peopleSection = document.getElementById("people");

    if (peopleSection) {
      peopleSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}


/* =========================================
   CONTACT FORM
========================================= */

var contactForm = document.getElementById("f");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var ok = document.getElementById("ok");

    if (ok) {
      ok.textContent =
        "Thank you. Your message is ready to be connected to the firm's email.";
    }

    this.reset();
  });
}


/* =========================================
   MOBILE NAVIGATION MENU
========================================= */

(function () {
  var b = document.getElementById("burger");
  var m = document.getElementById("menu");
  var x = document.getElementById("close");

  if (!b || !m || !x) return;

  function openMenu() {
    m.hidden = false;

    b.setAttribute("aria-expanded", "true");

    x.focus();
  }

  function shutMenu() {
    m.hidden = true;

    b.setAttribute("aria-expanded", "false");

    b.focus();
  }

  b.addEventListener("click", openMenu);

  x.addEventListener("click", shutMenu);

  m.addEventListener("click", function (e) {
    if (e.target === m) {
      shutMenu();
    }
  });

  Array.prototype.forEach.call(
    m.querySelectorAll("nav a"),
    function (a) {
      a.addEventListener("click", function () {
        m.hidden = true;

        b.setAttribute("aria-expanded", "false");
      });
    }
  );

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !m.hidden) {
      shutMenu();
    }
  });
})();


/* =========================================
   HOMEPAGE HERO CAROUSEL
========================================= */

(function () {
  var carousel = document.querySelector(".hero-carousel");

  if (!carousel) return;

  var slides = Array.prototype.slice.call(
    carousel.querySelectorAll(".hero-slide")
  );

  var dots = Array.prototype.slice.call(
    carousel.querySelectorAll(".hero-dot")
  );

  var counter = document.getElementById("slide-current");

  var prev = document.getElementById("hero-prev");

  var next = document.getElementById("hero-next");

  if (!slides.length) return;

  var index = 0;

  var timer = null;

  var reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function showSlide(i) {
    index = (i + slides.length) % slides.length;

    slides.forEach(function (slide, n) {
      var active = n === index;

      slide.classList.toggle("active", active);

      slide.setAttribute("aria-hidden", String(!active));
    });

    dots.forEach(function (dot, n) {
      var active = n === index;

      dot.classList.toggle("active", active);

      dot.setAttribute("aria-pressed", String(active));
    });

    if (counter) {
      counter.textContent = String(index + 1).padStart(2, "0");
    }
  }

  function stopAutoplay() {
    if (timer !== null) {
      window.clearInterval(timer);

      timer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();

    if (
      reducedMotion.matches ||
      document.hidden ||
      carousel.matches(":hover") ||
      carousel.contains(document.activeElement)
    ) {
      return;
    }

    timer = window.setInterval(function () {
      showSlide(index + 1);
    }, 7000);
  }

  if (prev) {
    prev.addEventListener("click", function () {
      showSlide(index - 1);

      startAutoplay();
    });
  }

  if (next) {
    next.addEventListener("click", function () {
      showSlide(index + 1);

      startAutoplay();
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      showSlide(i);

      startAutoplay();
    });
  });

  // Pause while the pointer is over the carousel.
  carousel.addEventListener("mouseenter", stopAutoplay);

  carousel.addEventListener("mouseleave", startAutoplay);

  // Pause while keyboard users interact with its controls.
  carousel.addEventListener("focusin", stopAutoplay);

  carousel.addEventListener("focusout", function (e) {
    if (!carousel.contains(e.relatedTarget)) {
      startAutoplay();
    }
  });

  // Stop when the browser tab is hidden.
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  // Respect changes to the user's motion preference.
  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", startAutoplay);
  }

  // Show the first slide immediately.
  showSlide(0);

  startAutoplay();
})();
