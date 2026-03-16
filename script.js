/* ==========================================================
   Portfolio Script - Terminal/TUI interactions
   ========================================================== */

(function () {
    "use strict";

    // ── Waybar Clock ───────────────────────────────────────
    var waybarClock = document.getElementById("waybarClock");
    function updateClock() {
        if (!waybarClock) return;
        var now = new Date();
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var h = now.getHours().toString().padStart(2, "0");
        var m = now.getMinutes().toString().padStart(2, "0");
        waybarClock.textContent = days[now.getDay()] + " " + h + ":" + m;
    }
    updateClock();
    setInterval(updateClock, 15000);

    // ── Elements ──────────────────────────────────────────
    const tabLinks = document.querySelector("#tabLinks");
    const menuIcon = document.querySelector("#menu-icon");
    const terminalBody = document.querySelector("#terminalBody");
    const typedCommand = document.querySelector("#typedCommand");
    const cursor = document.querySelector("#cursor");
    const heroContent = document.querySelector("#heroContent");
    const heroAscii = document.querySelector("#heroAscii");
    const sections = document.querySelectorAll(".page-section");
    const navLinks = document.querySelectorAll("#tabLinks a[data-section]");

    // ── Name Variables ───────────────────────────────────
    const NAME_ASCII = [
        "  _   _      _     _               _____ _ _",
        " | \\ | | ___| |__ (_)_   _ _   _  | ____| (_) __ _ ___",
        " |  \\| |/ _ \\ '_ \\| | | | | | | | |  _| | | |/ _` / __|",
        " | |\\  |  __/ |_) | | |_| | |_| | | |___| | | (_| \\__ \\",
        " |_| \\_|\\___|_.__/|_|\\__, |\\__,_| |_____|_|_|\\__,_|___/",
        "                     |___/"
    ].join("\n");

    const NAME_AMHARIC = "\u1290\u1265\u12E9"; // ነቡዩ
    const NAME_CHINESE = "\u5510\u8AED";        // 唐諭

    // ── Typing Animation ──────────────────────────────────
    const command = "cat ./about.me";
    let charIndex = 0;

    function typeCommand() {
        if (charIndex < command.length) {
            typedCommand.textContent += command[charIndex];
            charIndex++;
            setTimeout(typeCommand, 60 + Math.random() * 40);
        } else {
            // Command finished typing, show output
            setTimeout(() => {
                if (cursor) cursor.style.display = "none";
                // Inject name variables into the DOM
                if (heroAscii) heroAscii.textContent = NAME_ASCII;
                var amharicEl = document.getElementById("amharicName");
                var chineseEl = document.getElementById("chineseName");
                if (amharicEl) amharicEl.textContent = NAME_AMHARIC;
                if (chineseEl) chineseEl.textContent = NAME_CHINESE;
                if (heroContent) {
                    heroContent.style.display = "block";
                    heroContent.style.animation = "fadeIn 0.4s ease-out";
                }
            }, 300);
        }
    }

    // Start typing after a brief delay
    setTimeout(typeCommand, 500);

    // ── Mobile Menu Toggle ────────────────────────────────
    window.toggleMenu = function () {
        if (tabLinks) tabLinks.classList.toggle("active");
        if (menuIcon) menuIcon.classList.toggle("active");
    };

    // Close mobile menu on link click
    if (tabLinks) {
        tabLinks.addEventListener("click", function (e) {
            if (e.target.closest("a") && window.innerWidth <= 768) {
                tabLinks.classList.remove("active");
                if (menuIcon) menuIcon.classList.remove("active");
            }
        });
    }

    // ── Smooth Scroll for Hash Links ──────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            var targetId = this.getAttribute("href");
            var target = document.querySelector(targetId);
            if (target && terminalBody) {
                // Calculate offset within terminal-body
                var targetTop = target.offsetTop - terminalBody.offsetTop;
                terminalBody.scrollTo({
                    top: targetTop,
                    behavior: "smooth",
                });
                history.pushState(null, "", targetId);
            }
        });
    });

    // ── Active Tab Highlighting on Scroll ─────────────────
    function updateActiveTab() {
        if (!terminalBody) return;
        var scrollPos = terminalBody.scrollTop + 100;

        var activeIndex = -1;
        sections.forEach(function (section, i) {
            var sectionTop = section.offsetTop - terminalBody.offsetTop;
            var sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                activeIndex = i;
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove("active-tab");
        });

        if (activeIndex >= 0 && activeIndex < navLinks.length) {
            navLinks[activeIndex].classList.add("active-tab");
        }
    }

    if (terminalBody) {
        terminalBody.addEventListener("scroll", updateActiveTab);
    }

    // ── Details Toggle Icon Update ────────────────────────
    document.querySelectorAll(".tui-details").forEach(function (details) {
        details.addEventListener("toggle", function () {
            var icon = details.querySelector(".toggle-icon");
            if (icon) {
                icon.innerHTML = details.open ? "&#9660;" : "&#9654;";
            }
        });
    });

    // ── Keyboard Navigation (vim-style) ───────────────────
    document.addEventListener("keydown", function (e) {
        // Don't capture keys when typing in form fields
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

        if (!terminalBody) return;

        switch (e.key) {
            case "j":
                terminalBody.scrollBy({ top: 80, behavior: "smooth" });
                break;
            case "k":
                terminalBody.scrollBy({ top: -80, behavior: "smooth" });
                break;
            case "g":
                // gg - scroll to top (simplified: single g)
                terminalBody.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case "G":
                // G - scroll to bottom
                terminalBody.scrollTo({ top: terminalBody.scrollHeight, behavior: "smooth" });
                break;
        }
    });

    // ── Status Bar Mode Update ────────────────────────────
    var statusMode = document.querySelector(".status-bar-mode");
    if (statusMode) {
        document.addEventListener("keydown", function (e) {
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
                statusMode.textContent = "INSERT";
                statusMode.style.background = "var(--ansi-yellow)";
                statusMode.style.color = "var(--term-bg)";
            }
        });

        document.addEventListener("focusout", function (e) {
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
                statusMode.textContent = "NORMAL";
                statusMode.style.background = "var(--statusbar-bg)";
                statusMode.style.color = "var(--statusbar-fg)";
            }
        });

        document.addEventListener("focusin", function (e) {
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
                statusMode.textContent = "INSERT";
                statusMode.style.background = "var(--ansi-yellow)";
                statusMode.style.color = "var(--term-bg)";
            }
        });
    }

    // ── Intersection Observer for fade-in animations ──────
    var fadeEls = document.querySelectorAll(".fade-in");
    if ("IntersectionObserver" in window && fadeEls.length > 0) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = "running";
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: terminalBody,
                threshold: 0.1,
            }
        );

        fadeEls.forEach(function (el) {
            el.style.animationPlayState = "paused";
            observer.observe(el);
        });
    }
})();
