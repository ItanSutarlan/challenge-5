const { Op } = require('sequelize');
const { Room, Fight } = require('../models');
const RPS = require('../lib/game');

const create = (req, res) => {
  const { name } = req.body;
  Room.create({ name })
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const fight = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;
    const { choice } = req.body;

    // Variable ini diperlukan untuk menentukan ronde
    const allData = await Fight.findAll({
      where: {
        roomId,
      },
    });

    const round = Math.floor(allData.length / 2) + 1;

    let data1 = await Fight.findOne({
      where: {
        roomId,
        userId,
        round,
      },
    });

    if (!data1) {
      data1 = await Fight.create({
        roomId,
        userId,
        round,
        choice,
      });
    }

    let data2;
    while (true) {
      data2 = await Fight.findOne({
        where: {
          roomId,
          userId: {
            [Op.ne]: userId,
          },
          round,
        },
      });
      if (data2) {
        break;
      }
    }

    const result = RPS.determineWinner(data1.choice, data2.choice);

    data1 = await data1.update({ score: result }, { returning: true });
    data2 = await Fight.findOne({
      where: {
        roomId,
        userId: {
          [Op.ne]: userId,
        },
        round,
      },
    });
    if (round === 3) {
      const data1 = await Fight.findAll({
        where: {
          roomId,
          userId,
        },
      });
      const data2 = await Fight.findAll({
        where: {
          roomId,
          userId: {
            [Op.ne]: userId,
          },
        },
      });

      const totalScore1 = data1.reduce(function (total, data) {
        return total + data.score;
      });
      const totalScore2 = data2.reduce(function (total, data) {
        return total + data.score;
      });
      let room = await Room.findOne({ where: { id: roomId } });
      if (totalScore1 === totalScore2) {
        if (!room.winner) {
          room = await room.update({ winner: 'draw' }, { returning: true });
        }
      }
      if (totalScore1 < totalScore2) {
        if (!room.winner) {
          room = await room.update(
            { winner: 'win', userId },
            { returning: true }
          );
        }
      }
      return res.json([data1, data2, room]);
    }
    res.json([data1, data2]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { create, fight };
