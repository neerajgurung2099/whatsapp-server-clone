import { Container } from "typedi";
import Logger from "./logger";
export default ({ models }: { models: { name: string; model }[] }) => {
  models.forEach((m) => {
    Container.set(m.name, m.model);
  });
  Container.set("logger", Logger);
};
