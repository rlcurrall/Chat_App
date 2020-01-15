const mustache = require('mustache');

function getMeta(metaName) {
    const metas = document.getElementsByTagName('meta');

    for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === metaName) {
            return metas[i].getAttribute('content');
        }
    }

    return null;
}

function scrollToBottom() {
    let messages = document.querySelector('#messages');
    let newMessage = messages.lastElementChild;

    let clientHeight = messages.clientHeight;
    let scrollTop = messages.scrollTop;
    let scrollHeight = messages.scrollHeight;
    let newMessageHeight = newMessage.clientHeight;
    let lastMessageHeight = newMessage.previousElementSibling
        ? newMessage.previousElementSibling.clientHeight
        : 0;

    if (
        clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
        scrollHeight
    ) {
        messages.scrollTop = scrollHeight;
    }
}

function makeHTML(templateId, data) {
    let template = document.querySelector(`#${templateId}`).innerHTML;
    let html = mustache.render(template, data);

    return document.createRange().createContextualFragment(html);
}

module.exports = {
    getMeta,
    scrollToBottom,
    makeHTML,
};
