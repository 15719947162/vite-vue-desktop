/**
 * localStorage设置有效期
 * @param name localStorage设置名称
 * @param data 数据对象
 */
export function setLocal(name, data) {
    const d = data;
    localStorage.setItem(name, JSON.stringify(data));
  }
  /**
   * 判断localStorage有效期是否失效
   * @param name localStorage设置名称
   */
  export async function useLocal(name) {
    return new Promise((resolve) => {
      const local = getLocal(name);
      resolve(local);
    });
  }
  /**
   * 获取localStorage对象并转成对应的类型
   * @param name localStorage设置名称
   */
  export function getLocal(name) {
    const l = localStorage.getItem(name);
    const local = JSON.parse(l !== null ? l : '{}');
    return local;
  }
  /**
   * @description 设置Storage数据
   * @param {*} key
   * @param {*} value
   */
  export function setStorage(key, value) {
    if (key && value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  /**
   * @description 删除Storage数据
   * @param {*} key
   */
  export function removeStorage(key) {
    if (key) {
      localStorage.removeItem(key);
    }
  }
  