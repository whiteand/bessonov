import { compile } from 'get-z-index'

export const getZIndex = compile([
    ['browser page', 'popover'],
    ['popover', 'mobile-contact-button'],
    ['browser page', 'pinned']
])