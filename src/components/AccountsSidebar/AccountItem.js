import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Image from '../Image';
import styles from './AccountsSidebar.module.scss';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <Tippy interactive delay={[800, 0]} offset={[-20,0]} render={renderPreview} placement="bottom">
            <Link to={`/@${data.nickname}`} className={cx('account-item')}>
                <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
                <div className={cx('item-info')}>
                    <h4 className={cx('username')}>
                        <strong>{data.nickname}</strong>
                        {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                    </h4>
                    <p className={cx('name')}>{data.full_name}</p>
                </div>
            </Link>
        </Tippy>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
