import { ValdationType, QuestionValueType } from '@/types';

export const validateQuestion = (validations: ValdationType, v: QuestionValueType ): string[] => {
    let errorMsg = [];
    const value = typeof v === 'object' ? '' : v;
    for (let i = 0; i < validations.length; i++) {
        const validatingObject = validations[i];
        const digitsLimitation = validatingObject.digitsLimitation;
        if (validatingObject.type === 'max' && digitsLimitation) {
            if (value.length >= digitsLimitation) {
                errorMsg.push(validatingObject.message);
            }
        }
        if (validatingObject.type === 'min' && digitsLimitation) {
            if (value.length <= digitsLimitation) {
                errorMsg.push(validatingObject.message);
            }
        }
        if (validatingObject.type === 'numbersOnly' && value) {
            if (/^\d+$/.test(value) === false) {
                errorMsg.push(validatingObject.message);
            }
        }
    }
    return errorMsg;
};
