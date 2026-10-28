// Week 2: DOM selection, event handling and an accessible image viewer.
const galleryGrid = document.querySelector("#gallery-grid");
const galleryCards = Array.from(document.querySelectorAll(".gallery-card"));
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxCount = document.querySelector("#lightbox-count");
const closeButton = document.querySelector("#close-lightbox");
const previousButton = document.querySelector("#previous-image");
const nextButton = document.querySelector("#next-image");

// Keep image details in one array so the viewer can switch photos consistently.
const photos = galleryCards.map((card) => {
  const image = card.querySelector("img");
  return {
    src: image.src,
    alt: image.alt,
    title: card.querySelector(".card-title").textContent.trim()
  };
});

let activeIndex = 0;
let previouslyFocusedElement = null;

function showPhoto(index) {
  // Wrap around at the beginning and end of the collection.
  activeIndex = (index + photos.length) % photos.length;
  const photo = photos[activeIndex];

  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxCaption.textContent = photo.title;
  lightboxCount.textContent =
    String(activeIndex + 1).padStart(2, "0") + " / " +
    String(photos.length).padStart(2, "0");
}

function openLightbox(index) {
  previouslyFocusedElement = document.activeElement;
  showPhoto(index);
  if (!lightbox.open) lightbox.showModal();
  closeButton.focus();
}

function closeLightbox() {
  if (lightbox.open) lightbox.close();
}

// Event delegation handles clicks on any gallery card.
galleryGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".gallery-card");
  if (!card) return;
  openLightbox(Number(card.dataset.index));
});

closeButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", () => showPhoto(activeIndex - 1));
nextButton.addEventListener("click", () => showPhoto(activeIndex + 1));

// Clicking the backdrop (rather than the image or controls) closes the viewer.
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

// Return keyboard focus to the card that opened the dialog.
lightbox.addEventListener("close", () => {
  if (previouslyFocusedElement instanceof HTMLElement) {
    previouslyFocusedElement.focus();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "ArrowLeft") showPhoto(activeIndex - 1);
  if (event.key === "ArrowRight") showPhoto(activeIndex + 1);
});
