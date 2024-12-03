import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
                <Button className={cx('follow-btn')} primary>Follow</Button>
            </header>
            <div className={cx('body')}>
                <h4 className={cx('username')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <p className={cx('name')}>{data.full_name}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.followers}</strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{data.followers}</strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
