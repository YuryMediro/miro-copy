import { createGStore } from "create-gstore";
import { useState } from "react";

export const useTemplateModal = createGStore(() => {
    const [isOpen, setIsOpen] = useState(false)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return {open, close, isOpen}
})