const router = require('express').Router();
const {
    getThoughtById,
    getAllThoughts,
    createThought
} = require('../../controllers/thought');

router.route('/').get(getAllThoughts).post(createThought);
router.route('/:id').get(getThoughtById);


module.exports = router;