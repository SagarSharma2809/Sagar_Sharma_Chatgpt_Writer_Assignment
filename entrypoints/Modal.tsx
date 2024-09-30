import React, { useState } from 'react';
import './popup/style.css'; // Tailwind CSS and other styles
import generateIcon from '../assets/generate icon.svg';
import insertIcon from '../assets/insert icon.svg';
import regenerateIcon from '../assets/regenerate icon.svg'

interface ModalProps {
    onClose: () => void;
    onGenerate: () => string;
    onInsert: (text: string) => void;
}
let userReply = '';
const Modal: React.FC<ModalProps> = ({ onClose, onGenerate, onInsert }) => {
    const [generatedText, setGeneratedText] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('');
    const [isGenerated, setIsGenerated] = useState<boolean>(false);



    const handleGenerateClick = () => {
        const text = onGenerate();
        userReply = userInput;
        setGeneratedText(text);
        setIsGenerated(true);
        setUserInput('')
    };

    const handleChange = (e: any) => {
        setUserInput(e.target.value);
    }

    const handleInsertClick = () => {
        onInsert(generatedText);
        onClose(); // Close the modal after inserting text
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-white rounded-lg p-4 shadow-lg w-[30%]" onClick={(e) => e.stopPropagation()}>
                {isGenerated &&
                    (
                        <div className='flex flex-col gap-4 mb-4'>
                            < div className='bg-[#DFE1E7] text-[#666D80] rounded-lg w-3/4 p-2 self-end'>{userReply}</div>


                            <div className='bg-[#DBEAFE] text-[#666D80] rounded-lg w-3/4 p-2'>{generatedText}</div>
                        </div>


                    )


                }


                <input
                    className="w-full p-2 rounded-md mb-4"
                    type='text'
                    value={userInput}
                    onChange={handleChange}
                    placeholder="Your prompt"
                />
                <div className="flex justify-end space-x-2">
                    {!isGenerated ? (
                        <button
                            className="bg-blue-500 text-white px-4 text-lg py-2 rounded-md flex items-center hover:bg-blue-600"
                            onClick={handleGenerateClick}
                        >
                            <img src={generateIcon} alt="generate arrow icon" className='mx-2 w-4' />
                            <span>Generate</span>

                        </button>
                    ) : (
                        <>
                            <button
                                style={{ border: '2px solid #C0C0C0' }}
                                className="bg-white text-[#666D80] px-4 py-2 rounded-md flex items-center hover:bg-gray-200"
                                onClick={handleInsertClick}
                            >
                                <img src={insertIcon} alt="insert downward arrow icon" className='mx-2 w-4' />
                                Insert
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600">
                                <img src={regenerateIcon} alt="regnerate recycle arrows icon" className='mx-2 w-4' />
                                Regenerate
                            </button>
                        </>
                    )}

                </div>
            </div>
        </div >
    );
};

export default Modal;
