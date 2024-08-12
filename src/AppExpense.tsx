import React, { useState } from "react";
import ExpenseFilter from "./components/Expense/ExpenseFilter";
import ExpenseList from "./components/Expense/ExpenseList";
import ExpenseForm from "./components/Expense/ExpenseForm";

//export const categories = ["Groceries", "Utilities", "Entertainment"] as const;

const AppExpense = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 100, category: "Groceries" },
    { id: 2, description: "bbb", amount: 100, category: "Groceries" },
    { id: 3, description: "ccc", amount: 100, category: "Utilities" },
    { id: 4, description: "ddd", amount: 100, category: "Entertainment" },
  ]);

  const [selectCategory, setSelectCategory] = useState("");
  const visibleCategory = selectCategory
    ? expenses.filter((e) => e.category === selectCategory)
    : expenses;
  return (
    <div>
      <div className="mb-5">
        {" "}
        <ExpenseForm
          onSubmit={(expense) => {
            //console.log(expense);
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }]);
          }}
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(selectCategory) =>
            setSelectCategory(selectCategory)
          }
        />
      </div>

      <ExpenseList
        expenses={visibleCategory}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </div>
  );
};

export default AppExpense;
