import { Variable } from "./Variable.js";
import { Sensor } from "./Sensor.js";
import { Medition } from "./Medition.js";
import { Value } from "./Value.js";
import { Moment } from "./Moment.js";
import { Equipment } from "./Equipment.js";

//? Variable 1-1 Sensor
Sensor.belongsTo(Variable, { foreignKey: 'variableId' });

//? Sensor M-1 Equipment
Equipment.hasMany(Sensor, { foreignKey: 'equipmentId' });
Sensor.belongsTo(Equipment, { foreignKey: 'equipmentId' });

// ? Sensor 1-M Medition
Medition.belongsTo(Sensor, { foreignKey: 'sensorId' });
Sensor.hasMany(Medition, { foreignKey: 'sensorId' });

// ? Medition 1-1 Variable
Medition.belongsTo(Variable, { foreignKey: 'variableId' });

// ? Medition 1-M Value
Medition.hasMany(Value, { foreignKey: 'meditionId' });
Value.belongsTo(Medition, { foreignKey: 'meditionId' });

// ? Value 1-1 Moment
Value.belongsTo(Moment, { foreignKey: 'momentId' });

export {
  Variable,
  Sensor,
  Medition,
  Value,
  Moment,
  Equipment
}