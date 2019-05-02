//Index 1,2,3,4....
Handlebars.registerHelper("inc", function (value, options) {
    return parseInt(value) + 1;
});

Handlebars.registerHelper("makeIdx", function(value, firstIdx) {
    return parseInt(value) + firstIdx + 1;
});