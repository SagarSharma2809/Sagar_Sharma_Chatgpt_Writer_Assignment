import React, { useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from './Modal'; // Import Modal Component
import icon from '../assets/reply ai icon.svg';
import './popup/style.css'; // Tailwind CSS and other styles

const App: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const messageInputRef = useRef<Element | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const detectMessageInput = () => {
        const inputElement = document.querySelector(".msg-form__contenteditable");

        if (inputElement) {
            messageInputRef.current = inputElement;

            // Show the icon when the input is focused
            inputElement.addEventListener('focus', () => {

                // Check if the button is already appended
                if (!buttonRef.current) {
                    // Create the button
                    const button = document.createElement('button');
                    button.className = 'linkedin_reply_btn bg-white p-2 rounded-full drop-shadow-md w-9';
                    button.style.position = 'absolute';
                    button.style.right = '10px';
                    button.style.bottom = '10px';
                    button.innerHTML = `<img src="${icon}" alt="AI Icon"/>`;


                    buttonRef.current = button;

                    // Append the button to the input element
                    inputElement.appendChild(buttonRef.current);

                    // Add click event to the button
                    buttonRef.current.onclick = () => {
                        setModalOpen(true)
                        buttonRef.current?.classList.add("hidden");
                    };

                }
                else if (buttonRef.current) {
                    buttonRef.current.classList.remove("hidden");
                }
            });

            // Hide the icon when the input loses focus
            inputElement.addEventListener('blur', (e: any) => {

                if (!e.relatedTarget.classList.contains("linkedin_reply_btn")) {
                    buttonRef.current?.classList.add('hidden');
                }

            });
        }
    };

    useEffect(() => {
        const observer = new MutationObserver(() => {
            detectMessageInput();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleGenerateText = () => {
        return "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
    };

    const insertTextIntoInput = (text: string) => {
        const inputPara = document.querySelector(".msg-form__contenteditable p");
        const messagePlaceholder = messageInputRef.current?.nextElementSibling;

        if (inputPara && messagePlaceholder) {
            messagePlaceholder.classList.remove("msg-form__placeholder")
            inputPara.innerHTML = text;

        }
        buttonRef.current?.classList.remove("hidden");
    };



    return (
        <>
            {isModalOpen && (
                <Modal
                    onClose={() => setModalOpen(false)}
                    onGenerate={handleGenerateText}
                    onInsert={insertTextIntoInput}
                />
            )}
        </>
    );
};

export default App;
