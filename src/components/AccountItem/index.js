import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src="https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh-cute-toc-dai.jpg" alt='Avatar'/>
            <div className={cx('info')}>
                <h4 className={cx('name')}>Nguyen Van A
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}/>
                </h4>
                <p className={cx('username')}>nguyenvana</p>
            </div>
        </div>
    );
}

export default AccountItem;
