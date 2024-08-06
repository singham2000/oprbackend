

  
const conversion = await CurrencyConversion.findOne({
    where: {
      currency_from: 'EUR',
      currency_to: 'JPY',
      valid_from: {
        [Sequelize.Op.lte]: new Date()  // Selects records where valid_from <= today
      },
      valid_to: {
        [Sequelize.Op.gte]: new Date()  // Selects records where valid_to >= today
      }
    }
  });
console.log(conversion);
  