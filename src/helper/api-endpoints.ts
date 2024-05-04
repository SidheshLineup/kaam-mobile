const COMMON_ENDPOINT = '/api/';

export const USER = `${COMMON_ENDPOINT}users`;
export const LOGIN_USER = `${COMMON_ENDPOINT}authentication`;
export const GET_OTP = `${COMMON_ENDPOINT}login`;

export const JOBS = `${COMMON_ENDPOINT}jobs`;
export const JOB_ROLES = `${COMMON_ENDPOINT}job-roles`;
export const JOBS_APPLICATIONS = `${COMMON_ENDPOINT}jobapplications`;
export const CHATS = `${COMMON_ENDPOINT}chats`;

export const feathersServices = {
  chats: 'api/chats',
};
