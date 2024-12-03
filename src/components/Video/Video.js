import React, { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

function Video({ video, onActiveChange, isActive, onScrollToNext }) {
    const playerRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    onActiveChange(video.id.videoId); // Kích hoạt video hiện tại
                }
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    onScrollToNext(); // Tự động cuộn đến video tiếp theo
                }
            },
            { threshold: [0.5] } // 50% chiều cao
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [video, onActiveChange, onScrollToNext]);

    useEffect(() => {
        if (isActive) {
            // Phát video khi đang active
            playerRef.current.contentWindow.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                "*"
            );
        } else {
            // Dừng video nếu không active
            playerRef.current.contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                "*"
            );
        }
    }, [isActive]);

    return (
        <div ref={containerRef} className={cx('wrapper')}>
            <iframe
                className={cx('video-item')}
                ref={playerRef}
                width="520"
                height="900"
                src={`https://www.youtube.com/embed/${video.id.videoId}?enablejsapi=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default Video;
