import React, { useState } from 'react'

const Gender = ({onSelect, selected}) => {


    const options = [
        { value: "male", icon: "♂", label: "Male" },
        { value: "female", icon: "♀", label: "Female" },
        { value: "other", icon: "⚧", label: "Other" },
    ];
    return (
        <div>
            <div className="grid grid-cols-3 gap-3">
                {options.map((opt) => (
                    <div
                        key={opt.value}
                        onClick={() => onSelect(opt.value)}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all
            ${selected === opt.value
                                ? "border-black bg-green-200 text-black"
                                : "border-black active:scale-95"
                            }`}
                    >
                        <span className="text-xl">{opt.icon}</span>
                        <span className="text-sm font-medium">{opt.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gender
