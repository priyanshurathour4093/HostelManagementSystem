import React from "react";
import { Link, useLocation } from 'react-router-dom';
import NavRules from "./NavRules";
const Ragging = () => {
    return (
        <div className="flex h-full">
            <NavRules/>
            <div className="w-4/5 mx-auto p-8 mb-10">
                <h2 className="font-bold text-3xl mb-6">Ragging</h2>
                <ul className="list-disc pl-8 text-gray-800">
                    <li className="mb-4">
                        Ragging is a cognizable offence.
                    </li>
                    <li className="mb-4 font-bold">
                        Ragging in any form is strictly prohibited and they are advised not to indulge in any
                        form of the same; severe action will be taken against those who indulge in such
                        activities as per Govt. orders and University rules.
                    </li>
                    <li className="mb-4">
                        Ragging entails heavy fines and/or suspension/ expulsion from the hostel and/or University
                    </li>
                    <li className="mb-4">
                        Any student, with the intention of causing ragging or with the knowledge that he/she is
                        likely by such act to cause ragging, commits or abets ragging, and thereby teases or
                        embarrasses or humiliates or assaults or uses criminal force or criminally intimidates or
                        wrongfully restrains or wrongfully confines or causes grievous hurt or kidnaps or abducts or
                        rapes or commits unnatural offence or causes death or abets suicide shall be punished as per
                        the <b>Tamil Nadu Prohibition of Ragging Act, 1997.</b>
                    </li>
                    <li className="mb-4">
                        If the individuals committing or abetting ragging are not identified, collective punishment
                        could be resorted to act as a deterrent and to ensure collective pressure on the potential
                        raggers.

                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Ragging;