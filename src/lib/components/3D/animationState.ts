import { writable } from "svelte/store";

export const idle = writable(false);
export const run = writable(false);
export const idlePose = writable(false);
export const channel = writable(false);
