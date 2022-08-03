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
import EditModalBox from '../Modalbox/EditModalBox';
import searchReducer from '~/redux/reducer/searchReducer';
import { fetchStaff, deleteStaff } from '~/redux/reducer/staffsReducer';

const cx = className.bind(styles);

function Staffs(props) {
    const [staffId, setStaffId] = useState('');
    // const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchStaff());
    }, [dispatch]);
    // const list = useSelector(staffListSelector);
    const staffList = useSelector(staffListRemain);
    const searchFilterList = useSelector(searchListSelector);
    const [staffs, setStaffs] = useState(staffList);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setStaffs(staffList);
    }, [staffList]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        dispatch(searchReducer.actions.searchFilter(e.target.value));
    };

    // const handleEdit = (id) => {
    //     setShow(!show);
    //     setStaffId(id);
    // };

    const handleDelete = (id) => {
        dispatch(deleteStaff(id));
    };

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
                {staffList.map((staff) => {
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
                            <div className={cx('custom-btn')}>
                                {/* <button
                                    className={cx('edit-btn')}
                                    onClick={() => handleEdit(staff.id)}
                                >
                                    Edit
                                </button> */}
                                {/* <EditModalBox
                                    onClick={() => setStaffId(staff.id)}
                                    data={staffId}
                                /> */}
                                <button
                                    className={cx('delete-btn')}
                                    onClick={() => handleDelete(staff.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
            {/* <EditModalBox data={staffId} show={show} /> */}
        </div>
    );
}

export default Staffs;
