import React, { forwardRef } from "react";

import { FaPlay, FaPause } from "react-icons/fa";

import "../App.css";
import { music } from "../pages/MusicContainer";

function renderPlayPauseIcon(isPlaying: boolean) {
    const commonStyle: React.CSSProperties = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "green",
        fontSize: "2rem",
        opacity: 1,
        zIndex: 99999,
    };

    return isPlaying ? <FaPause style={commonStyle} /> : <FaPlay style={commonStyle} />;
}

type prop = {
    music: music;
    isPlaying: boolean;
    click: (a: number) => void;
};

const SideMusic = React.memo(
    forwardRef<any, any>(({ music, isPlaying, click }: prop, ref) => {
        console.log("side music is re-render");
        return (
            <div
                style={{
                    width: "60px",
                    boxSizing: "border-box",
                    position: "relative",
                }}
                className='side-music'
                ref={ref}
                onClick={() => click(parseInt(music.id - 1))}
            >
                {ref ? renderPlayPauseIcon(isPlaying) : ""}

                <img
                    src={`/images/${music.imageUrl}`}
                    alt=''
                    style={{
                        width: "100%",
                        opacity: `${ref ? 0.5 : 1}`,
                    }}
                />
            </div>
        );
    })
);

export { SideMusic };
