import { useEffect } from 'react';
import useSound from 'use-sound';
import { Howler } from 'howler';

interface SoundControllerProps {
    isMuted: boolean;
    showIntro: boolean;
    isIslandVisible: boolean;
    stopAmbient: () => void;
    playPortalHum: () => void;
}

export const SoundController: React.FC<SoundControllerProps> = ({
                                                                    isMuted,
                                                                    showIntro,
                                                                    isIslandVisible,
                                                                    stopAmbient,
                                                                    playPortalHum
                                                                }) => {
    useEffect(() => {
        Howler.volume(isMuted ? 0 : 1);
    }, [isMuted]);

    useEffect(() => {
        if (showIntro) {
            return;
        }
        if (isIslandVisible) {
            playPortalHum();
            stopAmbient();
        }
    }, [showIntro, isIslandVisible, playPortalHum, stopAmbient]);

    return null;
};
