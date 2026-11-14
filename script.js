(() => {
  "use strict";

  /* İngilizce metinler. Türkçe metinler doğrudan index.html'den okunur. */
  const EN = {
    "pdf": "PDF",
    "role": "Tech Lead — Embedded Systems",
    "loc": "Gebze, Türkiye",
    "f1": "<strong>20+</strong> years of experience",
    "f2": "<strong>1,000+</strong> projects",
    "f3": "<strong>10+</strong> industries",
    "f4": "<strong>2M+</strong> units produced",

    "about.h": "About",
    "about.p": "For more than 20 years I have been developing projects across virtually every field of electronics, for national and international customers around the world, handling hardware and software together. I aim to keep growing by carrying what each project teaches me into the next.",

    "skills.h": "Expertise",
    "sk.hw": "Hardware",
    "sk.hw.d": "Schematic & multilayer PCB, analog / digital / mixed-signal, power electronics & BMS, RF & antenna integration, EMC-aware design",
    "sk.sw": "Embedded software",
    "sk.sw.d": "C/C++ firmware (bare-metal & RTOS), driver development, hardware–software integration, device-to-cloud communication, low-power optimization, embedded Linux",
    "sk.com": "Connectivity",
    "sk.com.d": "GSM / GPRS / LTE, GNSS, Bluetooth / BLE, Wi-Fi, Sub-GHz & long-range RF, CAN / LIN",
    "sk.lead": "Leadership",
    "sk.lead.d": "Technical leadership & team management, product development from requirements to mass production, testing & validation, certification, technical customer coordination",

    "tools.h": "Tools & platforms",
    "t.mcu": "MCUs & CPUs",
    "t.mcu.d": "10+ vendors, 100+ models: STM32, MSP430, nRF52 and similar",
    "t.linux": "Embedded Linux",
    "t.linux.d": "Yocto, Buildroot, U-Boot, device tree, kernel drivers",
    "t.sw": "Embedded software",
    "t.eda": "Design",
    "t.lab": "Test & measurement",
    "t.lab.d": "Oscilloscopes, spectrum & logic analyzers, power analysis, EMC pre-compliance",

    "proj.h": "Project domains",
    "proj.note": "More than 1,000 projects, large and small, across virtually every field of electronics. As some of them are under NDA, customer and project names are not listed.",
    "p1": "Automotive",
    "p1.d": "Body, axle and power control units, eCall; projects for international premium manufacturers",
    "p2": "Defense industry",
    "p2.d": "Electronics and embedded systems for harsh environments and high reliability",
    "p3": "Marine & aerospace",
    "p3.d": "Rugged electronics and communication solutions",
    "p4": "Communications & RF",
    "p4.d": "Long-range RF, wireless control networks, cellular and short-range modules",
    "p5": "Tracking & telemetry",
    "p5.d": "Vehicle and asset tracking, Wi-Fi / BLE tags, remote monitoring",
    "p6": "Industrial & energy",
    "p6.d": "BMS, smart batteries, energy monitoring, lighting control",
    "p7": "Sensing & monitoring",
    "p7.d": "Agriculture, soil and storage-environment monitoring; safety and emergency devices",
    "p8": "Smart home & consumer",
    "p8.d": "Smart home, smart air conditioning, video recorders (DVR), development boards",
    "intl": "Customers in Türkiye, Europe, Asia, the Middle East and North Africa.",

    "exp.h": "Experience",
    "e1.role": "Tech Lead — Embedded Systems",
    "e1.time": "Jun 2018 — Present",
    "e1.text": "Technical leadership for hardware and software teams; architecture, hardware, firmware and embedded Linux for IoT tracking and communication products.",
    "e2.role": "Freelance Consultant",
    "e2.time": "Nov 2017 — Jun 2018",
    "e2.text": "Project-based hardware and embedded software development across industries.",
    "e3.role": "R&D Project Manager",
    "e3.time": "Apr 2017 — Nov 2017",
    "e3.text": "Planning and technical management of R&D projects.",
    "e4.role": "R&D Engineer",
    "e4.time": "Oct 2006 — Nov 2016",
    "e4.text": "Hardware and firmware for automotive electronics, telemetry, tracking, energy and communications; domestic and export projects.",

    "edu.h": "Education & languages",
    "edu.t": "Education",
    "edu.d": "Electronics — high school and university",
    "lang.t": "Languages",
    "lang.d": "Turkish (native), English (professional working proficiency)"
  };

  const META_EN = {
    title: "M. Fatih Güney — Tech Lead · Embedded Systems",
    desc: "M. Fatih Güney — Embedded systems Tech Lead designing hardware and software together. 20+ years of projects across virtually every field of electronics, for national and international customers."
  };

  const STORAGE_KEY = "cv-lang";
  const metaDesc = document.querySelector('meta[name="description"]');
  const nodes = document.querySelectorAll("[data-i18n]");
  const langButtons = document.querySelectorAll("[data-lang]");

  const TR = {};
  nodes.forEach((el) => { TR[el.dataset.i18n] = el.innerHTML; });
  const META_TR = { title: document.title, desc: metaDesc ? metaDesc.content : "" };

  function readStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function store(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* yoksay */ }
  }

  function initialLang() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl === "tr" || fromUrl === "en") return fromUrl;
    const saved = readStored();
    if (saved === "tr" || saved === "en") return saved;
    return (navigator.language || "tr").toLowerCase().startsWith("tr") ? "tr" : "en";
  }

  function setLang(lang, persist) {
    const dict = lang === "en" ? EN : TR;
    const meta = lang === "en" ? META_EN : META_TR;

    nodes.forEach((el) => {
      const value = dict[el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    document.documentElement.lang = lang;
    document.title = meta.title;
    if (metaDesc) metaDesc.setAttribute("content", meta.desc);
    langButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));

    if (persist) {
      store(lang);
      try {
        const url = new URL(location.href);
        url.searchParams.set("lang", lang);
        history.replaceState(null, "", url);
      } catch (e) { /* yoksay */ }
    }
  }

  langButtons.forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang, true)));
  document.querySelectorAll("[data-print]").forEach((b) =>
    b.addEventListener("click", () => window.print())
  );

  setLang(initialLang(), false);
})();
