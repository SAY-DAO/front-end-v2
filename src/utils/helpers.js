// Age
export function getAge(DOB) {
  const today = new Date();
  const birthDate = new Date(DOB);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

export const NeedCategoryEnum = {
  GROWTH: 0,
  JOY: 1,
  HEALTH: 2,
  SURRONDING: 3,
};

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

export const RolesEnum = {
  NO_ROLE: 0,
  SUPER_ADMIN: 1,
  SOCIAL_WORKER: 2,
  COORDINATOR: 3,
  NGO_SUPERVISOR: 4,
  SAY_SUPERVISOR: 5,
  ADMIN: 6,
  USER: 7,
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

export const ProductStatusEnum = {
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

// urgent ==> index 0
// growth 0 ==> index 1
// joy 1 ==> index 2
// health 2 ==> index 3
// surroundings 3 ==> index 4
// isDone ==> index 5
// isConfirmed ==> index 6
// unpayable ==> index 7

export function getOrganizedNeeds(theNeeds) {
  const needData = [[], [], [], [], [], [], [], []];
  for (let i = 0; i < theNeeds.length; i += 1) {
    if (theNeeds[i].isUrgent && !theNeeds[i].isDone) {
      needData[0].push(theNeeds[i]);
    }
    if (!theNeeds[i].isUrgent && !theNeeds[i].isDone) {
      needData[theNeeds[i].category + 1].push(theNeeds[i]);
    }
    if (theNeeds[i].isDone) {
      needData[5].push(theNeeds[i]);
    }
    if (theNeeds[i].isConfirmed && !theNeeds[i].isDone) {
      needData[6].push(theNeeds[i]);
    }
    if (theNeeds[i].unpayable && !theNeeds[i].isDone) {
      needData[7].push(theNeeds[i]);
    }
  }

  return needData;
}

export function sortNeeds(theNeeds) {
  return theNeeds.needs.sort((a, b) => {
    if (!a.isDone && !b.isDone) {
      // Sort needs by create date Ascending
      return new Date(a.created) - new Date(b.created);
    }
    // Sort done needs by done date Descending
    return new Date(b.doneAt) - new Date(a.doneAt);
  });
}
