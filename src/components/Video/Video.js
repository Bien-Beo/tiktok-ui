import React from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

function Video({ video }) {
    if (!video || !video.id || !video.id.videoId) {
        return null;
    }

    return (
        <div className={cx('wrapper')}>
            <iframe
                className={cx('video-item')}
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
