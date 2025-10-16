import React, { useState, useRef, useEffect } from 'react';

function FilterBar({
    onFilter,
    jobTypeOptions = [],
    positionOptions = [],
    benefitOptions = [],
    experienceOptions = [],
    degreeOptions = [],
    locationOptions = [],
}) {
    const [jobType, setJobType] = useState('all');
    const [position, setPosition] = useState('all');
    const [benefits, setBenefits] = useState([]);
    const [experience, setExperience] = useState('all');
    const [degree, setDegree] = useState('all');
    const [location, setLocation] = useState('all');
    const [showBenefitDropdown, setShowBenefitDropdown] = useState(false);

    const benefitDropdownRef = useRef(null);

    const handleBenefitsChange = (e) => {
        const value = e.target.value;
        setBenefits(prev =>
            prev.includes(value)
                ? prev.filter(b => b !== value)
                : [...prev, value]
        );
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                benefitDropdownRef.current &&
                !benefitDropdownRef.current.contains(event.target)
            ) {
                setShowBenefitDropdown(false);
            }
        }
        if (showBenefitDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showBenefitDropdown]);

    // Gọi onFilter mỗi khi filter thay đổi
    useEffect(() => {
        if (onFilter) {
            onFilter({ jobType, position, benefits, experience, degree, location });
        }
        // eslint-disable-next-line
    }, [jobType, position, benefits, experience, degree, location]);

    return (
        <div className='bg-secondary pb-3'>
            <div className="p-1 w-[80%] mx-auto flex items-center gap-2 justify-between bg-white rounded-sm">
                <select value={location} onChange={e => setLocation(e.target.value)} className="p-1 rounded-sm cursor-pointer">
                    <option value="all">Địa điểm</option>
                    {locationOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <select value={jobType} onChange={e => setJobType(e.target.value)} className="p-1 rounded-sm cursor-pointer">
                    <option value="all">Loại hình công việc</option>
                    {jobTypeOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <select value={position} onChange={e => setPosition(e.target.value)} className="p-1 rounded-sm cursor-pointer">
                    <option value="all">Chức danh</option>
                    {positionOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                {/* Dropdown checkbox cho phúc lợi */}
                <div className="relative" ref={benefitDropdownRef}>
                    <button
                        type="button"
                        className="p-1 cursor-pointer"
                        onClick={() => setShowBenefitDropdown(v => !v)}
                    >
                        Phúc lợi {benefits.length > 0 ? `(${benefits.length})` : ''}
                    </button>
                    {showBenefitDropdown && (
                        <div className="absolute z-10 bg-white border rounded shadow p-2 mt-1 min-w-[120px]">
                            {benefitOptions.map(opt => (
                                <label key={opt.value} className="block px-2 py-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={opt.value}
                                        checked={benefits.includes(opt.value)}
                                        onChange={handleBenefitsChange}
                                        className="mr-2"
                                    />
                                    {opt.label}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
                <select value={experience} onChange={e => setExperience(e.target.value)} className="p-1 rounded-sm cursor-pointer">
                    <option value="all">Kinh nghiệm</option>
                    {experienceOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <select value={degree} onChange={e => setDegree(e.target.value)} className="p-1 rounded-sm cursor-pointer">
                    <option value="all">Bằng cấp</option>
                    {degreeOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default FilterBar;