console.log("크린워터솔루션 사이트가 실행되었습니다.");
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    alert(
      "상담 신청 화면은 완성되었습니다. 실제 접수 기능은 별도 연동이 필요합니다.",
    );
  });
}
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px",
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
const countUpElements = document.querySelectorAll(".count-up");

const runCountUp = (element) => {
  const target = Number(element.dataset.count);
  const suffix = element.dataset.suffix || "";
  const duration = 1000;
  const startTime = performance.now();

  const updateCount = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    // 처음에는 천천히, 중간에는 빠르게, 끝에서는 다시 천천히
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentNumber = Math.floor(target * easedProgress);

    element.textContent = currentNumber.toLocaleString("ko-KR") + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = target.toLocaleString("ko-KR") + suffix;
    }
  };

  requestAnimationFrame(updateCount);
};

const countUpObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      runCountUp(entry.target);
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.4,
  },
);

countUpElements.forEach((element) => {
  countUpObserver.observe(element);
});
