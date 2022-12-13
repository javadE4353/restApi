import db from "../model/index.js";
import { Op } from "sequelize";
import { responce } from "../util/configResponce.js";
import { paginate } from "../helper/paginate.js";

export const updateUser = async function (req, res) {
  const user = await db.user.findOne({
    where: { id: req.params.id },
  });
  if (!user) {
    return res.status(400).send("کاربری وجود ندارد");
  }
  const data = {};
  if (req.file !== undefined && req.file !== null) {
    data.image = req.file.path.replace(/\\/g, "/").substring(6);
    req.body.image = `http://localhost:7000/${data.image}`;
    console.log("not null");
  } else {
    req.body.image = user.image;
  }
  await db.RoleHasUser.destroy({ where: { userId: user.toJSON().id } });
  // check roles
  if (db.ROLES.includes(req.body.roleuser)) {
    const Role = await db.Role.findOne({ where: { name: req.body.roleuser } });
    await db.RoleHasUser.create({
      roleId: Role.toJSON().id,
      userId: user.toJSON().id,
    });
  } 
  else {
    const Role = await db.Role.findOne({ where: { name: db.ROLES[1] } });
    await db.RoleHasUser.create({
      roleId: Role.toJSON().id,
      userId: user.toJSON().id,
    });
  }

  try {
    const updatedRows = await db.user.update(req.body, {
      where: { id: req.params.id },
    });
    console.log(updatedRows);
    res.status(200).json(updatedRows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete user
export const deleteuser = async function (req, res) {
  try {
    const updatedRows = await db.user.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json(updatedRows);
  } catch (err) {
    res.status(500).json(err);
  }
};
// createUser
export const createUser = async function (req, res) {
  console.log(req.body);
  const user = await db.user.findOne({
    where: {
      [Op.and]: [{ username: req.body.username }, { email: req.body.email }],
    },
  });
  if (user) {
    return res.status(409).send("نام کاربری و ایمیل از قبل وجود دارد");
  }

  if (!req.body.username && !req.body.email) {
    return res.status(401).send("اطلاعات درست وارد نشده");
  }
  if (!req.body.password) {
    return res.status(401).send("رمز ورود درست وارد نشده");
  }
  const data = {};
  if (req.file) {
    data.image = req.file.path.replace(/\\/g, "/").substring(6);
  }
  console.log(req.file);
  const newUser = await db.user.create(
    {
      username: req.body.username,
      mobile: req.body.mobile,
      email: req.body.email,
      image: `http://localhost:7000/${data.image}`,
      password: req.body.password,
      roleuser: req.body.roleuser ? req.body.roleuser : null,
      role: [{}],
    },
    {
      include: db.Role,
    }
  );

  // check roles
  if (db.ROLES.includes(req.body.roleuser)) {
    const Role = await db.Role.findOne({ where: { name: req.body.roleuser } });
    await db.RoleHasUser.create({
      roleId: Role.toJSON().id,
      userId: newUser.toJSON().id,
    });
  } else {
    const Role = await db.Role.findOne({ where: { name: db.ROLES[1] } });
    await db.RoleHasUser.create({
      roleId: Role.toJSON().id,
      userId: newUser.toJSON().id,
    });
  }
  responce({
    res,
    code: 201,
    message: `create user ${req.body.username}`,
    data: newUser,
  });
};

//getUser

export const getUser = async function (req, res) {
  try {
    let user = await db.user.findOne({
      where: { id: req.params.id },
      include: db.Role,
    });
    return responce({
      res,
      code: 200,
      message: "ok",
      data: user,
    });
  } catch (err) {
    return responce({
      res,
      code: 200,
      message: "ok",
      data: err,
    });
  }
};

// getAllUsers

export const getAllUser = async function (req, res) {
  const pageSize = Number(req.query.pageSize);
  const page = Number(req.query.page);
  console.log(`pageSize:${pageSize}  /////// page:${page}`);
  try {
    const users = await db.user.findAll(
      paginate(
        {
          include: [
            {
              model: db.Role,
              attributes: ["name"],
              through: { attributes: [] },
            },
          ],
          order: [
            ["id", "DESC"],
            //   ["cityName", "ASC"],
          ],
        },
        { page, pageSize }
      )
    );
    const count = await db.user.count();
    console.log(users);
    return responce({
      res,
      code: 200,
      message: "ok",
      data: [users, { count: count }],
    });
  } catch (err) {
    console.log(err);

    responce({
      res,
      code: 500,
      message: "fail",
      data: err,
    });
  }
};

// // //GET USER STATS

export const getUserStats = async function (req, res) {
  // income
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  const lM = lastMonth.getMonth();
  const pM = previousMonth.getMonth();
  console.log(pM);
  const pMonth = await db.user.findAll({
    attributes: [
      "id",
      [db.Sequelize.fn("MONTH", db.Sequelize.col("createdAt")), "month"],
      [db.Sequelize.fn("count", db.Sequelize.col("email")), "totalUser"],
    ],
    where: {
      [Op.in]: {
        [Op.and]: [
          db.Sequelize.where(
            db.Sequelize.fn("MONTH", db.Sequelize.col("createdAt")),
            lM
          ),
          db.Sequelize.where(
            db.Sequelize.fn("YEAR", db.Sequelize.col("createdAt")),
            2022
          ),
        ],
      },
    },
    order: [["createdAt", "DESC"]],
  });

  const lMonth = await db.user.findAll({
    attributes: [
      "id",
      [db.Sequelize.fn("MONTH", db.Sequelize.col("createdAt")), "month"],
      [db.Sequelize.fn("count", db.Sequelize.col("email")), "totalUser"],
    ],
    where: {
      [Op.in]: {
        [Op.and]: [
          db.Sequelize.where(
            db.Sequelize.fn("MONTH", db.Sequelize.col("createdAt")),
            pM
          ),
          db.Sequelize.where(
            db.Sequelize.fn("YEAR", db.Sequelize.col("createdAt")),
            2022
          ),
        ],
      },
    },
    order: [["createdAt", "DESC"]],
  });

  const data = new Promise((resolve, reject) => {
    if (lMonth && pMonth) {
      resolve([...lMonth, ...pMonth]);
    } else {
      rej("error");
    }
  });

  data.then((data) => {
    let response = JSON.parse(JSON.stringify(data));
    let count = (response[1].totalUser * 100) / response[0].totalUser - 100;
    console.log(count);
    res.json({
      data: [{ countDifference: count }, ...data],
      message: "success",
      status: 200,
    });
  });
};
