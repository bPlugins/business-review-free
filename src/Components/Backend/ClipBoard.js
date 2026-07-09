import { useState } from "react";

const ClipBoard = ({ shortcode }) => {
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortcode);
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <section className="clipBoard">
            <div className="clipBtnWrapper">
                <p className="clipBoard__label">Copy this shortcode and paste it into your post, page, or text widget content</p>
                <button className={`clipBoard__btn${hasCopied ? " is-copied" : ""}`} onClick={handleCopy}>
                    <code className="clipBoard__code">{shortcode}</code>
                    <span className="clipBoard__action">
                        {hasCopied ? (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                                    <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                                Copy
                            </>
                        )}
                    </span>
                </button>
            </div>
        </section>
    );
};

export default ClipBoard;
