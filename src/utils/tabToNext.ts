import { focusable } from "tabbable";

export function tabToNext(currentElement: HTMLElement) {
  const root = document.getElementById("root")!;
  const elements = focusable(root);
  const currentIndex = elements.indexOf(currentElement);
  if (-1 < currentIndex && currentIndex < elements.length - 1) {
    const nextElement = elements[currentIndex+1];
    nextElement.focus();
  } else {
    console.log("Could not find next focusable node.");
  }
}

export function tabToPrevious(currentElement: HTMLElement) {
  const root = document.getElementById("root")!;
  const elements = focusable(root);
  const currentIndex = elements.indexOf(currentElement);
  if (0 < currentIndex) {
    const previousElement = elements[currentIndex-1];
    previousElement.focus();
  } else {
    console.log("Could not find previous focusable node.");
  }
}

