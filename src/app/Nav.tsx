'use client';
import React from "react";

export default function Nav() {
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const navigation_translation = 'translate-x-0';

    function navigation_transition() {
        setIsButtonDisabled(!isButtonDisabled);
        if (!isButtonDisabled) {
            document.getElementById("nav-div")?.classList.add(navigation_translation);
        } else {
            document.getElementById("nav-div")?.classList.remove(navigation_translation);
        }
    }

    return (
        <div>
            <button type="button" id="navigation" onClick={() => navigation_transition()} >
                <label htmlFor="navigation" className="fixed bottom-0 left-0 z-50 flex items-center justify-center w-12 h-12 mb-4 ml-4 bg-white border rounded-full shadow-lg cursor-pointer text-slate-600 border-slate-300 lg:hidden transition duration-200 ease-in-out active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                    </svg>
                </label>
            </button>

            <div id="nav-div" className="fixed top-0 left-0 z-20 w-64 h-full transition-all duration-500 transform -translate-x-full bg-white shadow-lg lg:translate-x-0">
                <nav className="sticky top-[4.5rem] w-64 text-base lg:text-sm xl:w-72">
                    <ul role="list" className="-ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto py-7 pl-0.5 pr-8 space-y-8 xl:pr-16">
                        <li>
                            <h3 className="font-semibold tracking-tight text-slate-900">
                                WIP
                            </h3>
                            <ul role="list" className="pl-3 mt-3 space-y-2">
                                <li>
                                    <a href="" className="text-slate-900 hover:text-slate-800">
                                        wip
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
