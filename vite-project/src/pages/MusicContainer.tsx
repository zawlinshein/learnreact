import React, { useState, useReducer, useRef, useEffect, FC, useCallback } from "react";
import { Music } from "../components/Music";
import { SideMusic } from "../components/SideBarMusic";
export type music = {
    id: number;
    songName: string;
    singer: string;
    songUrl: string;
    imageUrl: string;
};

type action = {
    type: string;
};

const musicReducer = (state: string, action: action) => {
    switch (action.type) {
        case "play":
            return "play";
        case "pause":
            return "pause";
        case "next":
            return "next";
        case "pre":
            return "pre";
        default:
            return state;
    }
};

import musicData from "/db/music.json";

const MusicContainer: FC = (): React.JSX.Element => {
    const [currentMusic, setCurrentMusic] = useState<number>(0);
    const [status, dispatch] = useReducer(musicReducer, "pause");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playNext, setPlayNext] = useState<boolean>(false);
    const currentMusicRef = useRef<HTMLDivElement | null>(null);

    const musicRef = useRef<HTMLAudioElement | null>(null);

    const goNext = useCallback((): void => {
        console.log("play next");
        setPlayNext(true);
        console.log(playNext);
    }, [currentMusic]);

    const handleClick = useCallback(
        (index: number) => {
            if (isPlaying) {
                console.log("Pausing...");
                dispatch({ type: "pause" });
            } else {
                console.log("Playing...");
                dispatch({ type: "play" });
            }
            setCurrentMusic(index);
        },
        [isPlaying, dispatch, setCurrentMusic]
    );

    useEffect(() => {
        // This useEffect will run whenever playNext changes
        console.log(playNext);

        if (playNext) {
            console.log(playNext);
            dispatch({ type: "next" });
        }
    }, [playNext]);

    useEffect(() => {
        switch (status) {
            case "play":
                console.log("Playing...");
                musicRef.current?.play();
                setIsPlaying(true);
                break;
            case "pause":
                console.log("Pausing...");
                musicRef.current?.pause();
                setIsPlaying(false);
                break;
            case "next":
                setCurrentMusic((prev) => (prev + 1) % musicData.length);
                break;
            case "pre":
                setCurrentMusic((prev) => (prev - 1 + musicData.length) % musicData.length);
                break;
            default:
                break;
        }
    }, [status]);

    useEffect(() => {
        if (isPlaying) {
            console.log("play");
            dispatch({ type: "play" });
        } else {
            console.log("pause");
            dispatch({ type: "pause" });
        }
        if (status === "next" || status === "pre") {
            isPlaying ? dispatch({ type: "play" }) : dispatch({ type: "pause" }); // Auto-play after updating currentMusic
        }
        setPlayNext(false);
        currentMusicRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }, [currentMusic]);

    return (
        <div
            style={{
                width: "100vw",
                marginTop: "20px",
                display: "flex",
                paddingBottom: "20px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    position: "fixed",
                    overflow: "auto",
                    maxHeight: "650px",
                    overflowY: "scroll",
                    scrollbarWidth: "thin", // For Firefox
                    scrollbarColor: "darkgrey lightgrey", // For Firefox
                }}
            >
                {musicData.map((music: music) => {
                    return (
                        <SideMusic
                            key={music.id}
                            music={music}
                            ref={music.id === musicData[currentMusic].id ? currentMusicRef : null}
                            isPlaying={isPlaying}
                            click={handleClick}
                        />
                    );
                })}
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
                }}
            >
                <Music
                    src={musicData[currentMusic]}
                    dispatch={dispatch}
                    status={status}
                    ref={musicRef}
                    isPlaying={isPlaying}
                    playNext={goNext}
                />
            </div>
        </div>
    );
};

export default MusicContainer;
