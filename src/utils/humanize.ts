class Humanize {
  idDateTimeFormatter: Intl.DateTimeFormat;
  idCurrencyFormatter: Intl.NumberFormat;
  constructor() {
    this.idDateTimeFormatter = new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: undefined,
      minute: undefined,
      timeZoneName: undefined,
      timeZone: undefined,
    });

    this.idCurrencyFormatter = new Intl.NumberFormat('id', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  }

  currency(input: string | number) {
    if (input == null) {
      return '';
    }
    input = Number(input);
    return this.idCurrencyFormatter.format(input);
  }

  date(input: string | Date) {
    if (input == null) {
      return '';
    }

    const myDate = new Date(input);

    if (isNaN(myDate.getTime())) {
      return '';
    }

    return this.idDateTimeFormatter.format(myDate);
  }

  snakeToPascal(input: string) {
    if (input == null) {
      return '';
    }
    return input.split('_').map(this.capFirstLetter).join(' ');
  }

  capFirstLetter = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || '';

  // Special Case
  bankName = (s: string) =>
    s.length > 4 ? this.capFirstLetter(s) : s.toUpperCase();
}

const humanize = new Humanize();

export default humanize;
