import { writable } from 'svelte/store';

interface LoadingState {
    isLoading: boolean;
    progress: number;
    currentAsset: string;
    error: string | null;
    totalAssets: number;
    loadedAssets: number;
}

const initialState: LoadingState = {
    isLoading: true,
    progress: 0,
    currentAsset: '',
    error: null,
    totalAssets: 0,
    loadedAssets: 0
};

export const loadingStore = writable(initialState);

export const updateProgress = (progress: number, asset: string = '') => {
    loadingStore.update(state => ({
        ...state,
        progress: Math.min(progress, 100),
        currentAsset: asset
    }));
};

export const incrementAssetLoaded = (assetName: string) => {
    loadingStore.update(state => {
        const newLoadedAssets = state.loadedAssets + 1;
        const progress = state.totalAssets > 0 ? (newLoadedAssets / state.totalAssets) * 100 : 0;

        return {
            ...state,
            loadedAssets: newLoadedAssets,
            progress: Math.min(progress, 100),
            currentAsset: assetName
        };
    });
};

export const setTotalAssets = (total: number) => {
    loadingStore.update(state => ({
        ...state,
        totalAssets: total
    }));
};

export const setError = (error: string) => {
    loadingStore.update(state => ({
        ...state,
        error
    }));
};

export const completeLoading = () => {
    loadingStore.update(state => ({
        ...state,
        isLoading: false,
        progress: 100
    }));
};

export const resetLoading = () => {
    loadingStore.set(initialState);
};
