import { writable } from "svelte/store";

export type SectionType = 'hero' | 'projects' | 'about' | 'contact';

export const currentBackgroundSection = writable<SectionType>('hero'); // Start with hero

// Helper function to set active background section
export const setActiveBackgroundSection = (section: SectionType) => {
    currentBackgroundSection.set(section);
};

// Helper function to get section display config
export const getSectionConfig = (section: SectionType) => {
    const configs = {
        hero: {
            title: "HELLO;",
            className: "text-white text-[8.5rem] font-extrabold font-druk",
            layout: "center"
        },
        projects: {
            title: "PRO\nJECT",
            className: "text-outline text-9xl font-druk",
            layout: "right"
        },
        about: {
            titles: ["C\nO\nD\nI\nN\nG\n", "S\nK\nI\nL\nL\nS", "S\nE\nT\n"],
            className: "text-outline-red text-7xl font-druk",
            layout: "right-multi"
        },
        contact: {
            titles: ["L\nE\nT\nS", "T\nA\nL\nK"],
            className: "text-outline text-9xl font-druk",
            layout: "center-multi"
        }
    };

    return configs[section];
};
