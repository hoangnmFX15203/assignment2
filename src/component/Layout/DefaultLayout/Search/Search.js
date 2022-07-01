import styles from './Search.module.scss';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '../Popper';
import StaffItems from '~/component/StaffItems';
import Tippy from '@tippyjs/react/headless';
import { useState, useRef } from 'react';
import { STAFFS } from '~/assets/data/staffs';

const cx = className.bind(styles);

function Search() {
    const [searchValues, setSearchValues] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResult, setShowResult] = useState(true);

    const inputRef = useRef();

    const searchHandler = () => {
        const searchValues = document.querySelector('#search-input').value;
        const searchResult = STAFFS.filter(
            (staff) => staff.name === searchValues,
        );
        setSearchResults(searchResult);
        setSearchValues('');
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleShowResult = () => {
        setShowResult(true);
    };

    return (
        <Tippy
            interactive
            visible={showResult && searchResults.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('staff-title')}>
                            <StaffItems data={searchResults} />
                        </h4>
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    id="search-input"
                    value={searchValues}
                    placeholder="Tìm kiếm theo tên"
                    spellCheck={false}
                    onChange={(e) => {
                        setSearchValues(e.target.value);
                    }}
                    onFocus={handleShowResult}
                />

                <button className={cx('search-btn')} onClick={searchHandler}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </Tippy>
    );
}

export default Search;
