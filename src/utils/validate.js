export const vietnameseRegex = /^[\sa-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/u;
export const numberRegex = /^[0123456789]+$/u;

export function viValidate(inputLabel) {
    return ([{
        pattern: vietnameseRegex,
        maxlength: 10000,
        message: `${capitalizeFirstLetter(inputLabel)} không hợp lệ`
    }]);
}

export function r_viInputRule(inputLabel) {
    return ([
        {
            pattern: vietnameseRegex,
            maxlength: 10000,
            message: `${capitalizeFirstLetter(inputLabel)} không hợp lệ`
        },
        ...requiredValidate(inputLabel)
    ]);
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function requiredValidate(inputLabel) {
    return ([
        {
            required: true,
            message: `${capitalizeFirstLetter(inputLabel)} không được để trống`
        }
    ]);
}

export function numberValidate(inputLabel) {
    return ([{
        pattern: numberRegex,
        max: 11,
        message: `${capitalizeFirstLetter(inputLabel)} chỉ bao gồm số`
    }]);
}

export function maxLengthValidate(inputLabel) {
    return ([{
        max: 11,
        message: `${capitalizeFirstLetter(inputLabel)} vượt quá độ dài cho phép`
    }]);
}
