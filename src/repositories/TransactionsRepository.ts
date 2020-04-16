import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  private sumValueType(type: string): number {
    if (!this.transactions.length) return 0;
    return this.transactions
      .map(e => {
        if (e.type === type) return e.value;
        return 0;
      })
      .reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
      );
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.sumValueType('income') || 0;
    const outcome = this.sumValueType('outcome') || 0;
    const total = income - outcome || 0;

    const balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: RequestDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
