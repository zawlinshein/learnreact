import React, { FC, forwardRef, memo, useEffect, useRef, useState } from "react";

import { FaBackward, FaForward, FaPlay, FaPause } from "react-icons/fa";

import { ImVolumeLow, ImVolumeHigh, ImVolumeMute2 } from "react-icons/im";

import "../App.css";

type Music = {
    id: number;
    songName: string;
    singer: string;
    songUrl: string;
    imageUrl: string;
};

type Props = {
    src: Music;
    status: string;
    dispatch: Function;
    isPlaying: boolean;
    playNext: () => void;
};

const Music: FC<Props> = memo(
    forwardRef(({ src, dispatch, status, isPlaying, playNext }: Props, ref) => {
        const [timeTracker, setTimeTracker] = useState<number>(0);
        const [volume, setVolume] = useState<number>(1);

        const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
                setVolume(value);
                if (ref.current) {
                    ref.current.volume = value;
                }
            }
        };

        function renderVolumeIcon(volume: number) {
            if (volume < 0.6) {
                return <ImVolumeLow />;
            } else {
                return <ImVolumeHigh />;
            }
        }

        const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
                setTimeTracker(value);
                if (ref.current) {
                    ref.current.currentTime = (ref.current.duration / 100) * value;
                }
            }
        };

        useEffect(() => {
            const updateTracker = () => {
                setTimeTracker(0);
                if (ref.current && isPlaying) {
                    setTimeTracker((prev) =>
                        Math.floor((ref.current.currentTime / ref.current.duration) * 100)
                    );
                }
                if (ref.current && ref.current.currentTime === ref.current.duration) {
                    playNext();
                }
            };

            // Update the time tracker initially
            updateTracker();

            // Set up an interval to periodically update the time tracker
            const intervalId = setInterval(updateTracker, 1000);

            // Clear the interval on component unmount
            return () => clearInterval(intervalId);
        }, [ref, isPlaying, playNext]);

        return (
            <div
                style={{
                    width: "450px",
                    minHeight: "555.2px",
                    padding: "20px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    backgroundColor: "#e2f0f9",
                }}
            >
                <img
                    src={`/images/${src.imageUrl}`}
                    style={{
                        width: "100%",
                    }}
                    alt='Album Cover'
                />
                <div>
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <strong>
                            {src.singer} - {src.songName}
                        </strong>
                    </p>
                </div>
                <audio hidden ref={ref} controls src={`/music/${src.songUrl}`}></audio>
                <div>
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <p>{volume < 0.1 ? <ImVolumeMute2 /> : renderVolumeIcon(volume)}</p>
                        <input
                            type='range'
                            style={{
                                width: "30%",
                            }}
                            min={0}
                            max={1}
                            step={0.1}
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                        <p>{(volume * 100).toFixed()} %</p>
                    </div>
                    <input
                        type='range'
                        style={{
                            width: "100%",
                        }}
                        value={timeTracker}
                        onChange={handleTimeChange}
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "10px",
                            marginTop: "12px",
                        }}
                    >
                        <button
                            onClick={() => {
                                dispatch({ type: "pre" });
                            }}
                            className='side--action'
                        >
                            <FaBackward />
                        </button>
                        <button
                            onClick={() => {
                                status === "play"
                                    ? dispatch({ type: "pause" })
                                    : dispatch({ type: "play" });
                            }}
                            className='action--btn'
                            style={{
                                border: `5px solid ${isPlaying ? "green" : "red"}`,
                            }}
                        >
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                        <button
                            onClick={() => {
                                dispatch({ type: "next" });
                            }}
                            className='side--action'
                        >
                            <FaForward />
                        </button>
                    </div>
                </div>
            </div>
        );
    })
);

export { Music };
