// In FiveM's NUI context, navigator.clipboard.writeText() works in modern builds.
// Fall back to the legacy execCommand approach for older builds.

export const copyToClipboard = (value: string, isPlayerModal?: boolean): void => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(value).catch(() => copyViaInput(value, isPlayerModal));
    } else {
        copyViaInput(value, isPlayerModal);
    }
};

const copyViaInput = (value: string, isPlayerModal?: boolean): void => {
    const targetElement = isPlayerModal ? document.getElementById('player-modal-container') : document.body;
    if (!targetElement) return;
    const clipElem = document.createElement('input');
    clipElem.value = value;
    targetElement.appendChild(clipElem);
    clipElem.select();
    document.execCommand('copy');
    targetElement.removeChild(clipElem);
};
