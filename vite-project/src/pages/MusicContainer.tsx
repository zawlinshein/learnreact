import React, { useState, useReducer, useRef, useEffect, FC } from "react";
import { Music } from "../components/Music";
import musicData from "/db/music.json";
import { SideMusic } from "../components/SideBarMusic";
import { FaLeaf } from "react-icons/fa";

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

const MusicContainer: FC = (): React.JSX.Element => {
    const [currentMusic, setCurrentMusic] = useState(0);
    const [status, dispatch] = useReducer(musicReducer, "pause");
    const [isPlaying, setIsPlaying] = useState(false);
    const [playNext, setPlayNext] = useState(false);
    const currentMusicRef = useRef(null);

    const musicRef = useRef(null);

    const goNext = () => {
        console.log("play next");
        setPlayNext(true);
        console.log(playNext);
    };

    const handleClick = (index) => {
        if (isPlaying) {
            console.log("Pausing...");
            dispatch({ type: "pause" });
        } else {
            console.log("Playing...");
            dispatch({ type: "play" });
        }
        setCurrentMusic(index);
    };

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
                musicRef.current.play();
                setIsPlaying(true);
                break;
            case "pause":
                console.log("Pausing...");
                musicRef.current.pause();
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
        currentMusicRef.current.scrollIntoView({
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
                backgroundColor: "#fafafa",
                display: "flex",
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
                {musicData.map((music) => {
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
