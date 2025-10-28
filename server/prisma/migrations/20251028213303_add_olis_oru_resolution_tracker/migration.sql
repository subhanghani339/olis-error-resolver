-- CreateTable
CREATE TABLE "OLIS_ORU_ResolutionTracker" (
    "orderId" TEXT NOT NULL,
    "dateSubmitted" DATETIME NOT NULL,
    "errorCode" TEXT,
    "errorMessage" TEXT,
    "hl7Segment" TEXT,
    "status" TEXT,
    "comments" TEXT,
    "resolvedBy" TEXT,
    "resolvedDate" DATETIME,

    PRIMARY KEY ("orderId", "dateSubmitted")
);
