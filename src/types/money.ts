export interface MoneyItem {
  id: number,
  title: string,
  amount: string,
  date: string,
}

export interface MoneyProps {
  name: "income" | "expense",
  balance?: number,
  list: MoneyItem[];
  setList: React.Dispatch<React.SetStateAction<MoneyItem[]>>,
}
