import {
  NeedTypeEnum,
  PaymentStatusEnum,
  ProductStatusEnum,
  FlaskUserTypesEnum,
  SAYPlatformRoles,
  ServiceStatusEnum,
  NeedCategoryEnum,
} from './types';
import { PRODUCT_UNPAYABLE_PERIOD } from './configs';
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

// "-1": "تائید نشده",
// "0": "پرداخت نشده,
// "1": "نیم‌پرداخت",
// "2": "پرداخت کامل",
// "p3": "کالا خریده شده",
// "p4": "به سمن ارسال شده",
// "p5": "به کودک ارسال شده",
// "s3": "هزینه به سمن ارسال شده",
// "s4": "به کودک ارسال شده",
// "signature": "امضا",
// "sign": "امضا",
// "pending": "به کودک ارسال نشده"

export function getCurrentStatusString(need) {
  if (!need.isConfirmed) {
    return '-1';
  }
  if (need.status === PaymentStatusEnum.PARTIAL_PAY) {
    return '1';
  }
  if (need.status === PaymentStatusEnum.COMPLETE_PAY) {
    return '2';
  }
  if (need.type === NeedTypeEnum.PRODUCT) {
    if (need.status === ProductStatusEnum.PURCHASED_PRODUCT) {
      return 'p3';
    }
    if (need.status === ProductStatusEnum.DELIVERED_TO_NGO) {
      return 'p4';
    }
    if (need.status === ProductStatusEnum.DELIVERED) {
      return 'p5';
    }
  }
  if (need.type === NeedTypeEnum.SERVICE) {
    if (need.status === ServiceStatusEnum.MONEY_TO_NGO) {
      return 's3';
    }
    if (need.status === ServiceStatusEnum.DELIVERED) {
      return 's4';
    }
  }
  return '0';
}

export function convertFlaskToSayRoles(flakUserType) {
  let role;
  if (flakUserType === FlaskUserTypesEnum.SAY_SUPERVISOR) {
    role = SAYPlatformRoles.AUDITOR;
  } else if (flakUserType === FlaskUserTypesEnum.ADMIN) {
    role = SAYPlatformRoles.AUDITOR;
  } else if (flakUserType === FlaskUserTypesEnum.SUPER_ADMIN) {
    role = SAYPlatformRoles.AUDITOR;
  } else if (flakUserType === FlaskUserTypesEnum.SOCIAL_WORKER) {
    role = SAYPlatformRoles.SOCIAL_WORKER;
  } else if (flakUserType === FlaskUserTypesEnum.COORDINATOR) {
    role = SAYPlatformRoles.PURCHASER;
  } else if (flakUserType === FlaskUserTypesEnum.NGO_SUPERVISOR) {
    role = SAYPlatformRoles.NGO_SUPERVISOR;
  } else if (!flakUserType) {
    role = SAYPlatformRoles.FAMILY;
  }
  return role;
}

export function getSAYRoleInteger(sayRole) {
  let roleInteger;
  if (sayRole === SAYPlatformRoles.AUDITOR) {
    roleInteger = SAYPlatformRoles.AUDITOR;
  } else if (sayRole === SAYPlatformRoles.SOCIAL_WORKER) {
    roleInteger = SAYPlatformRoles.SOCIAL_WORKER;
  } else if (sayRole === SAYPlatformRoles.PURCHASER) {
    roleInteger = SAYPlatformRoles.PURCHASER;
  } else if (sayRole === SAYPlatformRoles.NGO_SUPERVISOR) {
    roleInteger = SAYPlatformRoles.NGO_SUPERVISOR;
  } else if (sayRole === SAYPlatformRoles.FAMILY) {
    roleInteger = SAYPlatformRoles.FAMILY;
  } else if (sayRole === SAYPlatformRoles.FRIEND) {
    roleInteger = SAYPlatformRoles.FRIEND;
  } else if (sayRole === SAYPlatformRoles.NO_ROLE) {
    roleInteger = SAYPlatformRoles.NO_ROLE;
  }
  return roleInteger;
}

export function getSAYRoleString(sayRole) {
  let roleString;
  if (sayRole === SAYPlatformRoles.AUDITOR) {
    roleString = 'auditor';
  } else if (sayRole === SAYPlatformRoles.SOCIAL_WORKER) {
    roleString = 'socialWorker';
  } else if (sayRole === SAYPlatformRoles.PURCHASER) {
    roleString = 'purchaser';
  } else if (sayRole === SAYPlatformRoles.NGO_SUPERVISOR) {
    roleString = 'ngoSupervisor';
  } else if (sayRole === SAYPlatformRoles.FAMILY) {
    roleString = 'familyMember';
  } else if (sayRole === SAYPlatformRoles.FRIEND) {
    roleString = 'friend';
  } else if (sayRole === SAYPlatformRoles.NO_ROLE) {
    roleString = 'noRole';
  }
  return roleString;
}

export function getUserSAYRoleString(userTypeId) {
  if (userTypeId === FlaskUserTypesEnum.SOCIAL_WORKER) {
    return 'socialWorker';
  }
  if (userTypeId === FlaskUserTypesEnum.NGO_SUPERVISOR) {
    return 'ngoSupervisor';
  }
  if (
    userTypeId === FlaskUserTypesEnum.ADMIN ||
    userTypeId === FlaskUserTypesEnum.SUPER_ADMIN ||
    userTypeId === FlaskUserTypesEnum.SAY_SUPERVISOR
  ) {
    return 'auditor';
  }
  return 'noRole';
}
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
  if (theNeeds.needs) {
    for (let i = 0; i < theNeeds.needs.length; i += 1) {
      if (theNeeds.needs[i].isUrgent) {
        needData[0].push(theNeeds.needs[i]);
      }
      if (theNeeds.needs[i].isDone) {
        needData[5].push(theNeeds.needs[i]);
      }
      if (theNeeds.needs[i].isConfirmed) {
        needData[6].push(theNeeds.needs[i]);
      }
      if (theNeeds.needs[i].unpayable) {
        needData[7].push(theNeeds.needs[i]);
      }
      needData[theNeeds.needs[i].category + 1].push(theNeeds.needs[i]);
    }
  } else {
    for (let i = 0; i < theNeeds.length; i += 1) {
      if (theNeeds[i].isUrgent) {
        needData[0].push(theNeeds[i]);
      }
      if (theNeeds[i].isDone) {
        needData[5].push(theNeeds[i]);
      }
      if (theNeeds[i].isConfirmed) {
        needData[6].push(theNeeds[i]);
      }
      if (theNeeds[i].unpayable) {
        needData[7].push(theNeeds[i]);
      }
      needData[theNeeds[i].category + 1].push(theNeeds[i]);
    }
  }
  return needData;
}

export function daysDifference(time1, time2) {
  const date1 = new Date(time1);
  const date2 = new Date(time2);
  // calculate days difference by dividing total milliseconds in a day
  return (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
}

export function timeDifference(time1, time2) {
  const diff = time2.getTime() - time1.getTime();
  let msec = diff;
  const hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  const mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  const ss = Math.floor(msec / 1000);
  msec -= ss * 1000;
  return { hh, mm, ss, diff };
}

export function prepareUrl(imageUrl) {
  let url;
  if (imageUrl && imageUrl.startsWith('/')) {
    url = `https://api.sayapp.company/${imageUrl.slice(1)}`;
  } else {
    url = `https://api.sayapp.company/${imageUrl}`;
  }

  return url;
}

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isUnpayable(need) {
  return (
    need.unavailable_from &&
    timeDifference(new Date(need.unavailable_from), new Date()).hh < PRODUCT_UNPAYABLE_PERIOD
  );
}

export function getCategoryString(categoryId, isUrgent) {
  if (isUrgent) {
    return 'childData.needCategory.urgent';
  }
  if (categoryId === NeedCategoryEnum.GROWTH) {
    return 'childData.needCategory.growth';
  }
  if (categoryId === NeedCategoryEnum.HEALTH) {
    return 'childData.needCategory.health';
  }
  if (categoryId === NeedCategoryEnum.JOY) {
    return 'childData.needCategory.joy';
  }
  if (categoryId === NeedCategoryEnum.SURROUNDING) {
    return 'childData.needCategory.surroundings';
  }
  return 'N/A';
}
