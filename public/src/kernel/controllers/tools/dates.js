class DateTools {
    static toStringFromDateFormat(objDate){
        if(!objDate) return null;
        if (typeof objDate === "string") {
            if (objDate === '-') return null;
            return objDate;
        }
        const dateGet = new Date(Date.parse(objDate));
        let y = (dateGet.getFullYear()).toString();
        let m = (dateGet.getMonth() + 1).toString();
        let d = (dateGet.getDate()).toString();
        if (m.length === 1) m = '0' + m;
        if (d.length === 1) d = '0' + d;
        return y + '-' + m + '-' + d;
    }

    static toDateFromStringFormat(objStr){
        if(!objStr) return null;
        if (!objStr) return null;
        const parts = objStr.split('T')[0].split('-').map(item => parseInt(item));
        return new Date(parts[0], parts[1]-1, parts[2]);
    }
}

export default DateTools;