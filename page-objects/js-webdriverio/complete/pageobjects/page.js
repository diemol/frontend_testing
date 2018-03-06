function Page () {
}

Page.prototype.open = function (path) {
    browser.windowHandleMaximize();
    browser.url(path);
};

module.exports = new Page();