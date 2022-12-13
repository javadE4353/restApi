import db from "../model/index.js";

import chalk from "chalk";

export const connectDB = async () => {
  try {
    await db.sequelize.sync({ force: false, alter: false });
    const role = await db.Role.findAll({});
    if (role.length < 1) {
      initial();
    }
  } catch (error) {
    console.log(error);
  }
};

async function initial() {
  await db.Role.bulkCreate([
    { name: "admin", bit: 1 },
    { name: "user", bit: 2 },
  ]);
  await db.Permission.bulkCreate([
    { name: "post", bit: 1 },
    { name: "get", bit: 2 },
    { name: "edit", bit: 4 },
    { name: "delete", bit: 8 },
  ]);

  let permission = await db.Permission.findAll({ attributes: ["id"] });
  let role = await db.Role.findAll({ attributes: ["id"] });
  permission = JSON.parse(JSON.stringify(permission));
  role = JSON.parse(JSON.stringify(role));
  await db.RoleHasPermission.bulkCreate([
    { permissionId: permission[0].id, roleId: role[0].id },
    { permissionId: permission[1].id, roleId: role[0].id },
    { permissionId: permission[2].id, roleId: role[0].id },
    { permissionId: permission[3].id, roleId: role[0].id },
    { permissionId: permission[0].id, roleId: role[1].id },
    { permissionId: permission[1].id, roleId: role[1].id },
    { permissionId: permission[2].id, roleId: role[1].id },
  ]);
}
