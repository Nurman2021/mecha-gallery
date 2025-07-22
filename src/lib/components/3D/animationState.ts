import { writable } from "svelte/store";

export const idle = writable(true); // Start with idle animation
export const run = writable(false);
export const idlePose = writable(false);
export const channel = writable(false);

// Helper function to reset all animations
export const resetAllAnimations = () => {
    idle.set(false);
    run.set(false);
    idlePose.set(false);
    channel.set(false);
};

// Helper function to set only one animation active
export const setActiveAnimation = (animationType: 'idle' | 'run' | 'idlePose' | 'channel') => {
    resetAllAnimations();

    switch (animationType) {
        case 'idle':
            idle.set(true);
            break;
        case 'run':
            run.set(true);
            break;
        case 'idlePose':
            idlePose.set(true);
            break;
        case 'channel':
            channel.set(true);
            break;
    }
};
