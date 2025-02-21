export function createFloatingButton(options = {}) {
    const btn = document.createElement('floating-button');
    if (options.position) {
        btn.setAttribute('position', options.position);
    }
    if (typeof options.glowing !== 'undefined') {
        btn.glowing = options.glowing;
    }
    if (typeof options.disabled !== 'undefined') {
        btn.disabled = options.disabled;
    }
    if (options.type) {
        btn.type = options.type;
    }
    document.body.appendChild(btn);
    return btn;
} 