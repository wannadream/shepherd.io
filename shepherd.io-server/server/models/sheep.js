const mongoose = require('mongoose');

const locatorSchema = new mongoose.Schema({
    facilityName: {
        type: String,
        require: true
    },
    facilityAddress: {
        type: String
    },
    facilityPhone: {
        type: String
    },
    facilityWebsiteUrl: {
        type: String
    },
    checkDate: {
        type: Date,
        require: true,
        default: Date.now
    }
});

const sheepSchema = new mongoose.Schema({
    alienNo: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: String,
    lastName: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    districtOfCourt: String,
    division: String,
    detentionFacilityUnit: String,
    detentionFacilityName: String,
    detentionFacilityAddress: String,
    detentionFacilityCityStateZip: String,
    dateOfCustody: {
        type: Date,
        required: true
    },
    dateOfFinalOrderOfRemoval: Date,
    iceReqTravelDocStartDate: String,
    iceReqTravelDocEndDate: String,
    districtCourtCityAndState: String,
    habeasFilingDate: Date,
    totalMonthsInCustody: Number,
    iceFieldOfficeName: String,
    iceFieldOfficeDirectorName: String,
    statementOfCantAffordLawyer: String,
    statementOfUnableToUnderstandLaws: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    lastModifiedDate: Date,
    locatorRecords: [locatorSchema]
});

module.exports.Sheep = mongoose.model('Sheep', sheepSchema);