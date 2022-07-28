import styles from './EditModalBox.module.scss';
import className from 'classnames/bind';
import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { DEPARTMENTS } from '~/assets/data/staffs';
import { staffListRemain, staffListSelector } from '~/redux/selector';
import staffsReducer from '~/redux/reducer/staffsReducer';

const cx = className.bind(styles);

function EditModalBox(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const staffList = useSelector(staffListSelector);
    const [show, setShow] = useState(false);
    const staffInfo = staffList.find((staff) => {
        return staff.id == props.data;
    });
    const [name, setName] = useState(staffInfo.name);
    const [dob, setDob] = useState(dateFormat(staffInfo.doB, 'dd/mm/yyyy'));
    const [startDate, setStartDate] = useState(
        dateFormat(staffInfo.startDate, 'dd/mm/yyyy'),
    );
    const [salaryScale, setSalaryScale] = useState(staffInfo.salaryScale);
    const [annualLeave, setAnnualLeave] = useState(staffInfo.annualLeave);
    const [overTime, setOverTime] = useState(staffInfo.overTime);

    useEffect(() => {
        const modalBox = document.getElementById('modal-box');
        if (show) {
            modalBox.classList.remove('EditModalBox_hide__hunfN');
            modalBox.classList.add('EditModalBox_show__-pqxJ');
        } else {
            modalBox.classList.remove('EditModalBox_show__-pqxJ');
            modalBox.classList.add('EditModalBox_hide__hunfN');
        }
    }, [show]);

    function handleScaleSalary(e) {
        if (e.target.value < 1) {
            return (e.target.value = 1);
        } else if (e.target.value > 3) {
            return (e.target.value = 3);
        }
    }

    const handleEditStaff = (staff) => {
        const data = {
            ...staff,
            id: props.data,
            image: '/assets/images/avarta.png',
        };
        dispatch(staffsReducer.actions.editStaff(data));
    };
    return (
        <>
            <div className={cx('edit-btn')} onClick={() => setShow(true)}>
                <button>Edit</button>
            </div>
            <div className={cx('wrapper', 'hide')} id="modal-box">
                <div className={cx('add-container', 'col-md-4')}>
                    <div className={cx('title')}>
                        <span>Sửa thông tin nhân viên</span>
                        <div
                            className={cx('close-icon')}
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                    </div>
                    <div className={cx('add-content', 'row')}>
                        <form onSubmit={handleSubmit(handleEditStaff)}>
                            <label htmlFor="name">Tên</label>
                            <input
                                defaultValue={name}
                                type="text"
                                name="name"
                                id="name"
                                {...register('name', {
                                    onChange: (e) => setName(e.target.value),
                                    required: true,
                                    minLength: 2,
                                    maxLength: 30,
                                })}
                            />
                            <br />
                            {Object.keys(errors).length !== 0 && (
                                <ul className={cx('errors-container')}>
                                    {errors.name?.type === 'required' && (
                                        <li>Bạn chưa nhâp tên</li>
                                    )}
                                    {errors.name?.type === 'minLength' && (
                                        <li>Tên phải lớn hơn 2 ký tự</li>
                                    )}
                                    {errors.name?.type === 'maxLength' && (
                                        <li>Tên phải nhỏ hơn 30 ký tự</li>
                                    )}
                                </ul>
                            )}
                            <label htmlFor="dob">Ngày sinh</label>
                            <input
                                defaultValue={dob}
                                type="date"
                                name="dob"
                                id="dob"
                                {...register('dob', {
                                    onChange: (e) => setDob(e.target.value),
                                    required: true,
                                })}
                            />
                            <br />
                            {Object.keys(errors).length !== 0 && (
                                <ul className={cx('errors-container')}>
                                    {errors.dob?.type === 'required' && (
                                        <li>Bạn chưa nhâp ngày sinh</li>
                                    )}
                                </ul>
                            )}
                            <label htmlFor="startDate">Ngày bắt đầu</label>
                            <input
                                defaultValue={startDate}
                                type="date"
                                name="startDate"
                                id="startDate"
                                {...register('startDate', {
                                    onChange: (e) =>
                                        setStartDate(e.target.value),
                                    required: true,
                                })}
                            />
                            <br />
                            {Object.keys(errors).length !== 0 && (
                                <ul className={cx('errors-container')}>
                                    {errors.startDate?.type === 'required' && (
                                        <li>Bạn chưa nhâp ngày bắt đầu</li>
                                    )}
                                </ul>
                            )}
                            <label htmlFor="department">Phòng ban</label>
                            <select
                                defaultValue={staffInfo.department.id}
                                name="department"
                                id="department"
                                {...register('department')}
                            >
                                <option value="Dept01">Sale</option>
                                <option value="Dept02">HR</option>
                                <option value="Dept03">Marketing</option>
                                <option value="Dept04">IT</option>
                                <option value="Dept05">Finance</option>
                            </select>
                            <br />
                            <label htmlFor="scaleSalary">Hệ số lương</label>
                            <input
                                defaultValue={salaryScale}
                                type="number"
                                name="salaryScale"
                                step="any"
                                id="salaryScale"
                                placeholder="1.0 -> 3.0"
                                {...register('scaleSalary', {
                                    onChange: (e) => {
                                        handleScaleSalary(e);
                                        setSalaryScale(e.target.value);
                                    },
                                })}
                            />
                            <label htmlFor="annual-leave">
                                Số ngày nghỉ còn lại
                            </label>
                            <input
                                defaultValue={annualLeave}
                                type="text"
                                name="annualLeave"
                                id="annualLeave"
                                {...register('annualLeave', {
                                    onChange: (e) =>
                                        setAnnualLeave(e.target.value),
                                })}
                            />
                            <label htmlFor="overTime">Số ngày làm thêm</label>
                            <input
                                defaultValue={overTime}
                                type="text"
                                name="overTime"
                                id="overTime"
                                {...register('overTime', {
                                    onChange: (e) =>
                                        setOverTime(e.target.value),
                                })}
                            />
                            <div className={cx('add-btn')}>
                                <button className={cx('add')} type="submit">
                                    Sửa
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditModalBox;
