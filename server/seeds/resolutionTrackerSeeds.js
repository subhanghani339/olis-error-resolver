const { PrismaClient } = require('@prisma/client');

async function seedResolutionTracker(prisma) {
    const oruResolutionData = [
        {
            orderId: 'ORD2507010001',
            dateSubmitted: new Date('2025-07-01T09:10:00.000Z'),
            errorCode: 'AE',
            errorMessage: 'Invalid patient identifier format',
            hl7Segment: 'PID 3',
            status: 'Resolved',
            comments: 'Patient ID corrected to match OLIS format.',
            resolvedBy: 'Emily Chen',
            resolvedDate: new Date('2025-07-02T11:20:00.000Z')
        },
        {
            orderId: 'ORD2507040002',
            dateSubmitted: new Date('2025-07-04T10:25:00.000Z'),
            errorCode: 'AA',
            errorMessage: 'Missing required observation field',
            hl7Segment: 'OBX 5',
            status: 'Resolved',
            comments: 'Observation field OBX-5 added successfully.',
            resolvedBy: 'Sarah Johnson',
            resolvedDate: new Date('2025-07-04T15:00:00.000Z')
        },
        {
            orderId: 'ORD2507120003',
            dateSubmitted: new Date('2025-07-12T13:45:00.000Z'),
            errorCode: 'AR',
            errorMessage: 'Invalid HL7 segment delimiter',
            hl7Segment: 'MSH',
            status: 'Unresolved',
            comments: null,
            resolvedBy: null,
            resolvedDate: null
        },
        {
            orderId: 'ORD2507180004',
            dateSubmitted: new Date('2025-07-18T08:30:00.000Z'),
            errorCode: 'AE',
            errorMessage: 'Observation value format mismatch',
            hl7Segment: 'OBX 2',
            status: 'Resolved',
            comments: 'Updated OBX-2 to expected numeric format.',
            resolvedBy: 'Michael Lee',
            resolvedDate: new Date('2025-07-19T09:00:00.000Z')
        },
        {
            orderId: 'ORD2507250005',
            dateSubmitted: new Date('2025-07-25T15:15:00.000Z'),
            errorCode: 'AA',
            errorMessage: 'Invalid date format in observation',
            hl7Segment: 'OBR 7',
            status: 'Resolved',
            comments: 'Date reformatted to YYYYMMDD per HL7 spec.',
            resolvedBy: 'Emily Chen',
            resolvedDate: new Date('2025-07-26T10:10:00.000Z')
        },
        {
            orderId: 'ORD2508010006',
            dateSubmitted: new Date('2025-08-01T09:00:00.000Z'),
            errorCode: 'AR',
            errorMessage: 'Missing ordering provider details',
            hl7Segment: 'ORC 12',
            status: 'Unresolved',
            comments: null,
            resolvedBy: null,
            resolvedDate: null
        },
        {
            orderId: 'ORD2508090007',
            dateSubmitted: new Date('2025-08-09T16:45:00.000Z'),
            errorCode: 'AE',
            errorMessage: 'Unexpected special character in patient name',
            hl7Segment: 'PID 5',
            status: 'Resolved',
            comments: 'Removed invalid character from PID-5.',
            resolvedBy: 'Sarah Johnson',
            resolvedDate: new Date('2025-08-10T14:30:00.000Z')
        },
        {
            orderId: 'ORD2508200008',
            dateSubmitted: new Date('2025-08-20T11:20:00.000Z'),
            errorCode: 'AA',
            errorMessage: 'Invalid numeric value in result field',
            hl7Segment: 'OBX 3',
            status: 'Resolved',
            comments: 'Corrected numeric format in OBX-3.',
            resolvedBy: 'Michael Lee',
            resolvedDate: new Date('2025-08-21T09:40:00.000Z')
        },
        {
            orderId: 'ORD2509010009',
            dateSubmitted: new Date('2025-09-01T14:10:00.000Z'),
            errorCode: 'AR',
            errorMessage: 'Missing patient birthdate',
            hl7Segment: 'PID 7',
            status: 'Unresolved',
            comments: null,
            resolvedBy: null,
            resolvedDate: null
        },
        {
            orderId: 'ORD2509150010',
            dateSubmitted: new Date('2025-09-15T12:25:00.000Z'),
            errorCode: 'AE',
            errorMessage: 'Duplicate observation segment detected',
            hl7Segment: 'OBX',
            status: 'Resolved',
            comments: 'Removed redundant OBX segment entry.',
            resolvedBy: 'Emily Chen',
            resolvedDate: new Date('2025-09-15T16:00:00.000Z')
        }
    ];

    for (const record of oruResolutionData) {
        await prisma.oLIS_ORU_ResolutionTracker.upsert({
            where: {
                orderId_dateSubmitted: {
                    orderId: record.orderId,
                    dateSubmitted: record.dateSubmitted
                }
            },
            update: {},
            create: record,
        });
    }

    console.log('10 OLIS ORU Resolution Tracker records have been seeded.');
}

module.exports = { seedResolutionTracker };
