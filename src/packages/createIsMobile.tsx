import createMediaQuery from "@solid-primitives/media";

export function createIsMobile() {
  return createMediaQuery("(max-width: 991px)");
}
