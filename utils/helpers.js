module.exports = {

    format_date: (date) => {
          // below add 5 yrs to the 'year' value to calculate the end date
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
            new Date(date).getFullYear()
        }`
    }
  };