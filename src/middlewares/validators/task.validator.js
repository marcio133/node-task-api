const { check, validationResult } = require("express-validator");

const createTaskValidator = [
    check("title").notEmpty().withMessage("Title must be defined"),
    check("description").notEmpty().withMessage("Description must be defined"),
    check("priority")
        .notEmpty()
        .withMessage("Must be defined"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) return next();
        res.status(422).json({ errors: errors.array() });
    },
];

// const atualizarAlbumValidator = [
//   check("artista").notEmpty().withMessage("Artista deve ser definido"),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (errors.isEmpty()) return next();
//     res.status(422).json({ errors: errors.array() });
//   },
// ]

module.exports = {
    createTaskValidator,
};
