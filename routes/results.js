/* eslint-disable no-irregular-whitespace */
const { Router } = require('express');
const Users = require('../db/models/Users');
const Result = require('../db/models/Result');

const router = Router();

router.post('/add', async (req, res) => {
  try {
    const { id, result } = req.body;
    const user = await Users.findOne({ where: { id } });
    await Result.create({ result, user_id: user.id });
    if (result > user.bestresult) {
      await Users.update(
        { bestresult: result },
        { where: { id: user.id } },
      );
      const users = await Users.findAndCountAll({
        order: [
          ['bestresult', 'DESC'],
        ],
      });
      const place = users.rows.findIndex((element) => element.id === id);
      res.send(`Вы заняли ${place + 1} место из ${users.count}. Это ваш лучший результат`);
    } else {
      const users = await Users.findAndCountAll({
        order: [
          ['bestresult', 'DESC'],
        ],
      });
      const place = users.rows.findIndex((element) => element.id === id);
      res.send(`Вы заняли ${place + 1} место из ${users.count}.`);
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
