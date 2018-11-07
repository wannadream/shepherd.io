const PdfDocument = require('pdfkit');
const blobStream = require('blob-stream');
const utils = require('../../lib/utils');
const lineGap = 5;
const attorneyGeneralName = 'Jefferson Sessions';
const dhsSecretaryName = 'John F. Kelly';

module.exports.document = function (res, sheep) {
    console.log(`Generating 'Motion for Appointment of Counsel' for ${sheep.alienNo}...`);

    var doc = new PdfDocument();
    doc.Title = `Motion for Appointment of Counsel for ${utils.getFullName(sheep)}`;
    doc.Author = `Powered by Shepherd.io`;
    doc.pipe(res);

    doc.font('Helvetica-Bold').text('UNITDED STATES DISTRICT COURT', {
        align: 'center',
        lineGap: lineGap
    });
    doc.text(sheep.districtOfCourt, {
        align: 'center',
        lineGap: lineGap
    });
    doc.text(sheep.division, {
        align: 'center',
        lineGap: lineGap
    });

    doc.text(`
${utils.getFullName(sheep)},                                                                      Civil Action No.
A${sheep.alienNo},
Petitioner,
    v.                                                                               MOTION FOR APPOINTMENT
${attorneyGeneralName},                                                    OF COUNSEL PURSUANT TO
ATTONEY GENERAL;                                                  18 U.S.C. § 3006A
${dhsSecretaryName},
SECRETARY OF DEPARTMENT
OF HOMELAND SECURITY;
${sheep.iceFieldOfficeDirectorName},
U.S. ICE FIELD OFFICE DIRECTOR FOR
THE ${sheep.iceFieldOfficeName} FIELD
OFFICE, and WARDEN OF
IMMIGRATION DETENTION FACILITY,
Respondents,
`, {
        lineGap: lineGap
    });
    doc.font('Helvetica').text(`
    Petitioner is a citizen of ${sheep.nationality}. Petitioner is in ICE custody in the United States, but has been ordered removed to ${sheep.nationality} by an immigration judge. Petitioner’s removal order is final, but Petitioner cannot be removed to ${sheep.nationality} or any other country. Thus, Petitioner remains indefinitely detained in ICE custody, and has been confined for a period far longer than the law mandates. Under 8 U.S.C. § 1231(a)(1)-(2), once an alien has been ordered removed, the Attorney General must carry out the removal within a period of 90 days, during which time the alien shall be detained. The post-removal-period provision of the same statue, 8 U.S.C. § 1231(a)(6), allows for certain aliens to be detained beyond the removal period, but the Supreme Court explicitly limited this detention period in Zadvydas v. Davis, 533 U.S. 678 (2001). In that case, the Court held that § 1231(a)(6) restricts an alien’s post-removal-period detention to a period reasonably necessary to bring about the alien’s removal, and that it “does not permit indefinite detention.” Zadvydas, 533 U.S. at 689. The Court found that a presumption exists that an alien may not be held longer than six months; the general rule is that an alien may no longer be confined when there is “no significant likelihood of removal in the reasonably foreseeable future.” Id. at 701. In Clark v. Martinez, the Supreme Court extended this holding to inadmissible aliens. 125 S. Ct. 716, 722 (2005).
    The question as to whether Petitioner’s detention is in violation of the laws of the United States is one for a federal habeas court to hear. 28 U.S.C. § 2241. Accordingly, Petitioner files the accompanying habeas corpus petition, pursuant to 28 U.S.C. § 2241, requesting that this Court order Petitioner’s release. ${utils.statementHandler(sheep.statementOfCantAffordLawyer)}. Therefore, Petitioner requests that this Court appoint counsel to represent Petitioner in this habeas action.
    `, {
        lineGap: lineGap
    });
    utils.centerUnderlineBold(doc, 'I. The Court Should Exercise Its Discretion to Appoint Counsel');
    doc.font('Helvetica').text(`
    Assuming that a Petitioner has shown financial need, a district court may appoint counsel in a habeas proceeding under 28 U.S.C. § 2241 when the “interests of justice so require.” 18 U.S.C. § 3006A(a)(2)(B). Courts have often examined three elements in determining whether appointment of counsel is necessary: the likelihood of success on the merits, the complexity of the legal issues involved in the case, and the ability of the Petitioner to present the case in light of its complexity. See. e.g., Weygandt v. Look, 718 F.2d 952, 954 (9th Cir. 1983); Saldina v. Thornburgh, 775 F.Supp. 507, 511 (D. Conn. 1991). Petitioner has been held in custody for ${sheep.totalMonthsInCustody} since being ordered removed to ${sheep.nationality}, and removal in the reasonable foreseeable future is unlikely because ${sheep.nationality} will not accept Petitioner. Under the Supreme Court’s decision in Zadvydas, Petitioner’s continued detention is presumptively unreasonable. Thus, Petitioner has a likelihood of success on the merits.
    Moreover, Petitioner would encounter great difficulty in presenting this habeas corpus case alone. The House Report on the predecessor to § 3006A(a)(2)(B) recognized that habeas corpus proceedings often present “serious and complex issues of law and fact” that would necessitate the assistance of counsel. H.R. Rep. No. 1546, 91st Cong. 2d Sess. (1970), reprinted in 1970 U.S.C.C.A.N. 3982, 3993. In addition, the congressional report on § 3006A(a)(2)(B) stated that a court should appoint counsel when “necessary to insure a fair hearing.” Id. The complexity of a habeas case will pose an especially great obstacle for Petitioner. ${utils.statementHandler(sheep.statementOfUnableToUnderstandLaws)}. In light of the complicated issues involved in habeas cases and Petitioner’s inability to adequately present the case at bar, as well as Petitioner’s likelihood of success on the merits, this Court should exercise its discretion to appoint counsel under 18 U.S.C. § 3006A(a)(2)(B).
    `, {
        lineGap: lineGap
    });
    utils.centerUnderlineBold(doc, 'II. Appointment of Counsel Is Necessary Because Discovery Is Imperative');
    doc.font('Helvetica').text(`
    The rules governing habeas proceedings require the appointment of counsel in certain circumstances. Under Rule 6(a), 28 U.S.C. foll. § 2254, a judge must appoint counsel for a Petitioner if it is “necessary for effective utilization of discovery procedures.” ICE has information and documents relevant to Petitioner’s habeas petition, and without the assistance of counsel, Petitioner will not be able to effectively pursue discovery and, as a result, will not adequately present his claims. The aid of an attorney is especially important in this case, given Petitioner’s lack of familiarity with the legal procedure involved in requesting and obtaining discovery. Moreover, even if Petitioner were to obtain documents in discovery, without the assistance of counsel, Petitioner would not be capable of analyzing them to determine his likelihood of being removed in the foreseeable future.
    `, {
        lineGap: lineGap
    });
    utils.centerUnderlineBold(doc, 'III. An Evidentiary or Motions Hearing May Be Necessary');
    doc.font('Helvetica').text(`
    Under Rule 8(c), 28 U.S.C. foll. § 2254, the court is required to appoint counsel in a habeas proceeding if an evidentiary hearing is needed. An evidentiary hearing will likely be necessary in this case. Regardless of any other issues, if an evidentiary hearing is scheduled, the court must appoint counsel for Petitioner.
    For the above reasons, this Court should appoint counsel to assist Petitioner in instant habeas proceedings challenging Petitioner’s detention by ICE, pursuant to the Supreme Court decisions in Zadvydas and Martinez.

                                                                        Respectfully submitted,

Date:                                                                   ${utils.getFullName(sheep)}
${new Date().toLocaleDateString()}                                                           Petitioner


_______________________________________
    `, {
        lineGap: lineGap
    });

    doc.end();
};