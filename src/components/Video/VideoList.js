
import Video from "./Video";
import classNames from "classnames/bind";
import styles from "./Video.module.scss";

const cx = classNames.bind(styles);

function VideoList({ videos = [] }) {
    if (videos.length === 0) {
        return <div>No videos found</div>;
    }

    return (
        <div className={cx("videoList")}>
            {videos.map((video) => (
                <Video key={video.id.videoId} video={video} />
            ))}
        </div>
    );
}


export default VideoList;
