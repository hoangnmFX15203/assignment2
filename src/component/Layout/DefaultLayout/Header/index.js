import styles from './Header.module.scss';
import className from 'classnames/bind';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBilibili, faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import Search from '../Search/Search';

const cx = className.bind(styles);

function Header() {
    const tabs = [
        {
            name: 'Nhân viên',
            to: '/staff',
            icon: <FontAwesomeIcon icon={faUserAlt} />,
        },
        {
            name: 'Phòng ban',
            to: '/department',
            icon: <FontAwesomeIcon icon={faCcMastercard} />,
        },
        {
            name: 'Bảng Lương',
            to: '/salary',
            icon: <FontAwesomeIcon icon={faBilibili} />,
        },
    ];

    return (
        <header className={cx('wraper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
                </div>
                <div className={cx('tab-list')}>
                    <ul>
                        {tabs.map((tab, index) => {
                            return (
                                <li key={index}>
                                    <span className={cx('icon')}>
                                        {tab.icon}
                                    </span>
                                    <Link to={tab.to}>{tab.name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {/* Search */}
                <Search />
            </div>
        </header>
    );
}

export default Header;
