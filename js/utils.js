// Shared helpers
export const $ = (s) => document.querySelector(s);
export const $$ = (s) => document.querySelectorAll(s);
export const root = document.documentElement;
export const mod = (n, m) => ((n % m) + m) % m;
