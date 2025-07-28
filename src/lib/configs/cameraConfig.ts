// Camera and positioning configuration for desktop and mobile
export interface CameraConfig {
    position: [number, number, number];
    target: [number, number, number];
}

export interface SectionCameraConfig {
    desktop: CameraConfig;
    mobile: CameraConfig;
}

export const cameraConfigs: Record<string, SectionCameraConfig> = {
    hero: {
        desktop: {
            position: [0, 0, 10],
            target: [0, 0, 0]
        },
        mobile: {
            position: [0, 0, 10],
            target: [0, 0, 0]
        }
    },
    projects: {
        desktop: {
            position: [-10, 12, 21],
            target: [4, 0.5, -2]
        },
        mobile: {
            position: [0, 8, 25],
            target: [0, 2, 0]
        }
    },
    about: {
        desktop: {
            position: [5, 10, 25],
            target: [-4, 2, 0]
        },
        mobile: {
            position: [0, 6, 35],
            target: [0, 3, 0]
        }
    },
    contact: {
        desktop: {
            position: [5, 10, 25],
            target: [2, 2, -2]
        },
        mobile: {
            position: [0, 4, 30],
            target: [0, 2.5, 0]
        }
    }
};

// Utility function to detect mobile
export const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768; // md breakpoint
};

// Get camera config based on device
export const getCameraConfig = (section: string): CameraConfig => {
    const config = cameraConfigs[section];
    if (!config) return cameraConfigs.hero.desktop;

    return isMobile() ? config.mobile : config.desktop;
};
