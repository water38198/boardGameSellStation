export default function useTimeTransform() {
  // 定义一个函数，接受时间戳作为参数，返回格式化后的日期字符串
  function timeTransform(timestamp) {
    let stamp = timestamp;
    if (stamp && stamp.toString().length < 13) {
      stamp *= 1000;
    }
    const date = new Date(timestamp);
    const month = date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${month}.${day}.${date.getFullYear()}`;
  }

  // 返回需要在模板中使用的函数
  return {
    timeTransform,
  };
}
