export const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
const activeAnimations = new Set();
const elementAnimations = new WeakMap();

export function playMotion(element, frames, options = {}) {
  if (motionPreference.matches) return;
  elementAnimations.get(element)?.cancel();
  const animation = element.animate(frames, {
    duration: 650,
    easing: "cubic-bezier(.16, 1, .3, 1)",
    fill: "backwards",
    ...options,
  });
  elementAnimations.set(element, animation);
  activeAnimations.add(animation);
  animation.onfinish = animation.oncancel = () => {
    activeAnimations.delete(animation);
    if (elementAnimations.get(element) === animation) elementAnimations.delete(element);
  };
  return animation;
}

motionPreference.addEventListener("change", () => {
  if (motionPreference.matches) activeAnimations.forEach((animation) => animation.cancel());
});
