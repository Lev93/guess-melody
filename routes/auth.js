const { Router } = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../db/models/Users');
const Result = require('../db/models/Result');

const router = Router();

router.post('/registration', async (req, res) => {
  try {
    const { email, password, bestresult } = req.body;
    const registeredUser = await Users.findOne({ where: { email } });
    if (registeredUser) {
      res.send('User alredy exists');
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await Users.create({
        email, password: hashPassword, bestresult,
      });
      await Result.create({
        result: bestresult, user_id: user.id,
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
    const registeredUser = await Users.findOne({ where: { email } });

    if (registeredUser) {
      const areSame = await bcrypt.compare(password, registeredUser.password);

      if (areSame) {
        await Result.create({
          result, user_id: registeredUser.id,
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
