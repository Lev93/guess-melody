const { Router } = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/models');

const router = Router();

router.post('/registration', async (req, res) => {
  try {
    const { email, password, bestresult } = req.body;
    console.log(db.users);
    const registeredUser = await db.users.findOne({ where: { email } });
    if (registeredUser) {
      res.send('User alredy exists');
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await db.users.create({
        email, password: hashPassword, bestresult,
      });
      await db.results.create({
        result: bestresult, userId: user.id,
      });
      res.send({ user: user.id });
    }
  } catch (e) {
    console.log(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password, result } = req.body;
    console.log(req.body);
    const registeredUser = await db.users.findOne({ where: { email } });
    console.log(registeredUser.id);
    if (registeredUser) {
      const areSame = await bcrypt.compare(password, registeredUser.password);

      if (areSame) {
        await db.results.create({
          result, userId: registeredUser.id,
        });
        res.send({ user: registeredUser.id });
      } else {
        res.send('Password incorrect');
      }
    } else {
      res.send('User unexists');
    }
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
