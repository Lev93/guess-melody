/* eslint-disable no-irregular-whitespace */
const { Router } = require('express');
const db = require('../db/models');

const router = Router();

router.post('/add', async (req, res) => {
  try {
    const { id, result } = req.body;
    const user = await db.users.findOne({ where: { id } });
    await db.results.create({ result, userId: user.id });
    if (result > user.bestresult) {
      await db.users.update(
        { bestresult: result },
        { where: { id: user.id } },
      );
      const users = await db.users.findAndCountAll({
        order: [
          ['bestresult', 'DESC'],
        ],
      });
      const place = users.rows.findIndex((element) => element.id === Number(id)) + 1;
      res.send(`Вы заняли ${place} место из ${users.count}. Это ваш лучший результат`);
    } else {
      const users = await db.users.findAndCountAll({
        order: [
          ['bestresult', 'DESC'],
        ],
      });
      const place = users.rows.findIndex((element) => element.id === Number(id)) + 1;
      res.send(`Вы заняли ${place} место из ${users.count}.`);
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
