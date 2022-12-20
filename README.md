# Link to the App [https://LarisaShatil.github.io/bof-budget-control-app]

## Start of coding:
export interface MoneyProps {
  title: "income" | "expense",
  list: MoneyItem[],
  setList: (value: MoneyItem[]) => void,
}

setList receives the props (MoneyItem[]) and returns nothing (void)

## Styling with MUI. Importing the themes correctly: https://stackoverflow.com/questions/67655896/importing-a-materialui-theme-from-another-file-correctly

## Requirements

1. Create a simple one-page application to store incomes and expenses, and set
saving target.
2. Account balance can be calculated from incomes, expenses, and saving.
`incomes - expenses + saving = balance`
3. Users should be able to add new incomes, expenses, transfer from balance accountt to saving account, and reset saving target.
4. Use React Hooks where applicable. TypeScript must be used at least for the props types.
5. Decide your own styling (The image has no style)
