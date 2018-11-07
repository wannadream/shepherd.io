module.exports.sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getFullName = function (sheep) {
    let fullName = '';
    if (sheep) {
        fullName = sheep.firstName
        if (sheep.middleName && sheep.middleName !== '') {
            fullName += ' ' + sheep.middleName;
        }
        fullName += ' ' + sheep.lastName;
    }
    return fullName;
}

module.exports.centerUnderline = function (doc, text) {
    const width = doc.widthOfString(text);
    const height = doc.currentLineHeight();
    doc.underline((doc.page.width - width) / 2, doc.y, width, height, {
        color: 'black'
    }).text(text, {
        align: 'center',
        lineGap: 5
    });
};

module.exports.centerUnderlineBold = function (doc, text) {
    doc.font('Helvetica-Bold');
    const width = doc.widthOfString(text);
    const height = doc.currentLineHeight();
    doc.underline((doc.page.width - width) / 2, doc.y, width, height, {
        color: 'black'
    }).text(text, {
        align: 'center',
        lineGap: 5
    });
    doc.font('Helvetica');
};

module.exports.formalizeDate = function (date) {
    const year = date.getYear();
    const month = date.getMonth();
    const day = date.getDay();

    const mod = day % 10;
    let dayStr = '';
    switch (mod) {
        case 1:
            dayStr = day + 'st';
            break;
        case 2:
            dayStr = day + 'nd';
            break;
        case 3:
            dayStr = day + 'rd';
            break;
        default:
            dayStr = day + 'th';
            break;
    }

    let monthStr = '';
    switch (month) {
        case 0:
            monthStr = 'January';
            break;
        case 1:
            monthStr = 'February';
            break;
        case 2:
            monthStr = 'March';
            break;
        case 3:
            monthStr = 'April';
            break;
        case 4:
            monthStr = 'May';
            break;
        case 5:
            monthStr = 'June';
            break;
        case 6:
            monthStr = 'July';
            break;
        case 7:
            monthStr = 'August';
            break;
        case 8:
            monthStr = 'September';
            break;
        case 9:
            monthStr = 'October';
            break;
        case 10:
            monthStr = 'Novemember';
            break;
        case 11:
            monthStr = 'December';
            break;
    }

    return `${dayStr} day of ${monthStr} ${(year + 1900)}`;
};

module.exports.statementHandler = function (statement) {
    if (statement && statement !== '') {
        return statement;
    } else {
        return '____________________________________________________________________________________________________' +
            '____________________________________________________________________________________________________' +
            '____________________________________________________________________________________________________' + 
            '____________________________________________________________________________________________________';
    }
}