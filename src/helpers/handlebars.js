const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    isEqualTo: (value, number) => {
        return value === number ? true : false;
    },
    multiplication: (a, b) => a * b,
    division: (a, b) => a / b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        };
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);

        const output = `<a href="${href}">
      <span class="${icon}"></span>
      </a>`;
        return new Handlebars.SafeString(output);
    },

    equalHelper: (value1, value2) => {
        if (value1 === value2) {
            return true;
        } else {
            return false;
        }
    },
    formatDateTimeOrder: (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDateTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} ${day < 10 ? '0' + day : day}/${
            month < 10 ? '0' + month : month
        }/${year}`;
        return formattedDateTime;
    },

    formatDate: (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
        return formattedDate;
    },

    formatDateTime: () => {
        const currentTime = new Date();
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const randomNumber1 = getRandomNumber(0, 1);
        const randomNumber2 = getRandomNumber(0, 12);
        const randomNumber3 = getRandomNumber(0, 60);

        // Tính toán thời gian cần trừ đi từ tham số
        const adjustedTime = new Date(
            currentTime.getFullYear() - 0,
            currentTime.getMonth() - 0,
            currentTime.getDate() - randomNumber1,
            currentTime.getHours() - randomNumber2,
            currentTime.getMinutes() - randomNumber3,
        );

        // Format thời gian theo định dạng "YYYY-MM-DD HH:mm:ss"
        const formattedTime = adjustedTime.toISOString().slice(0, 19).replace('T', ' ');

        // Trả về thời gian đã chỉnh sửa
        return formattedTime;
    },

    timeAgo: (date) => {
        const currentTime = new Date();
        const elapsedTime = currentTime - date;

        const minutes = Math.floor(elapsedTime / (1000 * 60));
        if (minutes < 60) {
            return `${minutes} phút trước`;
        }

        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        if (hours < 24) {
            return `${hours} giờ trước`;
        }

        const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
        if (days < 30) {
            return `${days} ngày trước`;
        }

        const months = Math.floor(elapsedTime / (1000 * 60 * 60 * 24 * 30));
        if (months < 12) {
            return `${months} tháng trước`;
        }

        const years = Math.floor(elapsedTime / (1000 * 60 * 60 * 24 * 30 * 12));
        return `${years} năm trước`;
    },
};
