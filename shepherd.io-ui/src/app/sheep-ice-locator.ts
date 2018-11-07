export interface SheepDetentionIceLocator {
    id: string;
    name: string;
    address: DetentionAddress;
    phone: DetentionPhone;
    websiteUrl: string;
    photoUrl: string;
}

export interface DetentionAddress {
    line1: string;
    line2: string;
    line3: string;
    city: string;
    stateCode: string;
    zipCode: string;
}

export interface DetentionPhone {
    areaCode: string;
    exchange: string;
    number: string;
    extension: string;
}
