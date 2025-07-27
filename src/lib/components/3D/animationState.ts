import { writable } from "svelte/store";

export const idle = writable(true); // Start with idle animation
export const run = writable(false);
export const idlePose = writable(false);
export const respawn = writable(false);
export const idleReady = writable(false);

// Helper function to reset all animations
export const resetAllAnimations = () => {
    idle.set(false);
    run.set(false);
    idlePose.set(false);
    respawn.set(false);
    idleReady.set(false);
};

// Helper function to set only one animation active
export const setActiveAnimation = (animationType: 'idle' | 'run' | 'idlePose' | 'respawn' | 'idleReady') => {
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
        case 'respawn':
            respawn.set(true);
            break;
        case 'idleReady':
            idleReady.set(true);
            break;
    }
};
