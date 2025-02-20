import { useEffect } from 'react';
import { Howler } from 'howler';

interface SoundControllerProps {
    isMuted: boolean;
    showIntro: boolean;
    isIslandVisible: boolean;
    stopAmbient: () => void;
    playPortalHum: () => void;
    ambientStarted: boolean;
    playAmbient: () => void;
}

export const SoundController: React.FC<SoundControllerProps> = ({
                                                                    isMuted,
                                                                    showIntro,
                                                                    isIslandVisible,
                                                                    stopAmbient,
                                                                    playPortalHum,
                                                                    ambientStarted,
                                                                    playAmbient
                                                                }) => {
    // Handle muting
    useEffect(() => {
        Howler.volume(isMuted ? 0 : 1);
    }, [isMuted]);

    // Handle sound transitions
    useEffect(() => {
        if (!showIntro && isIslandVisible) {
            stopAmbient();
            playPortalHum();
        }
    }, [showIntro, isIslandVisible, playPortalHum, stopAmbient]);

    // Handle ambient sound
    useEffect(() => {
        if (!ambientStarted && !isIslandVisible) {
            playAmbient();
        }
    }, [ambientStarted, isIslandVisible, playAmbient]);

    return null;
};