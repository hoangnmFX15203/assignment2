import { STAFFS } from '~/assets/data/staffs';
import styles from './Staffs.module.scss';
import className from 'classnames/bind';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import AddModalBox from '~/pages/Modalbox/AddModalBox';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    staffListRemain,
    staffListSelector,
    searchListSelector,
} from '~/redux/selector';
import { searchFilter } from '~/redux/action';

const cx = className.bind(styles);

function Staffs(props) {
    const staffList = useSelector(staffListRemain);
    const searchFilterList = useSelector(searchListSelector);
    const [staffs, setStaffs] = useState(staffList);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        setSearch(e.target.value);
        dispatch(searchFilter(e.target.value));
    };

    useEffect(() => {
        setStaffs(staffList);
    }, [staffList]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sub-nav')}>
                <div className={cx('title')}>Nhân viên</div>
                <div className={cx('add-btn')}>
                    <AddModalBox />
                </div>
                <div className={cx('search')}>
                    <input
                        className={cx('search-input')}
                        type="text"
                        value={search}
                        placeholder="Tìm nhân viên"
                        id="input"
                        onChange={handleSearch}
                    />
                    <button className={cx('search-btn')}>Tìm</button>
                </div>
            </div>
            <ul className={cx('staff-list row')}>
                {staffs.map((staff) => {
                    const to = `/staff/${staff.id}`;
                    return (
                        <li
                            key={staff.id}
                            className={cx(
                                'staff-content',
                                'col-md-2',
                                'col-sm-4',
                                'col-6',
                            )}
                        >
                            <Link to={to}>
                                <div className={cx('staff-image')}>
                                    <img src={images.avarta} alt="avarta" />
                                </div>
                                <div className={cx('staff-name')}>
                                    <p>{staff.name}</p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Staffs;
