export const Colors = {
  WHITE: 0,
  BLUE: 1,
  YELLOW: 2,
  RED: 3,
};

export const colorChoices = [
  {
    code: '#03a9f4',
    color: Colors.BLUE,
  },
  {
    code: '#ffeb3b',
    color: Colors.YELLOW,
  },
];

//  -3:Deprived of education | -2:Kindergarten | -1:Not attending | 0:Pre-school | 1:1st grade | 2:2nd grade | ... | 13:University
export const EducationEnum = {
  deprived: -3,
  kinderGarten: -2,
  notAttending: -1,
  preSchool: 0,
  firstGrade: 1,
  secondGrade: 2,
  thirdGrade: 3,
  fourthGrade: 4,
  fifthGrade: 5,
  sixGrade: 6,
  sevenGrade: 7,
  eightGrade: 8,
  nineGrade: 9,
  tenGrade: 10,
  elevenGrade: 11,
  twelveGrade: 12,
  thirteenGrade: 13,
};



// 0:homeless | 1:Resident| 2:Care centers
export const HousingStatusEnum = {
  homeless: 0,
  Resident: 1,
  CareCenters: 2,
};

export const PanelContributors = {
  SOCIAL_WORKER: 1,
  NGO_SUPERVISOR: 2,
  PURCHASER: 3,
  AUDITOR: 4,
};

export const AppContributors = {
  FAMILY: 5,
  FRIEND: 6,
};
export const SAYPlatformRoles = {
  NO_ROLE: 0,
  SOCIAL_WORKER: PanelContributors.SOCIAL_WORKER,
  NGO_SUPERVISOR: PanelContributors.NGO_SUPERVISOR,
  PURCHASER: PanelContributors.PURCHASER,
  AUDITOR: PanelContributors.AUDITOR,
  FAMILY: AppContributors.FAMILY,
  FRIEND: AppContributors.FRIEND,
};

export const RolesEnumDefine = {
  NO_ROLE: 'no role',
  SUPER_ADMIN: 'super admin',
  SOCIAL_WORKER: 'social worker',
  COORDINATOR: 'coordinator',
  NGO_SUPERVISOR: 'NGO supervisor',
  SAY_SUPERVISOR: 'SAY supervisor',
  ADMIN: 'admin',
  USER: 'user',
};

export const FlaskUserTypesEnum = {
  NO_ROLE: 0,
  SUPER_ADMIN: 1,
  SOCIAL_WORKER: 2,
  COORDINATOR: 3,
  NGO_SUPERVISOR: 4,
  SAY_SUPERVISOR: 5,
  ADMIN: 6,
};

export const NeedTypeEnum = {
  SERVICE: 0,
  PRODUCT: 1,
};

export const PaymentStatusEnum = {
  NOT_PAID: 0,
  PARTIAL_PAY: 1,
  COMPLETE_PAY: 2,
};

export const AnnouncementEnum = {
  NONE: 0,
  ARRIVED_AT_NGO: 1,
  NGO_RECEIVED_MONEY: 2,
};

export const ProductStatusEnum = {
  EXP_DELIVERY_TO_NGO: -1,
  PARTIAL_PAY: PaymentStatusEnum.PARTIAL_PAY,
  COMPLETE_PAY: PaymentStatusEnum.COMPLETE_PAY,
  PURCHASED_PRODUCT: 3,
  DELIVERED_TO_NGO: 4,
  DELIVERED: 5, // done
};

export const ServiceStatusEnum = {
  PARTIAL_PAY: PaymentStatusEnum.PARTIAL_PAY,
  COMPLETE_PAY: PaymentStatusEnum.COMPLETE_PAY,
  MONEY_TO_NGO: 3,
  DELIVERED: 4, // done
};

export const ChildExistenceEnum = {
  DEAD: 0,
  ALIVE_PRESENT: 1,
  ALIVE_GONE: 2,
  TEMP_GONE: 3,
};


export const NeedCategoryEnum = {
  GROWTH: 0,
  JOY: 1,
  HEALTH: 2,
  SURROUNDING: 3,
};