
export const  notValidInputClass = (formik,fieldName) => {
        const { errors , touched} = formik
        if(touched[fieldName] && errors[fieldName]){
            const inputClass = 'border-1 border-[#ff9494]'
            return  inputClass
        }
        return '';
    }
