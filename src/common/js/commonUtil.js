// 共通类
const commonUtil = {
    //获取N天后的日期
    getDayAfter: function (days) {
        const now = new Date();
        const date = new Date();
        date.setTime(now.getTime() + 3600 * 1000 * 24 * days);
        return date;
    },
    //获取N个月后的日期
    getMonthAfter: function (months) {
        const now = new Date();
        let y = now.getFullYear();
        let m = now.getMonth() + 1 + months;
        while (m > 12) {
            m = m - 12;
            y = y + 1;
        }
        let d = now.getDate() - 1;
        return new Date(`${y}-${m}-${d}`);
    },
    //获取两个日期之间的工作日天数
    countWorkDays: function (start, end) {
        if (end.getTime() - start.getTime() < 0) {
            return 0;
        }
        const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
        let d = start;
        let weeks = 0;
        for (let i = 0; i < days; i++) {
            // 若为周六或周日标记为周末
            if (d.getDay() === 0 || d.getDay() === 6) weeks++;
            // 取下一天日期
            d = new Date(d.getTime() + 1000 * 60 * 60 * 24);
        }
        return days - weeks;
    }
};

export default commonUtil;
