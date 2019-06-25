import Vue from "vue"

document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#app",
    data: {
      currencies: {},
      baseCurrency: "EUR",
      targetCurrency: "EUR",
      baseAmount: 0
    },
    computed: {
      baseRate: function () {
        return this.getRate(this.baseCurrency);
      },
      targetRate: function () {
        return this.getRate(this.targetCurrency);
      },
      // baseAmount: function () {
      //   return this.convertFromEuros(this.convertToEuros(this.targetAmount, this.targetRate), this.baseRate) ? this.convertFromEuros(this.convertToEuros(this.targetAmount, this.targetRate), this.baseRate) : 0;
      // },
      targetAmount: function () {
        return this.convertFromEuros(this.convertToEuros(this.baseAmount, this.baseRate), this.targetRate);
      },
    },
    mounted() {
      this.fetchCurrencies();
    },
    methods: {
      fetchCurrencies: function () {
        fetch("https://api.exchangeratesapi.io/latest")
        .then(res => res.json()).then(
          data => {
            this.currencies = data.rates;
            this.currencies["EUR"] = 1;
          }
        );
      },
      getRate: function (currency) {
        return this.currencies[currency];
      },
      convertFromEuros: function (amount, rate) {
        return amount * rate;
      },
      convertToEuros: function (amount, rate) {
        return amount / rate;
      },
    },
    filters: {
      moneyFormat: function (amount) {
        return amount.toFixed(2);
      },
    }
  })
})
