import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import * as searchService from '~/services/searchService';
import styles from './AccountsSidebar.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function AccountsSidebar({ label }) {
    const [accountsData, setAccountsData] = useState([]);
    const [visibleAccounts, setVisibleAccounts] = useState([]);
    const [isSeeAll, setIsSeeAll] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await searchService.fetchAccounts();
            setAccountsData(result);
            updateVisibleAccounts(result, false);
        };

        fetchApi();
    }, []);

    const updateVisibleAccounts = (data, expand) => {
        // Sắp xếp danh sách theo followers_count giảm dần
        const sortedData = [...data].sort((a, b) => b.followers_count - a.followers_count);
    
        if (expand) {
            // Hiển thị toàn bộ danh sách
            setVisibleAccounts(sortedData);
        } else {
            // Lọc và thêm các tài khoản phù hợp
            const filtered = sortedData.filter((account) => account.followers_count >= 50);
            const additional = sortedData.slice(0, Math.max(5 - filtered.length, 0));
            const merged = [...filtered, ...additional];
    
            setVisibleAccounts(merged.slice(0, 5));
        }
    };

    const handleSeeAll = () => {
        setIsSeeAll(true);
        updateVisibleAccounts(accountsData, true);
    };

    const handleSeeLess = () => {
        setIsSeeAll(false);
        updateVisibleAccounts(accountsData, false);
    };

    const uniqueAccounts = visibleAccounts.filter(
        (account, index, self) => index === self.findIndex((a) => a.id === account.id)
    );

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {uniqueAccounts.map((data) => (
                <AccountItem key={data.id} data={data} />
            ))}

            {!isSeeAll ? (
                <p className={cx('more-btn')} onClick={handleSeeAll}>
                    See all
                </p>
            ) : (
                <p className={cx('more-btn')} onClick={handleSeeLess}>
                    See less
                </p>
            )}
        </div>
    );
}

AccountsSidebar.propTypes = {
    label: PropTypes.string.isRequired,
};

export default AccountsSidebar;
