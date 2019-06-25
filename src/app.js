import Vue from "vue"

document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#app",
    data: {
      currencies: {},
      baseCurrency: "EUR",
      targetCurrency: "EUR",
      baseAmount: 0,
      targetAmount: 0
    },
    computed: {
      baseRate: function () {
        return this.getRate(this.baseCurrency);
      },
      targetRate: function () {
        return this.getRate(this.targetCurrency);
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
        return this.currencies[currency] ? this.currencies[currency] : 0;
      },
      convertFromEuros: function (amount) {
        return amount * this.targetRate;
      },
      convertToEuros: function (amount) {
        return amount / this.baseRate;
      },
      setBaseAmount: function () {
        this.baseAmount = this.convertToEuros(this.convertFromEuros(this.targetAmount));
      },
      setTargetAmount: function () {
        this.targetAmount = this.convertFromEuros(this.convertToEuros(this.baseAmount));
      },
    },
    filters: {
      formatMoney: function (amount) {
        return amount.toFixed(2);
      },
    }
  })
})
