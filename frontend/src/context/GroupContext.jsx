import { createContext, useContext, useState, useEffect } from 'react'

const GroupContext = createContext()

const STORAGE_KEY = 'fairsplit_groups'

function loadGroups() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveGroups(groups) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups))
}

/**
 * Calculates person-to-person debts for a group.
 * Returns an array of { from, to, amount } objects.
 */
export function calculateDebts(group) {
  const { members, expenses } = group
  if (!members.length || !expenses.length) return []

  // Calculate each member's total paid
  const paid = {}
  members.forEach((m) => (paid[m] = 0))
  expenses.forEach((e) => {
    if (paid[e.paidBy] !== undefined) {
      paid[e.paidBy] += e.amount
    }
  })

  // Total and fair share
  const total = Object.values(paid).reduce((a, b) => a + b, 0)
  const share = total / members.length

  // Net balance: positive = owed money, negative = owes money
  const balances = members.map((m) => ({
    name: m,
    balance: paid[m] - share,
  }))

  // Settle up: greedy matching of max creditor and max debtor
  const debtors = balances.filter((b) => b.balance < -0.5).map((b) => ({ ...b, balance: -b.balance }))
  const creditors = balances.filter((b) => b.balance > 0.5).map((b) => ({ ...b }))

  debtors.sort((a, b) => b.balance - a.balance)
  creditors.sort((a, b) => b.balance - a.balance)

  const debts = []
  let i = 0
  let j = 0

  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(debtors[i].balance, creditors[j].balance)
    if (amount > 0.5) {
      debts.push({
        from: debtors[i].name,
        to: creditors[j].name,
        amount: Math.round(amount * 100) / 100,
      })
    }
    debtors[i].balance -= amount
    creditors[j].balance -= amount
    if (debtors[i].balance < 0.5) i++
    if (creditors[j].balance < 0.5) j++
  }

  return debts
}

/**
 * Get total paid by each member in a group.
 * Returns { memberName: totalPaid }
 */
export function getContributions(group) {
  const contributions = {}
  group.members.forEach((m) => (contributions[m] = 0))
  group.expenses.forEach((e) => {
    if (contributions[e.paidBy] !== undefined) {
      contributions[e.paidBy] += e.amount
    }
  })
  return contributions
}

export function GroupProvider({ children }) {
  const [groups, setGroups] = useState(loadGroups)

  useEffect(() => {
    saveGroups(groups)
  }, [groups])

  const createGroup = (name, admin, members) => {
    const newGroup = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name,
      admin,
      members: [admin, ...members.filter((m) => m !== admin)],
      expenses: [],
      createdAt: new Date().toISOString(),
    }
    setGroups((prev) => [...prev, newGroup])
    return newGroup.id
  }

  const addExpense = (groupId, expense) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              expenses: [
                ...g.expenses,
                {
                  id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
                  ...expense,
                  date: new Date().toISOString(),
                },
              ],
            }
          : g
      )
    )
  }

  const deleteGroup = (groupId) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId))
  }

  return (
    <GroupContext.Provider value={{ groups, createGroup, addExpense, deleteGroup }}>
      {children}
    </GroupContext.Provider>
  )
}

export function useGroups() {
  const ctx = useContext(GroupContext)
  if (!ctx) throw new Error('useGroups must be used within a GroupProvider')
  return ctx
}
