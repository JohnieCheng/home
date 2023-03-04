const emailRegExp = new RegExp(/^([a-z0-9_-]+)@([\da-z-]+)\.([a-z]{2,6})$/);
// 密码强度正则表达式，最少6位，包括至少1个大写字母，1个小写字母，1个数字
const passwordRegExp = new RegExp(/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/);

export const validateEmail = (email: string) => {
    return email?.match(emailRegExp);
};

export const validatePassword = (password: string) => {
    return password?.match(passwordRegExp);
};
