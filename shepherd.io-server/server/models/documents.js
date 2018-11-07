const habeas_johnson = require('./habeas_johnson');
const habeas_johnson_v2 = require('./habeas_johnson_v2');
const motion_for_appointment_of_counsel = require('./motion_for_appointment_of_counsel');

module.exports.documents = {
    habeas_johnson: habeas_johnson.document,
    habeas_johnson_v2: habeas_johnson_v2.document,
    motion_for_appointment_of_counsel: motion_for_appointment_of_counsel.document
};