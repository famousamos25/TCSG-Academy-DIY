const PulblicRecordPartition = [
    {
        PublicRecord: [
            {
                courtName: "U.S. Bankruptcy Court",
                dateFiled: "2021-06-17",
                referenceNumber: "2154606",
                subscriberCode: "0508601Z",
                bureau: "TransUnion",
                AccountDesignator: {
                    abbreviation: "Individual",
                    description: "Individual",
                    symbol: "I",
                    rank: "199",
                },
                Classification: {
                    abbreviation: "Bankruptcy",
                    description: "Bankruptcy",
                    symbol: "B",
                    rank: "199",
                },
                IndustryCode: {
                    abbreviation: "Miscellaneous",
                    description: "Miscellaneous",
                    symbol: "Z",
                    rank: "199",
                },
                Status: {
                    abbreviation: "Dismissed",
                    description: "Dismissed",
                    symbol: "8",
                    rank: "199",
                },
                Type: {
                    abbreviation: "Chapter 13 Bankruptcy",
                    description: "Chapter 13 Bankruptcy",
                    symbol: "4",
                    rank: "199",
                },
                Bankruptcy: {
                    courtNumber: "",
                    division: "",
                    assetAmount: "0",
                    dateResolved: "2021-12-30",
                    exemptAmount: "0",
                    liabilityAmount: "0",
                    trustee: "",
                    company: "",
                    thirdParty: "",
                },
                Source: {
                    BorrowerKey: "",
                    Bureau: {
                        abbreviation: "TransUnion",
                        description: "TransUnion",
                        symbol: "TUC",
                        rank: "1",
                    },
                    InquiryDate: "2022-09-23",
                    Reference: "MFS_421A1643-37F4-44AB",
                },
            },
        ],
    },
];

const resData = {};
resData.publicRecords = PulblicRecordPartition?.map((item) => item.PublicRecord).flat();

console.log(resData);
