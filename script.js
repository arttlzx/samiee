
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
   
    nav.classList.toggle('nav-active');

  
    burger.classList.toggle('toggle');
});


const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.2, 
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

/* --- NEW CODE: Active Link Highlighter --- */

// 1. Select all sections that have an ID (home, about, skills, etc.)
const sections = document.querySelectorAll("section[id]");

// 2. Observer Options
// threshold: 0.6 means "When 60% of the section is visible, trigger this"
const sectionOptions = {
    threshold: 0.3
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Only run if the section is intersecting/visible
        if (entry.isIntersecting) {
            // Get the ID of the section (e.g., "about")
            const currentId = entry.target.getAttribute("id");

            // Find the link in the navbar that points to this ID
            // We select 'a' tags where href includes the ID
            const activeLink = document.querySelector(`.nav-links a[href*=${currentId}]`);

            // Remove 'active' class from ALL links first
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });

            // Add 'active' class to the CURRENT link
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, sectionOptions);

// 3. Tell the observer to watch every section
sections.forEach(section => {
    navObserver.observe(section);
});