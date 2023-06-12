const Joi = require('joi');

/**
 * @param {req.body}  
 * @returns error if happened
 * @apply to new add home news and update news  
 */

function validationHomeNews(object) {
    const schema = Joi.object({
        title: Joi.string().min(1).max(15).trim().required(),
        content: Joi.string().min(1).trim().required()
    })
    return schema.validate(object);
}

/**
 * @param {req.body}  
 * @returns error if happened
 * @apply whene update text in home 
 */
function validationHometext(object) {
    const schema = Joi.object({
        main_text: Joi.string().min(1).trim().required(),
    })
    return schema.validate(object);
}



/**
 * @param {req.body}  
 * @returns error if happened
 * @apply whene add new note from student to teacher 
 */
function validationNoteSt(object) {
    const schema = Joi.object({
        student_id_from: Joi.number().required(),
        student_name_from: Joi.string().trim().required().min(8).max(25),
        teacher_name_to: Joi.string().trim().min(2).max(25).required(),
        note_status_code: Joi.number().required(),
        note: Joi.string().trim().min(5).required(),

    })
    return schema.validate(object);
}

/**
 * @param {req.body}  
 * @returns error if happened
 * @apply whene add new teacher or update
 */
function validationTeacher(object) {
    const schema = Joi.object({
        full_name: Joi.string().trim().required().min(8).max(25),
        address: Joi.string().trim().min(2).max(25).required(),
        mobile_number: Joi.string().min(10).max(15).required(),
        gender: Joi.string().trim().min(2).max(25).required(),
        major: Joi.string().trim().min(1).required(),
        password: Joi.string().trim().min(8).max(50).required(),
        email: Joi.string().trim().min(7).max(25).required(),
        is_admin: Joi.boolean()

    })
    return schema.validate(object);
}
/**
 * @param {req.body}  
 * @returns error if happened
 * @apply whene add new note from teacher to student  
 */
function validationNoteTeacher(object) {
    const schema = Joi.object({
        teacher_id_from: Joi.number().required(),
        teacher_name_from: Joi.string().trim().required().min(3).max(25),
        student_name_to: Joi.string().trim().min(2).max(25).required(),
        note_status_code: Joi.number().required(),
        note: Joi.string().trim().min(5).required(),

    })
    return schema.validate(object);
}

/**
 * @param {req.body}  
 * @returns error if happened
 * @apply whene any of student or teacher or admin login  
 */
function validatedLoginUser() { }


/**
 * @param {req.body}  
 * @returns error if happened
 * @apply whene add new student or update
 */
function validationStudent(object) {
    const schema = Joi.object({
        full_name: Joi.string().trim().min(8).max(25).required(),
        address: Joi.string().trim().min(2).max(25).required(),
        mobile_number: Joi.string().trim().min(10).max(15).required(),
        gender: Joi.string().trim().min(2).max(25).required(),
        data_of_birth: Joi.string().trim().min(8).max(10).required(),
        class_number: Joi.number().min(1).required(),
        password: Joi.string().trim().min(8).max(50).required(),
        email: Joi.string().trim().min(7).max(25).required(),
        is_admin: Joi.boolean()


    })
    return schema.validate(object);
}

module.exports = { validationHomeNews, validatedLoginUser, validationHometext, validationStudent, validationNoteSt, validationTeacher, validationNoteTeacher }