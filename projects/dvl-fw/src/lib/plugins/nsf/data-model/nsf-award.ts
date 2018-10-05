
export class AwardStats {
  yearMax = 0;
  yearMin = 9999;

  count(item: Award) {
    this.yearMax = Math.max(this.yearMax, item.startYear, item.endYear);
    if (item.startYear > 0) {
      this.yearMin = Math.min(this.yearMin, item.startYear);
    }
    if (item.endYear > 0) {
      this.yearMin = Math.min(this.yearMin, item.endYear);
    }
  }
}

// @dynamic
export class Award {
  id: string;
  title: string;

  piName: string;
  piEmailAddress: string;
  coPiNames: string[];

  organization: {
    name: string;
    street: string;
    city: string;
    state: string;
    phone: string;
  };

  startDate: Date;
  endDate: Date;
  lastAmendmentDate: Date;
  startYear: number;
  endYear: number;
  lastAmendmentYear: number;

  awardInstrument: string;
  awardedAmountToDate: number;
  arraAmount: number;

  nsfOrganization: string;
  nsfPrograms: string[];
  nsfProgramManager: string;
  nsfDirectorate: string;
  programElementCodes: string[];
  programReferenceCodes: string[];

  abstract: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
