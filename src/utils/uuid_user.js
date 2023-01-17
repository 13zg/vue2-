//生成临时游客唯一标识id
import { v4 as uuidv4 } from "uuid";
export const getUuid = () => {
  let id = localStorage.getItem("UUID");
  // 如果id为空(初始第一次)，则生成id
  if (!id) {
    id = uuidv4();
    localStorage.setItem("UUID", id);
  }
  return id;
};
