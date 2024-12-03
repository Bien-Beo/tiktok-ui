import * as httpRequest from '~/utils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchAccounts = async () => {
    const allAccounts = [];
    const seenIds = new Set(); // Lưu trữ id đã thêm
    const keywords = ['u', 'e', 'o', 'a', 'i'];

    for (const keyword of keywords) {
        try {
            const res = await httpRequest.get('users/search', {
                params: { q: keyword },
            });

            const accounts = Array.isArray(res.data) ? res.data : [res.data];
            accounts.forEach((account) => {
                if (!seenIds.has(account.id)) {
                    allAccounts.push(account);
                    seenIds.add(account.id);
                }
            });
        } catch (error) {
            console.error(`Error fetching accounts for q=${keyword}:`, error);
        }
    }

    return allAccounts;
};









