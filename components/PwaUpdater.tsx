import { Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        wb: {
            messageSkipWaiting(): void;
            register(): void;
            addEventListener(name: string, callback: () => unknown): void;
        };
    }
}

const PwaUpdater = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onConfirmActivate = () => window.wb.messageSkipWaiting();

    useEffect(() => {
        window.wb.addEventListener("controlling", () => {
            window.location.reload();
        });

        window.wb.addEventListener("waiting", () => setIsOpen(true));
        window.wb.register();
    }, []);

    return (
        <>
            <div>
                <h2>New version available!</h2>
                <p>Hey, a new version is available! Please click below to update.</p>
            </div>

            <Button onClick={onConfirmActivate}>Reload and update</Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </>
    );
};

export default PwaUpdater;
